# 🎬 무드매거진 (Mood Magazine)
> **오늘 밤, 당신의 무드에 꼭 맞는 감성 영화 큐레이션 & 실시간 극장가 매거진**

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff.svg)](https://vitejs.dev/)

**무드매거진(Mood Magazine)**은 관객의 현재 기분과 무드에 최적화된 영화를 추천하고, 대한민국 실시간 박스오피스, 극장가 뉴스, 개봉 예정작 D-DAY 캘린더, 실시간 끝장 토론, 영화 OST 플레이어를 제공하는 종합 시네마 플랫폼입니다.

---

## ✨ 핵심 기능 (Key Features)

### 1. 🏆 2026 대한민국 실시간 박스오피스 TOP 10
- **영진위 통합전산망(KOBIS) 기반 데이터**: 『암살자(들)』, 『타짜: 벨제붑의 노래』, 『오디세이』, 『인턴』 등 실시간 일별/누적 관객수, 예매율, 증감 순위 실시간 중계
- **원클릭 빠른 예매 링크**: CGV, 롯데시네마, 메가박스 공식 예매 페이지 즉시 연결
- **공식 극장 포스터 / 레트로 아트 전환**: 공식 배급사 포스터와 감성 아트 포스터 즉시 전환 및 사용자 직접 업로드 기능

### 2. 📰 실시간 영화 뉴스 & 극장가 포커스
- **24H 속보 티커 (Breaking News)**: 가장 핫한 극장가 단독 속보 실시간 롤링
- **카테고리별 전문 뷰어**: 속보/단독, 박스오피스, 신작개봉, 해외/영화제, 단독 인터뷰, 비하인드
- **기사 연동 & 독자 소통**: 기사 속 관련 작품 원클릭 티켓 발권, 기사 좋아요 및 실시간 한줄평 작성

### 3. 📅 개봉 예정작 D-DAY 캘린더 & 기대지수 투표
- **올가을~연말 최고 기대작 D-DAY 카운트다운**:
  - 수지 차기작 『현혹』 (11.12 개봉 · 한재림 감독 연출)
  - 『아바타 3: 불과 재』 (12.18 개봉 · 제임스 카메론)
  - 수지X구교환 『실연당한 사람들을 위한 일곱시 조찬모임』 (10.28 개봉)
  - 『듄: 메시아』 (11.25 개봉 · 드니 빌뇌브 3부작 완결판)
  - 『극장판 귀멸의 칼날: 무한성편』 (10.15 개봉)
- **기대지수 `보고싶어요 🔥` 실시간 투표** 및 개봉일 알림 북마크 지원

### 4. 💬 시네마 톡 스테이션 & 끝장 토론장
- **금주의 극장가 찬반 토론 (실시간 A vs B 투표)**:
  - 『암살자(들)』 결말 카타르시스(호) vs 개연성 아쉬움(불호)
  - 『타짜 4』 1편 명성 계승했는가?
  - 한국판 『인턴』 원작보다 더 뭉클했는가?
- **실시간 관객 팝콘 한줄평**: 🍿 팝콘 평점(1~5점) 및 솔직 관람 후기 등록

### 5. 🎧 영화 OST & 심야 앰비언스 감상실 (Audio Synthesizer)
- **Web Audio API 오리지널 신시사이저 사운드 탑재**:
  - 🌌 『오디세이』: 웜홀 너머의 대서사 (심우주 앰비언스)
  - 🃏 『타짜: 벨제붑의 노래』: 심야 지하 도박장 (느와르 재즈 피아노)
  - ☕ 『인턴』: 시니어의 따뜻한 조언 (어쿠스틱 오르골 선율)
  - 📽️ 35mm 필름 영사기 & 빗소리 ASMR
  - 🍿 갓 튀긴 카라멜 팝콘 ASMR
- 회전하는 레트로 바이닐 디스크 애니메이션과 볼륨/재생 컨트롤

### 6. 🍿 감성 부가 기능
- **1초 무드 맞춤 추천**: 감정 태그별 큐레이션
- **16강 영화 이상형 월드컵**: 내 인생 영화 찾기 토너먼트
- **50선 명작 도감 & 스마트 검색**: 수지 출연작 필터링 지원
- **선택장애 해결 팝콘 룰렛**: 1초 랜덤 영화 뽑기
- **심야 시네마 야식 페어링 가이드**: 영화 장르별 꿀조합 음식 & 음료 추천
- **실물 감성 VIP 바코드 티켓 발권기**: 나만의 소장용 티켓 즉시 발권

---

## 🛠️ 기술 스택 (Tech Stack)

| 구분 | 사용 기술 |
|------|-----------|
| **Frontend** | React 19, TypeScript, Tailwind CSS v4, Lucide React, Motion |
| **Audio Engine** | Web Audio API (Synthesizer, LFO, Gain Node, Biquad Filter) |
| **Backend & Tools** | Express, Node.js, Vite 6, TSX, ESBuild |
| **Storage** | LocalStorage Persistence (티켓, 포스터, 평점, 투표, 코멘트) |

---

## 🚀 로컬 실행 방법 (Getting Started)

### 1. 저장소 복제 (Clone Repository)
```bash
git clone https://github.com/skypds9381/mood-magazine.git
cd mood-magazine
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
```
브라우저에서 `http://localhost:3000`으로 접속하여 무드매거진을 확인하실 수 있습니다.

### 4. 프로덕션 빌드
```bash
npm run build
npm start
```

---

## 📄 라이선스 (License)
MIT License. Created with passion for cinema lovers.
