'use client';
import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetcher } from '@/configs/api';
import useSWR from 'swr';
import Cinema from '@/types/cinema';
import Image from 'next/image';
import clsx from 'clsx';

interface CinemaPickerProps {
    value?: string | null;
    // eslint-disable-next-line no-unused-vars
    onChange?: (value: string | null) => void;
}

const CinemaPicker: FC<CinemaPickerProps> = ({ value = null, onChange }) => {
    const { data } = useSWR('/cinemas', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    const handleClick = (value: string | null) => {
        onChange?.(value);
    };

    return (
        <div className="py-2">
            <Swiper slidesPerView="auto" spaceBetween={20}>
                <SwiperSlide className="w-16">
                    <div className="flex flex-col gap-2 cursor-pointer">
                        <div
                            className={clsx(
                                'p-1 rounded-xl border transition-all',
                                null === value ? 'border-primary' : 'border-transparent',
                            )}
                            onClick={() => handleClick(null)}
                        >
                            <Image
                                src="https://homepage.momocdn.net/next-js/_next/static/public/cinema/dexuat-icon.svg"
                                alt="Tất cả"
                                className="aspect-square rounded-xl"
                                width={200}
                                height={200}
                            />
                        </div>
                        <span
                            className={clsx('w-full text-xs text-center truncate', {
                                'font-medium text-primary': null === value,
                            })}
                        >
                            Tất cả
                        </span>
                    </div>
                </SwiperSlide>
                {data?.data &&
                    (data.data as Cinema[]).map((cinema) => (
                        <SwiperSlide key={cinema._id} className="w-16">
                            <div className="flex flex-col gap-2 cursor-pointer">
                                <div
                                    className={clsx(
                                        'p-1 rounded-xl border transition-all',
                                        cinema._id === value ? 'border-primary' : 'border-transparent',
                                    )}
                                    onClick={() => handleClick(cinema._id)}
                                >
                                    <Image
                                        src={cinema.logo}
                                        alt={cinema.name}
                                        className="aspect-square rounded-xl"
                                        width={200}
                                        height={200}
                                    />
                                </div>
                                <span
                                    className={clsx('w-full text-xs text-center truncate', {
                                        'font-medium text-primary': cinema._id === value,
                                    })}
                                >
                                    {cinema.name}
                                </span>
                            </div>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
};

export default CinemaPicker;
