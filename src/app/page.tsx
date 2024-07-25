import Link from 'next/link';
import ButtonLarge from './components/ButtonLarge';

// export default function Home() {
//   return (
//     <section className="border w-screen h-screen flex flex-col justify-start items-center gap-4">
//       <h1 className="basis-1/4 mt-14 text-2xl font-bold text-neon-green">
//         Advice Generator
//       </h1>
//       <div className="basis-3/4 flex flex-col justify-start items-center gap-4">
//         <Link href="/advice/random">
//           <ButtonLarge text={'Get Random Advice'} />
//         </Link>
//         <Link href="/advice/search">
//           <ButtonLarge text={'Search Advice'} />
//         </Link>
//       </div>
//     </section>
//   );
// }

export default function Home() {
  return (
    <section className="border w-screen h-screen flex flex-col justify-center items-center gap-12">
      <h1 className="text-2xl font-bold text-neon-green">Advice Generator</h1>
      <div className="flex flex-col justify-center items-center gap-4 md:flex-row md:gap-6">
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
