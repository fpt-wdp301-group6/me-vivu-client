'use client';
import { FC } from 'react';
import { fetcher } from '@/configs/tmdb';
import useSWR from 'swr';
import Movie from '@/types/movie';
import MovieCard, { MovieCardSkeleton } from './movie-card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Fab } from '@mui/material';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import clsx from 'clsx';

interface MovieCarouselProps {
    url: string;
    heading: string;
    id?: string;
    className?: string;
}

const MovieCarousel: FC<MovieCarouselProps> = ({ url, heading, className, id = '' }) => {
    const { data, isLoading, error } = useSWR(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    const navButtonStyles = 'absolute top-1/2 -translate-y-1/2 transition-opacity max-md:hidden';

    return (
        <div id={id} className={clsx('relative', className)}>
            <h2 className="text-xl font-semibold mb-5">{heading}</h2>
            {!error && (
                <>
                    <Swiper
                        modules={[Navigation]}
                        slidesPerView={1.5}
                        spaceBetween={10}
                        slidesPerGroupSkip={1}
                        navigation={{
                            prevEl: `#${id}-prev`,
                            nextEl: `#${id}-next`,
                            enabled: false,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2.5,
                                spaceBetween: 10,
                                slidesPerGroup: 1,
                                navigation: { enabled: true },
                            },
                            768: {
                                slidesPerView: 3.5,
                                spaceBetween: 15,
                                slidesPerGroup: 1,
                                navigation: { enabled: true },
                            },
                            1024: {
                                slidesPerView: 4.5,
                                spaceBetween: 20,
                                slidesPerGroup: 1,
                                navigation: { enabled: true },
                            },
                            1280: {
                                slidesPerView: 5.5,
                                spaceBetween: 25,
                                slidesPerGroup: 1,
                                navigation: { enabled: true },
                            },
                        }}
                    >
                        {isLoading
                            ? Array.from({ length: 6 }).map((_, index) => (
                                  <SwiperSlide key={index}>
                                      <MovieCardSkeleton />
                                  </SwiperSlide>
                              ))
                            : (data.results as Movie[]).map((movie) => (
                                  <SwiperSlide key={movie.id}>
                                      <MovieCard data={movie} />
                                  </SwiperSlide>
                              ))}
                    </Swiper>
                    <Fab id={`${id}-prev`} size="medium" className={clsx(navButtonStyles, 'left-0 -translate-x-1/2')}>
                        <FaAngleLeft />
                    </Fab>
                    <Fab id={`${id}-next`} size="medium" className={clsx(navButtonStyles, 'right-0 translate-x-1/2')}>
                        <FaAngleRight />
                    </Fab>
                </>
            )}
        </div>
    );
};

export default MovieCarousel;
