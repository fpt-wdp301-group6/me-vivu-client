'use client';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, TextField } from '@mui/material';
import { constants } from '@/utils';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '@/configs/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const schema = yup
    .object({
        name: yup.string().required('Vui lòng nhập họ tên').min(2, 'Vui lòng nhập ít nhất 2 kí tự'),
        email: yup.string().required('Vui lòng nhập email').matches(constants.emailRegex, 'Email không hợp lệ'),
        password: yup
            .string()
            .required('Vui lòng nhập nật khẩu')
            .matches(
                constants.passwordRegex,
                'Mật khẩu ít nhất 8 kí tự bao gồm ít nhất một chữ hoa, một chữ thường, một chữ số và một kí tự số',
            ),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
    })
    .required();

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const [error, setError] = useState<string>();
    const router = useRouter();

    const onSubmit = async (data: yup.InferType<typeof schema>) => {
        await api
            .post('/auth/register', data)
            .then((res) => {
                toast.success(res.data.message);
                router.push('/dang-nhap');
            })
            .catch((error) => setError(error?.data?.message || constants.sthWentWrong));
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
            <TextField
                color="secondary"
                label="Tên của bạn"
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
            />
            <TextField
                color="secondary"
                label="Email"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
            />
            <TextField
                color="secondary"
                label="Mật khẩu"
                type="password"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
            />
            <TextField
                color="secondary"
                label="Nhập lại mật khẩu"
                type="password"
                {...register('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
            />
            {error && (
                <Alert variant="filled" severity="error">
                    {error}
                </Alert>
            )}
            <LoadingButton variant="contained" color="secondary" size="large" type="submit">
                Đăng ký
            </LoadingButton>
        </form>
    );
};

export default RegisterForm;
