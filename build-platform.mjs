// platform/ 전용 빌드 — 플랫폼·IT(PM/Software/보안) 직무 타게팅
// 기존 index.html / projects/ 는 건드리지 않는다.
import {writeFileSync, mkdirSync, readFileSync} from 'node:fs';

function flow(items){return `<div class="flow" role="list">${items.map(([a,b])=>`<div role="listitem">${a}<small>${b}</small></div>`).join('')}</div>`}

const bgpBase = JSON.parse(readFileSync(new URL('./bgp.json', import.meta.url), 'utf8'));

const projects = [
{id:'desktop',name:'실시간 코칭 데스크톱 앱 개발과 운영',category:'루모스 / LOLPAGO 서비스',period:'2026.02 – 현재',role:'서비스 기획과 UI 설계부터 클라이언트 구현, 빌드와 코드 서명, 배포 이후 장애 대응까지 담당',stack:'React / TypeScript / Electron / REST API / WebSocket / MySQL',metric:'100 →<br>150–200',unit:'게임 동시 실행 시 프레임(FPS)',desc:'기획부터 배포와 운영까지 한 사이클을 직접 돌린 서비스입니다.',summary:'화면을 만드는 데서 끝나지 않았습니다. <br class="opt">사용자의 실제 실행 환경에서 생기는 성능 문제와 설치 문제까지 맡아 버전을 이어왔습니다.',sections:[
['problem','맡은 범위',`<p>경기 데이터와 실시간 정보로 코칭을 전달하는 Windows 데스크톱 앱입니다. 서비스 기획과 화면 설계부터 클라이언트 구현, 빌드와 배포, 운영 중 문제 대응까지 한 사이클을 맡았습니다.</p><figure><a href="{{A}}assets/lolpago-app.png" target="_blank" rel="noopener noreferrer" aria-label="롤파고 앱 화면 원본 보기"><img src="{{A}}assets/lolpago-app.png" width="1598" height="1048" alt="실시간 에이전트와 코칭 기능이 표시된 롤파고 데스크톱 앱 실제 화면" loading="lazy"></a><figcaption>롤파고 데스크톱 앱 실제 캡처 화면</figcaption></figure><p>사용자는 게임 중이라 화면을 오래 읽을 수 없습니다. 화면에는 타이머와 알림만 남기고 설명이 필요한 조언은 음성으로 보냈습니다. 공식 API로 확인되지 않는 정보는 화면 캡처와 비전 인식 및 OCR로 보완했습니다.</p><figure class="compact-shot"><a href="{{A}}assets/coaching-live.png" target="_blank" rel="noopener noreferrer" aria-label="코칭 오버레이 캡처 원본 보기"><img src="{{A}}assets/coaching-live.png" width="689" height="250" alt="상대의 점멸 사용 감지를 안내하는 실제 게임 내 코칭 오버레이" loading="lazy"></a><figcaption>실제 게임 중 상대의 점멸 사용을 감지해 안내한 코칭 오버레이</figcaption></figure>`],
['structure','시스템 구성',`${flow([['데이터 수집','공식 API와 화면 캡처'],['저장과 제공','MySQL과 자체 API'],['클라이언트','React · Electron'],['실시간 전달','WebSocket과 음성 안내']])}<p>수집한 경기 데이터를 MySQL에 저장하고 서비스에서 쓰기 쉬운 형태로 가공해 자체 API로 제공했습니다. 실시간 구간은 WebSocket으로 연결하고 분석 결과를 화면과 음성에 나눠 전달했습니다.</p><p class="note">역할을 요약한 개념도입니다. 모든 경로를 직렬로 처리한다는 뜻은 아닙니다.</p><figure><a href="{{A}}assets/lolpago-client.png" target="_blank" rel="noopener noreferrer" aria-label="게임 클라이언트 연동 화면 원본 보기"><img src="{{A}}assets/lolpago-client.png" width="2867" height="1235" alt="게임의 챔피언 선택 화면과 함께 실행 중인 롤파고 앱 실제 캡처" loading="lazy"></a><figcaption>게임 클라이언트와 함께 실행한 실제 캡처 화면</figcaption></figure>`],
['decisions','운영 중 해결한 문제',`<h3>따로 보이던 두 증상이 같은 경로에서 나왔습니다</h3><p>앱 단독 실행에서는 없던 프레임 저하가 게임과 동시에 실행할 때 나타났고 오래 켜 둘수록 메모리도 계속 늘었습니다. 처음에는 별개 문제로 보였지만 화면을 캡처해 서버로 보내는 경로를 따라가 보니 원인이 같았습니다.</p><p>이미지를 문자열로 바꿔 보내던 방식을 바이너리 규격으로 교체하고 캡처 주기와 프로세스 간 전달 구조를 정리했습니다.</p><div class="result"><strong>약 100 → 150–200 FPS</strong><p>게임 동시 실행 시 확인한 프레임 변화입니다. 틱당 전송량은 약 24% 줄었고 장시간 실행 시 누적되던 메모리 증가도 함께 해결했습니다.</p></div><p class="note">개발 과정에서 관찰한 환경 기준의 수치입니다. 전송 방식과 처리 구조를 함께 바꾼 결과이며 모든 PC의 성능을 보장하지는 않습니다.</p><h3>특정 환경에서만 클라이언트를 찾지 못했습니다</h3><p>개발 환경에서는 정상 동작했지만 일부 사용자 환경에서만 게임 클라이언트를 인식하지 못했습니다. 환경마다 예외를 더하는 대신 감지 방식의 전제를 다시 확인했고 설치 경로에 의존하는 구조가 원인이었습니다.</p><p>실행 중인 프로세스에서 접속 정보를 직접 읽는 보완 경로를 설계했고 기존에 정상 동작하던 사용자는 원래 경로에서 끝나도록 두어 실패한 경우에만 폴백이 작동하게 했습니다.</p>`],
['results','배포와 그 이후',`<p>코드 서명과 설치 프로그램을 구성하고 자동 업데이트를 붙여 사용자가 새 버전을 따로 내려받지 않아도 되게 했습니다. 배포 이후에는 실행 환경에서 올라오는 문의를 받아 원인을 좁히고 수정 버전을 올렸습니다.</p><p>버전을 올릴 때마다 같은 항목을 다시 점검해 이전에 고친 문제가 재발하지 않는지 확인했습니다. 코드를 작성한 시점이 아니라 실제 환경에서 동작을 확인한 시점을 작업의 끝으로 두었습니다.</p><a class="external" href="https://lolpago.com/" target="_blank" rel="noopener noreferrer">직접 개발한 LOLPAGO 웹사이트 ↗</a>`],
['learning','남은 기준',`<p>기능 구현과 배포를 별개의 일로 보지 않게 됐습니다. 수정한 코드뿐 아니라 화면과 음성처럼 다른 전달 경로에도 영향이 남는지 확인합니다.</p><p>금융 서비스도 한번 열리면 멈추기 어렵습니다. 증상이 난 자리만 고치기보다 데이터가 어디서 생겨 어떤 경로로 전달되는지 따라가 원인에서 막는 방식으로 일하겠습니다.</p>`]
]},

{id:'tournament',name:'대회 운영 업무 자동화 시스템',category:'루모스 / 외부 고객 의뢰',periodLabel:'개발 기간',period:'2026.04 (이후 운영과 유지보수)',role:'2인 개발. 업무 흐름 설계와 기능 구현, 발주자 요구사항 확인과 진행 보고 담당',stackLabel:'업무와 수행 범위',stack:'업무 프로세스 설계 / 웹 시스템 개발 / 테스트 서버 검증 / 운영과 유지보수',metric:'22',unit:'하나의 흐름으로 연결한 운영 기능',desc:'단계마다 끊기던 대회 운영을 하나의 데이터 흐름으로 묶었습니다.',summary:'화면을 먼저 만들지 않았습니다. <br class="opt">신청부터 상장 발행까지 이어지는 업무를 하나의 데이터 흐름으로 정의한 뒤 <br class="opt">기능 사이의 관계를 설계했습니다.',sections:[
['problem','기존 운영 방식',`<p>태권도 대회 운영은 참가 신청 이후 체급과 조 편성, 대진표 작성, 경기 결과 반영, 순위 산정, 상장 발행이 순서대로 이어집니다. 각 단계가 따로 처리되다 보니 한 단계를 고치면 다음 단계는 다시 손으로 맞춰야 했습니다.</p><p>대진표는 수작업으로 만들었고 진행 중인 경기 상황을 한눈에 파악하기 어려웠습니다. 상장 출력과 컷오프 처리에도 같은 정보를 여러 곳에 옮겨 적는 과정이 남아 있어 오류가 생기기 쉬웠습니다.</p>`],
['structure','설계 방향',`<p>개별 화면부터 만들지 않고 전체 업무를 하나의 데이터 흐름으로 먼저 정의했습니다. 참가자 정보를 기준 데이터로 두고 뒤따르는 단계가 그 값을 이어받도록 기능 사이의 관계를 설계했습니다.</p>${flow([['신청과 참가자','기준 데이터 등록'],['체급과 조 편성','자동 배정'],['대진표와 진행','경기 순서와 코트 관리'],['결과와 상장','순위 산정 후 출력']])}<p>기능을 늘리기보다 기준 데이터를 하나로 두는 쪽을 택했습니다. 정보가 한 곳에서만 입력되면 뒤따르는 단계는 계산으로 처리할 수 있었습니다.</p><p class="note">업무 흐름을 설명하기 위한 개념도입니다. 실제 대회 데이터는 포함하지 않았습니다.</p>`],
['decisions','판단과 협업',`<h3>규칙이 불명확한 부분은 임의로 구현하지 않았습니다</h3><p>대회마다 운영 규칙이 조금씩 달라 문서만으로 판단하기 어려운 부분이 있었습니다. 추측으로 구현하면 실제 대회에서 다시 손봐야 하므로 발주자에게 실제 진행 순서를 확인해 조건을 구체화한 뒤 반영했습니다.</p><h3>진행 상황을 정해진 주기로 공유했습니다</h3><p>주 2~3회 진행 보고와 단계별 검수를 거쳤고 긴급한 이슈는 발견 즉시 공유했습니다. 테스트 서버에서 먼저 검증한 뒤 실제 운영에 반영하는 순서를 지켰습니다.</p>`],
['results','결과',`<div class="result"><strong>22개 기능 / 2인 개발</strong><p>신청부터 상장 발행까지 이어지는 기능을 2인이 개발해 실제 대회에 적용했습니다.</p></div><p>한 곳을 고치면 뒤따르는 단계가 함께 바뀌어 중간에 정보를 옮겨 적는 일이 없어졌습니다. 대회 이후 들어온 수정 요청에도 같은 구조 안에서 대응했습니다.</p><p class="note">계약상 개발 기간은 2026년 4월이며 이후 운영과 유지보수를 이어갔습니다.</p>`],
['learning','업무에 남은 기준',`<p>디지털화는 기존 절차를 화면으로 옮기는 일이 아니라고 생각하게 됐습니다. 중복 입력과 반복 판단이 생기는 지점을 찾아 업무 흐름 자체를 다시 설계하는 일에 가깝습니다.</p><p>현업이 실제로 어떻게 일하는지 확인하지 않으면 기능은 완성돼도 쓰이지 않습니다. 요구사항을 문서로만 받지 않고 진행 순서를 직접 물어 확인하는 습관이 남았습니다.</p>`]
]},

{id:'knowledge',name:'AI 응답 품질 검증 체계 구축',category:'루모스 / 지식베이스와 평가',period:'2026.06 – 2026.09',role:'데이터 수집과 검색 구조 설계부터 평가 체계 구축과 회귀 확인까지 담당',stack:'Python / 구조화 검색 / LLM 질의 라우팅 / 회귀 평가',metric:'51 → 80',unit:'90회 평가 중 자동 통과 응답',desc:'AI가 내놓은 답이 틀렸다는 것을 드러내는 절차를 만들었습니다.',summary:'문서를 찾았는데도 답변이 틀리는 경우가 있었습니다. <br class="opt">어느 단계에서 정보가 빠지는지 나눠 살피고 <br class="opt">바꿀 때마다 같은 기준으로 다시 확인하는 절차를 세웠습니다.',sections:[
['problem','어려웠던 점',`<p>게임 규칙과 통계는 갱신 주기가 다릅니다. 같은 대상에 관한 자료라도 기준 시점이 다르면 조언이 어긋날 수 있어 출처와 버전을 구분한 지식베이스가 필요했습니다.</p><p>자료를 모으고 검색 기능을 구현한 뒤에도 문제가 남았습니다. 검색 회귀 테스트는 통과했지만 실제 질문에서는 필요한 조건을 빠뜨리거나 자료가 있는데도 답할 수 없다는 응답이 나왔습니다. 어느 단계에서 정보가 누락되는지 밝히는 일이 가장 어려웠습니다.</p>`],
['structure','구현한 구조',`<p>원천 자료에서 바로 답변을 만들기보다 검증한 문서와 구조화된 색인을 미리 준비했습니다. 질문을 해석하는 단계와 문서를 검색하는 단계를 분리해 같은 입력의 검색 결과를 다시 확인할 수 있도록 했습니다.</p>${flow([['출처별 수집','규칙과 통계의 버전 기록'],['문서 검증','검증한 문서와 색인 준비'],['질의와 검색','의도 분류 후 근거 발췌'],['답변과 평가','질문과 원문을 함께 대조']])}<p class="note">구현 흐름을 설명하기 위해 재구성한 개념도입니다.</p><p>LLM이 질문의 의도를 구조화하면 검색기가 해당 문서와 필요한 구절을 찾아 전달합니다. 검색기 자체는 LLM이나 외부 네트워크를 호출하지 않도록 구성했고 의도 분류가 실패하는 경우에는 키워드 기반 경로를 두었습니다.</p>`],
['decisions','판단과 수정',`<h3>자료를 더 넣기 전에 전달 경로부터 확인했습니다</h3><p>의도 분류 결과와 검색된 발췌문 그리고 최종 답변을 기록해 비교했습니다. 대상을 인식하지 못한 경우와 문서를 찾고도 필요한 조건을 전달하지 못한 경우를 구분했습니다.</p><table class="comparison"><thead><tr><th>실패 사례</th><th>수정한 지점</th></tr></thead><tbody><tr><td>약칭을 대상으로 인식하지 못함</td><td>약칭을 별칭 색인에 연결</td></tr><tr><td>발동 순서를 빌드 순서로 해석</td><td>질문 의도 분기 수정</td></tr><tr><td>일반 질문을 다른 유형으로 처리</td><td>검색 경로 분리</td></tr></tbody></table><h3>자동 채점 결과도 원문과 대조했습니다</h3><p>질문에서 요구한 조건을 모두 설명했는데도 실패로 판정된 사례가 있었습니다. 답변 오류와 채점 오류를 구분하고 질문이 요구한 조건을 충족했는지 별도로 검토했습니다.</p><p>자동 실패 기록을 지우거나 통과할 때까지 답변을 다시 생성하지 않았습니다. 원래의 판정과 검토 결과를 각각 남겨 점수가 달라진 이유를 추적할 수 있도록 했습니다.</p>`],
['results','결과와 해석',`<div class="result"><strong>51/90 → 80/90</strong><p>동일한 30개 질문을 개선 전후 각각 3회씩 실행했을 때의 자동 통과 응답 수입니다.</p></div><p>검색 회귀 테스트도 함께 통과했지만 검색 회귀와 실제 답변 평가는 서로 다른 검사이므로 결과를 나눠 기록했습니다. 고친 오답은 기준 문항으로 남겨 갱신할 때마다 재발하는지 확인했습니다.</p><p class="note">정해진 질문 표본과 보유 자료에 대한 결과이며 전체 서비스 정확도나 사용자 만족도를 뜻하지 않습니다.</p>`],
['learning','남은 기준',`<p>AI가 오답을 내면 프롬프트부터 바꾸기보다 원천 자료와 검색 경로 그리고 평가 기준을 나눠 확인합니다. 통과율이 올랐다는 사실만으로 개선을 판단하지 않고 어떤 실패를 해결했는지 설명할 수 있는 기록을 남깁니다.</p><p>업무에 AI를 붙일 때 어려운 쪽은 도입이 아니라 어디까지 맡기고 무엇으로 확인할지 정하는 일이었습니다. 자동화만큼 검증 방법을 함께 설계하겠습니다.</p>`]
]},

{id:'bookstore',name:'MSA 기반 온라인 서점',category:'NHN Academy / 팀 프로젝트',period:'2024.07 – 2024.12',role:'주문 서비스 API 개발과 단위 테스트 담당. 화면 담당자와 응답 구조 조율',stack:'Java / Spring Boot / Spring Cloud / MySQL / Redis / RabbitMQ / Docker',metric:'80%',unit:'주요 로직 단위 테스트 커버리지',desc:'기능별로 나뉜 서비스를 잇고 응답 구조를 합의했습니다.',summary:'서비스를 기능별로 나누면 각 서비스는 단순해지지만 사이를 잇는 지점에서 문제가 생깁니다. <br class="opt">주문 서비스를 맡아 API와 서비스 간 연동을 구현하고 화면 담당자와 응답 구조를 맞췄습니다.',sections:[
['problem','나눠진 서비스를 잇는 일',`<p>도서와 회원, 주문과 결제를 각각 독립된 서비스로 나눈 온라인 서점을 팀으로 개발했습니다. 저는 주문 서비스를 맡아 API를 구현하고 다른 서비스와 연동하는 구간을 담당했습니다.</p><p>서비스를 나누면 각 서비스는 단순해지지만 경계에서 문제가 생깁니다. 어디까지 주문이 다뤄야 하는지, 다른 서비스의 변경이 주문까지 오게 둘 것인지를 정해야 했습니다.</p>`],
['structure','구현한 범위',`${flow([['주문 API','기능 구현과 예외 처리'],['서비스 간 연동','메시지 기반 전달'],['데이터','MySQL과 캐시'],['검증','단위 테스트와 자동 빌드']])}<p>주문 기능의 API를 구현하고 다른 서비스에는 메시지로 결과를 전달하도록 연결했습니다. 주요 로직과 예외 상황은 단위 테스트로 검증하고 빌드 과정에 포함시켜 변경할 때마다 같은 기준으로 확인했습니다.</p>`],
['decisions','응답 구조를 두고 갈린 의견',`<p>화면을 담당한 팀원은 한 번에 필요한 정보를 모두 담은 응답을 원했습니다. 호출이 여러 번으로 나뉘면 화면이 늦게 뜨고 다뤄야 할 상태도 늘어난다는 이유였습니다. 저는 주문 서비스가 다른 영역의 데이터까지 모아 내려주면 서비스를 나눈 의미가 없고 한쪽이 바뀔 때마다 주문까지 손봐야 한다고 봤습니다.</p><p>서로 근거가 있어 말로는 결론이 나지 않았습니다. 제 주장을 다시 설명하는 대신 화면이 실제로 어떤 정보를 언제 쓰는지 함께 적어 보자고 했습니다. 판단이 갈리는 이유가 서로 다른 장면을 떠올리고 있기 때문이라고 봤습니다.</p><p>목록을 만들어 보니 첫 화면에 바로 필요한 값과 사용자가 동작한 뒤에야 필요한 값이 섞여 있었습니다. 앞쪽은 하나의 응답으로 내려주고 뒤쪽은 서비스별로 나누는 선에서 합의했고 응답 형식과 오류 처리 방식도 함께 정해 문서로 남겼습니다.</p>`],
['results','결과',`<div class="result"><strong>테스트 커버리지 80% 이상</strong><p>주요 로직과 예외 상황을 단위 테스트로 검증하며 유지한 수준입니다.</p></div><p>합의한 기준을 문서로 남긴 뒤 연동 과정에서 되묻는 일이 줄었고 기능을 추가할 때도 같은 기준으로 판단할 수 있었습니다. 프로젝트는 우수상을 받았습니다.</p>`],
['learning','남은 기준',`<p>의견이 갈릴 때 필요한 것은 상대를 설득하는 일이 아니라 각자가 무엇을 기준으로 판단하는지 드러내고 함께 확인할 수 있는 근거를 만드는 일이었습니다.</p><p>화면과 서버를 모두 만들어 봤기 때문에 어느 한쪽 사정만 보고 구조를 정하지 않습니다.</p>`]
]},
];

// BGP는 기존 데이터를 재사용하되 보안 관점으로 소개 문구만 조정.
// 기존 페이지는 projects/ 한 단계 깊이 기준이라 에셋 경로를 토큰으로 바꿔 둔다.
// 루트 사이트는 AI 활용 관점으로 쓰여 있어, 이 사이트에서는 탐지와 판단 기준 쪽으로만 문구를 바꾼다.
const PF_TEXT = [
  ['../assets/', '{{A}}assets/'],
  ['RIPE RIS 데이터를 바탕으로 AS Path와', 'RIPE RIS가 공개한 로그에서 AS Path와'],
  ['라우팅 지식이 없으면 변화의 의미를 파악하기 어렵습니다.',
   '라우팅 지식이 없으면 변화의 의미를 파악하기 어렵습니다. 경로가 잘못 바뀌면 통신이 의도하지 않은 구간을 거치게 되므로 변화를 빨리 알아채야 합니다.'],
  ['분야가 달라져도 데이터를 해석하는 기준과 답변에 필요한 근거부터 정리하는 순서로 접근합니다. 이 프로젝트는 문서나 게임 데이터 외에 네트워크 로그를 분석해 AI 질의응답으로 연결해 본 경험입니다.',
   '로그를 쌓아 두는 일과 이상을 판단하는 일은 달랐습니다. 무엇을 이상으로 볼지 먼저 정의한 뒤에야 탐지와 설명이 가능했습니다. 어떤 도메인의 데이터를 맡아도 판단 기준을 세우는 일부터 하겠습니다.'],
];

projects.push(Object.assign({}, bgpBase, {
  name: '네트워크 로그 이상징후 탐지',
  desc: '대량의 라우팅 로그에서 이상 사례를 찾아 사람이 읽을 수 있게 전달했습니다.',
  unit: '탐지하도록 구현한 이상 사례 유형',
  // 이 사이트에서만 적용하는 문구 교체. bgp.json 원본(루트 사이트)은 건드리지 않는다.
  sections: bgpBase.sections.map(([id, heading, html]) => [
    id,
    heading === '새로운 분야를 다룬 경험' ? '남은 기준' : heading,
    PF_TEXT.reduce((acc, [from, to]) => acc.replaceAll(from, to), html),
  ]),
}));

const ASSET = '{{A}}';

function shell(title, body, depth, homeHref, active){
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | 양준혁</title><meta name="description" content="양준혁의 소프트웨어 개발 포트폴리오. 서비스 기획과 구현부터 배포와 운영, 품질 검증까지 수행한 경험을 소개합니다."><meta name="theme-color" content="#243d36"><meta property="og:title" content="${title} | 양준혁"><meta property="og:description" content="기획한 것을 만들어 배포하고 운영하며 고쳐온 기록."><meta property="og:type" content="website"><meta name="robots" content="noindex"><link rel="icon" href="${depth}assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="${depth}styles.css"></head><body><a class="skip" href="#main">본문으로 건너뛰기</a><aside class="rail"><div class="identity"><a class="monogram" href="${homeHref}" aria-label="양준혁 포트폴리오 홈">Y.</a><div class="person">양준혁</div><div class="role">Software Engineer</div><img class="portrait" src="${depth}assets/portrait.jpg" alt="양준혁 증명사진" width="104" height="139"></div><nav aria-label="주요 메뉴"><a href="${homeHref}#projects" ${active==='projects'?'aria-current="page"':''}>프로젝트 <small>0${projects.length}</small></a><a href="${homeHref}#experience">경력</a><a href="${homeHref}#skills">기술과 경험</a><a href="${homeHref}#contact">연락처</a></nav></aside><main id="main"><div class="topline"><span>JUNHYUK YANG / PORTFOLIO</span></div>${body}<footer class="foot"><span>양준혁 / 소프트웨어 개발 포트폴리오</span><button class="text-button" type="button" data-print>이 페이지 인쇄 / PDF 저장</button></footer></main><script src="${depth}main.js"></script></body></html>`;
}

const home = `<header class="intro"><h1>기획한 것을 만들어 배포하고<br>쓰이는 동안 고쳐왔습니다.</h1><p>안녕하세요. 개발자 양준혁입니다.<br>화면과 서버를 모두 만들고 배포한 뒤 실제 사용 환경에서 생기는 문제까지 맡아왔습니다. <br class="opt">기능이 동작하는 것과 사용자에게 제대로 닿는 것은 다르다고 생각합니다.</p></header><section id="projects"><div class="index-head"><h2>주요 프로젝트</h2><span>맡은 범위와 판단을 중심으로 정리했습니다</span></div>${projects.map(p=>`<a class="project-row" href="projects/${p.id}.html"><div><div class="project-meta">${p.category}</div><h3>${p.name}</h3><p>${p.desc}</p></div><div class="metric"><strong>${p.metric}</strong><span>${p.unit}</span></div><span class="row-arrow" aria-hidden="true">↗</span></a>`).join('')}</section><section class="section" id="experience"><h2>경력</h2><article class="experience"><time>2026.02.19 – 현재</time><div><h3>루모스 <span class="role">소프트웨어 개발부 / 정규직</span></h3><p>실시간 코칭 서비스의 기획과 개발을 주도했습니다. 화면 구현과 데이터 API 연결부터 코드 서명과 버전 배포까지 맡았습니다. 배포 이후 사용자 환경에서 올라오는 문제에 대응했습니다. 외부 고객 의뢰를 받아 대회 운영 업무를 자동화하는 시스템도 개발해 운영 중입니다.</p></div></article><article class="experience"><time>2025.09 – 2025.12</time><div><h3>한국타이어앤테크놀로지 <span class="role">R&D DX / 인턴</span></h3><p>사내 기술문서 약 2,000건을 AI가 검색할 수 있는 데이터로 가공했습니다. 문서 형식별 처리 기준을 정하고 전처리부터 색인까지 Python으로 자동화했으며 현업 연구원 피드백을 정제 기준에 반영했습니다.</p></div></article></section><section class="section" id="skills"><h2>기술을 사용한 자리</h2><div class="skills-list"><div class="skill"><h3>서비스 개발과 운영</h3><p>React와 TypeScript로 화면을 만들고 Electron으로 데스크톱에 배포했습니다. REST API와 WebSocket으로 실시간 데이터를 연결하고 코드 서명과 자동 업데이트까지 구성했습니다. <a href="projects/desktop.html">운영 사례 ↗</a></p></div><div class="skill"><h3>서버와 데이터</h3><p>Java와 Spring으로 주문 API와 서비스 간 연동을 구현했고 Python으로 문서를 정제해 검색 색인까지 연결했습니다. MySQL과 OpenSearch를 다뤘습니다. <a href="projects/bookstore.html">서버 사례 ↗</a></p></div><div class="skill"><h3>업무 흐름 설계</h3><p>화면을 먼저 만들지 않고 업무 전체를 하나의 데이터 흐름으로 정의했습니다. 발주자와 진행 순서를 확인해 규칙을 구체화한 뒤 구현했습니다. <a href="projects/tournament.html">자동화 사례 ↗</a></p></div><div class="skill"><h3>품질과 검증</h3><p>단위 테스트로 주요 로직과 예외를 확인했고 AI 응답은 평가 기준을 나눠 채점했습니다. 바꿀 때마다 같은 기준으로 다시 확인해 재발을 막았습니다. <a href="projects/knowledge.html">검증 사례 ↗</a></p></div></div></section><section class="section" id="contact"><h2>함께 이야기하고 싶습니다</h2><div class="contact"><div class="contact-links"><a href="mailto:junh9126@gmail.com">junh9126@gmail.com ↗</a><a href="tel:+821057661639">+82 10-5766-1639</a></div><p>구현 과정과 판단 근거를<br>더 자세히 설명드리겠습니다.</p></div></section>`;

mkdirSync('platform/projects', {recursive: true});
writeFileSync('platform/index.html', shell('소프트웨어 개발 포트폴리오', home, '../', 'index.html', 'projects').replaceAll(ASSET, '../'));

projects.forEach((p, i) => {
  const next = projects[(i + 1) % projects.length];
  const body = `<header class="case-header"><div class="project-meta">${p.category}</div><h1>${p.name}</h1><p class="summary">${p.summary}</p></header><dl class="case-meta"><div><dt>${p.periodLabel || '기간'}</dt><dd>${p.period}</dd></div><div><dt>내가 맡은 일</dt><dd>${p.role}</dd></div><div style="grid-column:1/-1"><dt>${p.stackLabel || '사용 기술'}</dt><dd>${p.stack}</dd></div></dl><div class="case-layout"><article class="case-body">${p.sections.map(([id, heading, html]) => `<section id="${id}"><h2>${heading}</h2>${html}</section>`).join('')}</article><nav class="toc" aria-label="이 프로젝트 목차"><span>이 프로젝트에서</span>${p.sections.map(([id, heading]) => `<a href="#${id}">${heading}</a>`).join('')}</nav></div><div class="case-next"><a href="../index.html#projects">← 프로젝트 목록</a><a href="${next.id}.html">다음 프로젝트 · ${next.name} →</a></div>`;
  writeFileSync(`platform/projects/${p.id}.html`, shell(p.name, body, '../../', '../index.html', 'projects').replaceAll(ASSET, '../../'));
});

console.log(`platform/ 생성 완료 — index.html + projects/ ${projects.length}개`);
