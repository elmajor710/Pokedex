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
    const imageUrlHTML = data.imageUrl ? `<img src="${data.imageUrl}" alt="${name}" style="max-width: 120px; float: left; margin: 0 20px 10px 0; border-radius: 8px;">` : '';
    const descriptionHTML = data.description ? `<pre style="white-space: pre-wrap; word-wrap: break-word; font-family: inherit; font-size: 1.1em; line-height: 1.7;">${data.description}</pre>` : '';
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
    chipDetails: {
        '헌제': { imageUrl: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FczfuV4%2FbtsOv8CROis%2FPuSYgpKgB5iISfz3dlRmuk%2Fimg.png', description: '2개 세트: HP+9%, 공격+6%, 특수공격+6%\n4개 세트: 사망이나 반죽음 상태 적 전체 피해 보너스 및 피해 감소 12%를 1턴간 감소, 6번째 턴에 사망 후 효과 적용 1턴 간 상승'},
        '공포': { imageUrl: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbdgxEQ%2FbtsOxAZwhTC%2FEqK9dhp4kutyPfmYh7kKLK%2Fimg.png', description: '2개 세트: HP+9%, 공격+6%, 특수공격+6%\n4개 세트: 필살기를 발동 시 공격 범위 내의 무작위 한 목표에서 부노 180 감소하고, 40%의 확률로 (첫 필살기 100%) 한 목표에 추가적으로 적용한다.'},
        '초능': { imageUrl: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fyx9zX%2FbtsOv9u3EEh%2FIKOC48KEUZBBlYlmuGcIL1%2Fimg.png', description: 'HP+9%, 공격+6%, 특수공격+6%\n4개 세트: 필살기를 발동 시 공격 범위 내의 유닛에게 10%의 확률로 (메인 목표 25%) 무작위 제어 효과를 부여 (기절, 침묵, 마비, 수면), 라운드 내에 필살기를 발동되지 않으면 제어 확률 3% 증가(중첩 가능), 핈갈기를 발동한 후 증가 해제'},
        '뱀유령': { imageUrl: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fevl7Dp%2FbtsOxuSsHOD%2Fd7KC7HhhmD6fg8kIcoeBJk%2Fimg.png', description: 'HP+12%\n4개 세트: 자신 HP가 50% 이상일 시 피해 감소 15%와 치명타 내성 8% 증가, 자신 주변의 유닛 HP가 60% 이상일 시 피해 감소 8%와 치명타 내성 5% 증가'},
        '방패': { imageUrl: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbA4VZ9%2FbtsOx98ansp%2FjUyqK3fNkvXTfQ0VkoZ6SK%2Fimg.png', description: 'HP+12%\n4개 세트: 일반 스킬이나 필살기를 발동 후, 자신과 다른 랜덤 한 유닛에게 최대 HP 17%의 실드를 추가'},
        '귀갑': { imageUrl: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc8VOzU%2FbtsOxsm48DU%2FWhK44S6yRIogtTK9Tm9kg1%2Fimg.png', description: 'HP+12%\n4개 세트: 스킬 피해를 받은 후 100%의 확률로 이번 입은 피해의 27%를 반사 (해당 효과가 적용될 때마다 반사 확률 20% 낮추고 최소 60%까지 낮춘다.)'},
        '늑대행자': { imageUrl: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcUh4D2%2FbtsOx40jDq4%2FyXEinUS88JPLxcuACYkjr1%2Fimg.png', description: '공격+9%, 특수공격+9%\n4개 세트: HP가 50%이상인 목표에게 스킬 피해 20% 증가'},
        '개구리가시': { imageUrl: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcvD4ic%2FbtsOwxo9URU%2FAkK0KJQV79AK5MGMMi4nEk%2Fimg.png', description: '공격+9%, 특수공격+9%\n4개 세트: HP 1% 손실될 때마다 피해 보너스 0.29%와 필살기 피해 보너스 0.1% 증가: HP가 50% 이하일 시 10%의 흡혈 효과 상승'},
        '화무': { imageUrl: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FGSHbB%2FbtsOx98anu1%2FlX42okgwuVKWR0ufIGTvgK%2Fimg.png', description: '공격+9%, 특수공격+9%\n4개 세트: 주동적인 공격이 저항 당하거나 치명타를 안한다면 앞으로 1~2턴간 자신의 치명타율 및 치명타 피해 18% 증가'}
    },
    recommendedDecks: {'노말':[],'불':[],'물':[],'풀':[],'전기':[],'얼음':[],'격투':[],'독':[],'땅':[],'비행':[],'에스퍼':[],'벌레':[],'바위':[],'유령':[],'드래곤':[],'악':[],'강철':[],'페어리':[]},
    calendarEvents: {'랭킹뽑기':'...','한정뽑기':'...'},
    tipsAndKnowhow: {'육성가이드':'...','성급기준':'...','조각 활용':'...'},
    pokemonDetails: { '원시 가이오가': { /* ... */ } },
    itemDetails: { '생명의구슬': { /* ... */ } }
};
