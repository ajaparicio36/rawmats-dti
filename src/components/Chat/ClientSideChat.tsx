"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client"; // Note: Use client-side Supabase
import { Message } from "@prisma/client";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

const ChatClient = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    const supabase = createClient();

    // Update New Messages received from Payload to messages state

    // Create and subscribe to the channel
    const channel = supabase
      .channel("message")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Message" },
        (payload) => {
          const { new: newMessage, eventType } =
            payload as RealtimePostgresChangesPayload<Message>;
          if (eventType === "INSERT") {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          }
        },
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });

    // Cleanup subscription when component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Chat</h2>
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-3">Messages:</h3>
        <ul className="space-y-2">
          {messages.map((message) => (
            <li
              key={message.id}
              className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {message.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatClient;
