export const formatTournamentsTime = (
    time: string | Date,
    isScheduled: boolean = false
) => {
    if (!time) return "-";

    const date = new Date(time);
    const now = new Date();

    // helper
    const sameDay = (d1: Date, d2: Date) =>
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();

    const isToday = sameDay(date, now);

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = sameDay(date, yesterday);

    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const isTomorrow = sameDay(date, tomorrow);

    const timeOnly = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    if (isScheduled) {
        if (isToday) return timeOnly; // today → only time
        if (isTomorrow) return `Tomorrow ${timeOnly}`; // tomorrow → Tomorrow + time

        // This week → weekday + time
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay()); // Sunday
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);

        if (date >= weekStart && date <= weekEnd) {
            const weekDay = date.toLocaleDateString("en-US", { weekday: "long" });
            return `${weekDay} ${timeOnly}`;
        }

        // fallback → full date + time
        return date.toLocaleString("en-US", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    }

    // --- If it's a finished/live match ---
    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";
    if (isTomorrow) return "Tomorrow";

    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    if (date >= weekStart && date <= weekEnd) {
        return date.toLocaleDateString("en-US", { weekday: "long" });
    }

    return date.toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};




export const groupMatchesByDate = (matches: any) => {
    if (!matches || !Array.isArray(matches)) return {};
    const sortedMatches = [...matches].sort((a, b) => {
        if (!a.matchTime || !b.matchTime) return 0;
        return new Date(a.matchTime).getTime() - new Date(b.matchTime).getTime();
    });


    const grouped = sortedMatches.reduce((grouped, match) => {
        if (!match || !match.matchTime) return grouped;

        try {
            const matchDate = new Date(match.matchTime);
            const dateKey = matchDate.toDateString();

            if (!grouped[dateKey]) {
                grouped[dateKey] = [];
            }

            grouped[dateKey].push(match);
            return grouped;
        } catch (error) {
            console.error('Error processing match date:', error);
            return grouped;
        }
    }, {});

    const sortedKeys = Object.keys(grouped).sort((a: any, b: any) => {
        return new Date(a).getTime() - new Date(b).getTime();
    });

    const sortedGrouped: any = {};
    sortedKeys.forEach(key => {
        sortedGrouped[key] = grouped[key];
    });

    return sortedGrouped;
};

export const groupMatchesByTournament = (matches: any, selectedDate: any) => {
    const grouped: any = {};

    matches.forEach((m: any) => {
        const matchDate = new Date(m.matchTime).toDateString();
        if (matchDate !== selectedDate) return;

        const tournamentName = m.tournamentSeason?.name || "Other";
        if (!grouped[tournamentName]) grouped[tournamentName] = [];
        grouped[tournamentName].push(m);
    });

    return grouped;
};

export const formatDateDisplay = (date: any) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if the date is today, tomorrow, or yesterday
    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
        return 'Tomorrow';
    } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    } else {
        // Format as "MMM DD" (e.g., "Aug 23")
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    }
};

