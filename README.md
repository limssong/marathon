# 전국 마라톤 일정

Next.js, React, shadcn/ui로 제작한 전국 마라톤 일정 웹사이트입니다.

## 기능

- **카드 UI**: 마라톤 대회를 카드 형태로 표시
- **필터링**: 지역별, 거리별(5K/10K/21K/42K) 필터
- **정렬**: 날짜순, 이름순, 거리순, 지역순 정렬
- **바로가기**: 카드 클릭 시 해당 마라톤 공식 사이트로 이동

## 기술 스택

- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS**
- **shadcn/ui**
- **TypeScript**

## 로컬 개발

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

http://localhost:3000 에서 확인

## 빌드

```bash
pnpm build
```

정적 파일은 `out/` 폴더에 생성됩니다.

## GitHub Pages 배포

1. GitHub 저장소에 코드 푸시
2. **Settings** → **Pages** → **Source**에서 **GitHub Actions** 선택
3. `main` 브랜치에 푸시하면 자동으로 배포됩니다.

배포 URL: `https://<username>.github.io/marathon/`

### 저장소 이름 변경 시

`.github/workflows/deploy.yml`에서 `NEXT_PUBLIC_BASE_PATH` 값을 저장소 이름에 맞게 수정하세요.

### Google Analytics (선택)

1. [Google Analytics](https://analytics.google.com/)에서 GA4 속성 생성
2. **측정 ID** 복사 (형식: `G-XXXXXXXXXX`)
3. 로컬: `.env.local`에 `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` 추가
4. GitHub Pages: **Settings** → **Secrets and variables** → **Actions**에서 `GA_MEASUREMENT_ID` 시크릿 추가
