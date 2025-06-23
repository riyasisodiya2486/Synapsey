// Search.tsx
import { SearchIcon } from "../icons/SearchIcon";

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function Search({ searchTerm, setSearchTerm }: SearchProps) {
  return (
    <div className="relative w-full sm:w-80 mt-6 flex justify-center items-center">
      <span className="absolute  left-0 top-3 flex items-center pl-3">
        <SearchIcon />
      </span>
      <input
        type="text"
        placeholder="Search the content.."
        className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 w-full sm:w-80 mb-6 pl-10"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
