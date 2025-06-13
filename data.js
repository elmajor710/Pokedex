// data.js

// --- 포켓몬 타입별 색상 정보 ---
const typeColors = {
    '노말': '#A8A878', '불': '#F08030', '물': '#6890F0', '풀': '#78C850', '전기': '#F8D030', '얼음': '#98D8D8',
    '격투': '#C03028', '독': '#A040A0', '땅': '#E0C068', '비행': '#A890F0', '에스퍼': '#F85888', '벌레': '#A8B820',
    '바위': '#B8A038', '유령': '#705898', '드래곤': '#7038F8', '악': '#705848', '강철': '#B8B8D0', '페어리': '#EE99AC'
};
const itemColors = { '빨간색': '#e74c3c', '주황색': '#f39c12', '보라색': '#8e44ad' };

// --- 카테고리별 화면 구성 및 데이터 정보 ---
const categoryConfig = {
    pokemonType: {
        title: "타입 목록",
        levels: ['lev2', 'lev3', 'lev4'],
        dataKeys: ['pokemonByType', 'pokemonByType', 'pokemonDetails'],
        renderType: ['list', 'list', 'detail'],
        detailRenderer: pokemonDetailRenderer,
        listStyle: 'icon-button'
    },
    pokemonGrade: {
        title: "등급 목록",
        levels: ['lev2', 'lev3', 'lev4'],
        dataKeys: ['pokemonByGrade', 'pokemonByGrade', 'pokemonDetails'],
        renderType: ['list', 'list', 'detail'],
        detailRenderer: pokemonDetailRenderer,
        listStyle: 'normal'
    },
    item: {
        title: "아이템 색상",
        levels: ['lev2', 'lev3', 'lev4'],
        dataKeys: ['itemByColor', 'itemByColor', 'itemDetails'],
        renderType: ['list', 'list', 'detail'],
        detailRenderer: itemDetailRenderer,
        listStyle: 'color-text'
    },
    rune: {
        title: "룬 종류",
        levels: ['lev2', 'lev3'],
        dataKeys: ['runeDetails', 'runeDetails'],
        renderType: ['list', 'detail'],
        detailRenderer: runeChipDetailRenderer,
        listStyle: 'normal'
    },
    chip: {
        title: "칩 종류",
        levels: ['lev2', 'lev3'],
        dataKeys: ['chipDetails', 'chipDetails'],
        renderType: ['list', 'detail'],
        detailRenderer: runeChipDetailRenderer,
        listStyle: 'normal'
    },
    recommendedDeck: {
        title: "덱 속성",
        levels: ['lev2', 'lev3'],
        dataKeys: ['recommendedDecks', 'recommendedDecks'],
        renderType: ['list', 'detail'],
        detailRenderer: deckDetailRenderer,
        listStyle: 'icon-button'
    },
    calendar: {
        title: "뽑기 종류",
        levels: ['lev2', 'lev3'],
        dataKeys: ['calendarEvents', 'calendarEvents'],
        renderType: ['list', 'detail'],
        detailRenderer: simpleDetailRenderer,
        listStyle: 'normal'
    },
    tips: {
        title: "가이드 종류",
        levels: ['lev2', 'lev3'],
        dataKeys: ['tipsAndKnowhow', 'tipsAndKnowhow'],
        renderType: ['list', 'detail'],
        detailRenderer: simpleDetailRenderer,
        listStyle: 'normal'
    }
};

// --- 상세 정보(Lev.4)를 HTML로 만들어주는 함수들 ---
function pokemonDetailRenderer(data, name) { /* ... */ }
function itemDetailRenderer(data, name) {
    return `<h2>${name}</h2><p>${data.description}</p>`;
}
function deckDetailRenderer(data, name) {
    return `<h2>${name} 덱 구성</h2><ul>${
        (data.members || []).map(item => `<li>${item}</li>`).join('')
    }</ul>`;
}
function simpleDetailRenderer(data, name) {
    return `<h2>${name}</h2><pre style="white-space: pre-wrap;">${data}</pre>`;
}
function runeChipDetailRenderer(data, name) {
    if (!data) return '<p>정보가 없습니다.</p>';
    const imageUrlHTML = data.imageUrl ? `<img src="${data.imageUrl}" alt="${name}">` : '';
    const descriptionHTML = data.description ? `<pre>${data.description}</pre>` : '';
    return `<div class="detail-view-container"><h2>${name}</h2>${imageUrlHTML}${descriptionHTML}</div>`;
}

// --- 실제 데이터베이스 ---
const database = {
    pokemonByType: {
        '노말': ['잠만보'],
        '불': ['메가 리자몽X'],
        '물': ['원시 가이오가'],
        '풀': [],
        '전기': [],
        '얼음': [],
        '격투': [],
        '독': [],
        '땅': [],
        '비행': [],
        '에스퍼': [],
        '벌레': [],
        '바위': [],
        '유령': [],
        '드래곤': [],
        '악': [],
        '강철': [],
        '페어리': ['마기아나']
    },
    pokemonByGrade: {
        'SS': ['원시 가이오가'],
        'S+': [],
        'S': []
    },
    itemByColor: {
        '빨간색': ['생명의구슬'],
        '주황색': ['구애스카프'],
        '보라색': ['맹독구슬']
    },
    runeDetails: {
        '반격': {
            imageUrl: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F9FyNr%2FbtsOxx2LAy2%2Fk8M0rvXZ4gV7yDHTlVajoK%2Fimg.png',
            description: '서포트 룬스톤\n반격3개 공명<span style="color:red;">(빨간색)</span>: 반사율+12%'
        },
        // … 기타 룬 데이터 동일
    },
    chipDetails: { /* 이전과 동일 */ },
    recommendedDecks: { /* 이전과 동일 */ },
    calendarEvents: { /* 이전과 동일 */ },
    tipsAndKnowhow: { /* 이전과 동일 */ },
    pokemonDetails: { /* 이전과 동일 */ },
    itemDetails: { /* 이전과 동일 */ }
};
