import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/google-analytics";
import { JsonLd } from "@/components/json-ld";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-kr",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://marathon-schedule.vercel.app";
const baseUrl = basePath ? `${siteUrl}/${basePath}` : siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "전국 마라톤 일정 2025-2026 | 한눈에 보는 마라톤 대회 일정",
    template: "%s | 전국 마라톤 일정",
  },
  description:
    "서울마라톤, 부산마라톤, 대구마라톤 등 전국 마라톤 대회 일정을 한눈에! 날짜별, 거리별(5K/10K/21K/42K), 지역별 필터와 신청기간 정보를 확인하고 달리고 싶은 마라톤을 찾아보세요.",
  keywords: [
    "마라톤 일정",
    "전국 마라톤",
    "서울마라톤",
    "부산마라톤",
    "대구마라톤",
    "경주마라톤",
    "제주마라톤",
    "마라톤 대회",
    "런닝 대회",
    "10K",
    "반마라톤",
    "풀코스 마라톤",
  ],
  authors: [{ name: "Marathon Schedule" }],
  creator: "Marathon Schedule",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: baseUrl,
    siteName: "전국 마라톤 일정",
    title: "전국 마라톤 일정 2025-2026 | 한눈에 보는 마라톤 대회 일정",
    description:
      "서울마라톤, 부산마라톤 등 전국 마라톤 대회 일정을 한눈에! 날짜별, 거리별, 지역별 필터와 신청기간 정보를 확인하세요.",
  },
  twitter: {
    card: "summary_large_image",
    title: "전국 마라톤 일정 2025-2026",
    description: "전국 마라톤 대회 일정을 한눈에 확인하고 달리고 싶은 마라톤을 찾아보세요.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.variable} font-sans antialiased`}>
        <JsonLd />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
