'use client';
import { useState } from 'react';
import { Alert, Button, IconButton, InputAdornment, Paper, TextField } from '@mui/material';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { constants } from '@/utils';
import { RiEyeCloseLine } from 'react-icons/ri';
import { RiEyeFill } from 'react-icons/ri';
import api from '@/configs/api';
import { useRouter } from 'next/navigation';

const schema = yup
    .object({
        password: yup.string().required('Vui lòng nhập mật khẩu'),
        newPassword: yup
            .string()
            .required('Vui lòng nhập mật khẩu')
            .matches(
                constants.passwordRegex,
                'Mật khẩu ít nhất 8 kí tự bao gồm ít nhất một chữ hoa, một chữ thường, một chữ số và một kí tự số',
            ),
        confirmPassword: yup
            .string()
            .required('Vui lòng nhập mật khẩu')
            .oneOf([yup.ref('newPassword')], 'Mật khẩu không khớp'),
    })
    .required();

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const router = useRouter();

    const onSubmit = (data: yup.InferType<typeof schema>) => {
        api.patch('/auth/me/change-password', data)
            .then(() => router.push('/'))
            .catch((error) => setError(error.data?.message));
    };

    const handleToggleShow = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Paper className="p-6">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Mật khẩu cũ"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleToggleShow} tabIndex={-1}>
                                    {showPassword ? <RiEyeFill /> : <RiEyeCloseLine />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Mật khẩu mới"
                    type={showPassword ? 'text' : 'password'}
                    {...register('newPassword')}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleToggleShow} tabIndex={-1}>
                                    {showPassword ? <RiEyeFill /> : <RiEyeCloseLine />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Nhập lại mật khẩu"
                    type={showPassword ? 'text' : 'password'}
                    {...register('confirmPassword')}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleToggleShow} tabIndex={-1}>
                                    {showPassword ? <RiEyeFill /> : <RiEyeCloseLine />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                {error && (
                    <Alert variant="filled" severity="error">
                        {error}
                    </Alert>
                )}
                <div className="text-right">
                    <Button type="submit" size="large">
                        Lưu thay đổi
                    </Button>
                </div>
            </form>
        </Paper>
    );
};

export default ChangePassword;
