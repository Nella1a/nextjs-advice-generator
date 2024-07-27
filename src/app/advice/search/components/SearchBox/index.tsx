type Props = {
  searchTerm: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBox = (props: Props) => {
  return (
    <input
      id="searchAdvice"
      type="search"
      value={props.searchTerm}
      onChange={props.onChangeHandler}
      className={'w-full h-10 text-black pl-2'}
    />
  );
};
export default SearchBox;
