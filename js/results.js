/**
 * 9种占有欲人格卡牌
 *
 * 分级：
 *   焦虑度 anxiety: 低(10-16) / 中(17-28) / 高(29-50)
 *   控制度 control: 低(10-16) / 中(17-28) / 高(29-50)
 *
 * 矩阵 (control × anxiety):
 *           低焦虑(自信)         中焦虑(波动)          高焦虑(敏感)
 * 高控制    驯兽师               检察官               典狱长
 * 中控制    独立制片人           普通情侣             情绪过山车
 * 低控制    佛系                 隐藏式占有           苦情人
 */

const PERSONA_MAP = {
    // key: "control_anxiety"  e.g. "high_low" = 高控制_低焦虑

    'high_low': {
        name: '驯兽师人格',
        icon: '🎪',
        tagline: '"你只占有一点，但占有的都是精华。"',
        badge: '掌控者',
        badgeClass: 'badge-mid',
        possessive: 4,
        control: 5,
        anxiety: 2,
        description: '你对关系有着高度的掌控力，但并不源于恐惧。你清楚地知道自己想要什么，并且有能力引导关系的走向。你的占有欲不是铁笼，而是一根精致的缰绳——温柔但不容挣脱。',
        match: '佛系人格 — 你们一张一弛，互相成就',
        color: 'neon-green'
    },

    'high_mid': {
        name: '检察官人格',
        icon: '🔍',
        tagline: '"你以为我没看手机，其实我只是在等你坦白。"',
        badge: '高警觉',
        badgeClass: 'badge-high',
        possessive: 4,
        control: 5,
        anxiety: 3,
        description: '你是那种在暗中观察一切的人。表面上可能平静如水，但你的内心有一套精密的检测系统，TA的每一个异常行为都会被你精准捕捉。你相信"信任但要验证"。',
        match: '普通情侣人格 — 坦诚沟通能化解你的疑虑',
        color: 'red'
    },

    'high_high': {
        name: '典狱长人格',
        icon: '🔒',
        tagline: '"爱是绝对的忠诚与服从。"',
        badge: '极高占有',
        badgeClass: 'badge-high',
        possessive: 5,
        control: 5,
        anxiety: 5,
        description: '你对伴侣有着极强的占有欲和控制欲。在你的爱情观里，亲密关系意味着完全的透明和绝对的忠诚。你可能会不自觉地压缩对方的个人空间。爱很深，但要注意留出呼吸的余地。',
        match: '佛系人格 — 但请先给对方多一点信任空间',
        color: 'red'
    },

    'mid_low': {
        name: '独立制片人人格',
        icon: '🎬',
        tagline: '"我们有交集，但各自精彩。"',
        badge: '理性型',
        badgeClass: 'badge-mid',
        possessive: 2,
        control: 3,
        anxiety: 1,
        description: '你是恋爱中最理性的那类人。你享受亲密关系，但绝不会因此失去自我。你有自己的社交圈、兴趣爱好和生活节奏。你相信真正的爱是两个完整的人选择在一起，而非相互依附。',
        match: '独立制片人人格 — 两个独立灵魂的完美碰撞',
        color: 'neon-green'
    },

    'mid_mid': {
        name: '普通情侣人格',
        icon: '💑',
        tagline: '"会吃醋，但更相信沟通。"',
        badge: '健康型',
        badgeClass: 'badge-mid',
        possessive: 3,
        control: 3,
        anxiety: 3,
        description: '恭喜你！你的占有欲在健康范围内。会吃醋说明你在乎，但你有足够的理性和安全感来处理这些情绪。你愿意通过沟通来解决问题，而不是通过控制或逃避。',
        match: '普通情侣/独立制片人 — 理性匹配，默契十足',
        color: 'neon-green'
    },

    'mid_high': {
        name: '情绪过山车人格',
        icon: '🎢',
        tagline: '"爱是真的，作也是真的。"',
        badge: '情绪化',
        badgeClass: 'badge-high',
        possessive: 4,
        control: 3,
        anxiety: 5,
        description: '你的内心就像一座活火山，表面或许平静，但一个小小的触发点就能让你爆发。你对感情投入了大量的情感能量，但有时会因为过度焦虑而做出一些连自己都觉得"太过了"的事。',
        match: '驯兽师人格 — 需要一个情绪稳定的掌舵人',
        color: 'red'
    },

    'low_low': {
        name: '佛系人格',
        icon: '🧘',
        tagline: '"是你的就是你的，不是你的强求不来。"',
        badge: '超低占有',
        badgeClass: 'badge-low',
        possessive: 1,
        control: 1,
        anxiety: 1,
        description: '你是恋爱中最"佛"的存在。你不会翻对方手机，不会查岗，不会在意对方的社交圈。但请注意，有时候适当表达在乎，也是一种爱的方式。完全的"无所谓"可能会让对方感到不被重视。',
        match: '情绪过山车人格 — 你的淡定正好能中和对方的焦虑',
        color: 'neon-green'
    },

    'low_mid': {
        name: '隐藏式占有人格',
        icon: '🕵️',
        tagline: '"表面不在乎，背地里会翻TA所有的社交动态。"',
        badge: '伪装者',
        badgeClass: 'badge-mid',
        possessive: 3,
        control: 2,
        anxiety: 4,
        description: '你是最"口是心非"的类型。嘴上说着"随便你"，但内心的焦虑已经让你在深夜反复翻看对方的朋友圈和微博。你不愿表现出占有欲，是因为害怕被认为"控制狂"，但压抑只会让焦虑发酵。',
        match: '普通情侣人格 — 对方的主动沟通能给你安全感',
        color: 'red'
    },

    'low_high': {
        name: '苦情人人格',
        icon: '🥀',
        tagline: '"通过自我牺牲来换取对方的愧疚和关注。"',
        badge: '自我消耗',
        badgeClass: 'badge-high',
        possessive: 3,
        control: 1,
        anxiety: 5,
        description: '你不会直接控制对方，但你的焦虑感极高。你倾向于用"付出型"策略来维系关系——比如不断牺牲自己的需求，然后在对方没有回应时感到深深的失望。你需要学会正面表达需求，而不是用委屈来暗示。',
        match: '独立制片人人格 — 能帮你找回自我价值',
        color: 'red'
    }
};

/**
 * 根据焦虑度和控制度总分，返回对应的人格 key
 * @param {number} anxietyTotal  10-50
 * @param {number} controlTotal  10-50
 * @returns {string}
 */
function getPersonaKey(anxietyTotal, controlTotal) {
    let anxLevel, ctrlLevel;

    if (anxietyTotal <= 16) anxLevel = 'low';
    else if (anxietyTotal <= 28) anxLevel = 'mid';
    else anxLevel = 'high';

    if (controlTotal <= 16) ctrlLevel = 'low';
    else if (controlTotal <= 28) ctrlLevel = 'mid';
    else ctrlLevel = 'high';

    return ctrlLevel + '_' + anxLevel;
}
