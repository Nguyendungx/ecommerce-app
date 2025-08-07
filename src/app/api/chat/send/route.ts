import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: number;
}

// In-memory chat message store (for demo purposes)
const chatMessages: ChatMessage[] = [];

export async function POST(request: NextRequest) {
  try {
    const message: ChatMessage = await request.json();

    if (
      !message ||
      typeof message.senderId !== 'string' ||
      typeof message.receiverId !== 'string' ||
      typeof message.text !== 'string' ||
      typeof message.timestamp !== 'number'
    ) {
      return NextResponse.json(
        { success: false, message: 'Invalid message format' },
        { status: 400 }
      );
    }

    chatMessages.push(message);

    return NextResponse.json({ success: true, message: 'Message sent' });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid JSON body' },
      { status: 400 }
    );
  }
}
