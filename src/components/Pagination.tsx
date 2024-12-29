import Link from "next/link";

interface PaginationProps {
  pages: number;
  pageNumber: number;
  route: string;
}

export const Pagination = ({ pageNumber, pages, route }: PaginationProps) => {
  let pagesArray: number[] = [];
  for (let i = 1; i <= pages; i++) pagesArray.push(i);
  const prev = pageNumber - 1;
  const next = pageNumber + 1;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {pageNumber !== 1 && (
        <Link
          href={`${route}?pageNumber=${prev}`}
          className="px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-purple-200 
                   text-purple-600 font-semibold hover:bg-purple-50 transition-all duration-200"
        >
          Prev
        </Link>
      )}
      {pagesArray.map((page) => (
        <Link
          href={`${route}?pageNumber=${page}`}
          key={page}
          className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200
                    ${
                      pageNumber === page
                        ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                        : "bg-white/80 backdrop-blur-sm border border-purple-200 text-purple-600 hover:bg-purple-50"
                    }`}
        >
          {page}
        </Link>
      ))}
      {pageNumber !== pages && (
        <Link
          href={`${route}?pageNumber=${next}`}
          className="px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-purple-200 
                   text-purple-600 font-semibold hover:bg-purple-50 transition-all duration-200"
        >
          Next
        </Link>
      )}
    </div>
  );
};
