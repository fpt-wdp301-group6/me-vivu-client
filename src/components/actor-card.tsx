import React, { FC } from 'react';
import MovieImage from './movie-image';
import { CastOrCrew } from '@/types/credits';
import { Skeleton, Stack } from '@mui/material';
import Image from 'next/image';

interface ActorCardProp {
    cast: CastOrCrew;
}

const ActorCard: FC<ActorCardProp> = ({ cast }) => {
    return (
        <Stack gap={1} alignItems="center">
            {cast.profile_path ? (
                <MovieImage
                    src={`_bestv2/${cast.profile_path}`}
                    alt={cast.name}
                    width={300}
                    height={450}
                    className="aspect-poster w-full"
                />
            ) : (
                <Image
                    src="/images/no-avatar.png"
                    alt={cast.name}
                    width={300}
                    height={450}
                    className="aspect-poster w-full object-cover"
                />
            )}
            <h6 className="text-sm text-center line-clamp-2">{cast.name}</h6>
            <span className="text-xs text-center text-gray-400 line-clamp-2">{cast.character}</span>
        </Stack>
    );
};

export const ActorCardSkeleton = () => {
    return (
        <Stack gap={1} alignItems="center">
            <div className="w-full aspect-poster">
                <Skeleton animation="wave" variant="rectangular" width="100%" height="100%" />
            </div>
            <Skeleton animation="wave" variant="text" width="70%" />
            <Skeleton animation="wave" variant="text" width="50%" />
        </Stack>
    );
};

export default ActorCard;
