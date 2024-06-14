import Cinema from './cinema';

interface Theater {
    _id: string;
    cinema: Cinema;
    name: string;
    description: string;
}

export default Theater;
