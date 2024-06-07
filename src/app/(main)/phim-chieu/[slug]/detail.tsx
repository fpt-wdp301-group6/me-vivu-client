'use client';

import { MovieCarousel, MovieImage, ReadMore } from '@/components';
import Genre from '@/types/genre';
import Movie from '@/types/movie';
import { constants } from '@/utils';
import { Container, IconButton, Tooltip } from '@mui/material';
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

    // const topFiveActors = castPeople.filter((person)=>);
    const backdropStyles = 'top-0 left-0 right-0 bottom-0 -z-1 bg-gradient-to-t from-dark to-black/20';
    return (
        <>
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
                                    <div className="relative">
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
                                    <TrailerModal movie={data} ref={trailerRef} />
                                </div>
                                <div className="col-span-3 flex flex-col gap-2">
                                    <h1 className="font-bold text-3xl my-4">{data.title}</h1>
                                    <ul className="flex gap-2 flex-wrap my-4">
                                        {data.genres.map((genre: Genre) => (
                                            <li key={genre.id}>
                                                <button className="px-2 py-1 border rounded-full">
                                                    <span className="text-sm font-medium">{genre.name}</span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    <ReadMore className="text-sm">{data.overview}</ReadMore>
                                    <p className="font-bold text-xl mt-4">Diễn Viên</p>
                                    <ActorList id={data.id} />
                                </div>
                            </div>
                        </div>

                        <TrailerModal movie={data} ref={trailerRef} />
                    </Container>
                </div>
            </div>
            <Container className="py-20">
                <MovieCarousel
                    url={`/movie/${data.id}/similar`}
                    heading="Có thể bạn sẽ thích"
                    id="upcoming"
                    className="mb-12"
                />
            </Container>
        </>
    );
};

export default Detail;
