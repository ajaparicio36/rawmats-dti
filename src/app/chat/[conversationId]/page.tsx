import ChatClient from "@/components/Chat/ClientSideChat";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma/client";

const Chat = async ({ params }: { params: { conversationId: string } }) => {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    redirect("/login");
  }

  const conversation = await prisma.conversation.findUnique({
    where: { id: params.conversationId },
    include: {
      participants: { include: { user: true } },
    },
  });

  if (
    !conversation ||
    !conversation.participants.some((p) => p.userId === userData.user.id)
  ) {
    redirect("/chat/users");
  }

  const otherUser = conversation.participants.find(
    (p) => p.userId !== userData.user.id,
  )?.user;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Chat with {otherUser?.displayName}
      </h2>
      <ChatClient
        userId={userData.user.id}
        conversationId={params.conversationId}
      />
    </div>
  );
};

export default Chat;
