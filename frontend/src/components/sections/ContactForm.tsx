"use client";

import { useState, type FormEvent } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { useLocale } from "@/hooks/useLocale";
import { submitContactForm } from "@/lib/api";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const { dict } = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<string[]>([]);
  const [errorKind, setErrorKind] = useState<"validation" | "network" | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors([]);
    setErrorKind(null);

    const result = await submitContactForm(form);

    if (result.success) {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      return;
    }

    setStatus("error");
    setErrors(result.errors);
    setErrorKind(result.kind);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold text-foreground">{dict.contact.formTitle}</h2>

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
          {dict.contact.nameLabel}
        </label>
        <Input
          id="name"
          required
          value={form.name}
          placeholder={dict.contact.namePlaceholder}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
          {dict.contact.emailLabel}
        </label>
        <Input
          id="email"
          type="email"
          required
          value={form.email}
          placeholder={dict.contact.emailPlaceholder}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
          {dict.contact.messageLabel}
        </label>
        <Textarea
          id="message"
          required
          rows={5}
          value={form.message}
          placeholder={dict.contact.messagePlaceholder}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={status === "submitting"}
        icon={status === "submitting" ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
      >
        {status === "submitting" ? dict.contact.submitting : dict.contact.submit}
      </Button>

      {status === "success" && (
        <p className="flex items-start gap-2 rounded-xl border border-success/30 bg-success/10 p-3 text-sm text-success">
          <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
          <span>{dict.contact.successMessage}</span>
        </p>
      )}

      {status === "error" && (
        <div className="rounded-xl border border-danger/30 bg-danger/10 p-3 text-sm text-danger">
          <p className="flex items-start gap-2">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>
              {errorKind === "network" ? dict.contact.networkError : dict.contact.genericError}
            </span>
          </p>
          {errors.length > 0 && (
            <ul className="mt-2 list-inside list-disc space-y-1 ps-1">
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </form>
  );
}
