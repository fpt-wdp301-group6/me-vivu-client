'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import { MovieCard } from '@/components';
import { MovieCardSkeleton } from '@/components/movie-card';
import { fetcher } from '@/configs/tmdb';
import { useDebounce } from '@/hooks';
import useSWR from 'swr';
import Movie from '@/types/movie';
import { Container, InputAdornment, Pagination, TextField } from '@mui/material';
import { CiSearch } from 'react-icons/ci';

const MoviePager = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState<string>();
    const searchContent = useDebounce(search, 300);
    const url = searchContent
        ? `/search/movie?query=${searchContent}&region=VN&page=${page}`
        : `/movie/upcoming?page=${page}`;
    const { data, isLoading } = useSWR(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (!value.startsWith(' ')) {
            setPage(1);
            setSearch(value);
        }
    };

    useEffect(() => {
        if (data && data.total_pages !== totalPages) {
            setTotalPages(data.total_pages);
        }
    }, [data, totalPages]);

    return (
        <Container className="py-20">
            <TextField
                className="w-full max-w-[400px]"
                size="small"
                placeholder="Nhập tên phim"
                value={search}
                onChange={handleSearch}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <CiSearch size={24} />
                        </InputAdornment>
                    ),
                }}
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-y-6 gap-x-4 mt-12">
                {isLoading
                    ? Array.from({ length: 20 }).map((_, index) => <MovieCardSkeleton key={index} />)
                    : (data?.results as Movie[])?.map((movie) => <MovieCard key={movie.id} data={movie} />)}
            </div>
            <div className="flex justify-center mt-12">
                {totalPages > 20 && (
                    <Pagination page={page} onChange={handleChangePage} count={totalPages} color="primary" />
                )}
            </div>
        </Container>
    );
};

export default MoviePager;
