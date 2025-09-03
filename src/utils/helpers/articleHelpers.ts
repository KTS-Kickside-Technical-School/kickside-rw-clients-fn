export const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${formattedDate} at ${hours}h:${minutes}`;
};


export const formatDateToCustomString = (dateInput: string) => {
    const date = new Date(dateInput);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    const formattedMinute = minute < 10 ? `0${minute}` : minute;

    const getDaySuffix = (day: number) => {
        if (day > 3 && day < 21) return `${day}th`;
        switch (day % 10) {
            case 1: return `${day}st`;
            case 2: return `${day}nd`;
            case 3: return `${day}rd`;
            default: return `${day}th`;
        }
    };

    return `${getDaySuffix(day)} ${month} ${year} at ${formattedHour}:${formattedMinute} ${period}`;
}

export const getGreeting = (name: string) => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
        return `Good morning, ${name}!`;
    } else if (currentHour < 18) {
        return `Good afternoon, ${name}!`;
    } else {
        return `Good evening, ${name}!`;
    }
};

export const formatDistanceToNowKinyarwanda = (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return `Hashize amasogonda ${diffInSeconds} `;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `Hashize iminota ${diffInMinutes} `;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `Hashize amasaha ${diffInHours} `;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
        return `Hashize iminsi ${diffInDays} `;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
        return `Hashize ibyumweru ${diffInWeeks} `;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        return `Hashize amezi ${diffInMonths} `;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `Hashize imyaka ${diffInYears} `;
};
