'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Link
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { Envelope, Eye, EyeSlash, Lock } from '@phosphor-icons/react';

import { paths } from '@/paths';
import { DynamicLogo } from '@/components/core/logo';
import { useAuthContext } from '@/contexts/AuthContext'; // ✅ confirm file path and casing

// 🧠 Form schema
const schema = zod.object({
  email: zod.string().min(1, 'Email is required').email('Invalid email address'),
  password: zod.string().min(1, 'Password is required'),
});

type Values = zod.infer<typeof schema>;

const defaultValues: Values = {
  email: 'waliiqbal2020@gmail.com',
  password: 'karachi786',
};

export function SASignin(): React.JSX.Element {
  const router = useRouter();
  const { login } = useAuthContext();

  const [showPassword, setShowPassword] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: Values) => {
    console.log("Values",values)
    setIsPending(true);
    try {
      await login(values.email, values.password);
    //   router.push('/dashboard');
    } catch (error: any) {
      setError('root', { type: 'server', message: 'Invalid email or password' });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Stack spacing={2}>
      {/* Logo */}
      <Box
        component={RouterLink}
        href={paths.home}
        sx={{ display: 'inline-block', fontSize: 0, position: 'relative', left: -20 }}
      >
        <DynamicLogo colorDark="light" colorLight="dark" height={100} width={100} />
      </Box>

      <Stack spacing={1}>
        <Typography variant="h5">Log in</Typography>
        <Typography variant="body2" color="#667085">
          Enter your email and password.
        </Typography>
      </Stack>

      <Stack spacing={3}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            {/* Email */}
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <FormControl error={Boolean(errors.email)}>
                  <InputLabel>Email address</InputLabel>
                  <OutlinedInput
                    {...field}
                    type="email"
                    startAdornment={<Envelope color="#1560BD" fontSize="18px" />}
                  />
                  {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
                </FormControl>
              )}
            />

            {/* Password */}
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <FormControl error={Boolean(errors.password)}>
                  <InputLabel>Password</InputLabel>
                  <OutlinedInput
                    {...field}
                    startAdornment={<Lock color="#1560BD" fontSize="18px" />}
                    endAdornment={
                      showPassword ? (
                        <Eye
                          cursor="pointer"
                          fontSize="var(--icon-fontSize-md)"
                          onClick={() => setShowPassword(false)}
                        />
                      ) : (
                        <EyeSlash
                          cursor="pointer"
                          fontSize="var(--icon-fontSize-md)"
                          onClick={() => setShowPassword(true)}
                        />
                      )
                    }
                    type={showPassword ? 'text' : 'password'}
                  />
                  {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
                </FormControl>
              )}
            />

            {/* General Error */}
            {errors.root && <Alert severity="error">{errors.root.message}</Alert>}

            {/* Submit Button */}
            <Button
              disabled={isPending}
              type="submit"
              variant="contained"
              sx={{ backgroundColor: '#1560BD' }}
            >
              {isPending ? 'Logging in...' : 'Log in'}
            </Button>
          </Stack>
        </form>

        {/* Forgot Password Link */}
        <Box display="flex" justifyContent="center">
          <Link
            component={RouterLink}
            href={paths.auth.custom.resetPassword}
            variant="subtitle2"
            color="#FFB800"
          >
            Forgot password?
          </Link>
        </Box>
      </Stack>
    </Stack>
  );
}
