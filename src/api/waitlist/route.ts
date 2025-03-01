import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return new Response(
        JSON.stringify({ success: false, message: 'Email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if the email already exists
    const existingEmail = await prisma.waitlistEntry.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return new Response(
        JSON.stringify({ success: true, message: 'Email already on waitlist' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create a new waitlist entry
    await prisma.waitlistEntry.create({
      data: { email },
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Added to waitlist successfully' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in waitlist API:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'An error occurred while processing your request' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}