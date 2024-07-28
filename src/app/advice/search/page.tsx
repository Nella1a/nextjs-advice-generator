'use client';

import MagnifyingGlass from '@/app/components/Icons/MagnifyingGlass';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { ErrorMessage } from '../random/page';
import SearchBox from './components/SearchBox';
import SearchResults from './components/SearchResult';

export interface AdviceToSave {
  id: number;
  advice: number;
  toSave?: boolean;
}

export interface SearchAdviceResponse {
  total_results: number;
  query: string;
  slips: AdviceToSave[];
}

// todo: find better solution for conditional fetch

const SearchAdvice = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState(false);
  const url = 'https://api.adviceslip.com/advice/search/';

  const fetcher = (args: string) => fetch(args).then((res) => res.json());

  const { data, mutate } = useSWR<SearchAdviceResponse | ErrorMessage>(
    searchTerm && search ? url + searchTerm : null,
    fetcher,
  );

  useEffect(() => {
    if (!searchTerm) {
      // Clear the cache when the search term is empty
      mutate(undefined, false);
      setSearch(false);
    }
  }, [searchTerm, mutate]);

  const onClickHandler = () => {
    if (searchTerm) setSearch(true);
  };

  const onChangeHandler = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
    setSearch(false);
  };

  return (
    <section className="max-w-screen-lg m-auto h-screen flex flex-col items-center justify-start gap-8 overflow-auto">
      <h1 className="text-3xl font-bold text-light-cyan mt-16">
        Search Advice
      </h1>
      <div className="flex justify-center items-center w-11/12 md:w-6/12">
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

      {data && 'message' in data ? (
        <h2 className="font-semibold w-full text-center mt-10 text-xl text-light-cyan">
          {data.message.text}
        </h2>
      ) : (
        data && data.slips?.length > 0 && <SearchResults result={data} />
      )}
    </section>
  );
};

export default SearchAdvice;
