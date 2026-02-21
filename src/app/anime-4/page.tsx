"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

/* ================= ICONS ================= */

const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

/* ================= TYPES ================= */

interface SearchSuggestion {
  id: string;
  title: string;
  category?: string;
  description?: string;
}

interface SearchBarProps {
  placeholder?: string;
  suggestions?: SearchSuggestion[];
  onSearch?: (query: string) => void;
  onSelect?: (suggestion: SearchSuggestion) => void;
  maxSuggestions?: number;
}

/* ================= SEARCH BAR ================= */

const SearchBar = ({
  placeholder = "Search...",
  suggestions = [],
  onSearch,
  onSelect,
  maxSuggestions = 8,
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    SearchSuggestion[]
  >([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ================= FILTER ================= */

  const filterSuggestions = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setFilteredSuggestions([]);
        return;
      }

      const filtered = suggestions
        .filter(
          (s) =>
            s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.category?.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .slice(0, maxSuggestions);

      setFilteredSuggestions(filtered);
    },
    [suggestions, maxSuggestions],
  );

  useEffect(() => {
    filterSuggestions(query);
  }, [query, filterSuggestions]);

  /* ================= OUTSIDE CLICK ================= */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
        setIsFocused(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= HANDLERS ================= */

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isExpanded || filteredSuggestions.length === 0) {
      if (e.key === "Enter" && query.trim()) {
        onSearch?.(query);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0,
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1,
        );
        break;

      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionSelect(filteredSuggestions[selectedIndex]);
        }
        break;

      case "Escape":
        setIsExpanded(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.title);
    setIsExpanded(false);
    setSelectedIndex(-1);
    onSelect?.(suggestion);
  };

  const clearSearch = () => {
    setQuery("");
    setIsExpanded(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const highlightMatch = (text: string, searchQuery: string) => {
    if (!searchQuery.trim()) return text;

    const regex = new RegExp(
      `(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );

    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-blue-500/20 text-blue-300 rounded px-1">
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  /* ================= RENDER ================= */

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      <motion.div layout transition={{ duration: 0.3 }}>
        {/* GLOW BACKGROUND */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ opacity: isFocused ? 1 : 0 }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-xl" />
        </motion.div>

        {/* INPUT */}
        <motion.div
          className={`
            relative flex items-center rounded-2xl
            bg-white/5 backdrop-blur-xl
            border transition-all duration-300
            ${
              isFocused
                ? "border-blue-500/60 shadow-[0_0_40px_rgba(59,130,246,0.25)]"
                : "border-white/10 hover:border-white/20"
            }
          `}
          animate={{ scale: isFocused ? 1.02 : 1 }}
        >
          <div className="pl-4 pr-2">
            <SearchIcon
              className={`w-5 h-5 ${
                isFocused ? "text-blue-400" : "text-white/40"
              }`}
            />
          </div>

          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsExpanded(true);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 py-4 px-2 bg-transparent outline-none text-white placeholder-white/40 text-lg"
          />

          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={clearSearch}
                className="p-2 mr-2 text-white/40 hover:text-white"
              >
                <XIcon className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* SUGGESTIONS */}
        <AnimatePresence>
          {isExpanded && filteredSuggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              className="
                absolute top-full left-0 right-0 mt-3
                bg-[#111827]/80 backdrop-blur-xl
                border border-white/10 rounded-2xl
                shadow-2xl overflow-hidden z-50
              "
            >
              {filteredSuggestions.map((suggestion, index) => (
                <div
                  key={suggestion.id}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`
                    px-4 py-3 cursor-pointer transition
                    ${
                      selectedIndex === index
                        ? "bg-blue-500/10 border-l-4 border-blue-500"
                        : "hover:bg-white/5"
                    }
                  `}
                >
                  <div className="text-white font-medium">
                    {highlightMatch(suggestion.title, query)}
                  </div>

                  {suggestion.description && (
                    <div className="text-white/50 text-sm mt-1">
                      {highlightMatch(suggestion.description, query)}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

/* ================= PAGE ================= */

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white relative overflow-hidden">
      {/* Background subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(139,92,246,0.12),transparent_40%)]" />

      <div className="relative container mx-auto px-4 py-32">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Advanced Search
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Smooth animations. Smart suggestions. Dark premium experience.
          </p>
        </div>

        <div className="flex justify-center">
          <SearchBar
            placeholder="Search for tutorials..."
            suggestions={mockSuggestions}
            maxSuggestions={6}
          />
        </div>
      </div>
    </div>
  );
}

const mockSuggestions: SearchSuggestion[] = [
  {
    id: "1",
    title: "React Components",
    category: "Development",
    description: "Build reusable components with TypeScript",
  },
  {
    id: "2",
    title: "Next.js App Router",
    category: "Framework",
    description: "Modern routing system",
  },
  {
    id: "3",
    title: "Framer Motion",
    category: "Animation",
    description: "Production-ready motion library",
  },
  {
    id: "4",
    title: "Tailwind CSS",
    category: "Styling",
    description: "Utility-first CSS framework",
  },
];
