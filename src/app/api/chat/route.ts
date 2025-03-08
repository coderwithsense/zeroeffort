import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const userId = await auth();
    const body = await request.json();
    console.log(body);
    return new NextResponse("OK", { status: 200 });
}

export async function GET() {
    return new NextResponse("Method Not Allowed", { status: 405 });
}