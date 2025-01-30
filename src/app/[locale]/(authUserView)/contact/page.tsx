"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactPage: React.FC = () => {
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
    <div className="min-h-screen flex items-center justify-center">
      <Card>
        <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">
          Contact Us
        </h1>
        <p className="text-gray-600 dark:text-white mb-6">
          Reach out to us for any inquiries or feedback. We&apos;re here to
          help!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            name="name"
          />
          <Input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            name="email"
          />
          <Textarea
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            name="message"
          />
          <Button text="Send Message" type="submit" />
        </form>
      </Card>
    </div>
  );
};

export default ContactPage;
