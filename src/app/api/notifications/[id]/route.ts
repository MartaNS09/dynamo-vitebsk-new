import { NextRequest, NextResponse } from 'next/server';
import { markAsRead } from '@/lib/notifications-store';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // В Next.js 16 params - это Promise, нужно использовать await
  const { id } = await params;
  const body = await request.json();
  
  if (body.read === true) {
    const updated = markAsRead(id);
    if (updated) {
      return NextResponse.json(updated);
    }
  }
  
  return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
}
