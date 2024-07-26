import Link from 'next/link';
import ButtonLarge from './components/ButtonLarge';

export default function Home() {
  return (
    <section className="border max-w-screen-lg m-auto h-screen flex flex-col items-center justify-center gap-12">
      <h1 className="text-2xl font-bold text-neon-green">Advice Generator</h1>
      <div className="flex flex-col justify-start gap-4 basis-2/5 md:flex-row md:items-start md:gap-6 ">
        <Link href="/advice/random">
          <ButtonLarge text={'Get Random Advice'} />
        </Link>
        <Link href="/advice/search">
          <ButtonLarge text={'Search Advice'} />
        </Link>
      </div>
    </section>
  );
}
