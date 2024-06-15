'use client';
import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import clsx from 'clsx';

type DateItem = {
    value: Date;
    label: string;
};

const getWeekdayLabel = (day: number): string => {
    const weekdays = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    return weekdays[day];
};

const generateDates = (): DateItem[] => {
    const today = new Date();
    const dates: DateItem[] = [];

    for (let i = 0; i < 8; i++) {
        const currentDate = new Date();
        currentDate.setDate(today.getDate() + i);

        dates.push({
            value: currentDate,
            label: i === 0 ? 'Hôm nay' : getWeekdayLabel(currentDate.getDay()),
        });
    }

    return dates;
};

interface DateChooserProps {
    value?: Date;
    onChange?: (date: Date) => void;
}

const DateChooser: FC<DateChooserProps> = ({ value = new Date(), onChange }) => {
    const dates = generateDates();

    const handleClick = (date: Date) => {
        onChange?.(date);
    };

    return (
        <div className="py-3 px-4">
            <Swiper spaceBetween={10} slidesPerView="auto">
                {dates.map((date, index) => {
                    const isSelected = value.toDateString() === date.value.toDateString();
                    return (
                        <SwiperSlide key={index} className="w-16">
                            <div
                                className={clsx(
                                    'border rounded-lg text-center overflow-hidden cursor-pointer transition',
                                    {
                                        'border-primary': isSelected,
                                    },
                                )}
                                onClick={() => handleClick(date.value)}
                            >
                                <div
                                    className={clsx(
                                        'text-lg leading-9 transition',
                                        isSelected ? 'bg-primary' : 'bg-gray-600',
                                    )}
                                >
                                    {date.value.getDate()}
                                </div>
                                <div
                                    className={clsx('text-xs leading-6 transition', {
                                        'text-primary font-medium': isSelected,
                                    })}
                                >
                                    {date.label}
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default DateChooser;
