import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


export async function POST(req: NextRequest) {
  const { messages, model = 'gpt-3.5-turbo' } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model,
      messages,
      max_tokens: 200,
      temperature: 0.7,
    });
    return NextResponse.json(completion);
  } catch {
    return NextResponse.json({ error: 'OpenAI API error' }, { status: 500 });
  }
} 