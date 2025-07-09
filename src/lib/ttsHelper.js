// Helper function to generate personalized greeting text
export const generateGreetingText = (userName) => {
  const firstName = userName.split(' ')[0]; // Get first name
  return `Hi ${firstName}! My name is Hugo the Hippo, and I'm your Form Buddy!

I'm here to help you understand any form, without the headache. You can send me a screenshot of a form, upload a document like a PDF, or even give me a website link, and I'll read the form inside it for you.

Need to know what a form is asking, or what it means before you fill it out? I've got your back! I'll explain the form to you in simple words so you can feel confident and clear before you fill in anything.

So whenever you feel stuck with a form, just call me, Hugo the Hippo, your Form Buddy, and let's figure it out together!`;
};

// Helper function to call the TTS API
export const generateTTSGreeting = async (userName, userId) => {
  try {
    const greetingText = generateGreetingText(userName);
    
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: greetingText,
        userId: userId,
      }),
    });

    if (!response.ok) {
      throw new Error(`TTS API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating TTS greeting:', error);
    throw error;
  }
};
