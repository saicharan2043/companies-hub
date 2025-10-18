import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
      <Input
        type="text"
        placeholder="Search companies by name, industry, or location..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-11 h-12 bg-card border-border focus:border-primary transition-colors"
      />
    </div>
  );
};

export default SearchBar;
