import Link from "next/link";

type NavBarOption = {
  label: string;
  path: string;
};

type NavBarProps = {
  options: NavBarOption[];
  userEmail?: string | null;
};

const Navbar = async (props: NavBarProps) => {
  return (
    <nav className="flex justify-between items-center bg-gray-950 text-white px-8 py-4 shadow-md">
      <h1 className="text-2xl font-bold tracking-wide">Message App</h1>
      {props.userEmail && (
        <p className="text-sm text-gray-400">
          Logged in as: <span className="font-semibold">{props.userEmail}</span>
        </p>
      )}
      <ul className="flex gap-x-6">
        {props.options.map((option) => (
          <li key={option.path}>
            <Link
              href={option.path}
              className="text-white hover:text-blue-400 transition duration-200"
            >
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
