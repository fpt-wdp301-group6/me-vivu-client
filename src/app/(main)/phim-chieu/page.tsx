import MoviePager from './movie-pager';

const MovieList = () => {
    return (
        <div>
            <div
                className="relative h-48 bg-no-repeat bg-cover font-semibold"
                style={{ backgroundImage: 'url(/images/backgrounds/footer-bg.jpg)' }}
            >
                <h1 className="absolute bottom-8 left-1/2 -translate-x-1/2 text-2xl">Phim chiếu</h1>
            </div>
            <MoviePager />
        </div>
    );
};

export default MovieList;
