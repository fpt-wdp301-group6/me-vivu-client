'use client';

import { FC } from 'react';
import { Metadata } from 'next';
import { fetcher } from '@/configs/tmdb';
import { notFound } from 'next/navigation';
import Detail from './detail';
import CastOrCrew from '@/types/actor';
import useSWR from 'swr';
import Actor from '@/types/actor';
import ActorCard from '@/components/actor-card';

interface ActorListProps {
    id: number;
}

const ActorList: FC<ActorListProps> = ({ id }) => {
    const { data, isLoading } = useSWR<Actor>(`/movie/${id}/credits`, fetcher);
    const topFiveCasts = data?.cast.sort((a, b) => b.popularity - a.popularity).slice(0, 5);
    return (
        <>
            {!isLoading ? (
                <div className="flex gap-3">
                    {topFiveCasts?.map((cast) => (
                        <ActorCard key={cast.id} cast={cast} />
                    ))}
                </div>
            ) : (
                <div>Is Loading</div>
            )}
        </>
    );
};

export default ActorList;
