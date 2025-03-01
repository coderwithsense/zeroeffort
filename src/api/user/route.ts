import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { userId, email } = await request.json();

    if (!userId || !email) {
      return new Response(
        JSON.stringify({ success: false, message: 'User ID and email are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (existingUser) {
      // Update existing user
      await prisma.user.update({
        where: { id: userId },
        data: { email },
      });
    } else {
      // Create a new user
      await prisma.user.create({
        data: {
          id: userId,
          email,
        },
      });
    }

    return new Response(
      JSON.stringify({ success: true, message: 'User data saved successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in user API:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'An error occurred while processing your request' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}