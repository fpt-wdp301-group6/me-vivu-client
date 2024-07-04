import { fetcher } from '@/configs/api';
import { useBooking } from '@/hooks';
import { Button, IconButton, Modal } from '@mui/material';
import { FC, useState } from 'react';
import useSWR from 'swr';
import { motion } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import Food from '@/types/food';
import SimpleBar from 'simplebar-react';
import { formats } from '@/utils';
import Image from 'next/image';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import TicketModal from './ticket-modal';

const variants = {
    initial: {
        y: 500,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
};

interface FoodsModalProps {
    open: boolean;
    onClose: () => void;
}

const FoodsModal: FC<FoodsModalProps> = ({ open, onClose }) => {
    const [openModal, setOpenModal] = useState(false);
    const { theater, foods } = useBooking();
    const { data } = useSWR(`/foods/${theater?._id}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const price = foods.reduce((total, food) => (total += food.price * (food.quantity || 0)), 0);

    return (
        <Modal open={open} onClose={onClose}>
            <div className="flex justify-center w-screen h-screen p-8 pointer-events-none">
                <motion.div
                    variants={variants}
                    initial="initial"
                    whileInView="animate"
                    className="w-full overflow-hidden text-white rounded-lg pointer-events-auto bg-dark max-w-[448px]"
                >
                    <div className="flex flex-col h-full">
                        <div className="relative py-3 font-bold text-center bg-primary">
                            <div className="absolute right-0 -translate-x-1/2 -translate-y-1/2 top-1/2">
                                <IconButton onClick={onClose}>
                                    <IoMdClose />
                                </IconButton>
                            </div>
                            Combo - Bắp nước
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <SimpleBar className="h-full">
                                <div className="flex flex-col">
                                    {(data?.data as Food[])?.map((food) => (
                                        <FoodItem key={food._id} data={food} />
                                    ))}
                                </div>
                            </SimpleBar>
                        </div>
                        <div className="p-4 border-t bg-dark">
                            <div className="flex items-center justify-between mb-5">
                                <span className="text-gray-300">Tổng cộng</span>
                                <span className="text-lg font-bold">{formats.price(price)}</span>
                            </div>
                            <Button fullWidth size="large" onClick={handleOpen}>
                                Tiếp tục
                            </Button>
                        </div>
                    </div>
                </motion.div>
                <TicketModal open={openModal} onClose={handleClose} />
            </div>
        </Modal>
    );
};

interface FoodItemProps {
    data: Food;
}

const FoodItem: FC<FoodItemProps> = ({ data }) => {
    const [quantity, setQuantity] = useState(data.quantity || 0);
    const { changeFoods } = useBooking();

    const handleIncrease = () => {
        setQuantity(quantity + 1);
        data.quantity = quantity + 1;
        changeFoods(data);
    };

    const handleDecrease = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
            data.quantity = quantity - 1;
            changeFoods(data);
        }
    };

    return (
        <div key={data._id} className="flex gap-4 p-6 border-b item-center">
            <Image
                src={data.image}
                alt={data.name}
                width={100}
                height={100}
                className="object-cover rounded-md aspect-square"
            />
            <div className="flex-1">
                <div className="font-bold line-clamp-2">{`${data.name} - ${formats.price(data.price)}`}</div>
                <p className="text-gray-200 line-clamp-2">{data.description}. Nhận trong xem phim</p>
                <div className="flex items-center gap-2">
                    <IconButton onClick={handleDecrease} disabled={quantity === 0}>
                        <FaMinus />
                    </IconButton>
                    <span>{quantity}</span>
                    <IconButton onClick={handleIncrease}>
                        <FaPlus />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default FoodsModal;
