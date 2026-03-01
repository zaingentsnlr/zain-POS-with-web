import { createContext, useContext, useState, type ReactNode } from 'react';
import { startOfDay, endOfDay, subDays, startOfWeek, startOfMonth, startOfYear } from 'date-fns';

export type DateRangeLabel = 'Today' | 'Yesterday' | 'This Week' | 'Last 7 Days' | 'This Month' | 'Last 30 Days' | 'This Year' | 'All Time' | 'Custom';

export interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
    label: DateRangeLabel;
}

interface DateFilterContextType {
    dateRange: DateRange;
    setDateRange: (range: DateRange) => void;
    setPreset: (label: DateRangeLabel) => void;
}

const DateFilterContext = createContext<DateFilterContextType | undefined>(undefined);

export function DateFilterProvider({ children }: { children: ReactNode }) {
    const [dateRange, setDateRangeState] = useState<DateRange>({
        startDate: startOfDay(new Date()),
        endDate: endOfDay(new Date()),
        label: 'Today'
    });

    const setDateRange = (range: DateRange) => {
        setDateRangeState(range);
    };

    const setPreset = (label: DateRangeLabel) => {
        const today = new Date();
        let start: Date | null = null;
        let end: Date | null = endOfDay(today);

        switch (label) {
            case 'Today':
                start = startOfDay(today);
                break;
            case 'Yesterday':
                start = startOfDay(subDays(today, 1));
                end = endOfDay(subDays(today, 1));
                break;
            case 'This Week':
                start = startOfWeek(today, { weekStartsOn: 1 }); // Monday start
                break;
            case 'Last 7 Days':
                start = startOfDay(subDays(today, 6));
                break;
            case 'This Month':
                start = startOfMonth(today);
                break;
            case 'Last 30 Days':
                start = startOfDay(subDays(today, 29));
                break;
            case 'This Year':
                start = startOfYear(today);
                break;
            case 'All Time':
                start = null;
                end = null;
                break;
            default:
                break;
        }

        setDateRangeState({ startDate: start, endDate: end, label });
    };

    return (
        <DateFilterContext.Provider value={{ dateRange, setDateRange, setPreset }}>
            {children}
        </DateFilterContext.Provider>
    );
}

export function useDateFilter() {
    const context = useContext(DateFilterContext);
    if (context === undefined) {
        throw new Error('useDateFilter must be used within a DateFilterProvider');
    }
    return context;
}
