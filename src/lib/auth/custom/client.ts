'use client';

import type { User } from '@/types/user';
import { apiSignIn, forgetPassword, getUserProfile, logoutApi } from '@/services/auth.api'
import { aW } from '@fullcalendar/core/internal-common';

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

const user = {
  id: 'USR-000',
  avatar: '/assets/avatar.png',
  firstName: 'Sofia',
  lastName: 'Rivers',
  email: 'admin@bn.om',
} satisfies User;

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(_: SignUpParams): Promise<{ error?: string }> {
    // Make API request

    // We do not handle the API, so we'll just generate a token and store it in localStorage.
    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { email, password } = params;

    try {
        const response = await apiSignIn(params);

        // Check API response status
        if (!response?.data?.status) {
            throw new Error(response.data.message || "Unknown error occurred");
        }
        // Successful login logic (uncomment when needed)
         const token = response.data?.data?.token;
         localStorage.setItem('custom-auth-token', token);

        return {};  // Return success
    } catch (error: any) {
        console.error("Login Error:", error);

        // Handle Axios errors
        if (error.response) {
            // Server responded with an error status (e.g., 400, 401)
            return { error: error.response.data.message || error.response.data.error || "Something went wrong" };
        } else if (error.request) {
            // No response received (e.g., network issue)
            return { error: "Network error. Please try again later." };
        } else {
            // Other errors
            return { error: error.message || "An unexpected error occurred" };
        }
    }
}
// : Promise<{ error?: string }>
async resetPassword(params: ResetPasswordParams): Promise<void> {
  try {
    await forgetPassword(params);
  } catch (err) {
    console.error("resetPassword error", err);
    // you might still re-throw for network‐level failures,
    // but the front‐end will treat them the same
  }
}

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const token = localStorage.getItem('custom-auth-token');

    if (!token) {
      return { data: null };
    }

    const data = await  getUserProfile();


    return { data: data?.data };
  }

  async signOut(): Promise<{ error?: string }> {
    try {
      await logoutApi();
      localStorage.removeItem('custom-auth-token');
      return {};
    } catch (error) {
      console.log(error, "logout error");
      return { error: 'Logout failed. Please try again.' };
    }
  }
  
}

export const authClient = new AuthClient();
