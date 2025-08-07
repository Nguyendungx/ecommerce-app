import { NextRequest, NextResponse } from 'next/server';

interface LoginRequestBody {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequestBody = await request.json();

    if (
      !body ||
      typeof body.email !== 'string' ||
      typeof body.password !== 'string'
    ) {
      return NextResponse.json(
        { success: false, message: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { email, password } = body;

    // Mock user data for demonstration
    const mockUser = {
      id: '1',
      email: 'c@example.com',
      name: 'Test User',
      role: 'user',
    };

    // Mock password check (in real app, verify hashed password)
    if (email === mockUser.email && password === 'password123') {
      const token = 'mock-jwt-token';

      return NextResponse.json({
        success: true,
        data: {
          user: mockUser,
          token,
        },
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid JSON body' },
      { status: 400 }
    );
  }
}
