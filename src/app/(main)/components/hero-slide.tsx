'use client';
import { fetcher } from '@/configs/tmdb';
import { Swiper, SwiperSlide } from 'swiper/react';
import Movie from '@/types/movie';
import { Autoplay, Pagination } from 'swiper/modules';
import useSWR from 'swr';
import SlideItem from './slide-item';
import { Skeleton } from '@mui/material';

const HeroSlide = () => {
    const { data, isLoading, error } = useSWR('/movie/now_playing?region=VN', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return (
        <section>
            {!error && (
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    loop
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 5_000, disableOnInteraction: false }}
                    pagination={{
                        clickable: true,
                    }}
                >
                    {isLoading ? (
                        <SwiperSlide>
                            <Skeleton animation="wave" variant="rectangular" width="100vw" height="100vh" />
                        </SwiperSlide>
                    ) : (
                        Array.from(data.results as Movie[])
                            .sort((a, b) => b.vote_average - a.vote_average)
                            .slice(0, 10)
                            .map((movie) => (
                                <SwiperSlide key={movie.id}>
                                    <SlideItem data={movie} />
                                </SwiperSlide>
                            ))
                    )}
                </Swiper>
            )}
        </section>
    );
};

export default HeroSlide;
