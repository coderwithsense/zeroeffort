import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const integration = await prisma.calendarIntegration.findUnique({ where: { userId } });
    if (!integration) return NextResponse.json({ error: 'Not connected' }, { status: 400 });

    const body = await req.json();
    const { summary, description, start, end } = body;

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
        access_token: integration.accessToken,
        refresh_token: integration.refreshToken,
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const event = {
        summary,
        description,
        start: { dateTime: start },
        end: { dateTime: end },
    };

    const result = await calendar.events.insert({
        calendarId: 'primary',
        requestBody: event,
    });

    return NextResponse.json(result.data);
}
