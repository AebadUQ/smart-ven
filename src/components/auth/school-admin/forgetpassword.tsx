'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { z as zod } from 'zod';
import { Snackbar, Alert, CircularProgress, TextField } from "@mui/material";

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/custom/client';
import { DynamicLogo } from '@/components/core/logo';

// Validation schema
const schema = zod.object({
  otp: zod
    .string()
    .length(6, { message: 'OTP must be 6 digits' })
    .regex(/^\d+$/, { message: 'OTP must contain digits only' }),
});
type Values = zod.infer<typeof schema>;

export function ForgetPassword(): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [otp, setOtp] = React.useState(Array(6).fill(""));
  const router = useRouter();

  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // auto move to next box
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    // validate via zod
    const result = schema.safeParse({ otp: enteredOtp });
    if (!result.success) {
      alert(result.error.issues[0].message);
      return;
    }

    setIsPending(true);
    try {
      await authClient.verifyOtp(enteredOtp);
      setOpen(true);
      router.replace(paths.dashboard.overview ?? '/');
    } catch (err) {
      console.error("verifyOtp error", err);
      alert("Invalid OTP. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Stack spacing={4}>
      <div>
        <Box
          component={RouterLink}
          href={paths.home}
          sx={{ display: 'inline-block', fontSize: 0 }}
        >
          <DynamicLogo colorDark="light" colorLight="dark" height={100} width={100} />
        </Box>
      </div>

      <Typography variant="h5">Verify OTP</Typography>
      <Typography variant="body2" color="text.secondary">
        Enter the 6-digit code sent to your email/phone.
      </Typography>

      <form onSubmit={onSubmit}>
        <Stack spacing={3} alignItems="center">
          <Box sx={{ display: 'flex', gap: 1 }}>
            {otp.map((digit, idx) => (
              <TextField
                key={idx}
                id={`otp-${idx}`}
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: "center", fontSize: "1.5rem", width: "50px" },
                }}
              />
            ))}
          </Box>

          {isPending ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Button disabled={isPending} type="submit" variant="contained" fullWidth>
              Verify OTP
            </Button>
          )}
        </Stack>
      </form>

      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={() => setOpen(false)}
      >
        <Alert severity="success" onClose={() => setOpen(false)}>
          OTP verified successfully.
        </Alert>
      </Snackbar>
    </Stack>
  );
}
