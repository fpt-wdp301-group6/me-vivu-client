'use client';
import { constants } from '@/utils';
import Image, { ImageLoader, ImageProps } from 'next/image';
import { FC } from 'react';

const loader: ImageLoader = ({ src }) => {
    return `${constants.tmdbUrl}/${src}`;
};

const MovieImage: FC<ImageProps> = ({ src, alt, width, height, quality, ...props }) => {
    return (
        <Image
            loader={loader}
            src={`/w${width}_and_h${height}${src}`}
            alt={alt}
            width={width}
            height={height}
            quality={quality}
            {...props}
        />
    );
};

export default MovieImage;
