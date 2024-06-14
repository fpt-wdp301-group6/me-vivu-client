'use client';
import api from '@/configs/api';
import { useMount } from '@/hooks';
import User from '@/types/user';
import { constants } from '@/utils';
import { FC, ReactNode, createContext, useReducer, Dispatch, useRef } from 'react';

interface AuthState {
    user: User | null;
    isLoading: boolean;
    isError: boolean;
    message?: string;
}

type AuthAction =
    | { type: 'LOGIN_PENDING' }
    | { type: 'LOGIN_FULFILLED'; payload: User }
    | { type: 'LOGIN_REJECT'; payload?: string }
    | { type: 'LOGOUT' };

const initialState: AuthState = {
    user: null,
    isLoading: false,
    isError: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN_PENDING': {
            return { ...state, user: null, isLoading: true, isError: false };
        }
        case 'LOGIN_FULFILLED': {
            return { ...state, user: action.payload, isLoading: false, isError: false };
        }
        case 'LOGIN_REJECT': {
            return {
                ...state,
                user: null,
                isLoading: false,
                isError: true,
                message: action.payload,
            };
        }
        case 'LOGOUT': {
            return initialState;
        }
        default:
            return state;
    }
};

interface AuthContextProps extends AuthState {
    dispatch: Dispatch<AuthAction>;
    // eslint-disable-next-line no-unused-vars
    login: (credentials: { email: string; password: string }) => Promise<void>;
    // eslint-disable-next-line no-unused-vars
    loginByOthers: (data: any) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: Readonly<ReactNode>;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const fetchLoginCalled = useRef(false);

    useMount(() => {
        if (fetchLoginCalled.current) return;

        const fetchLogin = async () => {
            try {
                const response = await api.post('/auth/login-refresh');
                localStorage.setItem('token', response.data.token);
                dispatch({ type: 'LOGIN_FULFILLED', payload: response.data });
            } catch (error: any) {
                dispatch({ type: 'LOGIN_REJECT' });
            }
        };

        dispatch({ type: 'LOGIN_PENDING' });
        fetchLogin();
        fetchLoginCalled.current = true;
    });

    const login = async (credentials: { email: string; password: string }) => {
        dispatch({ type: 'LOGIN_PENDING' });
        try {
            const response = await api.post('/auth/login', credentials);
            localStorage.setItem('token', response.data.token);
            dispatch({ type: 'LOGIN_FULFILLED', payload: response.data });
        } catch (error: any) {
            dispatch({ type: 'LOGIN_REJECT', payload: error?.data?.message || constants.sthWentWrong });
            throw error;
        }
    };

    const loginByOthers = async (data: any) => {
        dispatch({ type: 'LOGIN_PENDING' });
        try {
            const response = await api.post('/auth/login/others', data);
            localStorage.setItem('token', response.data.token);
            dispatch({ type: 'LOGIN_FULFILLED', payload: response.data });
        } catch (error: any) {
            dispatch({ type: 'LOGIN_REJECT', payload: error?.data?.message || constants.sthWentWrong });
            throw error;
        }
    };

    const logout = async () => {
        dispatch({ type: 'LOGOUT' });
        try {
            await api('/auth/logout');
        } catch (error: any) {
            console.log(error);
        }
    };

    return (
        <AuthContext.Provider value={{ ...state, dispatch, login, logout, loginByOthers }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
