"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { submitContactForm } from "@/lib/api";
import { useLocale } from "@/hooks/useLocale";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const { dict } = useLocale();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<string[]>([]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors([]);

    const result = await submitContactForm({ name, email, message });

    if (result.success) {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      return;
    }

    // خطاهای Validation از بک‌اند همیشه فارسی برمی‌گردند (طبق تصمیم فاز ۶، ترجمه بک‌اند
    // خارج از محدوده این فاز است). برای خطای شبکه، پیام کاملاً از دیکشنری locale فعلی می‌آید.
    setStatus("error");
    if (result.kind === "network") {
      setErrors([dict.contact.networkError]);
    } else {
      setErrors(result.errors.length > 0 ? result.errors : [dict.contact.genericError]);
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm text-muted">
          {dict.contact.nameLabel}
        </label>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm text-muted">
          {dict.contact.emailLabel}
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm text-muted">
          {dict.contact.messageLabel}
        </label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>

      {status === "error" && errors.length > 0 && (
        <ul className="space-y-1 rounded-card border border-danger/40 bg-danger/10 p-4 text-sm text-danger">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      {status === "success" && (
        <p className="rounded-card border border-success/40 bg-success/10 p-4 text-sm text-success">
          {dict.contact.successMessage}
        </p>
      )}

      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {isSubmitting ? dict.contact.submitting : dict.contact.submit}
      </Button>
    </form>
  );
}
