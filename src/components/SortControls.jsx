import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";

const SortControls = ({ sortBy, onSortChange }) => {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-5 h-5 text-muted-foreground" />
      <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[160px] bg-card border-border">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          <SelectItem value="name-asc">Name (A-Z)</SelectItem>
          <SelectItem value="name-desc">Name (Z-A)</SelectItem>
          <SelectItem value="founded-asc">Oldest First</SelectItem>
          <SelectItem value="founded-desc">Newest First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortControls;
