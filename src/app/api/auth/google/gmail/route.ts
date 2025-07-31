import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID!,
        process.env.GOOGLE_CLIENT_SECRET!,
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/gmail/callback`
    );

    const scopes = [
        'https://www.googleapis.com/auth/gmail.readonly',
    ];

    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        prompt: 'consent',
    });

    return NextResponse.redirect(authUrl);
}
