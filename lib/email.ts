import { CreateEmailOptions, Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY

if (!RESEND_API_KEY) {
    throw new Error("Resend api key is missing or incorrect, it is required for sending emails, please fix it!")
}

export const resend = new Resend(RESEND_API_KEY);

export const sendEmail = async (props: CreateEmailOptions) => {
  try {
    if (!props.from) {
      // Use your verified domain in prod:
      // props.from = 'Your App <no-reply@yourdomain.com>'
      props.from = 'Your App <onboarding@resend.dev>'; // sandbox sender for testing
    }

    const result = await resend.emails.send(props);

    // Resend returns { id: '...' } on success. Optionally assert:
    if (!result?.data?.id) {
      throw new Error(`Resend returned no id: ${JSON.stringify(result)}`);
    }

    return result;
  } catch (err: any) {
    // Try to surface the structured payload Resend provides
    const details =
      err?.response?.data ??
      err?.error ??
      err?.message ??
      err;

    // Log the full error server-side for debugging
    console.error('[Resend] send failed:', {
      name: err?.name,
      statusCode: err?.statusCode,
      response: err?.response?.data,
      message: err?.message,
      stack: err?.stack,
    });

    throw new Error(`Failed to send email via Resend: ${JSON.stringify(details)}`);
  }
};