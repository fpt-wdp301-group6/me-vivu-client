'use client';
import { ElementRef, FC, useRef } from 'react';
import { MovieImage, ReadMore, TrailerModal } from '@/components';
import Movie from '@/types/movie';
import { constants } from '@/utils';
import { Button, Container } from '@mui/material';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const textVariants = {
    initial: {
        y: 100,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.75,
            staggerChildren: 0.5,
        },
    },
};

const imageVariants = {
    initial: {
        opacity: 0,
        transform: 'scale(0)',
    },
    animate: {
        opacity: 1,
        transform: 'scale(100%)',
        transition: {
            duration: 0.5,
        },
    },
};

interface SlideItemProps {
    data: Movie;
}

const SlideItem: FC<SlideItemProps> = ({ data }) => {
    const backdropStyles = 'absolute top-0 left-0 right-0 bottom-0 -z-1 bg-gradient-to-t from-dark to-black/20';
    const trailerRef = useRef<ElementRef<typeof TrailerModal>>(null);

    return (
        <div
            className="relative h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url(${constants.tmdbUrl}/original/${data.backdrop_path})`,
            }}
        >
            <TrailerModal movie={data} ref={trailerRef} />
            <div className={clsx('flex items-center', backdropStyles)}>
                <Container>
                    <div className="flex items-center gap-8">
                        <motion.div
                            className="flex flex-col gap-8 flex-1"
                            variants={textVariants}
                            initial="initial"
                            whileInView="animate"
                        >
                            <motion.h2 className="text-6xl font-bold" variants={textVariants}>
                                {data.title}
                            </motion.h2>
                            <motion.div variants={textVariants}>
                                <ReadMore>{data.overview}</ReadMore>
                            </motion.div>
                            <motion.div className="flex gap-4" variants={textVariants}>
                                <Button size="large">Đặt vé ngay</Button>
                                <Button
                                    size="large"
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => trailerRef.current?.openModal()}
                                >
                                    Xem trailer
                                </Button>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            className="flex-shrink-0 w-[300px] max-md:hidden"
                            variants={imageVariants}
                            initial="initial"
                            whileInView="animate"
                        >
                            <MovieImage
                                src={`_bestv2${data.poster_path}`}
                                alt={data.title}
                                width={300}
                                height={450}
                                className="rounded-3xl shadow-md"
                            />
                        </motion.div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default SlideItem;
