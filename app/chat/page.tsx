"use client";

import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { AppNav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { localCoachReply } from "@/lib/generators";

type Message = { id: string; message: string; response: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  async function load() {
    const response = await fetch("/api/chat");
    if (response.ok) setMessages(await response.json());
  }
  useEffect(() => { load(); }, []);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form));
    const message = String(body.message);
    const instantMessage: Message = {
      id: `local-${Date.now()}`,
      message,
      response: localCoachReply(message)
    };
    setMessages((current) => [...current, instantMessage]);
    form.reset();

    try {
      const response = await fetch("/api/chat", { method: "POST", body: JSON.stringify(body) });
      if (response.ok) {
        const saved = await response.json();
        setMessages((current) => current.map((item) => (item.id === instantMessage.id ? saved : item)));
      }
    } catch {
      // Keep the instant local coach reply visible if the API is unavailable.
    }
    setLoading(false);
  }
  return (
    <main className="min-h-screen bg-red-radial pb-28 lg:pb-0 lg:pl-72">
      <AppNav />
      <section className="mx-auto flex min-h-screen max-w-4xl flex-col px-4 py-8">
        <h1 className="text-4xl font-black">AI Fitness Chatbot</h1>
        <p className="mt-2 text-white/60">Ask a fitness question and get an immediate coaching reply.</p>
        <Card className="mt-6 flex flex-1 flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto pr-1">
            {messages.map((item) => (
              <div key={item.id} className="space-y-2">
                <p className="ml-auto max-w-[82%] rounded-lg bg-gym-red px-4 py-3 text-sm font-medium">{item.message}</p>
                <p className="max-w-[88%] rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/78">{item.response}</p>
              </div>
            ))}
          </div>
          <form onSubmit={submit} className="mt-5 flex gap-3">
            <Input name="message" placeholder="Ask about workouts, diet, weight loss, muscle gain..." required />
            <Button disabled={loading}><Send className="h-4 w-4" /></Button>
          </form>
        </Card>
      </section>
    </main>
  );
}
