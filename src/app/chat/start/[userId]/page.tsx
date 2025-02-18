import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma/client";

const StartChat = async ({ params }: { params: { userId: string } }) => {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    redirect("/login");
  }

  if (userData.user.id === params.userId) {
    redirect("/chat/users");
  }

  let conversation = await prisma.conversation.findFirst({
    where: {
      AND: [
        { participants: { some: { userId: userData.user.id } } },
        { participants: { some: { userId: params.userId } } },
      ],
    },
  });

  if (!conversation) {
    conversation = await prisma.conversation.create({
      data: {
        participants: {
          create: [
            { user: { connect: { id: userData.user.id } } },
            { user: { connect: { id: params.userId } } },
          ],
        },
      },
    });
  }

  redirect(`/chat/${conversation.id}`);
};

export default StartChat;
