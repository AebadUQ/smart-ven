'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import { paths } from '@/paths';
import { authClient } from '@/lib/auth/custom/client';
import { DynamicLogo } from '@/components/core/logo';

const schema = zod.object({ email: zod.string().min(1, { message: 'Email is required' }).email() });
type Values = zod.infer<typeof schema>;

const defaultValues = { email: '' } satisfies Values;

export function ResetPasswordForm(): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [open, setOpen]= React.useState(false)
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);
  
      try {
        // fire & forget, result doesn't change the UX
        await authClient.resetPassword(values);
      } catch (err) {
        console.error("resetPassword error", err);
        // you could optionally setError here if you want to flag a network failure,
        // but for user‐enumeration safety we still show the generic message.
      } finally {
        setIsPending(false);
        setOpen(true);
      }
    },
    []
  );
  

  return (
    <Stack spacing={4}>
      <div>
        <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-block', fontSize: 0 }}>
          <DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} />
        </Box>
      </div>
      <Typography variant="h5">Reset password</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput {...field} type="email" />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}

          { isPending ?  <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box> : <Button disabled={isPending} type="submit" variant="contained">
            Send recovery link
          </Button>}

        </Stack>
      </form>
      <Snackbar open={open} sx={{position:'static',top:"0px"}} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert severity="info" onClose={() => setOpen(false)}>
        If an account exists with the provided email, you will receive password reset instructions shortly
        </Alert>
      </Snackbar>
    </Stack>
  );
}
