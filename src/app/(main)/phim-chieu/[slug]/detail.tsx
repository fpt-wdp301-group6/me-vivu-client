'use client';

import { fetcher } from '@/configs/tmdb';
import { FC } from 'react';
import useSWR from 'swr';

interface DetailProps {
    id: number;
}

const Detail: FC<DetailProps> = ({ id }) => {
    const { data } = useSWR(`/movie/${id}`, fetcher);

    return <div>Detail</div>;
};

export default Detail;
