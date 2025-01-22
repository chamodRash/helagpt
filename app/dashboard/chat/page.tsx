"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "ai/react";

export default function Page() {
  const chat = useChat();
  console.log(chat);
  const { messages, input, handleInputChange, handleSubmit } = chat;

  return (
    <>
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? "User: " : "AI: "}
          {message.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <Input name="prompt" value={input} onChange={handleInputChange} />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}
