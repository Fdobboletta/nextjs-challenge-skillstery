import Link from "next/link";

type NavBarOption = {
  label: string;
  path: string;
};

type NavBarProps = {
  options: NavBarOption[];
};

const Navbar = async (props: NavBarProps) => {
  return (
    <nav className="flex justify-between items-center bg-gray-950 text-white px-24 py-3 pl-8">
      <h1 className="text-xl font-bold">Message App</h1>

      <ul className="flex gap-x-2">
        {props.options.map((option) => (
          <li key={option.path}>
            <Link href={option.path}>{option.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
