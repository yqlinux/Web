/**
 * 测测你的TA有多"粘"人 — 情侣篇
 * 主应用逻辑
 */

(function () {
    'use strict';

    // ============ State ============
    const state = {
        currentQuestion: 0,
        answers: [],          // { questionId, optionIndex, scores }
        totalAnxiety: 0,
        totalControl: 0,
        transitioning: false
    };

    // ============ DOM References ============
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    const screens = {
        landing: $('#landing'),
        quiz: $('#quiz'),
        analyzing: $('#analyzing'),
        result: $('#result')
    };

    const els = {
        btnStart: $('#btnStart'),
        progressBar: $('#progressBar'),
        progressPercent: $('#progressPercent'),
        progressLabel: $('#progressLabel'),
        currentQ: $('#currentQ'),
        totalQ: $('#totalQ'),
        questionScenario: $('#questionScenario'),
        questionText: $('#questionText'),
        optionsList: $('#optionsList'),
        quizBody: $('.quiz-body'),
        chainLinks: $$('.chain-link'),
        heartLeft: $('#heartLeft'),
        heartRight: $('#heartRight'),

        // Result
        cardBadge: $('#cardBadge'),
        personaIcon: $('#personaIcon'),
        personaName: $('#personaName'),
        personaTagline: $('#personaTagline'),
        meterPossessive: $('#meterPossessive'),
        meterControl: $('#meterControl'),
        meterAnxiety: $('#meterAnxiety'),
        cardDescription: $('#cardDescription'),
        matchValue: $('#matchValue'),

        btnSave: $('#btnSave'),
        btnShare: $('#btnShare'),
        btnRetry: $('#btnRetry')
    };

    // ============ Init ============
    function init() {
        els.totalQ.textContent = QUESTIONS.length;
        bindEvents();
        animateUserCount();
    }

    function bindEvents() {
        els.btnStart.addEventListener('click', startQuiz);
        els.btnSave.addEventListener('click', saveCard);
        els.btnShare.addEventListener('click', shareCard);
        els.btnRetry.addEventListener('click', retryQuiz);
    }

    // ============ Screen Management ============
    function showScreen(name) {
        Object.values(screens).forEach(s => s.classList.remove('active'));
        screens[name].classList.add('active');
        window.scrollTo(0, 0);
    }

    // ============ Landing ============
    function animateUserCount() {
        const target = 128637;
        const el = $('#userCount');
        let current = 125000;
        const step = Math.ceil((target - current) / 60);
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = current.toLocaleString();
        }, 30);
    }

    // ============ Quiz Flow ============
    function startQuiz() {
        state.currentQuestion = 0;
        state.answers = [];
        state.totalAnxiety = 0;
        state.totalControl = 0;
        showScreen('quiz');
        renderQuestion();
    }

    function renderQuestion() {
        const q = QUESTIONS[state.currentQuestion];
        const idx = state.currentQuestion;
        const total = QUESTIONS.length;

        // Update counter
        els.currentQ.textContent = idx + 1;

        // Progress
        const progress = ((idx) / total) * 100;
        els.progressBar.style.width = progress + '%';
        const patience = Math.round(100 - (idx / total) * 100);
        els.progressPercent.textContent = patience + '%';

        // Update progress label with personality
        if (patience > 70) {
            els.progressLabel.textContent = 'TA的耐心还剩';
        } else if (patience > 40) {
            els.progressLabel.textContent = '你们的空间还剩';
        } else {
            els.progressLabel.textContent = '锁链在收紧...还剩';
        }

        // Chain visualization
        updateChainVisual(idx);

        // Question content
        els.questionScenario.textContent = q.scenario;
        els.questionText.textContent = q.text;

        // Options
        els.optionsList.innerHTML = '';
        q.options.forEach((opt, oi) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `
                <span class="option-label">${opt.label}</span>
                <span class="option-text">${opt.text}</span>
            `;
            btn.addEventListener('click', () => selectOption(oi));
            els.optionsList.appendChild(btn);
        });
    }

    function updateChainVisual(qIndex) {
        const links = Array.from(els.chainLinks);
        // Calculate average "intensity" from answers so far
        const avgControl = state.answers.length > 0
            ? state.totalControl / state.answers.length
            : 0;

        links.forEach((link, i) => {
            link.classList.remove('active', 'tight');
            if (i < Math.ceil(qIndex / 2)) {
                if (avgControl > 3.5) {
                    link.classList.add('tight');
                } else {
                    link.classList.add('active');
                }
            }
        });

        // Move hearts apart or closer based on control score
        const separation = Math.min(avgControl * 2, 8);
        const chainContainer = $('.chain-links');
        if (chainContainer) {
            chainContainer.style.gap = (4 + separation) + 'px';
        }
    }

    function selectOption(optionIndex) {
        if (state.transitioning) return;
        state.transitioning = true;

        const q = QUESTIONS[state.currentQuestion];
        const opt = q.options[optionIndex];

        // Visual feedback
        const buttons = els.optionsList.querySelectorAll('.option-btn');
        buttons.forEach((btn, i) => {
            if (i === optionIndex) {
                btn.classList.add('selected', 'pop');
            } else {
                btn.style.opacity = '0.4';
                btn.style.pointerEvents = 'none';
            }
        });

        // Record answer
        state.answers.push({
            questionId: q.id,
            optionIndex: optionIndex,
            scores: opt.scores
        });
        state.totalAnxiety += opt.scores.anxiety;
        state.totalControl += opt.scores.control;

        // Transition to next question or results
        setTimeout(() => {
            state.currentQuestion++;

            if (state.currentQuestion >= QUESTIONS.length) {
                showAnalyzing();
            } else {
                // Slide transition
                els.quizBody.classList.add('slide-out');
                setTimeout(() => {
                    renderQuestion();
                    els.quizBody.classList.remove('slide-out');
                    els.quizBody.classList.add('slide-in');
                    setTimeout(() => {
                        els.quizBody.classList.remove('slide-in');
                    }, 400);
                }, 300);
            }

            state.transitioning = false;
        }, 600);
    }

    // ============ Analyzing Transition ============
    function showAnalyzing() {
        showScreen('analyzing');

        const steps = [
            document.getElementById('step1'),
            document.getElementById('step2'),
            document.getElementById('step3'),
            document.getElementById('step4')
        ];

        let i = 0;
        function activateStep() {
            if (i > 0) {
                steps[i - 1].classList.remove('active');
                steps[i - 1].classList.add('done');
            }
            if (i < steps.length) {
                steps[i].classList.add('active');
                i++;
                setTimeout(activateStep, 800);
            } else {
                setTimeout(showResult, 600);
            }
        }

        setTimeout(activateStep, 400);
    }

    // ============ Result ============
    function showResult() {
        const key = getPersonaKey(state.totalAnxiety, state.totalControl);
        const persona = PERSONA_MAP[key];

        if (!persona) {
            console.error('No persona for key:', key, state.totalAnxiety, state.totalControl);
            return;
        }

        // Fill card
        els.cardBadge.textContent = persona.badge;
        els.cardBadge.className = 'card-badge ' + persona.badgeClass;
        els.personaIcon.textContent = persona.icon;
        els.personaName.textContent = persona.name;
        els.personaTagline.textContent = persona.tagline;
        els.cardDescription.textContent = persona.description;
        els.matchValue.textContent = persona.match;

        // Meters
        renderStars(els.meterPossessive, persona.possessive, persona.color);
        renderStars(els.meterControl, persona.control, persona.color);
        renderStars(els.meterAnxiety, persona.anxiety, persona.color);

        // Show
        showScreen('result');

        // Animate card
        const card = $('#resultCard');
        card.classList.add('reveal');
        setTimeout(() => card.classList.remove('reveal'), 800);
    }

    function renderStars(container, count, color) {
        container.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('span');
            star.className = 'star';
            if (i < count) {
                star.classList.add('filled');
                if (color === 'red') star.classList.add('red');
                star.style.animationDelay = (i * 0.1) + 's';
            }
            container.appendChild(star);
        }
    }

    // ============ Card Export ============
    function saveCard() {
        const cardEl = document.getElementById('cardWrapper');
        if (typeof html2canvas === 'undefined') {
            showToast('正在加载截图工具，请稍后再试...');
            return;
        }

        showToast('正在生成卡片...');

        html2canvas(cardEl, {
            backgroundColor: '#0a0a0f',
            scale: 2,
            useCORS: true,
            logging: false
        }).then(canvas => {
            // Create download link
            const link = document.createElement('a');
            link.download = '占有欲人格卡牌_情侣篇.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            showToast('卡片已保存！分享给TA看看吧');
        }).catch(() => {
            showToast('保存失败，请尝试截图保存');
        });
    }

    function shareCard() {
        // Copy share text to clipboard
        const key = getPersonaKey(state.totalAnxiety, state.totalControl);
        const persona = PERSONA_MAP[key];
        const text = `我测出来是「${persona.name}」！${persona.tagline} 快来测测你的TA有多"粘"人 👉`;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                showToast('分享文案已复制到剪贴板！');
            }).catch(() => {
                fallbackCopy(text);
            });
        } else {
            fallbackCopy(text);
        }
    }

    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showToast('分享文案已复制到剪贴板！');
        } catch (e) {
            showToast('请手动复制分享文案');
        }
        document.body.removeChild(textarea);
    }

    function retryQuiz() {
        startQuiz();
    }

    // ============ Toast ============
    function showToast(msg) {
        // Remove existing toast
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = msg;
        document.body.appendChild(toast);

        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 2500);
    }

    // ============ Start ============
    document.addEventListener('DOMContentLoaded', init);

})();
