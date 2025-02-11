"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";

const ContactPage: React.FC = () => {
  const t = useTranslations("Contact");

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message.");
    }
  };

  return (
    <>
      <h2
        data-cy="product-list-title"
        className="text-3xl sm:text-5xl md:text-8xl  m-5 dark:text-white text-black font-bold animate-rise0_25s"
      >
        {t("title")}
      </h2>
      <div className="flex items-center justify-center text-black dark:text-white">
        <Card>
          <p className="text-gray-600 dark:text-white mb-6">{t("body")}</p>
          <p className="text-gray-600 dark:text-white mb-6">
            {`${t("phone")}: +995 555 12-34-56`}
          </p>
          <p className="text-gray-600 dark:text-white mb-6">
            {`${t("email")}: contact@killers.ge`}
          </p>
          <p className="text-gray-600 dark:text-white mb-6">
            {t("sendMessage")}
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder={t("your_name")}
              value={form.name}
              onChange={handleChange}
              name="name"
            />
            <Input
              type="email"
              placeholder={t("your_email")}
              value={form.email}
              onChange={handleChange}
              name="email"
            />
            <Textarea
              placeholder={t("your_message")}
              value={form.message}
              onChange={handleChange}
              name="message"
            />
            <Button text={t("send_message")} type="submit" />
          </form>
        </Card>
      </div>
    </>
  );
};

export default ContactPage;
