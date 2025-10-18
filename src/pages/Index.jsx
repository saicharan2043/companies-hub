import { useState, useMemo } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import SortControls from "@/components/SortControls";
import CompanyGrid from "@/components/CompanyGrid";
import Pagination from "@/components/Pagination";
import { companiesData, industries, locations, companySizes } from "@/data/companiesData";

const ITEMS_PER_PAGE = 9;

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedSize, setSelectedSize] = useState("All Sizes");
  const [sortBy, setSortBy] = useState("name-asc");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter companies
  const filteredCompanies = useMemo(() => {
    return companiesData.filter((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.location.toLowerCase().includes(searchTerm.toLowerCase()) 
        // || company.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesIndustry =
        selectedIndustry === "All Industries" || company.industry === selectedIndustry;

      const matchesLocation =
        selectedLocation === "All Locations" || company.location === selectedLocation;

      const matchesSize =
        selectedSize === "All Sizes" || company.size === selectedSize;

      return matchesSearch && matchesIndustry && matchesLocation && matchesSize;
    });
  }, [searchTerm, selectedIndustry, selectedLocation, selectedSize]);

  // Sort companies
  const sortedCompanies = useMemo(() => {
    const companies = [...filteredCompanies];
    
    switch (sortBy) {
      case "name-asc":
        return companies.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return companies.sort((a, b) => b.name.localeCompare(a.name));
      case "founded-asc":
        return companies.sort((a, b) => a.founded - b.founded);
      case "founded-desc":
        return companies.sort((a, b) => b.founded - a.founded);
      default:
        return companies;
    }
  }, [filteredCompanies, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedCompanies.length / ITEMS_PER_PAGE);
  
  const paginatedCompanies = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return sortedCompanies.slice(startIndex, endIndex);
  }, [sortedCompanies, currentPage]);

  // Reset to page 1 when filters change
  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedIndustry("All Industries");
    setSelectedLocation("All Locations");
    setSelectedSize("All Sizes");
    setSortBy("name-asc");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 pb-2 bg-gradient-to-r from-primary via-emerald-light to-primary bg-clip-text text-transparent">
            Explore Leading Companies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover innovative companies across industries and locations. Filter, search, and connect with the world's best organizations.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 mb-8 p-4 bg-card/50 rounded-lg border border-border">
          <div className="flex-1 w-full lg:w-auto min-w-0">
            <FilterPanel
              industries={industries}
              locations={locations}
              sizes={companySizes}
              selectedIndustry={selectedIndustry}
              selectedLocation={selectedLocation}
              selectedSize={selectedSize}
              onIndustryChange={handleFilterChange(setSelectedIndustry)}
              onLocationChange={handleFilterChange(setSelectedLocation)}
              onSizeChange={handleFilterChange(setSelectedSize)}
              onClearFilters={handleClearFilters}
            />
          </div>
          <div className="w-full lg:w-auto flex-shrink-0">
            <SortControls sortBy={sortBy} onSortChange={handleSortChange} />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {paginatedCompanies.length} of {sortedCompanies.length} companies
          </p>
        </div>

        {/* Company Grid */}
        <CompanyGrid companies={paginatedCompanies} />

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Companies Directory. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
