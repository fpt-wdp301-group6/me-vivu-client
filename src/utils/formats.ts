import slugifyReact from 'slugify';

const date = (value: string | Date = '') => {
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

const time = (value: string) => {
    const date = new Date(value);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};

const dayWeek = (date: string | Date) => {
    const daysOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];

    const today = new Date();
    const inputDate = new Date(date);

    let dayOfWeek = daysOfWeek[inputDate.getDay()];

    if (today.toDateString() === inputDate.toDateString()) {
        dayOfWeek = 'Hôm nay';
    }

    const options: Intl.DateTimeFormatOptions = {
        month: '2-digit',
        day: '2-digit',
    };

    return `${dayOfWeek}, ${inputDate.toLocaleDateString('vi-VN', options)}`;
};

const price = (price: number, discount: number = 0): string => {
    const finalPrice = price - price * discount * 100;
    return finalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

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

const formats = { date, time, dayWeek, price, slugify, genre };

export default formats;
