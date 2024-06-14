'use client';
import { ChangeEvent, ChangeEventHandler, FC, SyntheticEvent, useMemo } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import useSWR from 'swr';
import { fetcher } from '@/configs/api';
import { City } from '@/types/address';

interface CityPickerProps {
    value?: string;
    onChange?: ChangeEventHandler;
}

const CityPicker: FC<CityPickerProps> = ({ value = '48', onChange }) => {
    const { data } = useSWR<City[]>('/address/cities?sort=name', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    const selectedValue = useMemo(() => {
        const result = data?.find((city) => city.code === value);
        return result || null;
    }, [data, value]);

    const handleChange = (event: SyntheticEvent<Element, Event>, newValue: City | null) => {
        if (onChange) {
            const mockEvent = {
                ...event,
                target: {
                    ...event.target,
                    value: newValue?.code || '',
                },
            } as ChangeEvent<HTMLInputElement>;

            onChange(mockEvent);
        }
    };

    return (
        <Autocomplete
            disablePortal
            id="city-picker"
            options={data || []}
            sx={{ width: 300 }}
            value={selectedValue}
            onChange={handleChange}
            getOptionKey={(city) => city._id}
            getOptionLabel={(city) => city.name}
            isOptionEqualToValue={(city, value) => city.code === value.code}
            renderInput={(params) => <TextField {...params} label="Vị trí" />}
        />
    );
};

export default CityPicker;
