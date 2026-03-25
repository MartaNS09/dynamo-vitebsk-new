import { NextResponse } from 'next/server';
import { markAllAsRead } from '@/lib/notifications-store';

export async function POST() {
  markAllAsRead();
  return NextResponse.json({ success: true });
}
