'use client';
import { FC } from 'react';
import { fetcher } from '@/configs/tmdb';
import useSWR from 'swr';
import Movie from '@/types/movie';
import MovieCard, { MovieCardSkeleton } from './movie-card';
import { Swiper, SwiperSlide } from 'swiper/react';

interface MovieCarouselProps {
    url: string;
    heading: string;
    className?: string;
}

const MovieCarousel: FC<MovieCarouselProps> = ({ url, heading, className }) => {
    const { data, isLoading, error } = useSWR(url, fetcher);

    return (
        <div className={className}>
            <h2 className="text-xl font-semibold mb-5">{heading}</h2>
            {!error && (
                <Swiper
                    slidesPerView={1.5}
                    spaceBetween={10}
                    breakpoints={{
                        640: {
                            slidesPerView: 2.5,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 3.5,
                            spaceBetween: 15,
                        },
                        1024: {
                            slidesPerView: 4.5,
                            spaceBetween: 20,
                        },
                        1280: {
                            slidesPerView: 5.5,
                            spaceBetween: 25,
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
            )}
        </div>
    );
};

export default MovieCarousel;
