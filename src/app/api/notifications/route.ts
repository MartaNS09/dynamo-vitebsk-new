import { NextResponse } from 'next/server';
import { notifications, addNotification } from '@/lib/notifications-store';

export async function GET() {
  return NextResponse.json(notifications);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newNotification = addNotification(body);
  return NextResponse.json(newNotification, { status: 201 });
}
