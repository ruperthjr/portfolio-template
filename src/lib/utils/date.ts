import { format, formatDistanceToNow, parseISO } from 'date-fns';

export function formatDate(date: string | Date, formatStr: string = 'MMM dd, yyyy'): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr);
}

export function getRelativeTime(date: string | Date): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatDistanceToNow(dateObj, { addSuffix: true });
}

export function sortByDate<T extends { date: string }>(items: T[], order: 'asc' | 'desc' = 'desc'): T[] {
    return items.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return order === 'desc' ? dateB - dateA : dateA - dateB;
    });
}

export function groupByYear<T extends { date: string }>(items: T[]): Record<string, T[]> {
    return items.reduce((groups, item) => {
        const year = new Date(item.date).getFullYear().toString();
        if (!groups[year]) groups[year] = [];
        groups[year].push(item);
        return groups;
    }, {} as Record<string, T[]>);
}

export function groupByMonth<T extends { date: string }>(items: T[]): Record<string, T[]> {
    return items.reduce((groups, item) => {
        const month = format(parseISO(item.date), 'MMMM yyyy');
        if (!groups[month]) groups[month] = [];
        groups[month].push(item);
        return groups;
    }, {} as Record<string, T[]>);
}