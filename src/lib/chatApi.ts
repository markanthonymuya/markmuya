import { InquiryPayload } from '@/types';

// Web3Forms access key — safe to be public (only allows sending TO your registered email)
// Get yours free at https://web3forms.com using markmuya@outlook.com
const WEB3FORMS_KEY = 'd1eb3579-6676-42c2-9445-ecf6a87bef48';

export async function saveInquiry(payload: InquiryPayload): Promise<{ ok: boolean; message: string }> {
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key:  WEB3FORMS_KEY,
        subject:     `Portfolio Inquiry — ${payload.intent}`,
        from_name:   payload.name,
        reply_to:    payload.email,
        name:        payload.name,
        email:       payload.email,
        intent:      payload.intent,
        message:     payload.message,
        botcheck:    '',
      }),
    });

    const data = await res.json();
    return {
      ok:      data.success === true,
      message: data.message ?? 'Sent',
    };
  } catch (err) {
    console.error('[ChatAPI]', err);
    return {
      ok:      false,
      message: 'Could not send. Please email markmuya@outlook.com directly.',
    };
  }
}
