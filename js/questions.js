/**
 * 情侣篇 · 安全地带 or 监控室
 * 10道情景测试题
 *
 * 计分维度：
 *   anxiety  — 焦虑度（怕失去）   每题 1/3/5 分，总分 5-25
 *   control  — 控制度（想掌控）   每题 1/3/5 分，总分 5-25
 *
 * 每道题的 options 中：
 *   a = 焦虑分, c = 控制分
 */

const QUESTIONS = [
    // ---- 题目 1：隐私边界 (偏控制) ----
    {
        id: 1,
        scenario: '隐私边界',
        text: 'TA去洗澡，手机放在沙发上亮了一下，是一条微信消息。你会？',
        options: [
            {
                label: 'A',
                text: '瞄一眼发送者名字，但不会点开看',
                scores: { anxiety: 2, control: 3 }
            },
            {
                label: 'B',
                text: '假装没看见，但心里已经开始编剧本了',
                scores: { anxiety: 4, control: 1 }
            },
            {
                label: 'C',
                text: '光明正大拿过来看，反正我们之间没有秘密',
                scores: { anxiety: 2, control: 5 }
            }
        ]
    },
    // ---- 题目 2：社交圈入侵 (偏控制) ----
    {
        id: 2,
        scenario: '社交圈入侵',
        text: 'TA的公司组织周末团建，没有邀请你。你会？',
        options: [
            {
                label: 'A',
                text: '开心地让TA去玩，自己约朋友逛街',
                scores: { anxiety: 1, control: 1 }
            },
            {
                label: 'B',
                text: '表面说"去吧"，但会每隔一两个小时发消息确认行程',
                scores: { anxiety: 3, control: 4 }
            },
            {
                label: 'C',
                text: '要求看团建的人员名单，特别关注有没有异性',
                scores: { anxiety: 3, control: 5 }
            }
        ]
    },
    // ---- 题目 3：社交媒体敏感 (偏焦虑) ----
    {
        id: 3,
        scenario: '社交信号',
        text: 'TA给一个异性好友的朋友圈照片点了赞，而最近很少给你点。你的反应是？',
        options: [
            {
                label: 'A',
                text: '没什么，点赞只是社交礼仪',
                scores: { anxiety: 1, control: 1 }
            },
            {
                label: 'B',
                text: '有点不舒服，会翻翻那个人的主页看看是谁',
                scores: { anxiety: 4, control: 3 }
            },
            {
                label: 'C',
                text: '直接质问TA："你是不是对那个人有意思？"',
                scores: { anxiety: 5, control: 4 }
            }
        ]
    },
    // ---- 题目 4：回消息速度 (偏焦虑) ----
    {
        id: 4,
        scenario: '时间线索',
        text: 'TA平时秒回你消息，今天过了两个小时还没回。你会？',
        options: [
            {
                label: 'A',
                text: '可能在忙吧，先做自己的事',
                scores: { anxiety: 1, control: 1 }
            },
            {
                label: 'B',
                text: '去看看TA的微信在线状态/最近一次登录时间',
                scores: { anxiety: 4, control: 3 }
            },
            {
                label: 'C',
                text: '连续发好几条消息，打电话追问"你在干嘛"',
                scores: { anxiety: 5, control: 5 }
            }
        ]
    },
    // ---- 题目 5：异性交往 (偏控制) ----
    {
        id: 5,
        scenario: '边界感',
        text: 'TA说今晚要和一个异性同事单独加班赶项目。你会？',
        options: [
            {
                label: 'A',
                text: '相信TA，叮嘱早点回来就好',
                scores: { anxiety: 1, control: 1 }
            },
            {
                label: 'B',
                text: '嘴上说好，但提出"加班结束后来接你"',
                scores: { anxiety: 3, control: 3 }
            },
            {
                label: 'C',
                text: '明确表示不希望TA和异性单独相处，要求换人或者你陪同',
                scores: { anxiety: 4, control: 5 }
            }
        ]
    },
    // ---- 题目 6：纪念日执念 (偏焦虑) ----
    {
        id: 6,
        scenario: '纪念日执念',
        text: '今天是你们在一起的纪念日，但TA完全忘了，还正常地聊工作。你的感受是？',
        options: [
            {
                label: 'A',
                text: '主动提醒TA，一起补过就好',
                scores: { anxiety: 1, control: 2 }
            },
            {
                label: 'B',
                text: '不说，等TA自己想起来，如果到晚上还没想起来会很失落',
                scores: { anxiety: 4, control: 1 }
            },
            {
                label: 'C',
                text: '直接质问"你是不是不爱我了？连纪念日都忘了"',
                scores: { anxiety: 5, control: 3 }
            }
        ]
    },
    // ---- 题目 7：前任问题 (偏焦虑) ----
    {
        id: 7,
        scenario: '过去的阴影',
        text: '你无意中发现TA的手机相册里还存着和前任的合照（没有主动看，只是滑到了）。你会？',
        options: [
            {
                label: 'A',
                text: '那是过去的事了，没必要在意',
                scores: { anxiety: 1, control: 1 }
            },
            {
                label: 'B',
                text: '心里不舒服，但不会直接说，会暗中观察TA和前任还有没有联系',
                scores: { anxiety: 4, control: 2 }
            },
            {
                label: 'C',
                text: '要求TA当面删掉所有和前任相关的照片和聊天记录',
                scores: { anxiety: 3, control: 5 }
            }
        ]
    },
    // ---- 题目 8：行踪掌控 (偏控制) ----
    {
        id: 8,
        scenario: '定位信号',
        text: '关于和TA共享实时定位这件事，你的态度是？',
        options: [
            {
                label: 'A',
                text: '没必要，互相信任就好',
                scores: { anxiety: 1, control: 1 }
            },
            {
                label: 'B',
                text: '觉得方便接送，开着也无所谓',
                scores: { anxiety: 2, control: 3 }
            },
            {
                label: 'C',
                text: '一定要开，而且会经常查看TA在哪里',
                scores: { anxiety: 4, control: 5 }
            }
        ]
    },
    // ---- 题目 9：争吵后的行为 (偏焦虑) ----
    {
        id: 9,
        scenario: '冷战时刻',
        text: '你们吵完架后，TA一晚上没联系你。到深夜了，你会？',
        options: [
            {
                label: 'A',
                text: '也冷静一下，明天再好好谈',
                scores: { anxiety: 1, control: 1 }
            },
            {
                label: 'B',
                text: '翻来覆去睡不着，忍不住发一条"你还生气吗"',
                scores: { anxiety: 4, control: 2 }
            },
            {
                label: 'C',
                text: '打很多电话要求TA马上解决问题，或者直接冲到TA家',
                scores: { anxiety: 5, control: 5 }
            }
        ]
    },
    // ---- 题目 10：终极灵魂拷问 (综合) ----
    {
        id: 10,
        scenario: '灵魂拷问',
        text: '如果用一句话形容你对这段感情的态度，最接近哪一个？',
        options: [
            {
                label: 'A',
                text: '你是我生命中很重要的人，但我们都需要自己的空间',
                scores: { anxiety: 1, control: 1 }
            },
            {
                label: 'B',
                text: '我相信你，但有时候真的控制不住会多想',
                scores: { anxiety: 4, control: 2 }
            },
            {
                label: 'C',
                text: '你是我的，这一点没有任何商量的余地',
                scores: { anxiety: 3, control: 5 }
            }
        ]
    }
];
