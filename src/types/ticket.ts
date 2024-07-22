import Food from './food';
import Seat from './seat';
import Showtime from './showtime';
import Theater from './theater';

export enum TicketStatusEnum {
    Pending = 1,
    Paid = 2,
    Cancelled = 3,
    Returned = 4,
}

interface Ticket {
    _id: string;
    name: string;
    email: string;
    phone: string;
    showtime: Showtime;
    theater: Theater;
    status: TicketStatusEnum;
    code: number;
    total: number;
    paymentLinkId: string;
    foods: {
        item: Food;
        quantity: number;
    }[];
    seats: Seat[];
    updatedAt: string;
}

export default Ticket;
