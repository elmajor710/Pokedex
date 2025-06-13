// --- 카테고리별 화면 구성 및 데이터 정보 ---
// 이 설정 객체는 각 카테고리가 어떻게 동작할지 정의합니다.
const categoryConfig = {
    pokemonType: {
        title: "타입 목록",
        levels: ['lev2', 'lev3', 'lev4'], // 사용하는 컬럼
        dataKeys: ['pokemonByType', 'pokemonByType', 'pokemonDetails'], // 각 레벨에서 사용할 데이터 키
        renderType: ['list', 'list', 'detail'], // 각 레벨의 렌더링 방식
        detailRenderer: pokemonDetailRenderer // 상세 정보 렌더링 함수
    },
    pokemonGrade: {
        title: "등급 목록",
        levels: ['lev2', 'lev3', 'lev4'],
        dataKeys: ['pokemonByGrade', 'pokemonByGrade', 'pokemonDetails'],
        renderType: ['list', 'list', 'detail'],
        detailRenderer: pokemonDetailRenderer
    },
    item: {
        title: "아이템 색상",
        levels: ['lev2', 'lev3', 'lev4'],
        dataKeys: ['itemByColor', 'itemByColor', 'itemDetails'],
        renderType: ['list', 'list', 'detail'],
        detailRenderer: itemDetailRenderer
    },
    rune: {
        title: "룬 종류",
        levels: ['lev2', 'lev3'],
        dataKeys: ['runeDetails', 'runeDetails'],
        renderType: ['list', 'detail'],
        detailRenderer: simpleDetailRenderer
    },
    chip: {
        title: "칩 종류",
        levels: ['lev2', 'lev3'],
        dataKeys: ['chipDetails', 'chipDetails'],
        renderType: ['list', 'detail'],
        detailRenderer: simpleDetailRenderer
    },
    recommendedDeck: {
        title: "덱 속성",
        levels: ['lev2', 'lev3'],
        dataKeys: ['recommendedDecks', 'recommendedDecks'],
        renderType: ['list', 'detail'],
        detailRenderer: deckDetailRenderer
    },
    calendar: {
        title: "뽑기 종류",
        levels: ['lev2', 'lev3'],
        dataKeys: ['calendarEvents', 'calendarEvents'],
        renderType: ['list', 'detail'],
        detailRenderer: simpleDetailRenderer
    },
    tips: {
        title: "가이드 종류",
        levels: ['lev2', 'lev3'],
        dataKeys: ['tipsAndKnowhow', 'tipsAndKnowhow'],
        renderType: ['list', 'detail'],
        detailRenderer: simpleDetailRenderer
    }
};

// --- 상세 정보(Lev.4)를 HTML로 만들어주는 함수들 ---
function pokemonDetailRenderer(data) {
    return `
        <div class="detail-header">
            <img src="${data.imageUrl}" alt="${data.name}">
            <h2>${data.name}</h2>
            <p>${data.description}</p>
        </div>
        <div class="detail-section">
            <h3>스킬 정보</h3>
            <div class="skill-active"><strong>Active: ${data.skills.active.name}</strong><p>${data.skills.active.description}</p></div>
            <div class="skill-passive"><strong>Passive: ${data.skills.passive.name}</strong><p>${data.skills.passive.description}</p></div>
        </div>
        <div class="detail-section">
            <h3>개방 효과</h3>
            <ul>
                ${Object.entries(data.unlocks).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('')}
            </ul>
        </div>
        <div class="detail-section">
            <h3>추천 정보</h3>
            <p><strong>성격:</strong> ${data.recommendations.nature.join(', ')}</p>
            <p><strong>아이템:</strong> ${data.recommendations.item}</p>
            <p><strong>룬:</strong> ${data.recommendations.runes.join(', ')}</p>
            <p><strong>칩:</strong> ${data.recommendations.chips.join(', ')}</p>
        </div>
    `;
}

function itemDetailRenderer(data) {
    return `<h2>${data.name}</h2><p>${data.description}</p>`;
}

function deckDetailRenderer(data) {
    return `<h2>덱 구성</h2><ul>${data.map(item => `<li>${item}</li>`).join('')}</ul>`;
}

function simpleDetailRenderer(data) {
    // pre 태그를 사용하여 텍스트의 줄바꿈과 공백을 그대로 유지
    return `<pre>${data}</pre>`;
}

// --- 실제 데이터베이스 ---
const database = {
    // 1. 포켓몬 타입
    pokemonByType: {
        '물': ['원시 가이오가', '펄기아', '마나피'],
        '불': ['원시 그란돈', '메가 리자몽X', '히드런'],
        '풀': ['메가 나무킹', '자루도', '세레비'],
        '전기': ['제라오라', '제크로무', '레지에레키']
    },
    // 2. 포켓몬 등급
    pokemonByGrade: {
        'SS': ['원시 가이오가', '원시 그란돈', '메가 레쿠쟈'],
        'S+': ['디아루가', '펄기아', '기라티나'],
        'S': ['제르네아스', '이벨타르', '지가르데']
    },
    // 3. 아이템
    itemByColor: {
        '빨간색': ['생명의구슬', '기합의머리띠'],
        '주황색': ['먹다남은음식', '구애스카프'],
        '보라색': ['맹독구슬', '검은진흙']
    },
    // 4. 룬
    runeDetails: {
        '전투광': '공격 시 데미지가 15% 증가합니다.',
        '금강': '방어력이 20% 증가합니다.',
        '파워': '공격력이 20% 증가합니다.',
        '견고': '최대 HP가 20% 증가합니다.',
        '신속': '속도가 15% 증가합니다.',
        '예리': '치명타 확률이 15% 증가합니다.',
        '마력': '특수공격력이 20% 증가합니다.',
        '지혜': '특수방어력이 20% 증가합니다.'
    },
    // 5. 칩
    chipDetails: {
        '개구리가시': '상대에게 데미지를 줄 때마다 자신의 특수공격이 1단계 상승합니다. (최대 5단계)',
        '공포': 'HP가 50% 이하일 때, 공격력이 50% 증가합니다.',
        '귀갑': '받는 데미지가 15% 감소합니다.',
        '늑대행자': '상대를 쓰러뜨릴 때마다 공격력이 1단계 상승합니다.',
        '방패': '전투 시작 시 2턴 동안 모든 데미지를 무효화하는 실드를 생성합니다.',
        '뱀유령': '공격 시 30% 확률로 상대를 중독 상태로 만듭니다.',
        '초능': '특수 공격 시 데미지가 15% 증가합니다.',
        '헌제': '자신이 쓰러질 때 모든 아군 포켓몬의 HP를 20% 회복시킵니다.',
        '화무': '자신이 화상 상태에 걸리지 않으며, 턴 종료 시 HP를 10% 회복합니다.'
    },
    // 6. 추천 덱
    recommendedDecks: {
        '불': ['원시 그란돈', '메가 리자몽X', '히드런', '칠색조'],
        '물': ['원시 가이오가', '펄기아', '마나피', '스이쿤'],
        '풀': ['메가 나무킹', '자루도', '세레비', '비리디온'],
        '고스트': ['기라티나', '따라큐', '루나아라', '마샤도']
    },
    // 7. 캘린더
    calendarEvents: {
        '랭킹뽑기': '2025.06.13 - 챔피언 피카츄(전기) / 레지에레키',
        '한정뽑기': '2025.05.23 - 알랭의 메가 리자몽X, 이로치 메가 나무킹'
    },
    // 8. 팁&노하우
    tipsAndKnowhow: {
        '육성가이드': `1. 메인 딜러 포켓몬을 최우선으로 육성합니다.
2. 서포터 포켓몬들은 효율을 위해 9~10성까지만 육성합니다.
3. 가장 좋은 칩과 아이템은 메인 딜러에게 집중합니다.`,
        '성급기준': `4성 -> 5성: 1마리
5성 -> 6성: 1마리
6성 -> 7성: 2마리
7성 -> 8성: 2마리
8성 -> 9성: 2마리
9성 -> 10성: 3마리`,
        '조각 활용': '조각은 SS급 이상의 필수 포켓몬 성급을 올리는 데에만 집중적으로 사용하세요.'
    },
    // --- 상세 정보 데이터 (Lev.4) ---
    pokemonDetails: {
        '원시 가이오가': {
            name: '원시 가이오가',
            imageUrl: 'https://i.imgur.com/ADa5b6k.png', // 실제 이미지 주소로 교체 필요
            description: '가이오가가 진정한 힘, 각성 후의 원시적인 모습. 온몸에 가득 찬 에너지를 바닷물로 만들어 몸 밖으로 내보내고 내고 가는 곳마다 폭풍과 비를 불러일으키며 바다를 확장시킨다. 모든 바다를 관장하는 심해의 왕이다.',
            skills: {
                active: {
                    name: '물의파동',
                    description: '적 단일 목표를 부딪혀 120% 특수 공격 +96의 특수피해를 입히며, 자신이 2턴 동안 [치명타 저항 증가III] 효과를 얻으며, 1명의 팀원에게 [정화 I]을 사용합니다.'
                },
                passive: {
                    name: '근원의바다',
                    description: '20% 치명타 저항.'
                }
            },
            unlocks: {
                '비오는 날씨': '원시가이오가가 전장에 나타나면 팀에게 [비오는 날씨] 날씨 효과를 부여합니다.',
                '6성 개방': '구름이 걷히고 비가 그치다: 매 대전이 시작될 때마다 아군 물타입 포켓몬은 [해양의 축복] 효과를 획득하고, 물타입 아군의 회복량은 2배가 됩니다.',
                '7성 개방': '매 2라운드마다 임의의 적 2명에게 [해일] 표식을 부여합니다(2라운드 동안 지속, 라운드 동안 냉각).',
                '8성 개방': '물 타입의 팀원이 일반 공격 시, 대상은 3턴 동안 모두 [해양의 영혼]으로 변신합니다.'
            },
            recommendations: {
                nature: ['조심', '겁쟁이'],
                item: '먹다남은 사과',
                runes: ['신속 3개', '금강 6개'],
                chips: ['귀갑 2개', '명상 4개']
            }
        },
        // 다른 포켓몬들의 상세 정보도 이와 같은 구조로 추가...
    },
    itemDetails: {
        '생명의구슬': { name: '생명의구슬', description: '기술의 위력이 1.3배 오르지만, 공격 기술을 사용할 때마다 전체 HP의 1/10이 줄어든다.' },
        // 다른 아이템 상세 정보 추가...
    }
};
