import Link from 'next/link';
import Button from './components/Button';

export default function Home() {
  return (
    <section className="max-w-screen-lg m-auto h-screen flex flex-col items-center justify-center gap-12">
      <h1 className="text-3xl font-bold text-light-cyan">Advice Generator</h1>
      <div className="flex flex-col justify-start gap-4 basis-2/5 md:flex-row md:items-start md:gap-6 ">
        <Link href="/advice/random">
          <Button text={'Random Advice'} addCss={'w-44 h-12 rounded-md'} />
        </Link>
        <Link href="/advice/search">
          <Button text={'Search Advice'} addCss={'w-44 h-12 rounded-md'} />
        </Link>
      </div>
    </section>
  );
}
