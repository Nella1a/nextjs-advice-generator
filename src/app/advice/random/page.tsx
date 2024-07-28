'use client';

import RoundButton from '@/app/components/RoundButton/roundButton';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export interface ErrorMessage {
  message: { type: string; text: string };
}

export interface RandomAdviceResponse {
  slip: { id: number; advice: string };
}

// todo: to many states, find better solution

const RandomAdvice = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [advice, setAdvice] = useState<RandomAdviceResponse | ErrorMessage>();

  const fetcher = (args: string) =>
    fetch(args).then((res) => {
      setShouldFetch(false);
      return res.json();
    });

  const { data, error } = useSWR<RandomAdviceResponse | ErrorMessage>(
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
      <h1 className="text-3xl font-bold text-light-cyan mt-16">
        Random Advice
      </h1>
      <div
        className="flex flex-col max-h-[15rem] w-11/12
      justify-start basis-3/4 gap-4
      bg-dark-grayish-blue rounded-xl relative p-6  text-center drop-shadow-xl md:w-7/12"
      >
        <h2 className=" text-neon-green  tracking-[0.2rem] text-center">
          {advice && 'slip' in advice && `ADVICE #${advice?.slip.id}`}
        </h2>

        <p className="w-full flex justify-center basis-2/5 items-start text-[20px] text-light-cyan m-auto font-semibold">
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
        <div className="flex justify-center">
          <RoundButton onClickHandler={onClickHandler} />
        </div>
      </div>
    </section>
  );
};

export default RandomAdvice;
