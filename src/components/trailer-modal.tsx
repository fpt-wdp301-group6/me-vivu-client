'use client';
import { FC, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Button, Modal, Skeleton, Stack } from '@mui/material';
import Movie from '@/types/movie';
import MovieImage from './movie-image';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import { fetcher } from '@/configs/tmdb';
import ReadMore from './read-more';

interface TrailerModalProps {
    movie: Movie;
}

interface TrailerModalRefs {
    openModal: () => void;
    closeModal: () => void;
}

const TrailerModal = forwardRef<TrailerModalRefs, TrailerModalProps>(({ movie }, refs) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useImperativeHandle(refs, () => ({
        openModal: handleOpen,
        closeModal: handleClose,
    }));

    return (
        <Modal open={open} onClose={handleClose}>
            <TrailerModalContent movie={movie} onClose={handleClose} />
        </Modal>
    );
});

TrailerModal.displayName = 'TrailerModal';

const variants = {
    initial: {
        y: 500,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.75,
        },
    },
};

interface TrailerModalContentProps extends TrailerModalProps {
    onClose: () => void;
}

const TrailerModalContent: FC<TrailerModalContentProps> = ({ movie, onClose }) => {
    const { data, isLoading } = useSWR(`/movie/${movie.id}/videos`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    const [fallbackData, setFallbackData] = useState<any>(null);
    const [isFetchingFallback, setIsFetchingFallback] = useState(false);

    useEffect(() => {
        if (!isLoading && data && (!data.results || data.results.length === 0) && !isFetchingFallback) {
            setIsFetchingFallback(true);
            fetcher(`/movie/${movie.id}/videos?language=en-US`)
                .then((fallbackResponse) => {
                    setFallbackData(fallbackResponse);
                    setIsFetchingFallback(false);
                })
                .catch(() => {
                    setIsFetchingFallback(false);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, data, movie.id]);

    const video = data?.results[0] || fallbackData?.results[0];

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-192 max-w-full px-3">
            <motion.div
                variants={variants}
                initial="initial"
                whileInView="animate"
                className="bg-dark text-white rounded-lg overflow-hidden"
            >
                <div className="aspect-video">
                    {!isLoading && !isFetchingFallback ? (
                        video ? (
                            <iframe
                                width="100%"
                                className="aspect-video w-full"
                                src={`https://www.youtube.com/embed/${video.key}?autoplay=1`}
                                title={video.name}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        ) : (
                            <span>Không có trailer</span>
                        )
                    ) : (
                        <Skeleton animation="wave" variant="rectangular" width="100%" height="100%" />
                    )}
                </div>
                <div className="flex items-center gap-5 px-6 py-4">
                    <div className="w-20 flex-shrink-0">
                        <MovieImage
                            className="rounded-xl aspect-poster"
                            src={`_face${movie.poster_path}`}
                            alt={movie.title || ''}
                            width={220}
                            height={330}
                        />
                    </div>
                    <Stack gap={1}>
                        <h3 className="text-xl font-semibold">{movie.title}</h3>
                        <ReadMore className="text-sm">{movie.overview}</ReadMore>
                        <Stack direction="row" gap={1}>
                            <Button>Đặt vé</Button>
                            <Button color="secondary" onClick={onClose}>
                                Đóng
                            </Button>
                        </Stack>
                    </Stack>
                </div>
            </motion.div>
        </div>
    );
};

export default TrailerModal;
