'use client';
import Heart from '@/app/components/Icons/Heart';
import { useEffect, useState } from 'react';
import { AdviceToSave, SearchAdviceResponse } from '../../page';
import Pagination from '../Pagination';

const SearchResults = ({ result }: { result: SearchAdviceResponse }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [initialResult, setInitialResult] = useState(result?.slips);
  const [toSave, setToSave] = useState<AdviceToSave>();
  const pageSize = 3;

  useEffect(() => {
    if (toSave?.toSave) {
      fetch('/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toSave),
      })
        .then((resp) => resp.json())
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
    }
  }, [toSave]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginate = (
    items: AdviceToSave[],
    pageNumber: number,
    pageSize: number,
  ) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  };

  const saveAdviceHandler = (adv: AdviceToSave, index: number) => {
    const newResult = initialResult.map((advice) => {
      if (advice.id === adv.id) {
        if (advice?.toSave) {
          advice.toSave = !true;
        } else {
          advice.toSave = true;
          setToSave(adv);
        }
      }
      return advice;
    });
    setInitialResult(newResult);
  };

  return (
    <>
      <article className="flex flex-col justify-center items-center text-white mt-4 mx-4 gap-6 w-11/12 md:w-6/12">
        {paginate(initialResult, currentPage, pageSize).map(
          (advice: AdviceToSave, index) => {
            return (
              <div
                key={`${advice.id}`}
                className="flex flex-col items-center gap-2 text-white-500  bg-dark-grayish-blue rounded-xl p-4 drop-shadow-xl w-full min-h-28 relative"
              >
                <span onClick={() => saveAdviceHandler(advice, index)}>
                  <Heart
                    className={`size-6 absolute top-2 right-3`}
                    fill={`${
                      advice.toSave && advice.toSave ? '#52ffa8' : 'none'
                    }`}
                  />
                </span>
                <span className={'text-neon-green font-bold'}>
                  #{advice.id}
                </span>
                {advice.advice}
              </div>
            );
          },
        )}
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
