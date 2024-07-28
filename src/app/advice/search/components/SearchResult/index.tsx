import { RandomAdviceResponse } from '@/app/advice/random/page';
import { useState } from 'react';
import { SearchAdviceResponse } from '../../page';
import Pagination from '../Pagination';

const SearchResults = ({ result }: { result: SearchAdviceResponse }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginate = (
    items: RandomAdviceResponse[],
    pageNumber: number,
    pageSize: number,
  ) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  };

  return (
    <>
      <article className="border-2 flex flex-col justify-center items-center text-white mt-8 mx-4 gap-6 w-11/12 md:w-6/12">
        {paginate(result.slips, currentPage, pageSize).map((advice: any) => {
          return (
            <div
              key={`${advice.id}`}
              className="flex flex-col items-center gap-2 text-white-500  bg-dark-grayish-blue rounded-xl p-4 drop-shadow-xl w-full min-h-28"
            >
              <span className={'text-neon-green font-bold'}>#{advice.id} </span>
              {advice.advice}
            </div>
          );
        })}
      </article>
      <Pagination
        totalSearchResult={result.total_results}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default SearchResults;
