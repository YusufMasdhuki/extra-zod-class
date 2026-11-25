/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import apiClient from '@/services/apiClient';
import { loginSchema } from '@/lib/validation/auth';

export async function POST(request: Request) {
  const body = await request.json();
  // 1. validasi di sisi server
  const validation = loginSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { errors: validation.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  const { email, password } = validation.data;

  try {
    // 2. kirim data ke server
    const response = await apiClient.post('/auth/login', { email, password });
    return NextResponse.json(response.data);
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error ||
      'Email atau password yang anda masukkan salah.';
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}
