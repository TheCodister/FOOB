"use client";

import { useChat } from "@ai-sdk/react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
} from "@heroui/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Chat() {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col items-center w-full max-w-2xl py-10 mx-auto stretch">
      <Card className="w-[70vw]">
        <CardHeader>
          <h1 className="text-2xl font-bold">Foodie Bot</h1>
        </CardHeader>
        <CardBody>
          <div className="space-y-4 h-[60vh] overflow-y-auto p-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-4 ${
                  m.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {m.role === "user" ? (
                  <Avatar name="User" color="primary" className="hidden" />
                ) : (
                  <Avatar name="FB" />
                )}
                <div
                  className={`p-4 rounded-lg max-w-[70%] ${
                    m.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-zinc-100 dark:bg-zinc-800"
                  }`}
                >
                  {m.parts.map((part, i) => {
                    switch (part.type) {
                      case "text":
                        return (
                          <ReactMarkdown key={i}>{part.text}</ReactMarkdown>
                        );
                    }
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput("");
        }}
        className="flex items-center w-full mt-4"
      >
        <Input
          className="w-full"
          value={input}
          placeholder="Ask me about food..."
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <Button type="submit" className="ml-2">
          Send
        </Button>
      </form>
    </div>
  );
}
