import prisma from './prisma';

export const saveWaitlistEmail = async (email: string) => {
  try {
    await prisma.waitlistEntry.create({
      data: { email }
    });
    return { success: true };
  } catch (error) {
    console.error('Error saving waitlist email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

export const savePlaygroundPrompt = async (prompt: string, userId?: string) => {
  try {
    await prisma.playgroundPrompt.create({
      data: { prompt, userId }
    });
    return { success: true };
  } catch (error) {
    console.error('Error saving playground prompt:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

export const saveUserData = async (userId: string, email: string) => {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!existingUser) {
      await prisma.user.create({
        data: { clerkId: userId, email }
      });
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error saving user data:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};