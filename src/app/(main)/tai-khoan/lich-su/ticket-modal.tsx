'use client';
import { FC } from 'react';
import { IconButton, Modal } from '@mui/material';
import { motion } from 'framer-motion';
import Ticket from '@/types/ticket';
import { IoMdClose } from 'react-icons/io';
import SimpleBar from 'simplebar-react';

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

interface TicketModalProps {
    open: boolean;
    onClose: () => void;
    ticket: Ticket | null;
}

const TicketModal: FC<TicketModalProps> = ({ open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <div className="flex items-center justify-center w-screen h-screen p-8 pointer-events-none">
                <motion.div
                    variants={variants}
                    initial="initial"
                    whileInView="animate"
                    className="w-full h-full overflow-hidden text-white rounded-lg pointer-events-auto bg-dark max-w-[468px]"
                >
                    <div className="flex flex-col h-full">
                        <div className="relative py-3 font-bold text-center bg-primary">
                            <div className="absolute right-0 -translate-x-1/2 -translate-y-1/2 top-1/2">
                                <IconButton onClick={onClose}>
                                    <IoMdClose />
                                </IconButton>
                            </div>
                            Thông tin vé xem phim
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <SimpleBar className="h-full">
                                <div className="flex flex-col p-2">
                                    <div className="bg-red-900 rounded-t-lg">Test</div>
                                </div>
                            </SimpleBar>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Modal>
    );
};

export default TicketModal;
