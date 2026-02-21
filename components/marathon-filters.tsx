"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { regions, distances, sortOptions } from "@/data/marathons";
import { Search } from "lucide-react";

interface MarathonFiltersProps {
  search: string;
  region: string;
  distance: string;
  sortBy: string;
  onSearchChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onDistanceChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export function MarathonFilters({
  search,
  region,
  distance,
  sortBy,
  onSearchChange,
  onRegionChange,
  onDistanceChange,
  onSortChange,
}: MarathonFiltersProps) {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <div className="flex flex-1 flex-col gap-1.5 sm:min-w-[200px]">
        <label className="text-sm font-medium">검색</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="대회명, 지역, 장소 검색..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">지역</label>
        <Select value={region} onValueChange={onRegionChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="지역 선택" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">거리</label>
        <Select value={distance} onValueChange={onDistanceChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="거리 선택" />
          </SelectTrigger>
          <SelectContent>
            {distances.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">정렬</label>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="정렬 기준" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
