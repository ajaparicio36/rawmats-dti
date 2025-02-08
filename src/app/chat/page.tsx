import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ChatClient from "@/components/Chat/ClientSideChat";

const Chat = async () => {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  console.log(userData);

  if (userError || !userData?.user) {
    redirect("/login");
  }

  return (
    <div>
      <ChatClient />
    </div>
  );
};

export default Chat;
