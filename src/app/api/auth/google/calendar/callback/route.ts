import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const { userId } = await auth();

    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID!,
        process.env.GOOGLE_CLIENT_SECRET!,
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/calendar/callback`
    );

    const { tokens } = await oauth2Client.getToken(code!);

    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await prisma.calendarIntegration.upsert({
        where: { userId },
        update: {
            accessToken: tokens.access_token!,
            refreshToken: tokens.refresh_token!,
            expiryDate: new Date(tokens.expiry_date!),
            scope: tokens.scope,
            tokenType: tokens.token_type,
        },
        create: {
            userId,
            accessToken: tokens.access_token!,
            refreshToken: tokens.refresh_token!,
            expiryDate: new Date(tokens.expiry_date!),
            scope: tokens.scope,
            tokenType: tokens.token_type,
        },
    });

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/brain`);
}
