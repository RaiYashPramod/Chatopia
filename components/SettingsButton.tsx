import { Settings } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface SettingsButtonProps {}

const SettingsButton: FC<SettingsButtonProps> = ({}) => {
  return (
    <Link
      href="/dashboard/settings"
      className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
    >
      <div className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex w-6 h-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medim bg-white">
        <Settings className="h-4 w-4" />
      </div>
      <p className="truncate">Settings</p>
    </Link>
  );
};

export default SettingsButton;
