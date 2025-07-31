import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET() {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const integration = await prisma.calendarIntegration.findUnique({ where: { userId } });
    if (!integration) return NextResponse.json({ error: 'Not connected' }, { status: 400 });

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
        access_token: integration.accessToken,
        refresh_token: integration.refreshToken,
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const events = await calendar.events.list({
        calendarId: 'primary',
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    });

    return NextResponse.json(events.data.items);
}
