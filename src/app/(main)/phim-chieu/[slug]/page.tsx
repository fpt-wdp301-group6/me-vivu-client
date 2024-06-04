import { FC } from 'react';
import Detail from './detail';
import { Metadata } from 'next';
import { fetcher } from '@/configs/tmdb';

interface MovieDetailProps {
    params: { slug: string };
}

export async function generateMetadata({ params }: MovieDetailProps): Promise<Metadata> {
    const slugSplit = params.slug.split('-');
    const movieId = Number(slugSplit[slugSplit.length - 1]);

    const movie = await fetcher(`/movie/${movieId}`);

    return {
        title: movie.title,
    };
}

const MovieDetail: FC<MovieDetailProps> = ({ params }) => {
    const slugSplit = params.slug.split('-');
    const movieId = Number(slugSplit[slugSplit.length - 1]);

    return (
        <div>
            <Detail id={movieId} />
        </div>
    );
};

export default MovieDetail;
