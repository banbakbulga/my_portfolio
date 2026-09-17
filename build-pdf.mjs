// PDF 전용 빌드 — 웹 페이지를 인쇄한 것이 아니라 A4 문서로 따로 조판한다.
// 프로젝트 1건당 1페이지. 웹(platform/)과 사실은 같고 분량만 줄인다.
import {writeFileSync} from 'node:fs';

const PROFILE = {
  name: '양준혁',
  title: 'Software Developer',
  line: '기획한 것을 만들어 배포하고 쓰이는 동안 고쳐왔습니다.',
  mail: 'junh9126@gmail.com',
  tel: '+82 10-5766-1639',
  site: 'banbakbulga.github.io/my_portfolio/platform/',
};

const CAREER = [
  ['2026.02 – 현재', '루모스', '소프트웨어 개발부 / 정규직',
   '실시간 코칭 서비스의 기획과 개발을 주도했습니다. 화면 구현과 데이터 API 연결부터 코드 서명과 버전 배포까지 맡고 배포 이후 사용자 환경에서 올라오는 문제에 대응했습니다. 외부 고객 의뢰를 받아 대회 운영 업무를 자동화하는 시스템도 개발해 운영 중입니다.'],
  ['2025.09 – 2025.12', '한국타이어앤테크놀로지', 'R&D DX / 인턴',
   '사내 기술문서 약 2,000건을 AI가 검색할 수 있는 데이터로 가공했습니다. 문서 형식별 처리 기준을 정하고 전처리부터 색인까지 Python으로 자동화했습니다.'],
  ['2025.03 – 2025.08', '충남대학교 데이터 네트워크 연구실', '학부연구생',
   '음성 방송을 텍스트로 옮기고 내용 단위로 나눠 탐색할 수 있게 만드는 파이프라인을 설계하고 구현했습니다.'],
];

const SKILLS = [
  ['서비스 개발과 운영', 'React · TypeScript · Electron · WebSocket · REST',
   '화면을 만들고 데스크톱으로 배포했습니다. 코드 서명과 자동 업데이트까지 구성했습니다.'],
  ['서버와 데이터', 'Java · Spring · Python · FastAPI · MySQL · MongoDB · OpenSearch',
   '주문 API와 서비스 간 연동을 구현했고 문서를 정제해 검색 색인까지 연결했습니다.'],
  ['업무 흐름 설계', '요구사항 확인 · 프로세스 정의 · 단계별 검수',
   '화면을 먼저 만들지 않고 업무 전체를 하나의 데이터 흐름으로 정의한 뒤 구현했습니다.'],
  ['품질과 검증', '단위 테스트 · 회귀 평가 · 라벨링 기반 지표 비교',
   '바꿀 때마다 같은 기준으로 다시 확인해 고친 문제가 재발하지 않는지 봤습니다.'],
];

const PROJECTS = [
  {
    id: 'desktop',
    flow: [['데이터 수집','공식 API와 화면 캡처'],['저장과 제공','MySQL과 자체 API'],['클라이언트','React · Electron'],['실시간 전달','WebSocket과 음성 안내']],
    cat: '루모스 / LOLPAGO 서비스',
    period: '2026.02 – 현재',
    name: '실시간 코칭 데스크톱 앱 개발과 운영',
    lead: '기획과 화면 설계부터 클라이언트 구현, 빌드와 코드 서명, 배포 이후 장애 대응까지 한 사이클을 맡았습니다.',
    big: '100 → 150–200',
    unit: '게임 동시 실행 시 프레임(FPS)',
    blocks: [
      ['문제', '앱 단독 실행에서는 없던 프레임 저하가 게임과 동시에 실행할 때 나타났고 오래 켜 둘수록 메모리도 계속 늘었습니다. 처음에는 별개로 보였지만 화면을 캡처해 서버로 보내는 경로를 따라가 보니 원인이 같았습니다.'],
      ['한 일', [
        '이미지를 문자열로 바꿔 보내던 방식을 바이너리 규격으로 교체하고 캡처 주기와 프로세스 간 전달 구조를 정리했습니다.',
        '설치 경로에 의존하던 클라이언트 감지는 실행 중인 프로세스에서 접속 정보를 읽는 보완 경로를 두어 실패한 경우에만 폴백이 작동하게 했습니다.',
        'SmartScreen 경고로 설치 단계에서 이탈이 생겨 DUNS 번호를 발급받아 조직 확인을 거친 뒤 EV 코드 서명을 빌드에 연결했습니다.',
        '릴리스 파일만 올리는 공개 저장소를 소스와 분리해 두어 앱에 접근 토큰을 넣지 않고도 자동 업데이트가 되게 했습니다.',
      ]],
      ['결과', '게임 동시 실행 시 프레임이 약 100에서 150–200으로 올라갔고 틱당 전송량은 약 24% 줄었습니다. 장시간 실행 시 누적되던 메모리 증가도 함께 해결했습니다. 사용자는 새 버전을 따로 내려받지 않고 재시작만 하면 됩니다.'],
    ],
    stack: 'React / TypeScript / Electron / WebSocket / REST API / MySQL',
    img: 'assets/lolpago-app.png',
    imgCap: '롤파고 데스크톱 앱 실제 캡처 화면',
    note: '개발 과정에서 관찰한 환경 기준의 수치이며 모든 PC의 성능을 보장하지는 않습니다.',
  },
  {
    id: 'tournament',
    flow: [['신청과 참가자','기준 데이터 등록'],['체급과 조 편성','자동 배정'],['대진표와 진행','경기 순서와 코트 관리'],['결과와 상장','순위 산정 후 출력']],
    cat: '루모스 / 외부 고객 의뢰',
    period: '2026.04 (이후 운영과 유지보수)',
    name: '대회 운영 업무 자동화 시스템',
    lead: '태권도 대회 운영 업무를 2인이 개발했습니다. 업무 흐름 설계와 기능 구현, 발주자 요구사항 확인과 진행 보고를 맡았습니다.',
    big: '22',
    unit: '하나의 흐름으로 연결한 운영 기능',
    blocks: [
      ['문제', '참가 신청과 체급 편성, 대진표, 결과 반영, 순위 산정, 상장 발행이 각각 따로 처리됐습니다. 한 단계를 고치면 다음 단계는 손으로 다시 맞춰야 했고 같은 정보를 여러 곳에 옮겨 적는 과정에서 오류가 생기기 쉬웠습니다.'],
      ['한 일', [
        '개별 화면부터 만들지 않고 전체 업무를 하나의 데이터 흐름으로 먼저 정의했습니다.',
        '참가자 정보를 기준 데이터로 두고 뒤따르는 단계가 그 값을 이어받도록 기능 사이의 관계를 설계했습니다.',
        '규칙이 불명확한 부분은 추측으로 구현하지 않고 발주자에게 실제 진행 순서를 확인해 조건을 구체화한 뒤 반영했습니다.',
        '주 2~3회 진행 보고와 단계별 검수를 거쳤고 테스트 서버에서 검증한 뒤 실제 운영에 반영했습니다.',
      ]],
      ['결과', '신청부터 상장 발행까지 이어지는 22개 기능을 2인이 개발해 실제 대회에 적용했습니다. 한 곳을 고치면 뒤따르는 단계가 함께 바뀌어 중간에 정보를 옮겨 적는 일이 없어졌습니다.'],
    ],
    stack: 'PHP / MySQL',
  },
  {
    id: 'superchacha',
    flow: [['질문 입력','부서를 고르지 않고 질문'],['임베딩','질문의 의미를 벡터화'],['챗봇 매칭','적합한 챗봇 검색'],['연결','해당 챗봇에서 질문 처리']],
    cat: '슈퍼차차 / 3인 팀 프로젝트',
    period: '2025.05 – 2025.09',
    name: '학내 챗봇 통합 플랫폼',
    lead: '전체 시스템 구조 설계와 프론트엔드 개발을 맡고 임베딩 기반 챗봇 자동 연결을 구현했습니다.',
    big: '3 → 1',
    unit: '챗봇을 찾는 탐색 단계',
    blocks: [
      ['문제', '학내에는 부서별 챗봇이 이미 여러 개 있었습니다. 문제는 사용자가 질문하기 전에 어느 챗봇에 물어야 하는지부터 정해야 한다는 점이었습니다. 답을 주는 창구는 있는데 그 창구를 찾는 일이 사용자 몫으로 남아 있었습니다.'],
      ['한 일', [
        '질문의 의미를 임베딩으로 표현해 알맞은 챗봇을 찾도록 구현했습니다.',
        '챗봇을 하나로 합치지 않고 앞단에 연결 계층만 두었습니다. 각 부서의 운영은 그대로 두고 입구만 바꾸는 방법이라고 봤습니다.',
        '학내 구성원이 직접 챗봇을 만들어 등록하고 공유할 수 있게 열어 두어 내용을 채우는 주체와 연결하는 주체를 나눴습니다.',
        '외부 정보 시스템은 MCP로 같은 규약으로 연결해 대상이 늘어도 연결 방식은 유지되게 했습니다.',
      ]],
      ['결과', '챗봇을 찾는 단계가 3단계에서 1단계로 줄었습니다. 생성형 AI 활용 경진대회에서 은상을 받았습니다. 기존 학내 챗봇과 연동하고 부서별 챗봇을 올리는 확장 방안도 정리해 제안했습니다.'],
    ],
    stack: 'React / FastAPI / MCP / 임베딩 / FAISS / SQLite',
    img: 'assets/superchacha.png',
    imgCap: '직접 개발한 슈퍼차차 홈 화면',
    note: '확장 방안은 제안 단계이며 실제 도입까지 진행하지는 않았습니다.',
  },
  {
    id: 'knowledge',
    flow: [['출처별 수집','규칙과 통계의 버전 기록'],['문서 검증','검증한 문서와 색인 준비'],['질의와 검색','의도 분류 후 근거 발췌'],['답변과 평가','질문과 원문을 함께 대조']],
    cat: '루모스 / 지식베이스와 평가',
    period: '2026.06 – 2026.09',
    name: 'AI 응답 품질 검증 체계 구축',
    lead: '데이터 수집과 검색 구조 설계부터 평가 체계 구축과 회귀 확인까지 맡았습니다.',
    big: '51 → 80',
    unit: '90회 평가 중 자동 통과 응답',
    blocks: [
      ['문제', '검색 회귀 테스트는 통과했지만 실제 질문에서는 필요한 조건을 빠뜨리거나 자료가 있는데도 답할 수 없다는 응답이 나왔습니다. 어느 단계에서 정보가 누락되는지 밝히는 일이 가장 어려웠습니다.'],
      ['한 일', [
        '의도 분류 결과와 검색된 발췌문 그리고 최종 답변을 기록해 비교했습니다.',
        '대상을 인식하지 못한 경우와 문서를 찾고도 필요한 조건을 전달하지 못한 경우를 구분했습니다.',
        '자동 채점 결과도 원문과 대조해 답변 오류와 채점 오류를 나눴습니다.',
        '자동 실패 기록을 지우거나 통과할 때까지 답변을 다시 생성하지 않고 원래 판정과 검토 결과를 각각 남겼습니다.',
      ]],
      ['결과', '동일한 30개 질문을 개선 전후 각각 3회씩 실행했을 때 자동 통과가 51/90에서 80/90으로 올랐습니다. 검색 회귀는 1,870문항 골든셋으로 따로 돌려 전 문항 통과를 확인했습니다. 검증 질문은 50문항에서 1,870문항까지 늘렸습니다.'],
    ],
    stack: 'Python / 구조화 검색 / LLM 질의 라우팅 / 회귀 평가',
    note: '검색 회귀와 답변 평가는 서로 다른 검사이므로 결과를 나눠 기록했습니다.',
  },
  {
    id: 'radio',
    flow: [['음성 수집','방송 원본 확보'],['텍스트 변환','Whisper로 전사'],['의미 단위 분할','내용 단위로 나누고 태깅'],['탐색과 재생','날짜·키워드로 구간 재생']],
    cat: '충남대 데이터 네트워크 연구실 / 학부연구생',
    period: '2025.03 – 2025.08',
    name: '라디오 방송 구간 탐색 플랫폼',
    lead: '개인 프로젝트로 음성 인식과 의미 단위 분할 파이프라인을 설계하고 화면까지 구현했습니다.',
    big: '1시간 → 구간',
    unit: '방송을 찾아 듣는 단위',
    blocks: [
      ['문제', '라디오 다시듣기는 한 시간 분량을 처음부터 끝까지 재생하는 방식이었습니다. 듣고 싶은 대목 하나 때문에 방송 전체를 넘겨 가며 찾아야 했습니다.'],
      ['한 일', [
        'Whisper로 음성을 텍스트로 옮기고 그 결과를 LLM이 내용 단위로 나눠 태그를 붙이도록 구성했습니다.',
        '한 시간짜리 음성은 파일을 나눠 배치로 돌려 처리 시간을 줄였고 경계에서 맥락이 끊기지 않게 구간을 겹쳤습니다.',
        '노래가 나온 구간은 노래로, 사연을 읽는 구간은 사연으로 잡히는지 정답을 직접 라벨링해 F1 점수로 비교했습니다.',
        '음성 인식 모델과 언어 모델을 바꿔 가며 같은 정답셋으로 돌리고 파인튜닝한 모델도 같은 방식으로 비교해 조합을 정했습니다.',
      ]],
      ['결과', '방송 전체를 재생하지 않고 날짜와 키워드로 원하는 구간을 찾아 그 지점부터 들을 수 있게 됐습니다. 모델은 감으로 고르지 않고 같은 기준으로 비교해 선택했습니다.'],
    ],
    stack: 'React / Flask / MongoDB / Whisper / GPT-4o-mini',
  },
  {
    id: 'bookstore',
    flow: [['주문 API','기능 구현과 예외 처리'],['서비스 간 연동','메시지 기반 전달'],['데이터','MySQL과 캐시'],['검증','단위 테스트와 자동 빌드']],
    cat: 'NHN Academy / 팀 프로젝트',
    period: '2024.07 – 2024.12',
    name: 'MSA 기반 온라인 서점',
    lead: '주문 서비스 API 개발과 단위 테스트를 맡고 화면 담당자와 응답 구조를 조율했습니다.',
    big: '80%',
    unit: '주요 로직 단위 테스트 커버리지',
    blocks: [
      ['문제', '화면을 담당한 팀원은 한 번에 필요한 정보를 모두 담은 응답을 원했습니다. 저는 주문 서비스가 다른 영역의 데이터까지 모아 내려주면 서비스를 나눈 의미가 없다고 봤습니다. 서로 근거가 있어 말로는 결론이 나지 않았습니다.'],
      ['한 일', [
        '제 주장을 다시 설명하는 대신 화면이 실제로 어떤 정보를 언제 쓰는지 함께 적어 보자고 했습니다.',
        '목록을 만들어 보니 첫 화면에 바로 필요한 값과 사용자가 동작한 뒤에야 필요한 값이 섞여 있었습니다.',
        '앞쪽은 하나의 응답으로 내려주고 뒤쪽은 서비스별로 나누는 선에서 합의했습니다.',
        '응답 형식과 오류 처리 방식도 함께 정해 문서로 남겼습니다.',
      ]],
      ['결과', '주요 로직과 예외를 단위 테스트로 검증하며 커버리지 80% 이상을 유지했습니다. 기준을 문서로 남긴 뒤 연동 과정에서 되묻는 일이 줄었고 프로젝트는 우수상을 받았습니다.'],
    ],
    stack: 'Java / Spring Boot / Spring Cloud / MySQL / Redis / RabbitMQ / Docker',
  },
  {
    id: 'bgp',
    flow: [['분석 범위 지정','기간과 IP 입력'],['로그 분석','Hijacking·AS Path Loop 감지'],['보고서 생성','감지한 이상 사례 정리'],['질의응답','보고서에서 근거를 찾아 설명']],
    cat: '졸업프로젝트 / 3인 팀',
    period: '학사 졸업논문',
    name: '네트워크 로그 이상징후 탐지',
    lead: '로그 분석과 서비스 구조 설계 및 화면 구현을 맡았습니다.',
    big: '4',
    unit: '탐지하도록 구현한 이상 사례 유형',
    blocks: [
      ['문제', 'BGP 로그에는 어떤 네트워크를 거쳐 목적지로 가는지가 기록되지만 라우팅 지식이 없으면 변화의 의미를 파악하기 어렵습니다. 경로가 잘못 바뀌면 통신이 의도하지 않은 구간을 거치게 되므로 변화를 빨리 알아채야 합니다.'],
      ['한 일', [
        'RIPE RIS가 공개한 로그에서 AS Path와 라우팅 변화를 분석해 Hijacking과 AS Path Loop, Flapping 등 4가지 이상 사례를 감지했습니다.',
        '원시 로그를 그대로 검색 대상에 넣으면 근거가 여러 기록에 흩어진다고 보고 분석 결과를 먼저 보고서로 정리했습니다.',
        '이후의 질문은 그 보고서를 근거로 답하도록 RAG 구조를 설계해 같은 결과를 두고 후속 질문을 이어갈 수 있게 했습니다.',
      ]],
      ['결과', '사용자가 기간과 IP를 지정하면 이상 사례를 정리한 보고서가 생기고 그 내용에 관해 자연어로 물어볼 수 있습니다. 라우팅 데이터를 직접 읽어야 했던 과정을 보고서와 질의응답으로 바꿨습니다.'],
    ],
    stack: 'Python / RIPE RIS / BGP 분석 / RAG / React',
    img: 'assets/bgp-chat.png',
    imgCap: '프로젝트 구현 화면',
    note: '학사 졸업논문 「BGP 라우팅 데이터 분석을 위한 RAG 기반 LLM 대화형 분석 시스템 설계 및 구현」',
  },
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

function block([label, body]) {
  const inner = Array.isArray(body)
    ? `<ul>${body.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`
    : `<p>${esc(body)}</p>`;
  return `<div class="blk"><div class="blk-l">${esc(label)}</div><div class="blk-b">${inner}</div></div>`;
}

function projectPage(p, i) {
  return `<section class="sheet">
  <div class="p-head">
    <div class="p-cat">${esc(p.cat)}</div>
    <div class="p-num">${String(i + 1).padStart(2, '0')} / ${String(PROJECTS.length).padStart(2, '0')}</div>
  </div>
  <h2>${esc(p.name)}</h2>
  <p class="p-lead">${esc(p.lead)}</p>
  <div class="p-bar">
    <div class="p-big"><strong>${p.big}</strong><span>${esc(p.unit)}</span></div>
    <div class="p-meta"><dl><dt>기간</dt><dd>${esc(p.period)}</dd><dt>사용 기술</dt><dd>${esc(p.stack)}</dd></dl></div>
  </div>
  ${p.flow ? `<div class="flow">${p.flow.map(([t, d]) => `<div><b>${esc(t)}</b><span>${esc(d)}</span></div>`).join('')}</div>` : ''}
  ${p.blocks.map(block).join('')}
  ${p.img ? `<figure><img src="${p.img}" alt=""><figcaption>${esc(p.imgCap)}</figcaption></figure>` : ''}
  ${p.note ? `<p class="p-note">${esc(p.note)}</p>` : ''}
</section>`;
}

const CSS = `
@page { size: A4; margin: 15mm 16mm; }
*{box-sizing:border-box}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0;font-family:Pretendard,'Malgun Gothic',sans-serif;color:#1a1c1b;font-size:10pt;line-height:1.66;word-break:keep-all}
h1,h2,h3,p,dl,dd,ul{margin:0}
ul{padding-left:14px}
li+li{margin-top:3.5px}
.sheet{break-before:page}
.sheet:first-child{break-before:auto}

/* 표지 */
.cover{display:flex;flex-direction:column;justify-content:center;min-height:247mm}
.cover .kicker{font-size:9pt;letter-spacing:.18em;color:#7c8a83}
.cover h1{font-size:34pt;letter-spacing:-.04em;line-height:1.15;margin:10px 0 0}
.cover .role{margin-top:8px;font-size:11pt;color:#2f6b52;font-weight:600}
.cover .line{margin-top:26px;font-size:13pt;line-height:1.6;max-width:150mm}
.cover .rule{margin:30px 0;height:2px;background:#2f6b52;width:54px}
.cover .ct{font-size:10pt;color:#4b5551;line-height:2}
.cover .ct b{display:inline-block;width:58px;color:#7c8a83;font-weight:500}

/* 요약면 */
.sec-h{display:flex;align-items:baseline;gap:10px;border-bottom:1.5px solid #1a1c1b;padding-bottom:6px;margin:0 0 12px}
.sec-h h2{font-size:16pt;letter-spacing:-.02em}
.sec-h span{font-size:9.4pt;color:#7c8a83}
.sec+.sec{margin-top:16px}
.row{display:grid;grid-template-columns:30mm 1fr;gap:10px;padding:5.5px 0;border-bottom:.6px solid #dfe3e1}
.plist{display:grid;grid-template-columns:1fr 1fr;gap:0 16px}
.plist .row{grid-template-columns:8mm 1fr;padding:5px 0}
.plist .row h3{font-size:9.8pt;display:block}
.plist .row h3 em{display:block;margin-top:1px}
.row:last-child{border-bottom:0}
.row .when{font-size:9.4pt;color:#7c8a83;padding-top:3px}
.row h3{font-size:10.8pt;display:flex;gap:8px;align-items:baseline;flex-wrap:wrap}
.row h3 em{font-style:normal;font-size:8.6pt;color:#7c8a83;font-weight:400}
.row p{margin-top:3px;color:#4b5551}
.row .tech{margin-top:4px;font-size:9.4pt;color:#2f6b52}

/* 프로젝트면 */
.p-head{display:flex;justify-content:space-between;align-items:baseline;border-bottom:.6px solid #dfe3e1;padding-bottom:5px}
.p-cat{font-size:9.4pt;color:#7c8a83}
.p-num{font-size:9.4pt;color:#b3bcb8;letter-spacing:.1em}
h2{font-size:19.5pt;letter-spacing:-.03em;line-height:1.28;margin-top:13px}
.p-lead{margin-top:8px;color:#4b5551;font-size:10.6pt;max-width:155mm}
.p-bar{display:grid;grid-template-columns:56mm 1fr;gap:12px;align-items:center;background:#f4f2ed;padding:12px 14px;margin:14px 0 16px}
.p-big strong{display:block;font-size:21pt;font-weight:600;letter-spacing:-.03em;line-height:1.15;color:#2f6b52}
.p-big span{display:block;font-size:9pt;color:#7c8a83;margin-top:4px}
.p-meta dl{display:grid;grid-template-columns:auto 1fr;gap:4px 10px;font-size:9.2pt}
.p-meta dt{color:#7c8a83}
.p-meta dd{margin:0}
.blk{display:grid;grid-template-columns:21mm 1fr;gap:11px;padding:9px 0;border-top:.6px solid #dfe3e1;break-inside:avoid}
.blk-l{font-size:10pt;font-weight:600;color:#2f6b52;padding-top:2px}
.flow{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:0 0 15px}
.flow div{border-top:1.6px solid #2f6b52;padding-top:6px}
.flow b{display:block;font-size:10pt;font-weight:600}
.flow span{display:block;font-size:8.4pt;line-height:1.48;color:#7c8a83;margin-top:3px}
figure{margin:13px 0 0;break-inside:avoid}
figure img{max-width:100%;max-height:56mm;width:auto;height:auto;border:.6px solid #dfe3e1;display:block}
figcaption{margin-top:6px;font-size:9pt;color:#7c8a83}
.p-note{margin-top:13px;font-size:9pt;color:#7c8a83;border-top:.6px solid #dfe3e1;padding-top:9px}
`;

const cover = `<section class="sheet cover">
  <div class="kicker">PORTFOLIO</div>
  <h1>${PROFILE.name}</h1>
  <div class="role">${PROFILE.title}</div>
  <p class="line">${esc(PROFILE.line)}</p>
  <div class="rule"></div>
  <div class="ct">
    <div><b>이메일</b>${PROFILE.mail}</div>
    <div><b>연락처</b>${PROFILE.tel}</div>
    <div><b>웹</b>${PROFILE.site}</div>
  </div>
</section>`;

const summary = `<section class="sheet">
  <div class="sec">
    <div class="sec-h"><h2>경력</h2><span>수행한 범위를 중심으로 정리했습니다</span></div>
    ${CAREER.map(([w, org, role, desc]) => `<div class="row"><div class="when">${esc(w)}</div><div><h3>${esc(org)}<em>${esc(role)}</em></h3><p>${esc(desc)}</p></div></div>`).join('')}
  </div>
  <div class="sec">
    <div class="sec-h"><h2>기술을 사용한 자리</h2><span>도구가 아니라 쓴 자리로 적었습니다</span></div>
    ${SKILLS.map(([t, tech, desc]) => `<div class="row"><div class="when">${esc(t)}</div><div><p>${esc(desc)}</p><div class="tech">${esc(tech)}</div></div></div>`).join('')}
  </div>
  <div class="sec">
    <div class="sec-h"><h2>프로젝트</h2><span>다음 장부터 한 건씩</span></div>
    <div class="plist">${PROJECTS.map((p, i) => `<div class="row"><div class="when">${String(i + 1).padStart(2, '0')}</div><div><h3>${esc(p.name)}<em>${esc(p.cat)}</em></h3></div></div>`).join('')}</div>
  </div>
</section>`;

const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8">
<title>${PROFILE.name} 포트폴리오</title>
<link rel="stylesheet" href="styles.css">
<style>${CSS}</style></head><body>
${cover}${summary}${PROJECTS.map(projectPage).join('')}
</body></html>`;

writeFileSync('_pdf.html', html);
console.log(`_pdf.html 생성 — 표지 + 요약 + 프로젝트 ${PROJECTS.length}건`);
