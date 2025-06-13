// --- 포켓몬 타입별 색상 정보 ---
const typeColors = {
    '노말': '#A8A878', '불': '#F08030', '물': '#6890F0', '풀': '#78C850', '전기': '#F8D030', '얼음': '#98D8D8',
    '격투': '#C03028', '독': '#A040A0', '땅': '#E0C068', '비행': '#A890F0', '에스퍼': '#F85888', '벌레': '#A8B820',
    '바위': '#B8A038', '유령': '#705898', '드래곤': '#7038F8', '악': '#705848', '강철': '#B8B8D0', '페어리': '#EE99AC'
};
const itemColors = { '빨간색': '#e74c3c', '주황색': '#f39c12', '보라색': '#8e44ad' };

// --- 카테고리별 화면 구성 및 데이터 정보 ---
const categoryConfig = {
    pokemonType: { title: "타입 목록", levels: ['lev2', 'lev3', 'lev4'], dataKeys: ['pokemonByType', 'pokemonByType', 'pokemonDetails'], renderType: ['list', 'list', 'detail'], detailRenderer: pokemonDetailRenderer, listStyle: 'icon-button'},
    pokemonGrade: { title: "등급 목록", levels: ['lev2', 'lev3', 'lev4'], dataKeys: ['pokemonByGrade', 'pokemonByGrade', 'pokemonDetails'], renderType: ['list', 'list', 'detail'], detailRenderer: pokemonDetailRenderer, listStyle: 'normal' },
    item: { title: "아이템 색상", levels: ['lev2', 'lev3', 'lev4'], dataKeys: ['itemByColor', 'itemByColor', 'itemDetails'], renderType: ['list', 'list', 'detail'], detailRenderer: itemDetailRenderer, listStyle: 'color-text' },
    rune: { title: "룬 종류", levels: ['lev2', 'lev3'], dataKeys: ['runeDetails', 'runeDetails'], renderType: ['list', 'detail'], detailRenderer: runeChipDetailRenderer, listStyle: 'normal' },
    chip: { title: "칩 종류", levels: ['lev2', 'lev3'], dataKeys: ['chipDetails', 'chipDetails'], renderType: ['list', 'detail'], detailRenderer: runeChipDetailRenderer, listStyle: 'normal' },
    recommendedDeck: { title: "덱 속성", levels: ['lev2', 'lev3'], dataKeys: ['recommendedDecks', 'recommendedDecks'], renderType: ['list', 'detail'], detailRenderer: deckDetailRenderer, listStyle: 'icon-button' },
    calendar: { title: "뽑기 종류", levels: ['lev2', 'lev3'], dataKeys: ['calendarEvents', 'calendarEvents'], renderType: ['list', 'detail'], detailRenderer: simpleDetailRenderer, listStyle: 'normal' },
    tips: { title: "가이드 종류", levels: ['lev2', 'lev3'], dataKeys: ['tipsAndKnowhow', 'tipsAndKnowhow'], renderType: ['list', 'detail'], detailRenderer: simpleDetailRenderer, listStyle: 'normal' }
};

// --- 상세 정보(Lev.4)를 HTML로 만들어주는 함수들 ---
function pokemonDetailRenderer(data) {
    return `<div class="detail-header" style="text-align:center;"><img src="${data.imageUrl}" alt="${data.name}" style="display:${data.imageUrl ? 'block' : 'none'}; margin: auto; max-width: 150px;"><h2 style="color:var(--primary-color);">${data.name}</h2><p>${data.description}</p></div><div class="detail-section"><h3>스킬 정보</h3><div style="margin-bottom:1em;"><strong>Active: ${data.skills.active.name}</strong><p>${data.skills.active.description}</p></div><div><strong>Passive: ${data.skills.passive.name}</strong><p>${data.skills.passive.description}</p></div></div><div class="detail-section"><h3>개방 효과</h3><ul style="padding:0; list-style:none;">${Object.entries(data.unlocks).map(([key, value]) => `<li style="margin-bottom:0.5em;"><strong>${key}:</strong> ${value}</li>`).join('')}</ul></div><div class="detail-section"><h3>추천 정보</h3><p><strong>성격:</strong> ${data.recommendations.nature.join(', ')}</p><p><strong>아이템:</strong> ${data.recommendations.item}</p><p><strong>룬:</strong> ${data.recommendations.runes.join(', ')}</p><p><strong>칩:</strong> ${data.recommendations.chips.join(', ')}</p></div>`;
}
function itemDetailRenderer(data) { return `<h2>${data.name}</h2><p>${data.description}</p>`; }
function deckDetailRenderer(data) { return `<h2>${data.name} 덱 구성</h2><ul>${(data.members || []).map(item => `<li>${item}</li>`).join('')}</ul>`; }
function simpleDetailRenderer(data) { return `<pre style="white-space: pre-wrap; word-wrap: break-word; font-family: inherit;">${data}</pre>`; }
function runeChipDetailRenderer(data, name) {
    if (!data) return '<p>정보가 없습니다.</p>';
    const imageUrlHTML = data.imageUrl ? `<img src="${data.imageUrl}" alt="${name}">` : '';
    const descriptionHTML = data.description ? `<pre>${data.description}</pre>` : '';
    return `<div class="detail-view-container"><h2>${name}</h2>${imageUrlHTML}${descriptionHTML}</div>`;
}

// --- 실제 데이터베이스 ---
const database = {
    pokemonByType: {'노말':['잠만보'],'불':['메가 리자몽X'],'물':['원시 가이오가'],'풀':[],'전기':[],'얼음':[],'격투':[],'독':[],'땅':[],'비행':[],'에스퍼':[],'벌레':[],'바위':[],'유령':[],'드래곤':[],'악':[],'강철':[],'페어리':['마기아나']},
    pokemonByGrade: {'SS':['원시 가이오가'],'S+':[],'S':[]},
    itemByColor: {'빨간색':['생명의구슬'],'주황색':['구애스카프'],'보라색':['맹독구슬']},
    runeDetails: {
        '반격': { imageUrl: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F9FyNr%2FbtsOxx2LAy2%2Fk8M0rvXZ4gV7yDHTlVajoK%2Fimg.png', description: '서포트 룬스톤\n반격3개 공명<span style="color:red;">(빨간색)</span>: 반사율+12%'},
        '반짝임': { imageUrl: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbfWdrA%2FbtsOyqBPbpA%2FmxnqjrkMl8zVCuIiS5MTAK%2Fimg.png', description: '서포트 룬스톤\n반짝임3개 공명<span style="color:red;">(빨간색)</span>: 흡혈률+8%'},
        '비호': { imageUrl: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbJUmHm%2FbtsOwNkWh7C%2F0dqMu4TQyn4Nt3wm4qmkMK%2Fimg.png', description: '서포트 룬스톤\n비호3개 공명<span style="color:red;">(빨간색)</span>: 치료율+12%'},
        '금강': { imageUrl: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdC0J7t%2FbtsOAg8pFld%2Fy1MlzkkA6nYkkFzx4DWcK0%2Fimg.png', description: '방어 룬스톤\n금강3개 공명<span style="color:red;">(빨간색)</span>: PVP피해 감소율+8%\n금강6개 공명<span style="color:red;">(빨간색)</span>: 피해 감소+8%'},
        '실드': { imageUrl: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FephEJ1%2FbtsOxhTl9g7%2FLezrK4qGjmGxyKKNThKZ40%2Fimg.png', description: '방어 룬스톤\n실드3개 공명<span style="color:red;">(빨간색)</span>: HP+16%\n실드6개 공명<span style="color:red;">(빨간색)</span>: 치명타 내성+10%'},
        '방어': { imageUrl: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FwQbPg%2FbtsOyoxe8xs%2FWfU1mfpn3ZLBWTjkoIS8IK%2Fimg.png', description: '방어 룬스톤\n방어3개 공명<span style="color:red;">(빨간색)</span>: 저항률+10%\n방어6개 공명<span style="color:red;">(빨간색)</span>: 저항 강도+10%'},
        '전투광': { imageUrl: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbI8qmg%2FbtsOx9mICsj%2FHPekYM5s0k8xFLHYQoLdG1%2Fimg.png', description: '공격 룬스톤\n전투광3개 공명<span style="color:red;">(빨간색)</span>: PVP피해 보너스+8%\n전투광6개 공명<span style="color:red;">(빨간색)</span>: 피해 보너스+8%'},
        '치명': { imageUrl: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbU9JRa%2FbtsOv8izvWj%2FIf5dAZJsul5BwpbV6ECDuk%2Fimg.png', description: '공격 룬스톤\n치명3개 공명<span style="color:red;">(빨간색)</span>: 치명타율 +8%\n치명6개 공명<span style="color:red;">(빨간색)</span>: 치명타 피해+12%'},
        '강격': { imageUrl: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fxs8x9%2FbtsOxxPh1Nr%2FMun91YmWOgAB8pTnceOHzk%2Fimg.png', description: '공격 룬스톤\n강격3개 공명<span style="color:red;">(빨간색)</span>: 공격+12%, 특수공격+12%\n강격6개 공명<span style="color:red;">(빨간색)</span>:방어 무시+10%, 특수방어 무시+10%'}
    },
    chipDetails: { /* 이전과 동일 */ },
    recommendedDecks: { /* 이전과 동일 */ },
    calendarEvents: { /* 이전과 동일 */ },
    tipsAndKnowhow: { /* 이전과 동일 */ },
    pokemonDetails: { /* 이전과 동일 */ },
    itemDetails: { /* 이전과 동일 */ }
};
