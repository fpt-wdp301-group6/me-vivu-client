'use client';
import { Dispatch, FC, ReactNode, createContext, useMemo, useReducer } from 'react';
import Food from '@/types/food';
import Movie from '@/types/movie';
import Seat from '@/types/seat';
import Showtime from '@/types/showtime';
import Theater from '@/types/theater';

interface BookingState {
    theater?: Theater;
    showtime?: Showtime;
    movie?: Movie;
    selectedSeats: Seat[];
    foods: Food[];
}

type BookingAction =
    | { type: 'THEATER'; payload?: Theater }
    | { type: 'SHOWTIME'; payload?: Showtime }
    | { type: 'MOVIE'; payload?: Movie }
    | { type: 'SEATS'; payload: Seat[] }
    | { type: 'FOODS'; payload: Food[] }
    | { type: 'RESET' };

const initialState: BookingState = {
    theater: undefined,
    showtime: undefined,
    movie: undefined,
    selectedSeats: [],
    foods: [],
};

const bookingReducer = (state: BookingState, action: BookingAction): BookingState => {
    switch (action.type) {
        case 'THEATER':
            return { ...state, theater: action.payload };
        case 'SHOWTIME':
            return { ...state, showtime: action.payload };
        case 'MOVIE':
            return { ...state, movie: action.payload };
        case 'SEATS':
            return { ...state, selectedSeats: action.payload };
        case 'FOODS':
            return { ...state, foods: action.payload };
        case 'RESET':
            return { ...initialState, theater: state.theater };
        default:
            return state;
    }
};

interface BookingContextProps extends BookingState {
    seatsTotal: number;
    dispatch: Dispatch<BookingAction>;
    setTheater: (theater?: Theater) => void;
    setShowtime: (showtime?: Showtime) => void;
    setMovie: (movie?: Movie) => void;
    changeSelectedSeats: (seat: Seat) => void;
    removeSelectedSeats: () => void;
    changeFoods: (food: Food) => void;
    resetBooking: () => void;
}

export const BookingContext = createContext<BookingContextProps | undefined>(undefined);

interface BookingProviderProps {
    children: Readonly<ReactNode>;
}

const BookingProvider: FC<BookingProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(bookingReducer, initialState);

    const seatsTotal = useMemo(() => {
        const { showtime } = state;
        if (showtime) {
            return state.selectedSeats.reduce((total, seat) => (total += showtime.price[seat.type] || 0), 0);
        } else {
            return 0;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.selectedSeats, state.showtime]);

    const setTheater = (theater?: Theater) => {
        dispatch({ type: 'THEATER', payload: theater });
    };

    const setShowtime = (showtime?: Showtime) => {
        dispatch({ type: 'SHOWTIME', payload: showtime });
    };

    const setMovie = (movie?: Movie) => {
        dispatch({ type: 'MOVIE', payload: movie });
    };

    const removeSelectedSeats = () => {
        dispatch({ type: 'SEATS', payload: [] });
    };

    const changeSelectedSeats = (seat: Seat) => {
        let selectingSeats = [...state.selectedSeats];
        if (selectingSeats.includes(seat)) {
            selectingSeats = selectingSeats.filter((item) => item._id !== seat._id);
        } else {
            selectingSeats.push(seat);
        }
        dispatch({ type: 'SEATS', payload: selectingSeats });
    };

    const changeFoods = (food: Food) => {
        const newFoods = [...state.foods];
        const foodIndex = newFoods.findIndex((item) => item._id === food._id);
        if (foodIndex !== -1) {
            if (food.quantity) {
                newFoods[foodIndex] === food;
            } else {
                newFoods.splice(foodIndex, 1);
            }
        } else {
            newFoods.push(food);
        }
        dispatch({ type: 'FOODS', payload: newFoods });
    };

    const resetBooking = () => {
        dispatch({ type: 'RESET' });
    };

    return (
        <BookingContext.Provider
            value={{
                ...state,
                seatsTotal,
                dispatch,
                setTheater,
                setShowtime,
                setMovie,
                changeSelectedSeats,
                removeSelectedSeats,
                changeFoods,
                resetBooking,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};

export default BookingProvider;
