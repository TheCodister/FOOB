"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Loader } from "@/components/ai-elements/loader";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Response } from "@/components/ai-elements/response";
import { useChat } from "@ai-sdk/react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { useState } from "react";

export default function Chat() {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState("");
  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    sendMessage({
      text: message.text || "Sent with attachments",
      files: message.files,
    });
    setInput("");
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl py-10 mx-auto stretch">
      <Card className="w-[70vw]">
        <CardHeader>
          <h1 className="text-2xl font-bold">Foodie Bot</h1>
        </CardHeader>
        <CardBody>
          <div className="space-y-4 h-[60vh] overflow-y-auto p-4">
            <Conversation>
              <ConversationContent>
                {messages.map((m) => (
                  <Message from={m.role} key={m.id}>
                    <MessageContent variant="contained">
                      {m.parts.map((part, i) => {
                        switch (part.type) {
                          case "text":
                            return (
                              <Response key={`${m.id}-${i}`}>
                                {part.text}
                              </Response>
                            );
                        }
                      })}
                    </MessageContent>
                  </Message>
                ))}
                {status === "submitted" && <Loader />}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>
          </div>
        </CardBody>
      </Card>
      <PromptInput onSubmit={handleSubmit} className="m-4 p-2">
        <PromptInputBody>
          <PromptInputTextarea
            value={input}
            placeholder="Say something..."
            onChange={(e) => setInput(e.currentTarget.value)}
            className="pr-12"
          />
          <PromptInputSubmit
            status={status === "streaming" ? "streaming" : "ready"}
            disabled={!input.trim()}
          />
        </PromptInputBody>
      </PromptInput>
    </div>
  );
}
