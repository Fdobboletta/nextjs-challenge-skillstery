"use client";
import Link from "next/link";
import { routePaths } from "@/app/routePaths";
import { usePathname } from "next/navigation";

type SidebarOption = {
  label: string;
  path: string;
};

const sidebarOptions: SidebarOption[] = [
  { label: "Inbox", path: routePaths.inbox },
  { label: "Sent", path: routePaths.sent },
  { label: "Create New Message", path: routePaths.newMessage },
];

const Sidebar = () => {
  const currentPath = usePathname();
  return (
    <aside className="w-64 h-screen bg-gray-950 text-white flex flex-col p-6">
      <ul className="space-y-4">
        {sidebarOptions.map((option) => (
          <li key={option.path}>
            <Link
              href={option.path}
              className={`hover:text-gray-400 ${
                currentPath === option.path ? "font-bold text-gray-300" : ""
              }${
                option.path === routePaths.newMessage
                  ? "bg-stone-50 text-black"
                  : ""
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
