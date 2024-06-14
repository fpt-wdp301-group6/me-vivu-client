'use client';
import { ChangeEvent, useState } from 'react';
import { Paper } from '@mui/material';
import CityPicker from '../city-picker';
import CinemaPicker from './cinema-picker';
import TheaterList from './theater-list';

const ShowtimesBox = () => {
    const [city, setCity] = useState('48');
    const [cinema, setCinema] = useState<string | null>(null);

    const handleChangeCity = (e: ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    };

    const handleChangeCinema = (value: string | null) => {
        setCinema(value);
    };

    return (
        <Paper>
            <div className="p-4 border-b">
                <CityPicker value={city} onChange={handleChangeCity} />
                <CinemaPicker value={cinema} onChange={handleChangeCinema} />
            </div>
            <div className="grid grid-cols-3">
                <div className="col-span-1 border-r">
                    <TheaterList city={city} cinema={cinema} />
                </div>
                <div className="col-span-2"></div>
            </div>
        </Paper>
    );
};

export default ShowtimesBox;
