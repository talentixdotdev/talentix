"use client";

import { useState } from "react";
import { Button, Heading } from "ui";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { CheckListIcon, MailSend01Icon } from "hugeicons-react";

export function ContactForm() {
  const t = useTranslations("content.contact.form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement)?.value,
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement)?.value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)?.value,
    };

    try {
      const res = await fetch("/api/contact-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Error");
      setIsSubmitted(true);
      form.reset();
    } catch (err) {
      // Puedes mostrar un error aquí si quieres
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-tertiary border border-dashed border-muted p-8 rounded-xl shadow-sm"
    >
      <Heading level={3} className="mb-6">
        {t("title")}
      </Heading>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium block">
            {t("name.label")}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={t("name.placeholder")}
            className="w-full h-10 px-3 rounded-md border border-border bg-bg text-fg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium block">
            {t("email.label")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={t("email.placeholder")}
            className="w-full h-10 px-3 rounded-md border border-border bg-bg text-fg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium block">
            {t("subject.label")}
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder={t("subject.placeholder")}
            className="w-full h-10 px-3 rounded-md border border-border bg-bg text-fg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium block">
            {t("message.label")}
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            placeholder={t("message.placeholder")}
            className="w-full p-3 rounded-md border border-border bg-bg text-fg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
          />
        </div>
        
        <Button 
          type="submit" 
          intent="primary" 
          className="w-full items-center justify-center gap-2"
          isDisabled={isSubmitting || isSubmitted}
        >
          {isSubmitting ? (
            <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent" />
          ) : isSubmitted ? (
            <>
              <CheckListIcon size={18} />
              {t("success")}
            </>
          ) : (
            <>
              <MailSend01Icon size={18} />
              {t("submit")}
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
}
