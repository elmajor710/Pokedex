// --- 포켓몬 타입별 색상 정보 ---
const typeColors = {
    '노말': '#A8A878', '불': '#F08030', '물': '#6890F0', '풀': '#78C850', '전기': '#F8D030', '얼음': '#98D8D8',
    '격투': '#C03028', '독': '#A040A0', '땅': '#E0C068', '비행': '#A890F0', '에스퍼': '#F85888', '벌레': '#A8B820',
    '바위': '#B8A038', '유령': '#705898', '드래곤': '#7038F8', '악': '#705848', '강철': '#B8B8D0', '페어리': '#EE99AC',
    '고스트': '#705898' // 추천덱용 색상
};
const itemColors = { '빨간색': '#e74c3c', '주황색': '#f39c12', '보라색': '#8e44ad' };

// --- 카테고리별 화면 구성 및 데이터 정보 ---
const categoryConfig = {
    pokemonType: { title: "타입 목록", levels: ['lev2', 'lev3', 'lev4'], dataKeys: ['pokemonByType', 'pokemonByType', 'pokemonDetails'], renderType: ['list', 'list', 'detail'], detailRenderer: pokemonDetailRenderer, listStyle: 'icon-button', finalView: ['lev4'] },
    pokemonGrade: { title: "등급 목록", levels: ['lev2', 'lev3', 'lev4'], dataKeys: ['pokemonByGrade', 'pokemonByGrade', 'pokemonDetails'], renderType: ['list', 'list', 'detail'], detailRenderer: pokemonDetailRenderer, listStyle: 'normal', finalView: ['lev4'] },
    item: { title: "아이템 색상", levels: ['lev2', 'lev3', 'lev4'], dataKeys: ['itemByColor', 'itemByColor', 'itemDetails'], renderType: ['list', 'list', 'detail'], detailRenderer: itemDetailRenderer, listStyle: 'color-text', finalView: ['lev4'] },
    rune: { title: "룬 종류", levels: ['lev2', 'lev3'], dataKeys: ['runeDetails', 'runeDetails'], renderType: ['list', 'detail'], detailRenderer: simpleDetailRenderer, listStyle: 'normal', finalView: ['lev3'] },
    chip: { title: "칩 종류", levels: ['lev2', 'lev3'], dataKeys: ['chipDetails', 'chipDetails'], renderType: ['list', 'detail'], detailRenderer: simpleDetailRenderer, listStyle: 'normal', finalView: ['lev3'] },
    recommendedDeck: { title: "덱 속성", levels: ['lev2', 'lev3'], dataKeys: ['recommendedDecks', 'recommendedDecks'], renderType: ['list', 'detail'], detailRenderer: deckDetailRenderer, listStyle: 'icon-button', finalView: ['lev3'] },
    calendar: { title: "뽑기 종류", levels: ['lev2', 'lev3'], dataKeys: ['calendarEvents', 'calendarEvents'], renderType: ['list', 'detail'], detailRenderer: simpleDetailRenderer, listStyle: 'normal', finalView: ['lev3'] },
    tips: { title: "가이드 종류", levels: ['lev2', 'lev3'], dataKeys: ['tipsAndKnowhow', 'tipsAndKnowhow'], renderType: ['list', 'detail'], detailRenderer: simpleDetailRenderer, listStyle: 'normal', finalView: ['lev3'] }
};

// --- 상세 정보(Lev.4)를 HTML로 만들어주는 함수들 ---
function pokemonDetailRenderer(data) {
    return `<div class="detail-header" style="text-align:center;"><img src="${data.imageUrl}" alt="${data.name}" style="display:${data.imageUrl ? 'block' : 'none'}; margin: auto; max-width: 150px;"><h2 style="color:var(--primary-color);">${data.name}</h2><p>${data.description}</p></div><div class="detail-section"><h3>스킬 정보</h3><div style="margin-bottom:1em;"><strong>Active: ${data.skills.active.name}</strong><p>${data.skills.active.description}</p></div><div><strong>Passive: ${data.skills.passive.name}</strong><p>${data.skills.passive.description}</p></div></div><div class="detail-section"><h3>개방 효과</h3><ul style="padding:0; list-style:none;">${Object.entries(data.unlocks).map(([key, value]) => `<li style="margin-bottom:0.5em;"><strong>${key}:</strong> ${value}</li>`).join('')}</ul></div><div class="detail-section"><h3>추천 정보</h3><p><strong>성격:</strong> ${data.recommendations.nature.join(', ')}</p><p><strong>아이템:</strong> ${data.recommendations.item}</p><p><strong>룬:</strong> ${data.recommendations.runes.join(', ')}</p><p><strong>칩:</strong> ${data.recommendations.chips.join(', ')}</p></div>`;
}
function itemDetailRenderer(data) { return `<h2>${data.name}</h2><p>${data.description}</p>`; }
function deckDetailRenderer(data) { return `<h2>덱 구성</h2><ul style="padding:0; list-style:none;">${data.map(item => `<li>${item}</li>`).join('')}</ul>`; }
function simpleDetailRenderer(data) { return `<pre style="white-space: pre-wrap; word-wrap: break-word; font-family: inherit;">${data}</pre>`; }

// --- 실제 데이터베이스 ---
const database = {
    pokemonByType: {'노말':['잠만보'],'불':['메가 리자몽X'],'물':['원시 가이오가'],'풀':[],'전기':[],'얼음':[],'격투':[],'독':[],'땅':[],'비행':[],'에스퍼':[],'벌레':[],'바위':[],'유령':[],'드래곤':[],'악':[],'강철':[],'페어리':['마기아나']},
    pokemonByGrade: {'SS':['원시 가이오가'],'S+':[],'S':[]},
    itemByColor: {'빨간색':['생명의구슬'],'주황색':['구애스카프'],'보라색':['맹독구슬']},
    runeDetails: {'치명':'치명타 확률이 15% 증가합니다.','전투광':'공격 시 데미지가 15% 증가합니다.','실드':'전투 시작 시 최대 HP의 20%에 해당하는 실드를 얻습니다.','비호':'상태이상 저항이 20% 증가합니다.','방어':'방어력이 20% 증가합니다.','반짝임':'피격 시 15% 확률로 1턴간 모든 공격을 회피합니다.','반격':'피격 시 20% 확률로 받은 데미지의 30%를 되돌려줍니다.','강격':'공격력이 20% 증가합니다.'},
    chipDetails: {'화무':'자신이 화상 상태에 걸리지 않으며, 턴 종료 시 HP를 10% 회복합니다.','헌제':'자신이 쓰러질 때 모든 아군 포켓몬의 HP를 20% 회복시킵니다.','초능':'특수 공격 시 데미지가 15% 증가합니다.','뱀유령':'공격 시 30% 확률로 상대를 중독 상태로 만듭니다.','방패':'전투 시작 시 2턴 동안 모든 데미지를 무효화하는 실드를 생성합니다.','늑대행자':'상대를 쓰러뜨릴 때마다 공격력이 1단계 상승합니다.','귀갑':'받는 데미지가 15% 감소합니다.','공포':'HP가 50% 이하일 때, 공격력이 50% 증가합니다.','개구리가시':'상대에게 데미지를 줄 때마다 자신의 특수공격이 1단계 상승합니다.'},
    recommendedDecks: {'불':['메가 리자몽X'],'물':['원시 가이오가'],'풀':[],'고스트':[]},
    calendarEvents: {'랭킹뽑기':'2025.06.13 - 챔피언 피카츄(전기) / 레지에레키','한정뽑기':'2025.05.23 - 알랭의 메가 리자몽X, 이로치 메가 나무킹'},
    tipsAndKnowhow: {'육성가이드':'1. 메인 딜러 포켓몬을 최우선으로 육성합니다.\n2. 서포터 포켓몬들은 효율을 위해 9~10성까지만 육성합니다.\n3. 가장 좋은 칩과 아이템은 메인 딜러에게 집중합니다.','성급기준':'4성 -> 5성: 1마리\n5성 -> 6성: 1마리\n6성 -> 7성: 2마리\n7성 -> 8성: 2마리\n8성 -> 9성: 2마리\n9성 -> 10성: 3마리','조각 활용':'조각은 SS급 이상의 필수 포켓몬 성급을 올리는 데에만 집중적으로 사용하세요.'},
    pokemonDetails: {'원시 가이오가': {name: '원시 가이오가', imageUrl: 'https://i.imgur.com/ADa5b6k.png', description: '가이오가가 진정한 힘, 각성 후의 원시적인 모습...', skills: { active: {name:'물의파동',description:'...'}, passive: {name:'근원의바다',description:'...'}},unlocks: {'비오는 날씨':'...','6성 개방':'...','7성 개방':'...','8성 개방':'...'},recommendations: { nature:['조심','겁쟁이'], item:'먹다남은 사과', runes:['신속 3개','금강 6개'], chips:['귀갑 2개','명상 4개']}}},
    itemDetails: {'생명의구슬': {name: '생명의구슬', description: '기술의 위력이 1.3배 오르지만, 공격 기술을 사용할 때마다 전체 HP의 1/10이 줄어든다.'}}
};
