import { useEffect, useRef, useState } from "react";
import { COUNTRIES } from "../../constants/countries";
import { IconChevronDown } from "../common/icons";

export default function CountrySelect({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(value || "");
  const containerRef = useRef(null);

  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = COUNTRIES.filter((country) => country.includes(query.trim()));

  const handleSelect = (country) => {
    onChange(country);
    setQuery(country);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex items-center gap-2 border border-slate-200 rounded-lg pl-3 pr-2 py-2 bg-slate-50/50 focus-within:border-[#1E2A47]">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="국가를 검색해 주세요"
          className="flex-1 text-sm outline-none bg-transparent min-w-0"
        />
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="국가 목록 펼치기"
          className={`text-slate-400 hover:text-slate-600 transition-transform shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <IconChevronDown />
        </button>
      </div>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full max-h-48 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-md">
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-sm text-slate-400">검색 결과가 없어요</li>
          ) : (
            filtered.map((country) => (
              <li key={country}>
                <button
                  type="button"
                  onClick={() => handleSelect(country)}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 ${
                    country === value ? "text-[#1E2A47] font-semibold" : "text-slate-700"
                  }`}
                >
                  {country}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
