// type Props = {
//   result: SearchAdviceType;
// };

const SearchResults = ({ result }: any) => {
  return (
    <article className="border-2 flex flex-col justify-center items-center text-white mt-8 mx-4 gap-6 w-11/12 md:w-6/12">
      {result.slips.map((advice: any) => {
        return (
          <div
            key={`${advice.id}`}
            className="flex flex-col items-center gap-2 text-white-500  bg-dark-grayish-blue rounded-xl font-manrope p-4 drop-shadow-xl w-full min-h-28"
          >
            <span className={'text-neon-green font-bold'}>#{advice.id} </span>
            {advice.advice}
          </div>
        );
      })}
    </article>
  );
};

export default SearchResults;
