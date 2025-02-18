"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import type { Message } from "@prisma/client";
import { MessageType } from "@/types/types";
import type { RealtimeChannel } from "@supabase/supabase-js";

interface ChatClientProps {
  userId: string;
  conversationId: string;
}

interface MessageWithUser extends Message {
  user: { displayName: string; profilePicture: string };
}

interface TypingUser {
  userId: string;
  displayName: string;
}

const ChatClient: React.FC<ChatClientProps> = ({ userId, conversationId }) => {
  const [messages, setMessages] = useState<MessageWithUser[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [typingUser, setTypingUser] = useState<TypingUser | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("Message")
        .select(`*, user:userId (displayName, profilePicture)`)
        .eq("conversationId", conversationId)
        .order("createdAt", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
        return;
      }

      setMessages(data || []);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    };

    const setupRealtimeSubscription = () => {
      const channel = supabase.channel(`chat-${conversationId}`, {
        config: { presence: { key: userId } },
      });

      channel.on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Message",
          filter: `conversationId=eq.${conversationId}`,
        },
        async (payload) => {
          const { data: userData, error: userError } = await supabase
            .from("User")
            .select("displayName, profilePicture")
            .eq("id", (payload.new as Message).userId)
            .single();

          if (userError) {
            console.error("Error fetching user data:", userError);
            return;
          }

          const newMessage: MessageWithUser = {
            ...(payload.new as Message),
            user: userData as { displayName: string; profilePicture: string },
          };

          setMessages((prev) => [...prev, newMessage]);
          setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        },
      );

      channel.on("presence", { event: "sync" }, () => {
        const presenceState = channel.presenceState();
        const allPresence = Object.values(presenceState).flat();

        const allTypingUsers: TypingUser[] = allPresence
          .filter(
            (presence) =>
              presence && "userId" in presence && "displayName" in presence,
          )
          .map((presence) => ({
            userId: presence.userId,
            displayName: presence.displayName,
          }));

        const otherTypingUser = allTypingUsers.find(
          (user) => user.userId !== userId,
        );
        setTypingUser(otherTypingUser || null);
      });

      channel.subscribe((status) => {
        if (status === "SUBSCRIBED") {
          channelRef.current = channel;
        }
      });

      return () => {
        channel.unsubscribe();
      };
    };

    fetchMessages();
    const unsubscribe = setupRealtimeSubscription();

    return () => {
      unsubscribe();
    };
  }, [conversationId, supabase, userId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMessageId = crypto.randomUUID();

    const { error } = await supabase.from("Message").insert({
      id: newMessageId,
      content: newMessage,
      userId: userId,
      conversationId: conversationId,
      messageType: MessageType.TEXT,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    if (error) {
      console.error("Error sending message:", error);
      return;
    }

    setNewMessage("");
  };

  const handleTyping = async () => {
    if (channelRef.current) {
      await channelRef.current.track({
        userId,
        displayName:
          messages.find((msg) => msg.userId === userId)?.user.displayName ||
          "Unknown",
      });
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow p-4 max-h-[60vh] overflow-y-auto">
        <ul className="space-y-2">
          {messages.map((message) => (
            <li
              key={message.id}
              className={`p-3 rounded-lg ${message.userId === userId ? "bg-blue-100 ml-auto" : "bg-gray-100"}`}
            >
              <div>
                <strong>{message.user?.displayName || "Unknown"}:</strong>{" "}
                {message.content}
              </div>
            </li>
          ))}
        </ul>
        <div ref={messagesEndRef} />
      </div>
      {typingUser && (
        <p className="text-sm text-gray-500">
          {typingUser.displayName} is typing...
        </p>
      )}
      <form onSubmit={handleSendMessage} className="mt-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            handleTyping();
          }}
          className="w-full p-2 border rounded"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatClient;
