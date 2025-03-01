import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { prompt, userId } = await request.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ success: false, message: 'Prompt is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create a new playground prompt entry
    await prisma.playgroundPrompt.create({
      data: {
        prompt,
        userId: userId || null,
      },
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Prompt saved successfully' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in playground API:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'An error occurred while processing your request' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}