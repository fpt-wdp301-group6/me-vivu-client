'use client';
import { MovieCard } from '@/components';
import { fetcher } from '@/configs/tmdb';
import Movie from '@/types/movie';
import { Button, Container, Stack, TextField } from '@mui/material';
import useSWR from 'swr';

const MoviePager = () => {
    const { data } = useSWR(`/movie/now_playing`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return (
        <Container className="py-20">
            <Stack direction="row" gap={1} alignItems="center" width="100%" maxWidth={500}>
                <TextField className="flex-1" size="small" placeholder="Nhập tên phim" />
                <Button>Tìm kiếm</Button>
            </Stack>
            <div className="grid grid-cols-6 gap-y-6 gap-x-4 mt-12">
                {(data?.results as Movie[])?.map((movie) => (
                    <MovieCard key={movie.id} data={movie} />
                ))}
            </div>
        </Container>
    );
};

export default MoviePager;
