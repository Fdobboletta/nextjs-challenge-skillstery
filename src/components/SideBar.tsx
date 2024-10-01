"use client";
import Link from "next/link";
import { routePaths } from "@/app/routePaths";
import { usePathname } from "next/navigation";

type SidebarOption = {
  label: string;
  path: string;
};

type SideBarProps = {
  options: SidebarOption[];
};

const Sidebar = (props: SideBarProps) => {
  const currentPath = usePathname();
  return (
    <aside className="w-64 h-screen bg-gray-950 text-white flex flex-col p-6">
      <ul className="space-y-4">
        {props.options.map((option) => (
          <li key={option.path}>
            <Link
              href={option.path}
              className={`flex items-center p-3 rounded-md transition-all duration-200 ${
                currentPath === option.path ? "font-bold text-gray-300" : ""
              } ${
                option.path === routePaths.newMessage
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "hover:bg-gray-800"
              }`}
            >
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
