'use client';
import { MovieImage, ReadMore } from '@/components';
import Genre from '@/types/genre';
import Movie from '@/types/movie';
import { constants, formats } from '@/utils';
import { Button, Container, IconButton, Stack, Tooltip } from '@mui/material';
import clsx from 'clsx';
import TrailerModal from '../../../../components/trailer-modal';
import { ElementRef, FC, useRef } from 'react';
import { FaRegCirclePlay } from 'react-icons/fa6';
import ActorList from './actor-list';

interface DetailProps {
    data: Movie;
}

const Detail: FC<DetailProps> = ({ data }) => {
    const trailerRef = useRef<ElementRef<typeof TrailerModal>>(null);
    const backdropStyles = 'top-0 left-0 right-0 bottom-0 -z-1 bg-gradient-to-t from-dark to-black/20';

    return (
        <div
            className="bg-cover"
            style={{
                backgroundImage: `url(${constants.tmdbUrl}/original/${data.backdrop_path})`,
            }}
        >
            <div className={clsx(backdropStyles)}>
                <Container>
                    <div className="min-h-screen flex items-center">
                        <div className="grid grid-cols-5 max-w-screen-md mx-auto gap-6">
                            <div className="col-span-2">
                                <div className="relative max-md:hidden">
                                    <MovieImage
                                        src={`_bestv2/${data.poster_path}`}
                                        alt={data.title}
                                        width={300}
                                        height={450}
                                        className="w-full aspect-poster object-cover rounded-3xl"
                                    />
                                    <Tooltip title="Xem trailer">
                                        <IconButton
                                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                            color="inherit"
                                            onClick={() => trailerRef.current?.openModal()}
                                        >
                                            <FaRegCirclePlay size={40} />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="col-span-full md:col-span-3">
                                <Stack gap={2}>
                                    <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl pt-4">{data.title}</h1>
                                    <div className="flex flex-wrap gap-2">
                                        {data.genres.map((genre: Genre) => (
                                            <Button key={genre.id} variant="outlined" color="secondary" size="small">
                                                {formats.genre(genre.name)}
                                            </Button>
                                        ))}
                                    </div>
                                    <ReadMore className="text-sm">{data.overview}</ReadMore>
                                    <h4 className="font-bold text-xl mt-4">Diễn Viên</h4>
                                    <ActorList movieId={data.id} />
                                </Stack>
                            </div>
                        </div>
                    </div>
                    <TrailerModal movie={data} ref={trailerRef} />
                </Container>
            </div>
        </div>
    );
};

export default Detail;
