"use client";

import { useMemo, useState } from "react";
import { marathons } from "@/data/marathons";
import { MarathonCard } from "@/components/marathon-card";
import { MarathonFilters } from "@/components/marathon-filters";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Footprints } from "lucide-react";

export default function HomePage() {
  const [region, setRegion] = useState("전체");
  const [distance, setDistance] = useState("전체");
  const [sortBy, setSortBy] = useState("신청접수순");

  const filteredAndSortedMarathons = useMemo(() => {
    let result = [...marathons];

    // 지역 필터
    if (region !== "전체") {
      result = result.filter((m) => m.region === region);
    }

    // 거리 필터
    if (distance !== "전체") {
      result = result.filter((m) => m.distance === distance);
    }

    // 정렬
    switch (sortBy) {
      case "신청접수순": {
        const today = new Date().toISOString().slice(0, 10);
        const getRegistrationStatus = (m: (typeof result)[0]) => {
          const endDate = m.registrationEndDate || m.registrationDate;
          if (today >= m.registrationDate && today <= endDate) return 0; // 신청 접수 중
          if (today < m.registrationDate) return 1; // 아직 신청 전
          return 2; // 신청 마감
        };
        result.sort((a, b) => {
          const statusA = getRegistrationStatus(a);
          const statusB = getRegistrationStatus(b);
          if (statusA !== statusB) return statusA - statusB;
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        break;
      }
      case "날짜순":
        result.sort(
          (a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "이름순":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "거리순": {
        const order = { "5K": 1, "10K": 2, "21K": 3, "42K": 4, 기타: 5 };
        result.sort(
          (a, b) =>
            (order[a.distance] ?? 6) - (order[b.distance] ?? 6)
        );
        break;
      }
      case "지역순":
        result.sort((a, b) => a.region.localeCompare(b.region));
        break;
    }

    return result;
  }, [region, distance, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="border-b bg-white/80 shadow-sm backdrop-blur">
        <div className="container mx-auto flex flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Footprints className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                전국 마라톤 일정
              </h1>
              <p className="text-sm text-muted-foreground">
                Marathon Schedule
              </p>
            </div>
          </div>
          <MarathonFilters
            region={region}
            distance={distance}
            sortBy={sortBy}
            onRegionChange={setRegion}
            onDistanceChange={setDistance}
            onSortChange={setSortBy}
          />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <p className="mb-6 text-muted-foreground">
          총 {filteredAndSortedMarathons.length}개의 마라톤 대회
        </p>
        <div className="space-y-10">
          {Object.entries(
            filteredAndSortedMarathons.reduce<Record<string, typeof marathons>>(
              (acc, marathon) => {
                const year = marathon.date.slice(0, 4);
                if (!acc[year]) acc[year] = [];
                acc[year].push(marathon);
                return acc;
              },
              {}
            )
          )
            .sort(([a], [b]) => Number(b) - Number(a))
            .map(([year, yearMarathons]) => (
              <section key={year}>
                <ScrollReveal>
                  <h2 className="mb-4 text-xl font-bold text-foreground">
                    {year}년
                  </h2>
                </ScrollReveal>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {yearMarathons.map((marathon, idx) => (
                    <ScrollReveal key={marathon.id} delay={idx * 60}>
                      <MarathonCard marathon={marathon} />
                    </ScrollReveal>
                  ))}
                </div>
              </section>
            ))}
        </div>
        {filteredAndSortedMarathons.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-16 text-center">
            <p className="text-lg font-medium text-muted-foreground">
              조건에 맞는 마라톤이 없습니다
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              필터를 변경해 보세요
            </p>
          </div>
        )}
      </main>

      <footer className="border-t bg-white/60 py-6 backdrop-blur">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} 전국 마라톤 일정. 카드를 클릭하면 공식 대회 사이트로 이동합니다.
        </div>
      </footer>
    </div>
  );
}
