'use client';
import { FC } from 'react';
import { fetcher } from '@/configs/tmdb';
import useSWR from 'swr';
import Actor from '@/types/credits';
import { ActorCard } from '@/components';
import { ActorCardSkeleton } from '@/components/actor-card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

interface ActorListProps {
    movieId: number;
}

const ActorList: FC<ActorListProps> = ({ movieId }) => {
    const { data, isLoading } = useSWR<Actor>(`/movie/${movieId}/credits`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return (
        <div>
            <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 4000 }}
                slidesPerView={2}
                spaceBetween={10}
                slidesPerGroupSkip={1}
                breakpoints={{
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                        slidesPerGroup: 1,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 15,
                        slidesPerGroup: 1,
                    },
                }}
            >
                {isLoading
                    ? Array.from({ length: 6 }).map((_, index) => (
                          <SwiperSlide key={index}>
                              <ActorCardSkeleton />
                          </SwiperSlide>
                      ))
                    : data?.cast.map((actor) => (
                          <SwiperSlide key={actor.id}>
                              <ActorCard cast={actor} />
                          </SwiperSlide>
                      ))}
            </Swiper>
        </div>
    );
};

export default ActorList;
