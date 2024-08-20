import prisma from '../../../prisma';
import XMark from '../components/Icons/XMark';
import AdviceCard from './adviceCard';

export interface SavedAdvice {
  id: number;
  externalId: number;
  advice: string;
  created: Date;
  user: number;
}

const SavedAdvices = async () => {
  const savedAdvice = await prisma.advice.findMany({
    where: {
      user: 2,
    },
  });

  const deleteAdviceHandler = () => {};

  return (
    <section className="max-w-screen-lg m-auto h-screen flex flex-col items-center justify-start gap-8">
      <h1 className="text-3xl font-bold text-light-cyan mt-16">
        Saved Advices
      </h1>
      <article className="flex flex-col justify-center items-center text-white mt-4 mx-4 gap-6 w-11/12 md:w-6/12">
        <AdviceCard advice={savedAdvice} />
      </article>
    </section>
  );
};

export default SavedAdvices;
