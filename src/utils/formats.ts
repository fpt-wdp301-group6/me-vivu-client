const date = (value: string | Date) => {
    let date: Date;

    if (typeof value === 'string') {
        date = new Date(value);
    } else {
        date = value;
    }

    if (isNaN(date.getTime())) {
        return '';
    }

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };

    return date.toLocaleDateString('vi-VN', options);
};

import slugifyReact from 'slugify';

const slugify = (value: string) => {
    return slugifyReact(value, {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true,
        strict: false,
        locale: 'vi',
        trim: true,
    });
};

const genre = (value: string) => {
    if (value.trim().startsWith('Phim')) {
        const words = value.split(' ');
        words.shift();
        return words.join(' ');
    }
    return value;
};

const formats = { date, slugify, genre };

export default formats;
