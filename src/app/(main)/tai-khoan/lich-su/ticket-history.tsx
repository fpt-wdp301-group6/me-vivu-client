'use client';

import { useState } from 'react';
import { fetcher } from '@/configs/api';
import APIResponse from '@/types/api-response';
import Ticket, { TicketStatusEnum } from '@/types/ticket';
import { formats } from '@/utils';
import { Chip, Paper } from '@mui/material';
import Image from 'next/image';
import useSWR from 'swr';
import TicketModal from './ticket-modal';

const TicketStatus: { [key in TicketStatusEnum]: string } = {
    [TicketStatusEnum.Pending]: 'Đang chờ thanh toán',
    [TicketStatusEnum.Paid]: 'Đã thanh toán',
    [TicketStatusEnum.Cancelled]: 'Đã huỷ',
    [TicketStatusEnum.Returned]: 'Đã hoàn trả',
};

const TicketStatusColor: { [key in TicketStatusEnum]: 'error' | 'default' | 'success' | 'warning' } = {
    [TicketStatusEnum.Pending]: 'warning',
    [TicketStatusEnum.Paid]: 'success',
    [TicketStatusEnum.Cancelled]: 'error',
    [TicketStatusEnum.Returned]: 'default',
};

const TicketHistory = () => {
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const { data } = useSWR<APIResponse<Ticket[]>>('/tickets/me', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    const handleOpen = (ticket: Ticket) => () => {
        setTicket(ticket);
    };

    const handleClose = () => {
        setTicket(null);
    };

    return (
        <div className="flex flex-col gap-6">
            {data?.data.map((ticket) => (
                <Paper key={ticket._id} className="cursor-pointer rounded-xl" onClick={handleOpen(ticket)}>
                    <div className="flex items-center">
                        <div className="p-8">
                            <Image
                                className="aspect-square rounded-xl"
                                src={ticket.theater.cinema.logo}
                                alt={ticket.theater.name}
                                width={80}
                                height={80}
                            />
                        </div>
                        <div className="relative self-stretch border-2 border-l border-gray-400 border-dashed after:rounded-full after:size-4 after:bg-dark after:absolute after:bottom-0 after:left-0 after:-translate-x-1/2 after:translate-y-1/2 before:rounded-full before:size-4 before:bg-dark before:absolute before:top-0 before:left-0 before:-translate-x-1/2 before:-translate-y-1/2"></div>
                        <div className="flex-1 p-6">
                            <h5 className="text-lg font-bold">{ticket.showtime.movie?.title}</h5>
                            <div className="text-sm text-gray-300">{ticket.theater.name}</div>
                            <div className="mt-3">{`${formats.time(ticket.showtime.startAt)} • ${formats.dayWeek(
                                ticket.showtime.startAt,
                            )}`}</div>
                        </div>
                        <Chip
                            className="mr-4"
                            label={TicketStatus[ticket.status]}
                            color={TicketStatusColor[ticket.status]}
                            variant="outlined"
                        />
                    </div>
                </Paper>
            ))}
            <TicketModal open={!!ticket} onClose={handleClose} ticket={ticket} />
        </div>
    );
};

export default TicketHistory;
