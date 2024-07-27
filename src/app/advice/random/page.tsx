'use client';

import Button from '@/app/components/Button';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export interface ErrorMessage {
  message: { type: string; text: string };
}

export interface RandomAdvice {
  slip: { id: number; advice: string };
}

// todo: to many states, find better solution

const RandomAdvice = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [advice, setAdvice] = useState<RandomAdvice | ErrorMessage>();

  const fetcher = (args: string) =>
    fetch(args).then((res) => {
      setShouldFetch(false);
      return res.json();
    });

  const { data, error } = useSWR<RandomAdvice | ErrorMessage>(
    shouldFetch ? 'https://api.adviceslip.com/advice' : null,
    fetcher,
  );

  const onClickHandler = () => {
    setIsLoading(true);
    setTimeout(() => {
      //Note: Advice is cached for 2 seconds. Any repeat-request within 2 seconds will return the same piece of advice.
      setShouldFetch(true);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (data) setAdvice(data);
  }, [data]);

  return (
    <section className="max-w-screen-lg m-auto h-screen flex flex-col items-center justify-start gap-8">
      <h1 className="text-xl font-bold text-neon-green mt-32">Random Advice</h1>
      <div
        className="flex flex-col max-h-[15rem] w-11/12
      justify-start basis-3/4 gap-4
      bg-dark-grayish-blue rounded-md relative font-manrope p-4  text-center drop-shadow-xl md:w-7/12"
      >
        <h2 className=" text-neon-green  text-center font-semibold text-base">
          {advice && 'slip' in advice && `# ${advice?.slip.id}`}
        </h2>

        <p className="w-full flex justify-center basis-2/5 items-start text-quote-size text-neon-green  m-auto font-semibold">
          {isLoading ? (
            <span>is loading...</span>
          ) : !advice ? (
            <span className="text-light-cyan">
              There is currently no advice!
            </span>
          ) : advice && 'message' in advice ? (
            <span className={'text-red-600'}>
              Something went wrong. Please try again!
              {error?.message.text}
            </span>
          ) : (
            <span> &#8220;{advice?.slip.advice}&#8221;</span>
          )}
        </p>
      </div>

      <div className="flex justify-center">
        <button onClick={onClickHandler}>
          <Button text={'Get Advice'} addCss={'w-32 h-12 rounded-md'} />
        </button>
      </div>
    </section>
  );
};

export default RandomAdvice;
