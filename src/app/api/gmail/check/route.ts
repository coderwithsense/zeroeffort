import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function GET() {
    const { userId } = await auth();

    if (!userId) return NextResponse.json({ connected: false });

    const integration = await prisma.gmailIntegration.findUnique({
        where: { userId },
    });

    return NextResponse.json({ connected: !!integration });
}
