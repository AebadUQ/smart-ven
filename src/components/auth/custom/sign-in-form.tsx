'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/custom/client';
// import { useUser } from '@/hooks/use-user';
import { DynamicLogo } from '@/components/core/logo';
import { toast } from '@/components/core/toaster';
import { Envelope } from '@phosphor-icons/react/dist/ssr';
import { fontSize } from '@mui/system';
import { Lock } from '@phosphor-icons/react';

interface OAuthProvider {
  id: 'google' | 'discord';
  name: string;
  logo: string;
}

const oAuthProviders = [
  { id: 'google', name: 'Google', logo: '/assets/logo-google.svg' },
  { id: 'discord', name: 'Discord', logo: '/assets/logo-discord.svg' },
] satisfies OAuthProvider[];

const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(1, { message: 'Password is required' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { email: '', password: '' } satisfies Values;

export function SignInForm(): React.JSX.Element {
  const router = useRouter();

  // const { checkSession } = useUser();

  const [showPassword, setShowPassword] = React.useState<boolean>();

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onAuth = React.useCallback(async (providerId: OAuthProvider['id']): Promise<void> => {
    setIsPending(true);

    const { error } = await authClient.signInWithOAuth({ provider: providerId });

    if (error) {
      setIsPending(false);
      toast.error(error);
      return;
    }

    setIsPending(false);

    // Redirect to OAuth provider
  }, []);

  // const onSubmit = React.useCallback(
  //   async (values: Values): Promise<void> => {
  //     setIsPending(true);

  //     const { error } = await authClient.signInWithPassword(values);

  //     if (error) {
  //       setError('root', { type: 'server', message: error });
  //       setIsPending(false);
  //       return;
  //     }

  //     // Refresh the auth state
  //     await checkSession?.();

     
  //     router.refresh();
  //   },
  //   [checkSession, router, setError]
  // );

  return (
    <Stack spacing={2}>
      <div>
  <Box
    component={RouterLink}
    href={paths.home}
    sx={{
      display: 'inline-block',
      fontSize: 0,
      position: 'relative',
      left: -20, // move 12px to the left
    }}
  >
    <DynamicLogo colorDark="light" colorLight="dark" height={100} width={100} />
  </Box>
</div>

      <Stack spacing={1}>
        <Typography variant="h5">Log in</Typography>
               <Typography variant="body2" color='#667085'>Enter your email and password.</Typography>

      </Stack>
      <Stack spacing={3}>
       
        <Stack spacing={2}>
          <form onSubmit={()=>{}}>
            <Stack spacing={2}>
              <Controller
                control={control}
                name="email"
                defaultValue='admin@bn.om'
                render={({ field }) => (
                  <FormControl error={Boolean(errors.email)}>
                    <InputLabel>Email address</InputLabel>
                    <OutlinedInput {...field} type="email" startAdornment={<Envelope color='#1560BD' fontSize={'18px'}/>}/>
                    {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.password)}>
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput
                    startAdornment={<Lock color='#1560BD' fontSize={'18px'}/>}
                      {...field}
                      endAdornment={
                        showPassword ? (
                          <EyeIcon
                            cursor="pointer"
                            fontSize="var(--icon-fontSize-md)"
                            onClick={(): void => {
                              setShowPassword(false);
                            }}
                          />
                        ) : (
                          <EyeSlashIcon
                            cursor="pointer"
                            fontSize="var(--icon-fontSize-md)"
                            onClick={(): void => {
                              setShowPassword(true);
                            }}
                            

                          />
                        )
                      }
                      type={showPassword ? 'text' : 'password'}
                    />
                    {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
              {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
              {/* <Button disabled={isPending} type="submit" variant="contained">
                Sign in
              </Button> */}
              <Button disabled={isPending} sx={{backgroundColor:'#1560BD'}}  variant="contained" onClick={()=>router.push('/dashboard')}>
                Log in
              </Button>
            </Stack>
          </form>
          <div style={{display:'flex',justifyContent:'center'}}>
            <Link component={RouterLink} href={paths.auth.custom.resetPassword} variant="subtitle2" color='#FFB800'>
              Forgot password?
            </Link>
          </div>
        </Stack>
      </Stack>
      
    </Stack>
  );
}
