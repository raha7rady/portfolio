export type ContactFormInput = {
  name: string;
  email: string;
  message: string;
};

export type ContactFormResult =
  | { success: true }
  | { success: false; errors: string[] };

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export async function submitContactForm(
  input: ContactFormInput,
): Promise<ContactFormResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (response.ok) {
      return { success: true };
    }

    const data = (await response.json().catch(() => null)) as
      | { errors?: string[] }
      | null;

    return {
      success: false,
      errors: data?.errors ?? ["ارسال پیام با خطا مواجه شد. دوباره تلاش کنید."],
    };
  } catch {
    return {
      success: false,
      errors: ["ارتباط با سرور برقرار نشد. اتصال اینترنت خود را بررسی کنید."],
    };
  }
}
