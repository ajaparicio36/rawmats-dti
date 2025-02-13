import ProfileHeader from "@/components/Profile/ProfileHeader";
import ProfileDetails from "@/components/Profile/ProfileDetails";

export default function ProfilePage() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
        <ProfileHeader />
        <ProfileDetails />
      </div>
    </div>
  );
}
