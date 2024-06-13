import Genre from './genre';

interface Movie {
    id: number;
    adult: boolean;
    backdrop_path: string;
    title: string;
    overview: string;
    release_date?: string;
    vote_average?: number;
    vote_count: number;
    poster_path: string;
    genres: Genre[];
}

export default Movie;
