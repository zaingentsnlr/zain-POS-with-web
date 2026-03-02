import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = Router();
const prisma = new PrismaClient();

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required' });
        }

        const user = await prisma.user.findFirst({
            where: { username, isActive: true }
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify password:
        // 1) normal bcrypt hash
        // 2) legacy/plain password fallback (from old sync payloads), then auto-upgrade to bcrypt
        let isValidPassword = false;
        try {
            isValidPassword = await bcrypt.compare(password, user.password);
        } catch {
            isValidPassword = false;
        }
        if (!isValidPassword && user.password === password) {
            isValidPassword = true;
            const upgradedHash = await bcrypt.hash(password, 10);
            await prisma.user.update({
                where: { id: user.id },
                data: { password: upgradedHash }
            });
        }
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET!,
            { expiresIn: '24h' }
        );

        // Create audit log
        await prisma.auditLog.create({
            data: {
                action: 'USER_LOGIN',
                details: `User ${user.username} logged in`,
                userId: user.id
            }
        });

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                name: user.name
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

export default router;
