import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const Chat = async () => {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  const handleInsert = async (payload: unknown) => {
    console.log("Change received!", payload);
  };

  if (userError || !userData?.user) {
    redirect("/login");
  }

  supabase
    .channel("Message")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "Message" },
      handleInsert,
    );

  return <div>Chat</div>;
};

export default Chat;
