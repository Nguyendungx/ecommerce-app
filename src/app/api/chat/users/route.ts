import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: Replace with real DB query to get users who have chatted with admin
  return NextResponse.json({
    success: true,
    data: [
      { id: 'user1', name: 'Nguyễn Văn A' },
      { id: 'user2', name: 'Trần Thị B' },
      { id: 'user3', name: 'Lê Văn C' },
    ],
  });
}
