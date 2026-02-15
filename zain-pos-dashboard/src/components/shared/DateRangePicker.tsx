import React, { useState } from 'react';
import { useDateFilter, DateRangeLabel } from '@/contexts/DateFilterContext';
import { Calendar, ChevronDown, Check } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export function DateRangePicker() {
    const { dateRange, setPreset, setDateRange } = useDateFilter();
    const [isOpen, setIsOpen] = useState(false);
    const [showCustom, setShowCustom] = useState(false); // To toggle custom date inputs

    // Temporary state for custom date inputs
    const [customStart, setCustomStart] = useState('');
    const [customEnd, setCustomEnd] = useState('');

    const presets: DateRangeLabel[] = [
        'Today', 'Yesterday', 'This Week', 'Last 7 Days',
        'This Month', 'Last 30 Days', 'This Year', 'All Time'
    ];

    const handlePresetSelect = (label: DateRangeLabel) => {
        setPreset(label);
        setIsOpen(false);
        setShowCustom(false);
    };

    const handleCustomApply = () => {
        if (customStart && customEnd) {
            setDateRange({
                startDate: new Date(customStart),
                endDate: new Date(customEnd),
                label: 'Custom'
            });
            setIsOpen(false);
            setShowCustom(false);
        }
    };

    return (
        <div className="relative">
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-700 dark:text-gray-200"
            >
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>
                    {dateRange.label === 'Custom'
                        ? `${format(dateRange.startDate!, 'dd MMM')} - ${format(dateRange.endDate!, 'dd MMM')}`
                        : dateRange.label
                    }
                </span>
                <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 p-2 animate-in fade-in zoom-in-95 duration-100">
                    <div className="space-y-1">
                        {presets.map((preset) => (
                            <button
                                key={preset}
                                onClick={() => handlePresetSelect(preset)}
                                className={cn(
                                    "w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between",
                                    dateRange.label === preset
                                        ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400 font-medium"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                )}
                            >
                                {preset}
                                {dateRange.label === preset && <Check className="w-4 h-4" />}
                            </button>
                        ))}

                        <div className="border-t border-gray-100 dark:border-gray-700 my-1 pt-1">
                            <button
                                onClick={() => setShowCustom(!showCustom)}
                                className={cn(
                                    "w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between",
                                    dateRange.label === 'Custom'
                                        ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400 font-medium"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                )}
                            >
                                Custom Range
                                {dateRange.label === 'Custom' && <Check className="w-4 h-4" />}
                            </button>
                        </div>

                        {/* Custom Date Inputs */}
                        {(showCustom || dateRange.label === 'Custom') && (
                            <div className="p-2 space-y-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-sm">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                        value={customStart}
                                        onChange={(e) => setCustomStart(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">End Date</label>
                                    <input
                                        type="date"
                                        className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                        value={customEnd}
                                        onChange={(e) => setCustomEnd(e.target.value)}
                                    />
                                </div>
                                <button
                                    onClick={handleCustomApply}
                                    className="w-full py-1.5 bg-primary-600 text-white rounded font-medium text-xs hover:bg-primary-700"
                                >
                                    Apply
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Backdrop to close */}
            {isOpen && (
                <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            )}
        </div>
    );
}
