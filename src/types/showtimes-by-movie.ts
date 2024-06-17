import Movie from './movie';
import Showtime from './showtime';

interface ShowtimesByMovie {
    movie: Movie;
    showtimes: Showtime[];
}

export default ShowtimesByMovie;
