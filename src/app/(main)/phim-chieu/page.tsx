import { Metadata } from 'next';
import MoviePager from './movie-pager';

export const metadata: Metadata = {
    title: 'Phim chiếu',
    description: 'Tổng hợp các phim đang và sắp được công chiếu trên toàn thế giới',
};

const MovieList = () => {
    return (
        <>
            <div
                className="relative h-48 font-semibold bg-no-repeat bg-cover"
                style={{ backgroundImage: 'url(/images/backgrounds/footer-bg.jpg)' }}
            >
                <h1 className="absolute text-2xl -translate-x-1/2 bottom-8 left-1/2">Phim chiếu</h1>
            </div>
            <MoviePager />
        </>
    );
};

export default MovieList;
