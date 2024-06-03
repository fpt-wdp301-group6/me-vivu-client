import { FC } from 'react';
import Detail from './detail';

interface MovieDetailProps {
    params: { slug: string };
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
