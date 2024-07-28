'use client';

import MagnifyingGlass from '@/app/components/Icons/MagnifyingGlass';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { ErrorMessage, RandomAdviceResponse } from '../random/page';
import SearchBox from './components/SearchBox';
import SearchResults from './components/SearchResult';

export interface SearchAdviceResponse {
  total_results: number;
  query: string;
  slips: RandomAdviceResponse[];
}

// todo: to many states, find better solution

const SearchAdvice = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState(false);
  const [advice, setAdvice] = useState<SearchAdviceResponse | ErrorMessage>();

  const fetcher = (args: string) =>
    fetch(args).then((res) => {
      return res.json();
    });

  const { data } = useSWR<SearchAdviceResponse | ErrorMessage>(
    searchTerm && search
      ? `https://api.adviceslip.com/advice/search/${searchTerm}`
      : null,
    fetcher,
  );
  useEffect(() => {
    if (data) {
      setAdvice(data);
      setSearch(false);
    }
  }, [data]);

  useEffect(() => {
    if (!searchTerm) setAdvice(undefined);
  }, [searchTerm]);

  const onClickHandler = () => {
    if (searchTerm) setSearch(true);
  };

  console.log('data: ', data);
  console.log('advice', advice);
  const onChangeHandler = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  return (
    <section className="border-2 max-w-screen-lg m-auto h-screen flex flex-col items-center justify-start gap-8 overflow-auto">
      <h1 className="text-3xl font-bold text-light-cyan mt-16">
        Search Advice
      </h1>
      <div className="border-2 flex justify-center items-center w-11/12 md:w-6/12">
        <SearchBox
          searchTerm={searchTerm}
          onChangeHandler={onChangeHandler}
          onEnterHandler={onClickHandler}
        />
        <button
          onClick={onClickHandler}
          className={`w-14 h-10 flex justify-center items-center text-center text-dark-blue font-manrope bg-neon-green font-bold rounded-r-xl hover:bg-light-cyan`}
        >
          <MagnifyingGlass />
        </button>
      </div>

      {advice && 'message' in advice ? (
        <h2 className="font-semibold w-full text-center mt-10 text-xl text-light-cyan">
          {advice.message.text}
        </h2>
      ) : (
        advice && advice.slips?.length > 0 && <SearchResults result={advice} />
      )}
    </section>
  );
};

export default SearchAdvice;
