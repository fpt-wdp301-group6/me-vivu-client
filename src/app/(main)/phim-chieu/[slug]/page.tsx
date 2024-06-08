import { FC } from 'react';
import { Metadata } from 'next';
import { fetcher } from '@/configs/tmdb';
import { notFound } from 'next/navigation';
import Detail from './detail';
import Movie from '@/types/movie';
import { Container } from '@mui/material';
import { MovieCarousel } from '@/components';

interface MovieDetailProps {
    params: { slug: string };
}

const getMovieById = async (id: number): Promise<Movie> => {
    try {
        const data = await fetcher(`/movie/${id}`);
        if (!data) {
            return notFound();
        }
        return data;
    } catch {
        return notFound();
    }
};

export async function generateMetadata({ params }: MovieDetailProps): Promise<Metadata> {
    const slugSplit = params.slug.split('-');
    const movieId = Number(slugSplit[slugSplit.length - 1]);
    const movie = await getMovieById(movieId);
    return {
        title: movie.title,
    };
}

const MovieDetail: FC<MovieDetailProps> = async ({ params }) => {
    const slugSplit = params.slug.split('-');
    const movieId = Number(slugSplit[slugSplit.length - 1]);
    const movie = await getMovieById(movieId);

    return (
        <>
            <Detail data={movie} />
            <Container className="py-20">
                <MovieCarousel
                    url={`/movie/${movie.id}/similar`}
                    heading="Có thể bạn sẽ thích"
                    id="upcoming"
                    className="mb-12"
                />
            </Container>
        </>
    );
};

export default MovieDetail;
