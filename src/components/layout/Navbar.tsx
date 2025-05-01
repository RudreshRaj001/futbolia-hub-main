import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import { useIsMobile } from "@/hooks/use-mobile";
import Logo from "@/components/ui/Logo";
import SearchForm from "./SearchForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import SearchModal from "@/components/search/SearchModal";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsGlobalSearchOpen(true);
    }
    setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    if (isMobile) {
      setIsGlobalSearchOpen(true);
    } else {
      setIsSearchOpen(!isSearchOpen);
    }
  };

  return (
    <>
      <header
        className={cn(
          "w-full transition-all duration-300 ease-in-out",
          isScrolled
            ? "bg-primary/90 backdrop-blur-md shadow-sm dark:bg-primary-dark/90"
            : "bg-primary dark:bg-primary-dark"
        )}
      >
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo size="md" />
            </div>

            {/* Mega Menu (desktop only) */}
            <div className="hidden lg:flex items-center justify-start flex-1 ml-8">
              <MegaMenu />
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-1">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Search */}
              <button
                onClick={toggleSearch}
                className="p-2 rounded-md text-[#FEE6B9] hover:bg-[#FCC050]/15 transition-colors duration-200"
                aria-label="Buscar"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Mobile Menu Button */}
              <div className="lg:hidden ml-2">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 rounded-md text-[#FEE6B9] hover:bg-[#FCC050]/15 transition-colors duration-200"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search Dropdown (desktop only) */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full bg-primary-dark dark:bg-gray-900 py-3 px-4 border-t border-primary-dark dark:border-gray-800 shadow-lg absolute z-[60]"
              style={{ top: "64px" }}
            >
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between">
                  <SearchForm
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSubmit={handleSearch}
                    className="flex-1 max-w-lg mx-auto"
                    variant="navbar"
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="text-[#FEE6B9] hover:text-[#FCC050] ml-2"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </header>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isGlobalSearchOpen}
        onClose={() => setIsGlobalSearchOpen(false)}
      />
    </>
  );
};

export default Navbar;
