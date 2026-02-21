"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { regions, distances, sortOptions } from "@/data/marathons";

interface MarathonFiltersProps {
  region: string;
  distance: string;
  sortBy: string;
  onRegionChange: (value: string) => void;
  onDistanceChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export function MarathonFilters({
  region,
  distance,
  sortBy,
  onRegionChange,
  onDistanceChange,
  onSortChange,
}: MarathonFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
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
