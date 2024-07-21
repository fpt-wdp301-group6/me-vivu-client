import Movie from './movie';

interface Showtime {
    _id: string;
    movieId: string;
    room: {
        _id: string;
        name: string;
        seats: string[];
    };
    price: {
        normal: number;
        vip: number;
        couple: number;
    };
    movie?: Movie;
    reservedSeats: string;
    startAt: string;
    endAt: string;
}

export default Showtime;
