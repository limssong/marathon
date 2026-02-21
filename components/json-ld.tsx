import { marathons } from "@/data/marathons";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://marathon-schedule.vercel.app";
const baseUrl = basePath ? `${siteUrl}/${basePath}` : siteUrl;

function formatDate(dateStr: string) {
  return new Date(dateStr).toISOString().split("T")[0];
}

export function JsonLd() {
  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "전국 마라톤 일정",
    url: baseUrl,
    description:
      "전국 마라톤 대회 일정을 한눈에 확인하세요. 날짜별, 거리별, 지역별로 검색하고 정렬할 수 있습니다.",
    inLanguage: "ko-KR",
  };

  const events = marathons.map((m) => ({
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: m.title,
    startDate: formatDate(m.date),
    endDate: m.endDate ? formatDate(m.endDate) : formatDate(m.date),
    location: {
      "@type": "Place",
      name: m.location,
      address: {
        "@type": "PostalAddress",
        addressRegion: m.region,
        addressCountry: "KR",
      },
    },
    organizer: {
      "@type": "Organization",
      name: m.organizer,
    },
    url: m.website,
    description: m.description || `${m.title} - ${m.distance} 대회`,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "전국 마라톤 대회 목록",
            description: "2025-2026년 전국 마라톤 대회 일정",
            numberOfItems: events.length,
            itemListElement: events.map((event, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: event,
            })),
          }),
        }}
      />
    </>
  );
}
