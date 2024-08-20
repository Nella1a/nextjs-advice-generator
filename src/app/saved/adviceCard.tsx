'use client';

import { useEffect, useState } from 'react';
import XMark from '../components/Icons/XMark';
import { SavedAdvice } from './page';

const AdviceCard = ({ advice }: { advice: SavedAdvice[] }) => {
  const [toDelete, setToDelete] = useState<SavedAdvice>();
  const [filteredAdvice, setFilteredAdvice] = useState(advice);
  const [remove, setRemove] = useState(false);

  const deleteAdviceHandler = (toRemove: SavedAdvice) => {
    setToDelete(toRemove);
    setRemove(true);
  };

  useEffect(() => {
    if (remove) {
      fetch('/api/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toDelete),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.status === 200) {
            const newAdvice = filteredAdvice.filter(
              (advice) => advice.externalId !== toDelete?.externalId,
            );
            setFilteredAdvice(newAdvice);
          }
        })
        .catch((err) => console.log(err));
    }
    setRemove(false);
  }, [toDelete, filteredAdvice, remove]);

  return (
    <>
      {filteredAdvice.map((advice: any, index: any) => {
        return (
          <div
            key={`${advice.id}`}
            className="flex flex-col items-center gap-2 text-white-500  bg-dark-grayish-blue rounded-xl p-4 drop-shadow-xl w-full min-h-28 relative"
          >
            <span onClick={() => deleteAdviceHandler(advice)}>
              <XMark className={`size-6 absolute top-2 right-3 #52ffa8`} />
            </span>

            <span className={'text-neon-green font-bold'}>
              #{advice.externalId}
            </span>
            {advice.advice}
          </div>
        );
      })}
    </>
  );
};

export default AdviceCard;
