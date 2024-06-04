'use client';

import { Link } from '@mui/material';
import { FC, useState } from 'react';

interface ReadMoreProps {
    children: Readonly<string>;
    className?: string;
}

const ReadMore: FC<ReadMoreProps> = ({ children, className }) => {
    const text = children;
    const initReadMore = text.length > 255;
    const [isReadMore, setIsReadMore] = useState(initReadMore);

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    return (
        <p className={className}>
            {isReadMore ? text.slice(0, 255) + '...' : text}
            {initReadMore && (
                <Link href="#" className="text-primary font-medium ml-1" underline="hover" onClick={toggleReadMore}>
                    {isReadMore ? 'Xem thêm' : 'Ẩn bớt'}
                </Link>
            )}
        </p>
    );
};

export default ReadMore;
