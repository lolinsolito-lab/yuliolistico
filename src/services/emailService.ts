
import { AiRecommendation } from '../types';
import { generateLeadEmail } from '../utils/emailTemplates';

/**
 * Service to handle transactional emails.
 * Currently configured to simulate sending in development.
 * 
 * FUTURE: Connect this to a Supabase Edge Function or Next.js API route 
 * to securely use the Resend API Key.
 */
export const sendLeadEmail = async (email: string, name: string, result: AiRecommendation): Promise<boolean> => {

    // 1. Generate the HTML Content
    const htmlContent = generateLeadEmail(name, result);

    // 2. CHECK: Is there a backend configured? (Mock check)
    // In a real app, we would fetch("/api/send-email", { method: "POST", body: ... })
    const SIMULATE_SENDING = true;

    if (SIMULATE_SENDING) {
        console.group("📧 EMAIL SERVICE SIMULATION");
        console.log(`To: ${email}`);
        console.log(`Subject: ${name}, il tuo Rituale Yuli`);
        console.log("--- HTML PREVIEW ---");
        console.log(htmlContent.substring(0, 100) + "...");
        console.groupEnd();

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return true;
    }

    try {
        // FUTURE IMPLEMENTATION FOR SUPABASE EDGE FUNCTION
        /*
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({
                to: email,
                subject: `${name}, il tuo Rituale Yuli`,
                html: htmlContent
            })
        });
        
        if (!response.ok) throw new Error('Email sending failed');
        return true;
        */
        return false;
    } catch (error) {
        console.error("Email Service Error:", error);
        return false;
    }
};
