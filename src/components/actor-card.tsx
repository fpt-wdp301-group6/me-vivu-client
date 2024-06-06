import React, { FC } from 'react';
import MovieImage from './movie-image';
import { CastOrCrew } from '@/types/actor';

interface ActorCardProp {
    cast: CastOrCrew;
}

const ActorCard: FC<ActorCardProp> = ({ cast }) => {
    return (
        <div key={cast.id} className="w-40">
            <MovieImage
                src={`_bestv2/${cast?.profile_path}`}
                alt="Thumbnail_Img"
                width={300}
                height={450}
                className="aspect-poster w-full cursor-pointer"
            />
            <p className="text-xs mt-2">{cast.name}</p>
        </div>
    );
};

export default ActorCard;
