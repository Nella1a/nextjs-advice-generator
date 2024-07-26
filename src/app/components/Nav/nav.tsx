import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className="border border-neon-green h-full max-w-screen-lg m-auto flex items-center">
      <ul className=" flex text-neon-green w-full mx-4 gap-8">
        <li className="border border-white hover:text-light-cyan">
          <Link href="/">Home</Link>
        </li>
        <li className="border border-white ml-auto hover:text-light-cyan">
          <Link href="/advice/search">Search</Link>
        </li>
        <li className="hover:text-light-cyan">
          <Link href="/advice/search">Random</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
