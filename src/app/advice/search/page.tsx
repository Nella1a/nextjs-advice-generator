'use client';

import Button from '@/app/components/Button';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import SearchBox from './components/SearchBox';
import SearchResults from './components/SearchResult';

export interface ErrorMessage {
  message: { type: string; text: string };
}

export interface SearchAdviceResponse {
  total_results: number;
  query: string;
  slips: { id: number; advice: string }[];
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

  const onClickHandler = () => {
    if (searchTerm) {
      console.log('onlick');
      setSearch(true);
    }
  };
  console.log('data: ', data);
  console.log('advice', advice);
  const onChangeHandler = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  return (
    <section className="border-2 max-w-screen-lg m-auto h-screen flex flex-col items-center justify-start gap-8">
      <h1 className="text-xl font-bold text-neon-green mt-32">Search Advice</h1>
      <div className="border-2 flex justify-center items-center w-11/12 md:w-6/12">
        <SearchBox searchTerm={searchTerm} onChangeHandler={onChangeHandler} />
        <button onClick={onClickHandler}>
          <Button text={'Search'} addCss="w-14 h-10" />
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
