/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginSchema, TLoginSchema } from '@/lib/validation/auth';
import api from '@/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const useLogin = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TLoginSchema) => {
    setServerError(null);
    try {
      const response = await api.post('/auth/login', data);
      console.log(response.data.user);
      reset();
    } catch (error: any) {
      const message = error.response?.data?.message || 'something went wrong';
      setServerError(message);
    }
  };

  return {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    onSubmit,
    serverError,
  };
};

export default useLogin;
