// "use client";
// import { MOBILE_NAV_ITEMS } from "@/lib/config/navigation";
// import { Search } from "../Search/Search";
// import Link from "next/link";

// interface MobileMenuProps {
//   isOpen: boolean;
//   isSearchOpen: boolean;
//   onClose: () => void;
//   onSearch: (value: string) => void;
// }

// export const MobileMenu: React.FC<MobileMenuProps> = ({
//   isOpen,
//   isSearchOpen,
//   onClose,
//   onSearch,
// }) => {
//   return (
//     <>
//       <nav
//         className={`header__nav-mobile ${
//           isOpen ? "header__nav-mobile--open" : ""
//         }`}
//         aria-label="Мобильное меню"
//         hidden={!isOpen}
//       >
//         {MOBILE_NAV_ITEMS.map((item) => (
//           <Link
//             key={item.href}
//             href={item.href}
//             className="header__nav-link"
//             onClick={onClose}
//           >
//             <span>{item.label}</span>
//           </Link>
//         ))}
//       </nav>

//       <div
//         className={`header__search-mobile ${
//           isSearchOpen ? "header__search-mobile--open" : ""
//         }`}
//         hidden={!isSearchOpen}
//       >
//         <Search variant="mobile" onSearch={onSearch} />
//       </div>
//     </>
//   );
// };

"use client";
import { MOBILE_NAV_ITEMS } from "@/lib/config/navigation";
import { Search } from "../Search/Search";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  isSearchOpen: boolean;
  onClose: () => void;
  onSearch: (value: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  isSearchOpen,
  onClose,
  onSearch,
}) => {
  return (
    <>
      <nav
        className={`header__nav-mobile ${
          isOpen ? "header__nav-mobile--open" : ""
        }`}
        aria-label="Мобильное меню"
        hidden={!isOpen}
      >
        {MOBILE_NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="header__nav-link"
            onClick={onClose}
          >
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div
        className={`header__search-mobile ${
          isSearchOpen ? "header__search-mobile--open" : ""
        }`}
        hidden={!isSearchOpen}
      >
        <Search
          variant="mobile"
          onSearch={onSearch}
          onClear={onClose} // Передаем onClose как onClear
        />
      </div>
    </>
  );
};
