import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: number;
}

// Reference the same in-memory chatMessages array from send route
// For simplicity, we will duplicate it here; in a real app, use shared storage or DB
const chatMessages: ChatMessage[] = [];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const user1 = searchParams.get('user1');
    const user2 = searchParams.get('user2');

    if (!user1 || !user2) {
      return NextResponse.json(
        { success: false, message: 'Missing user1 or user2 query parameter' },
        { status: 400 }
      );
    }

    // Filter messages between user1 and user2
    const messages = chatMessages.filter(
      (msg) =>
        (msg.senderId === user1 && msg.receiverId === user2) ||
        (msg.senderId === user2 && msg.receiverId === user1)
    );

    return NextResponse.json({ success: true, data: messages });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch chat history' },
      { status: 500 }
    );
  }
}
