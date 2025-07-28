'use client';

import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Lock as LockIcon } from '@phosphor-icons/react/dist/ssr/Lock';
import { Eye as Visible } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as NotVisible } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { useSearchParams, useRouter } from 'next/navigation';
import { BASE_URL } from "@/types/apiConstants"
import axios from 'axios';

export default function PasswordChange(): React.JSX.Element {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const searchParams = useSearchParams();
    const token = searchParams.get('registerationToken');

    const handleSubmit = async () => {
        if (!newPassword || !confirmPassword) {
            setError('Please enter both new password and confirm password.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `${BASE_URL}api/users/create-password`,
                { password: newPassword, confirmPassword: confirmPassword },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                localStorage.removeItem("custom-auth-token");
                router.push('/auth/custom/sign-in');
            } else {
                setError('Failed to update password.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handlePasswordChange = (event) => {
        const password = event.target.value;
        setNewPassword(password);
        let strength = 0;
        if (password.length > 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        setPasswordStrength(strength);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const getStrengthColor = () => {
        if (passwordStrength === 0) return '#e57373';
        if (passwordStrength === 1) return '#ffb74d';
        if (passwordStrength === 2) return '#fff176';
        if (passwordStrength === 3) return '#81c784';
        return '#4caf50';
    };

    const getStrengthLabel = () => {
        if (passwordStrength === 0) return 'Weak';
        if (passwordStrength === 1) return 'Moderate';
        if (passwordStrength === 2) return 'Fair';
        if (passwordStrength === 3) return 'Good';
        return 'Strong';
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', width: '100%', bgcolor: 'background.default', p: 2 }}>
            <Card elevation={2} sx={{ maxWidth: 500, width: '100%', borderRadius: 2, overflow: 'visible', position: 'relative', background: 'linear-gradient(to right bottom, #ffffff, #f9f9ff)', boxShadow: '0 8px 20px rgba(0,0,0,0.05)', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 28px rgba(0,0,0,0.1)' } }}>
                <CardContent sx={{ pt: 4, pb: 3, px: 3 }}>
                    <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
                        Create Password
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary" paragraph sx={{ mb: 4 }}>
                        Create a strong password to keep your account secure
                    </Typography>
                    <Stack spacing={2}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>New Password</InputLabel>
                            <OutlinedInput type="password" value={newPassword} onChange={handlePasswordChange} label="New Password" />
                        </FormControl>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Confirm Password</InputLabel>
                            <OutlinedInput type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} label="Confirm Password" />
                        </FormControl>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold', mt: 1 }}>
                            Password Strength: {getStrengthLabel()} (Use 8+ characters with letters, numbers & symbols)
                        </Typography>
                    </Stack>
                    {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button color="secondary">Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? 'Updating...' : 'Save changes'}
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}
