import { Settings } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface SettingsButtonProps {}

const SettingsButton: FC<SettingsButtonProps> = ({}) => {
  return (
    <Link
      href="/dashboard/settings"
      className="text-gray-700 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-200 hover:bg-gray-50 dark:hover:bg-slate-700 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
    >
      <div className="text-gray-400 dark:text-gray-200 border-gray-200 dark:border-gray-400 group-hover:border-indigo-600 dark:group-hover:border-indigo-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-200 flex w-6 h-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medim bg-white dark:bg-slate-800">
        <Settings className="h-4 w-4" />
      </div>
      <p className="truncate">Settings</p>
    </Link>
  );
};

export default SettingsButton;
