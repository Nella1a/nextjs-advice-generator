const Pagination = ({
  totalSearchResult,
  pageSize,
  onPageChange,
}: {
  totalSearchResult: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}) => {
  const pagesCount = Math.ceil(totalSearchResult / pageSize);
  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  return (
    <div>
      <ul className="flex gap-6">
        {pages.map((page) => (
          <li
            key={page}
            className="text-light-cyan cursor-pointer hover:text-neon-green "
          >
            <a onClick={() => onPageChange(page)}>{page}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
