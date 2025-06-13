// --- 색상 정보 ---
const typeColors = {
    '노말': '#A8A878', '불': '#F08030', '물': '#6890F0', '풀': '#78C850', '전기': '#F8D030', '얼음': '#98D8D8',
    '격투': '#C03028', '독': '#A040A0', '땅': '#E0C068', '비행': '#A890F0', '에스퍼': '#F85888', '벌레': '#A8B820',
    '바위': '#B8A038', '유령': '#705898', '드래곤': '#7038F8', '악': '#705848', '강철': '#B8B8D0', '페어리': '#EE99AC',
    '고스트': '#705898' // 추천덱용 색상
};

const itemColors = {
    '빨간색': '#e74c3c',
    '주황색': '#f39c12',
    '보라색': '#8e44ad'
};

// --- 카테고리별 화면 구성 및 데이터 정보 ---
const categoryConfig = {
    pokemonType: { title: "타입 목록", levels: ['lev2', 'lev3', 'lev4'], dataKeys: ['pokemonByType', 'pokemonByType', 'pokemonDetails'], renderType: ['list', 'list', 'detail'], detailRenderer: pokemonDetailRenderer, listStyle: 'icon-button' },
    pokemonGrade: { title: "등급 목록", levels: ['lev2', 'lev3', 'lev4'], dataKeys: ['pokemonByGrade', 'pokemonByGrade', 'pokemonDetails'], renderType: ['list', 'list', 'detail'], detailRenderer: pokemonDetailRenderer, listStyle: 'normal' },
    item: { title: "아이템 색상", levels: ['lev2', 'lev3', 'lev4'], dataKeys: ['itemByColor', 'itemByColor', 'itemDetails'], renderType: ['list', 'list', 'detail'], detailRenderer: itemDetailRenderer, listStyle: 'color-text' },
    rune: { title: "룬 종류", levels: ['lev2', 'lev3'], dataKeys: ['runeDetails', 'runeDetails'], renderType: ['list', 'detail'], detailRenderer: simpleDetailRenderer, listStyle: 'normal' },
    chip: { title: "칩 종류", levels: ['lev2', 'lev3'], dataKeys: ['chipDetails', 'chipDetails'], renderType: ['list', 'detail'], detailRenderer: simpleDetailRenderer, listStyle: 'normal' },
    recommendedDeck: { title: "덱 속성", levels: ['lev2', 'lev3'], dataKeys: ['recommendedDecks', 'recommendedDecks'], renderType: ['list', 'detail'], detailRenderer: deckDetailRenderer, listStyle: 'icon-button' },
    calendar: { title: "뽑기 종류", levels: ['lev2', 'lev3'], dataKeys: ['calendarEvents', 'calendarEvents'], renderType: ['list', 'detail'], detailRenderer: simpleDetailRenderer, listStyle: 'normal' },
    tips: { title: "가이드 종류", levels: ['lev2', 'lev3'], dataKeys: ['tipsAndKnowhow', 'tipsAndKnowhow'], renderType: ['list', 'detail'], detailRenderer: simpleDetailRenderer, listStyle: 'normal' }
};

// --- 상세 정보(Lev.4)를 HTML로 만들어주는 함수들 ---
// (생략 - 이전과 동일)

// --- 실제 데이터베이스 ---
const database = {
    // (생략 - 이전과 동일)
};
