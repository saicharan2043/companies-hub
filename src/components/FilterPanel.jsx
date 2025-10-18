import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";

const FilterPanel = ({
  industries,
  locations,
  sizes,
  selectedIndustry,
  selectedLocation,
  selectedSize,
  onIndustryChange,
  onLocationChange,
  onSizeChange,
  onClearFilters,
}) => {
  const hasActiveFilters = 
    selectedIndustry !== "All Industries" || 
    selectedLocation !== "All Locations" || 
    selectedSize !== "All Sizes";

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Filter className="w-5 h-5" />
        <span className="text-sm font-medium">Filters:</span>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 w-full items-start">
        <Select value={selectedIndustry} onValueChange={onIndustryChange}>
          <SelectTrigger className="w-full sm:w-[160px] bg-card border-border text-left">
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {industries.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedLocation} onValueChange={onLocationChange}>
          <SelectTrigger className="w-full sm:w-[160px] bg-card border-border text-left">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedSize} onValueChange={onSizeChange}>
          <SelectTrigger className="w-full sm:w-[160px] bg-card border-border text-left">
            <SelectValue placeholder="Company Size" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {sizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="default"
            onClick={onClearFilters}
            className="w-full sm:w-auto gap-2 whitespace-nowrap"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
