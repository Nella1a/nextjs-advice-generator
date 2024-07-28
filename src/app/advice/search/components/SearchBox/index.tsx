const SearchBox = ({
  searchTerm,
  onChangeHandler,
  onEnterHandler,
}: {
  searchTerm: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEnterHandler?: () => void;
}) => {
  return (
    <input
      id="searchAdvice"
      type="search"
      value={searchTerm}
      onChange={onChangeHandler}
      className={'w-full h-10 text-black px-2 rounded-l-lg'}
      onKeyDown={(event) =>
        onEnterHandler && event.key === 'Enter' && onEnterHandler()
      }
    />
  );
};
export default SearchBox;
