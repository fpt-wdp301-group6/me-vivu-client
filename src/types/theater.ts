import Cinema from './cinema';

interface Theater {
    _id: string;
    cinema: Cinema;
    name: string;
    description: string;
    address: {
        city: string;
        district: string;
        ward: string;
        street: string;
        detail: string;
    };
}

export default Theater;
