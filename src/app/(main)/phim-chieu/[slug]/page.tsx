import { FC } from 'react';
import { Metadata } from 'next';
import { fetcher } from '@/configs/tmdb';
import { notFound } from 'next/navigation';
import Detail from './detail';
import Movie from '@/types/movie';

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

    // TODO: lấy movie ở đây để làm lại
    return (
        <div>
            <Detail data={movie} />
        </div>
    );
};

export default MovieDetail;
