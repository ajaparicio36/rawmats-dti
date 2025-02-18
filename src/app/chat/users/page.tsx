import prisma from "@/utils/prisma/client";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

const UsersList = async () => {
  const supabase = createClient();
  const { data: userData, error } = await supabase.auth.getUser();

  if (error || !userData?.user) {
    return <p>Please log in to start chatting.</p>;
  }

  const users = await prisma.user.findMany({
    where: { id: { not: userData.user.id } },
    select: { id: true, displayName: true, profilePicture: true },
  });

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Select a User to Chat</h2>
      <ul className="space-y-3">
        {users.map((user) => (
          <li key={user.id} className="flex items-center space-x-3">
            <Image
              src={user.profilePicture || "/avatar.png"}
              alt={user.displayName}
              className="rounded-full"
              width={40}
              height={40}
            />
            <Link
              href={`/chat/start/${user.id}`}
              className="text-lg font-semibold hover:underline"
            >
              {user.displayName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
