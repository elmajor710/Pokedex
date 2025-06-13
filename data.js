// --- 상세 화면을 그려주는 함수 ---
// 이 함수는 이미지 주소가 있으면 이미지를, 없으면 설명만 보여줍니다.
function simpleDetailRenderer(data) {
    const imageUrlHTML = data.imageUrl ? `<img src="${data.imageUrl}" class="detail-image">` : '';
    const descriptionHTML = data.description ? `<p>${data.description}</p>` : '';
    return `${imageUrlHTML}${descriptionHTML}`;
}

// --- 카테고리별 화면 구성 및 데이터 정보 ---
const categoryConfig = {
    pokemonType: {
        title: "타입 목록",
        levels: ['lev2', 'lev3', 'lev4'],
        dataKeys: ['pokemonByType', 'pokemonByType', 'pokemonDetails'],
        renderType: ['list', 'list', 'detail'],
        detailRenderer: simpleDetailRenderer // ★ 이미지 렌더러 할당
    },
    pokemonGrade: {
        title: "등급 목록",
        levels: ['lev2', 'lev3', 'lev4'],
        dataKeys: ['pokemonByGrade', 'pokemonByGrade', 'pokemonDetails'],
        renderType: ['list', 'list', 'detail'],
        detailRenderer: simpleDetailRenderer // ★ 이미지 렌더러 할당
    },
    item: {
        title: "아이템 색상",
        levels: ['lev2', 'lev3', 'lev4'],
        dataKeys: ['itemByColor', 'itemByColor', 'itemDetails'],
        renderType: ['list', 'list', 'detail'],
        detailRenderer: simpleDetailRenderer // ★ 이미지 렌더러 할당
    },
    rune: {
        title: "룬 종류",
        levels: ['lev2', 'lev3'],
        dataKeys: ['runeDetails', 'runeDetails'],
        renderType: ['list', 'detail'],
        detailRenderer: simpleDetailRenderer // ★ 이미지 렌더러 할당
    },
    chip: {
        title: "칩 종류",
        levels: ['lev2', 'lev3'],
        dataKeys: ['chipDetails', 'chipDetails'],
        renderType: ['list', 'detail'],
        detailRenderer: simpleDetailRenderer // ★ 이미지 렌더러 할당
    },
    recommendedDeck: {
        title: "덱 속성",
        levels: ['lev2', 'lev3'],
        dataKeys: ['recommendedDecks', 'recommendedDecks'],
        renderType: ['list', 'detail'],
        detailRenderer: simpleDetailRenderer // ★ 이미지 렌더러 할당
    },
    calendar: { /* 변경 없음 */ },
    tips: { /* 변경 없음 */ }
};

// --- 실제 데이터베이스 (이미지 저장을 위한 구조 변경) ---
const database = {
    pokemonByType: {
        '노말': ['잠만보', '아르세우스'],
        '불': ['메가 리자몽X', '원시 그란돈'],
        '물': ['원시 가이오가', '펄기아']
    },
    pokemonByGrade: { 'SS': ['원시 가이오가', '뮤츠'], 'S+': ['디아루가', '기라티나'] },
    itemByColor: { '빨간색': ['생명의구슬'], '주황색': ['구애스카프'] },
    
    // ★ 상세 정보들이 { description, imageUrl } 형태로 변경되었습니다.
    runeDetails: {
        '치명': { description: '치명타 확률이 15% 증가합니다.', imageUrl: '' },
        '전투광': { description: '공격 시 데미지가 15% 증가합니다.', imageUrl: '' }
    },
    chipDetails: {
        '화무': { description: '자신이 화상 상태에 걸리지 않습니다.', imageUrl: '' },
        '헌제': { description: '자신이 쓰러질 때 아군을 회복시킵니다.', imageUrl: '' }
    },
    recommendedDecks: {
        '불 타입 덱': { description: '강력한 불꽃으로 모든 것을 태우는 덱입니다.', imageUrl: '' },
        '물 타입 덱': { description: '잔잔한 비와 거대한 해일로 상대를 제압하는 덱입니다.', imageUrl: '' }
    },
    pokemonDetails: {
        '원시 가이오가': { description: '물의 신. 모든 바다를 관장하는 포켓몬입니다.', imageUrl: '' },
        '잠만보': { description: '먹고 자는 것이 일상인 포켓몬입니다.', imageUrl: '' }
    },
    itemDetails: {
        '생명의구슬': { description: '공격력이 오르지만 매 턴 체력이 감소합니다.', imageUrl: '' }
    },

    calendarEvents: { /* 변경 없음 */ },
    tipsAndKnowhow: { /* 변경 없음 */ }
};
