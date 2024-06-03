const date = (value: string | Date) => {
    let date: Date;

    if (typeof value === 'string') {
        date = new Date(value);
    } else {
        date = value;
    }

    if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
    }

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };

    return date.toLocaleDateString('vi-VN', options);
};

const formats = { date };

export default formats;
