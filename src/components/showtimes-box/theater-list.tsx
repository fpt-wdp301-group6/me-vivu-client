'use client';
import { fetcher } from '@/configs/api';
import { useBooking, useDebounce } from '@/hooks';
import Theater from '@/types/theater';
import { Divider, InputAdornment, ListItemIcon, ListItemText, MenuItem, MenuList, TextField } from '@mui/material';
import Image from 'next/image';
import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import useSWR from 'swr';
import LoadingOverlay from '../loading-overlay';
import SimpleBar from 'simplebar-react';

interface TheaterListProps {
    cinema?: string | null;
    city?: string;
}

const TheaterList: FC<TheaterListProps> = ({ cinema, city }) => {
    const [search, setSearch] = useState<string>();
    const searchContent = useDebounce(search, 300);
    const { setTheater } = useBooking();

    const url = useMemo(() => {
        const params = new URLSearchParams();
        params.append('sort', 'name');

        if (searchContent) {
            params.append('search', searchContent);
        }
        if (cinema) {
            params.append('cinema', cinema);
        }
        if (city) {
            params.append('address.city', city);
        }

        return `/theaters?${params.toString()}`;
    }, [searchContent, cinema, city]);

    const { data, isLoading } = useSWR(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    useEffect(() => {
        if (data && data.data.length > 0) handleChange(data.data[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (!value.startsWith(' ')) {
            setSearch(value);
        }
    };

    const handleChange = (theater: Theater) => {
        setTheater(theater);
    };

    return (
        <div className="flex flex-col h-[550px]">
            <div className="p-3">
                <TextField
                    placeholder="Tìm theo tên rạp ..."
                    fullWidth
                    size="small"
                    value={search}
                    onChange={handleSearch}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <CiSearch size={24} />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <Divider />
            <SimpleBar className="relative flex-1 overflow-clip" forceVisible="x">
                {isLoading && !data ? (
                    <LoadingOverlay />
                ) : (
                    <MenuList disablePadding>
                        {data?.data.map((theater: Theater) => (
                            <MenuItem className="py-2" key={theater._id} onClick={() => handleChange(theater)}>
                                <ListItemIcon>
                                    <Image
                                        src={theater.cinema.logo}
                                        alt={theater.name}
                                        className="aspect-square rounded-xl size-9"
                                        width={50}
                                        height={50}
                                    />
                                </ListItemIcon>
                                <ListItemText>
                                    <span className="ml-2">{theater.name}</span>
                                </ListItemText>
                            </MenuItem>
                        ))}
                    </MenuList>
                )}
            </SimpleBar>
        </div>
    );
};

export default TheaterList;
