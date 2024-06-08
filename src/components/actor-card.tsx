import React, { FC } from 'react';
import MovieImage from './movie-image';
import { CastOrCrew } from '@/types/credits';
import { Stack } from '@mui/material';

interface ActorCardProp {
    cast: CastOrCrew;
}

const ActorCard: FC<ActorCardProp> = ({ cast }) => {
    return (
        <Stack key={cast.id} gap={1} alignItems="center">
            <MovieImage
                src={`_bestv2/${cast.profile_path}`}
                alt={cast.name}
                width={300}
                height={450}
                className="aspect-poster w-full"
            />
            <h6 className="text-sm text-center line-clamp-2">{cast.name}</h6>
            <span className="text-xs text-center text-gray-400 line-clamp-2">{cast.character}</span>
        </Stack>
    );
};

export default ActorCard;
