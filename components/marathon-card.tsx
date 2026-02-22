"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Marathon } from "@/data/marathons";
import { Calendar, MapPin, Route, ExternalLink, ClipboardList } from "lucide-react";

interface MarathonCardProps {
  marathon: Marathon;
  /** LCP 개선: 상단 3개 카드에 true 권장 */
  priority?: boolean;
}

function formatDate(dateStr: string, endDate?: string, endNote?: string) {
  const start = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const baseFormatted = start.toLocaleDateString("ko-KR", options);
  const formatted = endNote
    ? `${baseFormatted}(${["일", "월", "화", "수", "목", "금", "토"][start.getDay()]})`
    : baseFormatted;
  if (endNote) {
    return `${formatted} ~ ${endNote}`;
  }
  if (endDate) {
    const end = new Date(endDate);
    return `${formatted} ~ ${end.toLocaleDateString("ko-KR", options)}`;
  }
  return formatted;
}

function isRegistrationClosed(marathon: Marathon): boolean {
  if (marathon.registrationClosed) return true;
  const today = new Date().toISOString().slice(0, 10);
  const endDate = marathon.registrationEndDate || marathon.registrationDate;
  return today > endDate;
}

export function MarathonCard({ marathon, priority: _priority }: MarathonCardProps) {
  const isClosed = isRegistrationClosed(marathon);
  const hasWebsite = Boolean(marathon.website?.trim());
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(`${marathon.title} 마라톤`)}`;

  const cardContent = (
    <Card
        className={`h-full overflow-hidden border-2 transition-colors ${
          isClosed ? "border-muted bg-muted/20" : "hover:border-primary/50"
        }`}
      >
        <div className="flex items-center gap-2 px-4 pt-4">
          <Badge variant="secondary" className="font-semibold">
            {marathon.distance}
          </Badge>
          {isClosed && (
            <Badge variant="destructive" className="font-semibold">
              신청마감
            </Badge>
          )}
        </div>
        <div className="bg-primary mx-4 mt-3 rounded-lg px-4 py-3 text-primary-foreground">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 shrink-0" />
            <div>
              <p className="text-xs font-medium opacity-90">신청기간</p>
              <p className="text-base font-bold leading-tight">
                {formatDate(marathon.registrationDate, marathon.registrationEndDate, marathon.registrationEndNote)}
              </p>
            </div>
          </div>
        </div>
        <CardHeader className="pb-2">
          <h4 className="line-clamp-2 text-lg font-bold leading-tight">
            {marathon.title}
          </h4>
        </CardHeader>
        <CardContent className="space-y-2 pb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 shrink-0" />
            <span><strong className="text-foreground">대회일:</strong> {formatDate(marathon.date, marathon.endDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="line-clamp-1">{marathon.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Route className="h-4 w-4 shrink-0" />
            <span>{marathon.organizer}</span>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          {hasWebsite ? (
            <span className="flex items-center gap-2 text-sm font-medium text-primary">
              대회 사이트 바로가기
              <ExternalLink className="h-4 w-4" />
            </span>
          ) : (
            <span className="flex items-center gap-2 text-sm font-medium text-primary">
              구글에서 검색하기
              <ExternalLink className="h-4 w-4" />
            </span>
          )}
        </CardFooter>
      </Card>
  );

  const href = hasWebsite ? marathon.website : googleSearchUrl;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`block h-full transition-transform hover:shadow-lg ${isClosed ? "hover:scale-[1.01] opacity-70 hover:opacity-80" : "hover:scale-[1.02]"}`}
    >
      {cardContent}
    </a>
  );
}
