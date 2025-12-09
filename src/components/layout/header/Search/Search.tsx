// "use client";
// import { useState, useRef, useCallback } from "react";
// import { SearchIcon, ClearIcon } from "@/components/icons";

// interface SearchProps {
//   variant?: "desktop" | "mobile";
//   onSearch: (value: string) => void;
// }

// export const Search: React.FC<SearchProps> = ({
//   variant = "desktop",
//   onSearch,
// }) => {
//   const [searchValue, setSearchValue] = useState("");
//   const inputRef = useRef<HTMLInputElement>(null);

//   const handleSubmit = useCallback(
//     (e: React.FormEvent) => {
//       e.preventDefault();
//       onSearch(searchValue);
//     },
//     [searchValue, onSearch]
//   );

//   const handleClear = useCallback(() => {
//     setSearchValue("");
//     inputRef.current?.focus();
//   }, []);

//   if (variant === "desktop") {
//     return (
//       <form onSubmit={handleSubmit} className="desktop-search-form">
//         <div className="desktop-search-wrapper">
//           <input
//             ref={inputRef}
//             type="text"
//             placeholder="Поиск..."
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//             className="desktop-search-input"
//             aria-label="Поиск по сайту"
//           />
//           {searchValue && (
//             <button
//               type="button"
//               className="desktop-search-clear"
//               onClick={handleClear}
//               aria-label="Очистить поиск"
//             >
//               <ClearIcon />
//             </button>
//           )}
//           <button type="submit" className="desktop-search-button">
//             <SearchIcon />
//           </button>
//         </div>
//       </form>
//     );
//   }

//   // Mobile variant
//   return (
//     <form onSubmit={handleSubmit} className="mobile-search-form">
//       <div className="search-input-wrapper">
//         <input
//           ref={inputRef}
//           type="text"
//           placeholder="Поиск по сайту..."
//           value={searchValue}
//           onChange={(e) => setSearchValue(e.target.value)}
//           className="mobile-search-input"
//           aria-label="Поиск по сайту"
//         />
//         {searchValue && (
//           <button
//             type="button"
//             className="mobile-search-clear"
//             onClick={handleClear}
//             aria-label="Очистить поиск"
//           >
//             <ClearIcon />
//           </button>
//         )}
//         <button type="submit" className="mobile-search-button">
//           <SearchIcon />
//         </button>
//       </div>
//     </form>
//   );
// };

"use client";
import { useState, useRef, useCallback } from "react";
import { SearchIcon, ClearIcon } from "@/components/icons";

interface SearchProps {
  variant?: "desktop" | "mobile";
  onSearch: (value: string) => void;
  onClear?: () => void;
}

export const Search: React.FC<SearchProps> = ({
  variant = "desktop",
  onSearch,
  onClear,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSearch(searchValue);
    },
    [searchValue, onSearch]
  );

  const handleClear = useCallback(() => {
    setSearchValue("");
    if (inputRef.current) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }

    // Если есть callback и мы на мобилке - вызываем его
    if (variant === "mobile" && onClear) {
      setTimeout(onClear, 300);
    }
  }, [variant, onClear]); // Только variant и onClear!

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    []
  );

  if (variant === "desktop") {
    return (
      <form onSubmit={handleSubmit} className="desktop-search-form">
        <div className="desktop-search-wrapper">
          <input
            ref={inputRef}
            type="text"
            placeholder="Поиск..."
            value={searchValue}
            onChange={handleInputChange}
            className="desktop-search-input"
            aria-label="Поиск по сайту"
          />
          {searchValue && (
            <button
              type="button"
              className="desktop-search-clear"
              onClick={handleClear}
              aria-label="Очистить поиск"
            >
              <ClearIcon />
            </button>
          )}
          <button type="submit" className="desktop-search-button">
            <SearchIcon />
          </button>
        </div>
      </form>
    );
  }

  // Mobile variant
  return (
    <form onSubmit={handleSubmit} className="mobile-search-form">
      <div className="search-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          placeholder="Поиск по сайту..."
          value={searchValue}
          onChange={handleInputChange}
          className="mobile-search-input"
          aria-label="Поиск по сайту"
        />
        {searchValue && (
          <button
            type="button"
            className="mobile-search-clear"
            onClick={handleClear}
            aria-label="Очистить поиск"
          >
            <ClearIcon />
          </button>
        )}
        <button type="submit" className="mobile-search-button">
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};
