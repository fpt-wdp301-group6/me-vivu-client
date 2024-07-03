interface Showtime {
    _id: string;
    movieId: string;
    room: {
        _id: string;
        name: string;
        seats: string[];
    };
    reservedSeats: string;
    startAt: string;
    endAt: string;
}

export default Showtime;
