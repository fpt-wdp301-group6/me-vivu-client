export enum SeatType {
    Normal = 'normal',
    VIP = 'vip',
    Couple = 'couple',
}

export enum SeatStatus {
    Available = 'available',
    Reserved = 'reserved',
    Broke = 'broke',
}

interface Seat {
    _id: string;
    name: string;
    status: SeatStatus;
    type: SeatType;
    x: number;
    y: number;
}

export default Seat;
