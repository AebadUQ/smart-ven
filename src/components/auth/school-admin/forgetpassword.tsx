'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import {
  Box,
  Stack,
  Button,
  Typography,
  CircularProgress,
  TextField,
  ButtonProps,
} from '@mui/material';
import { z as zod } from 'zod';
import { DynamicLogo } from '@/components/core/logo';
import { forgotPassword, resetPassword, resendOtp } from '@/store/reducers/auth-slice';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';
import { useRouter } from 'next/navigation';

// ----- Styles: same as Login button -----
const primaryButtonSx = {
  backgroundColor: '#1560BD',
  height: 45,
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': { backgroundColor: '#1253A2' },
};

function PrimaryButton({
  loading,
  loadingText,
  children,
  ...props
}: ButtonProps & { loading?: boolean; loadingText?: string }) {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={primaryButtonSx}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <CircularProgress size={18} sx={{ color: 'inherit', mr: 1 }} />
          {loadingText ?? 'Please wait...'}
        </>
      ) : (
        children
      )}
    </Button>
  );
}

// Schemas
const emailSchema = zod.object({
  email: zod.string().email({ message: 'Please enter a valid email address' }),
});

const otpSchema = zod.object({
  otp: zod
    .string()
    .length(6, { message: 'OTP must be 6 digits' })
    .regex(/^\d+$/, { message: 'OTP must contain digits only' }),
});

const passwordSchema = zod
  .object({
    password: zod.string().min(8, { message: 'Min 8 characters' }),
    confirm: zod.string(),
  })
  .refine((v) => v.password === v.confirm, {
    path: ['confirm'],
    message: 'Passwords do not match',
  });

export function ForgetPassword(): React.JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [step, setStep] = React.useState<'email' | 'otp' | 'reset'>('email');
  const [isPending, setIsPending] = React.useState(false);
  const [isResending, setIsResending] = React.useState(false);
  const [timer, setTimer] = React.useState(0);

  const [otp, setOtp] = React.useState(Array(6).fill(''));
  const [email, setEmail] = React.useState('waliiqbal2020@gmail.com');
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');

  // countdown effect
  React.useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // OTP input
  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const next = [...otp];
      next[index] = value;
      setOtp(next);
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  // 1️⃣ Email submit
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = emailSchema.safeParse({ email });
    if (!result.success) return;

    try {
      setIsPending(true);
      await dispatch(forgotPassword({ email })).unwrap();
      setStep('otp');
    } finally {
      setIsPending(false);
    }
  };

  // 2️⃣ Verify OTP
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    const result = otpSchema.safeParse({ otp: enteredOtp });
    if (!result.success) return;
    setStep('reset');
  };

  // 🔁 Resend OTP
  const handleResendOtp = async () => {
    try {
      setIsResending(true);
      await dispatch(resendOtp()).unwrap();
      setTimer(60);
    } finally {
      setIsResending(false);
    }
  };

  // 3️⃣ Reset password
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = passwordSchema.safeParse({ password, confirm });
    if (!ok.success) return;

    try {
      setIsPending(true);
      await dispatch(
        resetPassword({ email, otp: otp.join(''), newPassword: password })
      ).unwrap();
      router.push('/auth/signin');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Stack spacing={4}>
      {/* Logo */}
      <Box component={RouterLink} href="/" sx={{ display: 'inline-block', fontSize: 0 }}>
        <DynamicLogo colorDark="light" colorLight="dark" height={100} width={100} />
      </Box>

      {/* Step 1 - Email */}
      {step === 'email' && (
        <form onSubmit={handleEmailSubmit}>
          <Stack spacing={3}>
            <Typography variant="h5">Forgot Password</Typography>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              
            />
            

            <PrimaryButton
              type="submit"
              loading={isPending}
              loadingText="Sending..."
            >
              Send OTP
            </PrimaryButton>
          </Stack>
        </form>
      )}

      {/* Step 2 - OTP */}
      {step === 'otp' && (
        <form onSubmit={handleOtpSubmit}>
          <Stack spacing={3} alignItems="center">
            <Typography variant="h5">Verify OTP</Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {otp.map((digit, i) => (
                <TextField
                  key={i}
                  id={`otp-${i}`}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, i)}
                  inputProps={{
                    maxLength: 1,
                    style: { textAlign: 'center', fontSize: '1.25rem', width: 45 },
                  }}
                />
              ))}
            </Box>

            <PrimaryButton type="submit">Verify OTP</PrimaryButton>

            {/* Small text below */}
            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
              Didn’t get the code?
              <Button
                variant="text"
                size="small"
                type="button"
                disabled={timer > 0 || isResending}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleResendOtp();
                }}
                sx={{ textTransform: 'none', ml: 1 }}
              >
                {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
                {isResending && (
                  <CircularProgress size={16} sx={{ ml: 1 }} />
                )}
              </Button>
            </Typography>
          </Stack>
        </form>
      )}

      {/* Step 3 - Reset Password */}
      {step === 'reset' && (
        <form onSubmit={handleResetSubmit}>
          <Stack spacing={3}>
            <Typography variant="h5">Set New Password</Typography>
            <TextField
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <TextField
              label="Confirm Password"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              fullWidth
            />

            <PrimaryButton
              type="submit"
              loading={isPending}
              loadingText="Updating..."
            >
              Update Password
            </PrimaryButton>
          </Stack>
        </form>
      )}
    </Stack>
  );
}
