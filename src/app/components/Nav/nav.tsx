import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className="h-full max-w-screen-lg m-auto flex items-center">
      <ul className=" flex text-neon-green w-full mx-4 gap-4">
        <li className="hover:text-light-cyan">
          <Link href="/" data-testid={'nav-link-home'}>
            Home
          </Link>
        </li>
        <li className="ml-auto hover:text-light-cyan">
          <Link href="/advice/search" data-testid={'nav-link-search'}>
            Search
          </Link>
        </li>
        <li className="hover:text-light-cyan">
          <Link href="/advice/random" data-testid={'nav-link-random'}>
            Random
          </Link>
        </li>
        <li className="hover:text-light-cyan">
          <Link href="/saved" data-testid={'nav-link-saved'}>
            Saved
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
