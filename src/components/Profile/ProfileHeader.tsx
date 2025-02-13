import { Pencil } from "lucide-react";

export default function ProfileHeader() {
  return (
    <div className="flex flex-col items-center text-center space-y-3">
      <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
      <h2 className="text-xl font-semibold">Sample</h2>
      <p className="text-gray-500">SampleLangE2@example.com</p>
      <button className="mt-2 flex items-center gap-2 px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition">
        <Pencil size={16} />
        Edit Profile
      </button>
    </div>
  );
}
