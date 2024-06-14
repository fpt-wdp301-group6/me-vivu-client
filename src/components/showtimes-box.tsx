'use client';
import { ChangeEvent, useState } from 'react';
import { Paper, Stack } from '@mui/material';
import CityPicker from './city-picker';
import useSWR from 'swr';
import { fetcher } from '@/configs/api';
import Cinema from '@/types/cinema';

const ShowtimesBox = () => {
    const [city, setCity] = useState('48');

    const handleChangeCity = (e: ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    };

    return (
        <Paper>
            <div className="p-4 border-b">
                <CityPicker value={city} onChange={handleChangeCity} />
                <CinemaPicker />
            </div>
            <div className="h-[550px]"></div>
        </Paper>
    );
};

const CinemaPicker = () => {
    const { data } = useSWR('/cinemas', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return (
        <div className="flex items-center gap-4 py-2">
            {data?.data &&
                (data.data as Cinema[]).map((cinema) => (
                    <Stack key={cinema._id} width={64} gap={1} alignItems="center">
                        <div className="p-1">
                            <img src={cinema.logo} alt={cinema.name} className="aspect-square rounded-2xl" />
                        </div>
                        <span className="w-full text-xs text-center truncate">{cinema.name}</span>
                    </Stack>
                ))}
        </div>
    );
};

export default ShowtimesBox;
