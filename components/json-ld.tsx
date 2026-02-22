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
    alternateName: "Marathon Schedule",
    url: baseUrl,
    description:
      "전국 마라톤 일정, 마라톤 스케줄, 마라톤 일정표. 서울마라톤, 부산마라톤, 대구마라톤 등 국내 마라톤 대회 일정을 한눈에! 날짜별, 거리별, 지역별 필터와 신청기간 정보를 확인하세요.",
    inLanguage: "ko-KR",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const events = marathons.map((m) => ({
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: m.title,
    startDate: formatDate(m.date),
    endDate: m.endDate ? formatDate(m.endDate) : formatDate(m.date),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: m.image,
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
    description: m.description || `${m.title} - ${m.distance} 마라톤 대회`,
    offers: {
      "@type": "Offer",
      validFrom: formatDate(m.registrationDate),
      validThrough: formatDate(m.registrationEndDate || m.registrationDate),
      url: m.website,
    },
  }));

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "전국 마라톤 일정", item: `${baseUrl}/` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "전국 마라톤 대회 목록",
            description: "2025-2026년 전국 마라톤 일정, 마라톤 스케줄 - 서울, 부산, 대구, 경주, 제주 등 마라톤 대회 일정",
            numberOfItems: marathons.length,
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
