/* P5R 怪盗团粉丝网站 - 主JavaScript */

// ==================== 登录页面逻辑 ====================
function initLoginPage() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const phoneInput = document.getElementById('phoneInput');
        const authOverlay = document.getElementById('authOverlay');

        if (phoneInput && phoneInput.value.trim()) {
            // 显示认证动画
            if (authOverlay) {
                authOverlay.classList.add('active');
            }

            // 保存登录状态
            sessionStorage.setItem('phantom_logged_in', 'true');

            // 1.5秒后跳转到主页
            // 使用 replace 避免用户点击返回按钮回到登录页
            setTimeout(function() {
                window.location.replace('index.html');
            }, 1500);
        }
    });
}

// ==================== 检查登录状态 ====================
function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem('phantom_logged_in');
    const isLoginPage = document.body.classList.contains('login-page');

    // 如果不是登录页面且未登录，跳转到登录页
    // 注意：为了方便测试，暂时注释掉强制登录检查
    // if (!isLoginPage && !isLoggedIn) {
    //     window.location.href = 'login.html';
    // }
}

// ==================== 导航高亮 ====================
function highlightCurrentNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage) {
            item.classList.add('active');
        }
    });
}

// ==================== 平滑滚动 ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==================== 滚动动画 ====================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.timeline-era, .member-card, .info-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ==================== 成员卡片点击效果 ====================
function initMemberCards() {
    const cards = document.querySelectorAll('.member-card');

    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 如果是"敬请期待"的卡片，阻止默认行为
            const overlay = this.querySelector('.card-overlay.coming-soon');
            if (overlay) {
                e.preventDefault();
                // 添加一个提示效果
                this.style.animation = 'shake 0.5s ease';
                setTimeout(() => {
                    this.style.animation = '';
                }, 500);
            }
        });
    });
}

// 添加抖动动画
const shakeKeyframes = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-5px); }
    40%, 80% { transform: translateX(5px); }
}
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = shakeKeyframes;
document.head.appendChild(styleSheet);

// ==================== 怪盗团之信动画 ====================
function initPhantomLetter() {
    const letter = document.getElementById('phantomLetter');
    if (!letter) return;

    // 剪报字体效果（可选）
    // 为每个字母添加随机旋转
    const highlights = letter.querySelectorAll('.highlight');
    highlights.forEach(highlight => {
        const text = highlight.textContent;
        highlight.innerHTML = '';
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.className = 'ransom-letter';
            span.textContent = char;
            span.style.setProperty('--rotation', `${(Math.random() - 0.5) * 10}deg`);
            span.style.transform = `rotate(var(--rotation))`;
            highlight.appendChild(span);
        });
    });
}

// ==================== 粒子效果 ====================
function createParticles() {
    const container = document.querySelector('.login-page');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 0, 64, ${Math.random() * 0.5 + 0.2});
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            border-radius: 50%;
            pointer-events: none;
            animation: particle-float ${Math.random() * 5 + 5}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        container.appendChild(particle);
    }

    // 添加粒子动画
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particle-float {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
            50% { transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) scale(1.5); opacity: 1; }
        }
    `;
    document.head.appendChild(particleStyle);
}

// ==================== 鼠标跟随效果 ====================
function initMouseFollow() {
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.member-card');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const angle = Math.atan2(y, x) * (180 / Math.PI);
            card.style.setProperty('--mouse-angle', angle + 'deg');
        });
    });
}

// ==================== 页面转场 - 透明视频效果 ====================

// 主要页面列表
const MAIN_PAGES = [
    'index.html',
    'members.html',
    'palaces.html',
    'mementos.html',
    'cooperators.html',
    'velvet-room.html'
];

// 视频转场状态
let isTransitioning = false;
let transitionVideo = null;
let videoPreloaded = false;

// morning.webm 转场状态
let morningVideo = null;
let morningVideoPreloaded = false;

// 角色专属转场视频映射
const CHARACTER_TRANSITIONS = {
    'joker.html': 'assets/video/Joker.mp4',
    // 未来可扩展其他角色...
};

// Joker专属转场状态
let jokerVideo = null;
let jokerVideoPreloaded = false;

// 判断是否为主要页面
function isMainPage(href) {
    return MAIN_PAGES.some(page => href.includes(page));
}

// 预加载转场视频
function preloadTransitionVideo() {
    return new Promise((resolve, reject) => {
        if (videoPreloaded && transitionVideo) {
            resolve();
            return;
        }

        // 创建视频元素
        transitionVideo = document.createElement('video');
        // 使用导出的透明视频 (ProRes 4444)
        transitionVideo.src = 'assets/video/transition.webm';
        transitionVideo.muted = true; // 静音以允许自动播放
        transitionVideo.playsInline = true;
        transitionVideo.preload = 'auto';

        transitionVideo.oncanplaythrough = () => {
            videoPreloaded = true;
            resolve();
        };

        transitionVideo.onerror = () => {
            // 尝试加载备用 MP4
            transitionVideo.src = 'assets/video/Crossing.mp4';
            transitionVideo.oncanplaythrough = () => {
                videoPreloaded = true;
                resolve();
            };
            transitionVideo.onerror = () => {
                console.warn('视频加载失败，使用备用转场');
                reject();
            };
        };

        // 开始加载
        transitionVideo.load();
    });
}

// 预加载 morning.webm 视频
function preloadMorningVideo() {
    return new Promise((resolve, reject) => {
        if (morningVideoPreloaded && morningVideo) {
            resolve();
            return;
        }

        morningVideo = document.createElement('video');
        morningVideo.src = 'assets/video/morning.webm';
        morningVideo.muted = true;
        morningVideo.playsInline = true;
        morningVideo.preload = 'auto';

        morningVideo.oncanplaythrough = () => {
            morningVideoPreloaded = true;
            resolve();
        };

        morningVideo.onerror = () => {
            console.warn('morning.webm 加载失败');
            reject();
        };

        morningVideo.load();
    });
}

// 预加载 Joker.mp4 视频
function preloadJokerVideo() {
    return new Promise((resolve, reject) => {
        if (jokerVideoPreloaded && jokerVideo) {
            resolve();
            return;
        }

        jokerVideo = document.createElement('video');
        jokerVideo.src = 'assets/video/Joker.mp4';
        jokerVideo.muted = true;
        jokerVideo.playsInline = true;
        jokerVideo.preload = 'auto';

        jokerVideo.oncanplaythrough = () => {
            jokerVideoPreloaded = true;
            resolve();
        };

        jokerVideo.onerror = () => {
            console.warn('Joker.mp4 加载失败');
            reject();
        };

        jokerVideo.load();
    });
}

// 创建转场遮罩
function createTransitionOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'video-transition-overlay';
    overlay.id = 'videoTransitionOverlay';

    // 创建 Canvas 用于显示透明视频
    // 注意：浏览器 <video> 元素不直接支持透明通道，必须用 Canvas 渲染
    const canvas = document.createElement('canvas');
    canvas.id = 'transitionCanvas';
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        object-fit: cover;
        z-index: 1;
    `;

    // 视频元素（隐藏，仅作为 Canvas 数据源）
    const video = transitionVideo || document.createElement('video');
    video.id = 'transitionVideo';
    video.muted = true;
    video.playsInline = true;
    video.style.display = 'none'; // 隐藏视频元素
    if (!transitionVideo) {
        video.src = 'assets/video/transition.webm';
    }

    overlay.appendChild(video);
    overlay.appendChild(canvas);

    // 设置 Canvas 尺寸
    video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    };

    // 存储引用供后续使用
    overlay._video = video;
    overlay._canvas = canvas;

    return overlay;
}

// 播放转场视频
async function playTransitionVideo(targetUrl, overlay) {
    const video = overlay.querySelector('#transitionVideo');
    const canvas = overlay.querySelector('#transitionCanvas');
    const ctx = canvas.getContext('2d');

    // 超时兜底机制 - 5秒后强制跳转
    const MAX_TRANSITION_TIME = 5000;
    let transitionCompleted = false;

    const forceRedirect = () => {
        if (transitionCompleted) return;
        transitionCompleted = true;
        console.warn('转场超时或异常，强制跳转');
        sessionStorage.setItem('phantom_page_transition', 'true');
        window.location.href = targetUrl;
    };

    const timeoutId = setTimeout(forceRedirect, MAX_TRANSITION_TIME);

    // 显示遮罩
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Canvas 渲染循环 - 将视频帧绘制到 Canvas 上以支持透明通道
    function renderFrame() {
        if (!video.paused && !video.ended) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            requestAnimationFrame(renderFrame);
        }
    }

    video.onplay = renderFrame;

    // 预加载目标页面（仅限 http/https 协议）
    if (location.protocol !== 'file:') {
        fetch(targetUrl, { method: 'GET', credentials: 'include' }).catch(() => {});
    }

    // 播放视频
    video.currentTime = 0;

    try {
        await video.play();
    } catch (e) {
        console.warn('视频播放失败，直接跳转');
        clearTimeout(timeoutId);
        overlay.remove();
        window.location.href = targetUrl;
        return;
    }

    // 视频结束后跳转
    video.onended = () => {
        clearTimeout(timeoutId);
        if (transitionCompleted) return;
        transitionCompleted = true;
        sessionStorage.setItem('phantom_page_transition', 'true');
        window.location.href = targetUrl;
    };

    // 监听错误事件
    video.onerror = () => {
        clearTimeout(timeoutId);
        if (transitionCompleted) return;
        transitionCompleted = true;
        console.warn('视频播放错误，强制跳转');
        window.location.href = targetUrl;
    };
}

// 使用 morning.webm 的转场效果
async function playTearTransition(targetUrl) {
    // 检查 morning.webm 是否已预加载
    if (!morningVideoPreloaded || !morningVideo) {
        // 未预加载，直接跳转
        window.location.href = targetUrl;
        return;
    }

    // 超时兜底机制 - 5秒后强制跳转
    const MAX_TRANSITION_TIME = 5000;
    let transitionCompleted = false;

    const forceRedirect = () => {
        if (transitionCompleted) return;
        transitionCompleted = true;
        console.warn('转场超时或异常，强制跳转');
        sessionStorage.setItem('phantom_page_transition', 'true');
        window.location.href = targetUrl;
    };

    const timeoutId = setTimeout(forceRedirect, MAX_TRANSITION_TIME);

    const overlay = document.createElement('div');
    overlay.className = 'video-transition-overlay';

    // 创建 Canvas 用于显示透明视频
    const canvas = document.createElement('canvas');
    canvas.id = 'morningCanvas';
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        object-fit: cover;
        z-index: 1;
    `;

    // 视频元素（隐藏，仅作为 Canvas 数据源）
    const video = morningVideo;
    video.muted = true;
    video.playsInline = true;
    video.style.display = 'none';

    overlay.appendChild(video);
    overlay.appendChild(canvas);

    // 设置 Canvas 尺寸
    if (video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    } else {
        video.onloadedmetadata = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        };
    }

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    const ctx = canvas.getContext('2d');

    // Canvas 渲染循环
    function renderFrame() {
        if (!video.paused && !video.ended) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            requestAnimationFrame(renderFrame);
        }
    }

    video.onplay = renderFrame;

    // 显示遮罩
    overlay.classList.add('active');

    // 预加载目标页面
    if (location.protocol !== 'file:') {
        fetch(targetUrl, { method: 'GET', credentials: 'include' }).catch(() => {});
    }

    // 播放视频
    video.currentTime = 0;

    try {
        await video.play();
    } catch (e) {
        console.warn('morning.webm 播放失败，直接跳转');
        clearTimeout(timeoutId);
        overlay.remove();
        window.location.href = targetUrl;
        return;
    }

    // 视频结束后跳转
    video.onended = () => {
        clearTimeout(timeoutId);
        if (transitionCompleted) return;
        transitionCompleted = true;
        sessionStorage.setItem('phantom_page_transition', 'true');
        window.location.href = targetUrl;
    };

    // 监听错误事件
    video.onerror = () => {
        clearTimeout(timeoutId);
        if (transitionCompleted) return;
        transitionCompleted = true;
        console.warn('视频播放错误，强制跳转');
        window.location.href = targetUrl;
    };
}

// 角色专属转场播放
async function playCharacterTransition(targetUrl, videoSrc) {
    // 超时兜底机制 - 5秒后强制跳转
    const MAX_TRANSITION_TIME = 5000;
    let transitionCompleted = false;

    const forceRedirect = () => {
        if (transitionCompleted) return;
        transitionCompleted = true;
        console.warn('角色转场超时或异常，强制跳转');
        sessionStorage.setItem('phantom_page_transition', 'true');
        window.location.href = targetUrl;
    };

    const timeoutId = setTimeout(forceRedirect, MAX_TRANSITION_TIME);

    const overlay = document.createElement('div');
    overlay.className = 'video-transition-overlay';

    const video = document.createElement('video');
    video.src = videoSrc;
    video.muted = true;
    video.playsInline = true;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        object-fit: cover;
        z-index: 1;
    `;

    overlay.appendChild(video);
    overlay.appendChild(canvas);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    const ctx = canvas.getContext('2d');

    video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    };

    // Canvas 渲染循环
    function renderFrame() {
        if (!video.paused && !video.ended) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            requestAnimationFrame(renderFrame);
        }
    }

    video.onplay = renderFrame;
    overlay.classList.add('active');

    // 预加载目标页面
    if (location.protocol !== 'file:') {
        fetch(targetUrl, { method: 'GET', credentials: 'include' }).catch(() => {});
    }

    video.currentTime = 0;

    try {
        await video.play();
    } catch (e) {
        console.warn('角色专属转场视频播放失败，直接跳转');
        clearTimeout(timeoutId);
        overlay.remove();
        window.location.href = targetUrl;
        return;
    }

    // 视频结束后跳转
    video.onended = () => {
        clearTimeout(timeoutId);
        if (transitionCompleted) return;
        transitionCompleted = true;
        sessionStorage.setItem('phantom_page_transition', 'true');
        window.location.href = targetUrl;
    };

    // 监听错误事件
    video.onerror = () => {
        clearTimeout(timeoutId);
        if (transitionCompleted) return;
        transitionCompleted = true;
        console.warn('视频播放错误，强制跳转');
        window.location.href = targetUrl;
    };
}

// 初始化页面转场
function initPageTransitions() {
    const links = document.querySelectorAll('a[href$=".html"]');

    // 预加载视频
    preloadTransitionVideo().catch(() => {});
    preloadMorningVideo().catch(() => {});
    preloadJokerVideo().catch(() => {});

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (isTransitioning) {
                e.preventDefault();
                return;
            }

            const href = this.getAttribute('href');
            // 排除外部链接和登录链接
            if (href && !href.startsWith('http') && !href.includes('login.html')) {
                e.preventDefault();
                isTransitioning = true;

                // 检查是否为角色专属转场
                const targetPage = href.split('/').pop();
                if (CHARACTER_TRANSITIONS[targetPage]) {
                    playCharacterTransition(href, CHARACTER_TRANSITIONS[targetPage]);
                    return;
                }

                // 判断是否为主要页面之间的跳转
                const isMainPageTransition = isMainPage(href) && isMainPage(window.location.href);

                if (isMainPageTransition && videoPreloaded) {
                    // 使用视频转场
                    const overlay = createTransitionOverlay();
                    document.body.appendChild(overlay);
                    playTransitionVideo(href, overlay);
                } else {
                    // 使用备用撕裂转场
                    playTearTransition(href);
                }
            }
        });
    });

    // 检查是否是从转场过来的
    if (sessionStorage.getItem('phantom_page_transition') === 'true') {
        sessionStorage.removeItem('phantom_page_transition');
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.2s ease';

        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
            document.body.style.overflow = '';
        });
    }

    // 重置转场状态
    window.addEventListener('load', () => {
        isTransitioning = false;
    });
}

// ==================== 时间线交互 ====================
function initTimeline() {
    const eras = document.querySelectorAll('.timeline-era');

    eras.forEach(era => {
        era.addEventListener('mouseenter', function() {
            // 高亮当前时代
            eras.forEach(e => e.style.opacity = '0.5');
            this.style.opacity = '1';
        });

        era.addEventListener('mouseleave', function() {
            eras.forEach(e => e.style.opacity = '1');
        });
    });
}

// ==================== 视差滚动 ====================
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        // 怪盗团之信视差
        const letter = document.querySelector('.letter-background');
        if (letter) {
            letter.style.transform = `rotate(-1deg) translateY(${scrolled * 0.1}px)`;
        }

        // 成员卡片视差
        const cards = document.querySelectorAll('.card-silhouette');
        cards.forEach((card, index) => {
            const speed = (index + 1) * 0.05;
            card.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ==================== 音效（可选） ====================
function initSoundEffects() {
    // 预留音效功能
    // 用户可以后续添加P5R风格的UI音效
}

// ==================== 背景音乐控制 ====================
function initBackgroundMusic() {
    const audio = document.getElementById('bgMusic');
    const toggle = document.getElementById('musicToggle');

    if (!audio || !toggle) return;

    // 设置音量
    audio.volume = 0.3;

    // 获取当前页面的音乐文件名
    const currentSrc = audio.querySelector('source')?.src || '';
    const currentMusic = currentSrc.split('/').pop(); // 提取文件名

    // 恢复播放位置（仅当音乐文件相同时）
    const savedMusic = sessionStorage.getItem('phantom_music_file');
    const savedTime = sessionStorage.getItem('phantom_music_time');

    if (savedMusic === currentMusic && savedTime) {
        audio.currentTime = parseFloat(savedTime);
    }
    // 否则从0开始（默认行为）

    // 检查之前的静音状态（默认为播放）
    const savedMuted = localStorage.getItem('phantom_music_muted');

    // 用户想要播放音乐（默认情况或明确设为false）
    const shouldPlay = savedMuted !== 'true';

    if (shouldPlay) {
        // 尝试自动播放
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // 播放成功
                toggle.classList.remove('muted');
            }).catch(() => {
                // 自动播放被浏览器阻止，等待用户首次点击后播放
                toggle.classList.add('muted');

                // 监听用户首次交互
                const startMusic = () => {
                    if (savedMuted !== 'true' && audio.paused) {
                        audio.play();
                        toggle.classList.remove('muted');
                    }
                    document.removeEventListener('click', startMusic);
                    document.removeEventListener('keydown', startMusic);
                };

                document.addEventListener('click', startMusic);
                document.addEventListener('keydown', startMusic);
            });
        }
    } else {
        // 用户之前主动静音了
        toggle.classList.add('muted');
    }

    // 点击切换音乐
    toggle.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            toggle.classList.remove('muted');
            localStorage.setItem('phantom_music_muted', 'false');
        } else {
            audio.pause();
            toggle.classList.add('muted');
            localStorage.setItem('phantom_music_muted', 'true');
        }
    });
}

// 保存音乐播放进度
function saveMusicProgress() {
    const audio = document.getElementById('bgMusic');
    if (audio) {
        const currentSrc = audio.querySelector('source')?.src || '';
        const currentMusic = currentSrc.split('/').pop();

        // 保存当前音乐文件名和播放进度
        sessionStorage.setItem('phantom_music_file', currentMusic);
        sessionStorage.setItem('phantom_music_time', audio.currentTime.toString());
    }
}

// 页面卸载时保存音乐进度
window.addEventListener('beforeunload', saveMusicProgress);

// ==================== P5R 按钮抖动效果 ====================
function initButtonShake() {
    // 所有按钮点击时添加抖动
    document.querySelectorAll('button, .nav-item, .tab-btn, .filter-btn, .login-btn, .easter-egg-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // 添加抖动效果
            this.classList.add('btn-shake');
            setTimeout(() => this.classList.remove('btn-shake'), 500);
        });
    });
}

// ==================== 移动端导航菜单 ====================
function initMobileNav() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');

    if (!menuToggle || !mobileNav) return;

    // 切换菜单
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');

        // 更新 aria-label
        const isOpen = mobileNav.classList.contains('active');
        this.setAttribute('aria-label', isOpen ? '关闭菜单' : '打开菜单');
        this.setAttribute('aria-expanded', isOpen);
    });

    // 点击导航链接后关闭菜单
    mobileNav.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            menuToggle.setAttribute('aria-label', '打开菜单');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // 点击页面其他地方关闭菜单
    document.addEventListener('click', function(e) {
        if (!menuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            menuToggle.setAttribute('aria-label', '打开菜单');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // ESC 键关闭菜单
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            menuToggle.setAttribute('aria-label', '打开菜单');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.focus();
        }
    });
}

// ==================== 初始化所有功能 ====================
document.addEventListener('DOMContentLoaded', () => {
    // 检查登录状态
    checkLoginStatus();

    // 登录页面初始化
    initLoginPage();

    // 通用功能初始化
    highlightCurrentNav();
    initSmoothScroll();
    initScrollAnimations();
    initMemberCards();
    initPhantomLetter();
    createParticles();
    initMouseFollow();
    initPageTransitions();
    initTimeline();
    initParallax();
    initButtonShake();

    // 移动端导航初始化
    initMobileNav();

    // 背景音乐初始化
    initBackgroundMusic();

    console.log('🎭 Phantom Thieves Website Initialized');
});

// ==================== 彩蛋按钮交互 ====================
function initEasterEgg() {
    const trueWorldBtn = document.getElementById('trueWorldBtn');
    const marukiEnding = document.getElementById('marukiEnding');
    const backToRealityBtn = document.getElementById('backToReality');

    if (!trueWorldBtn || !marukiEnding) return;

    // 点击"真世界?"按钮，显示丸喜结局
    trueWorldBtn.addEventListener('click', function() {
        marukiEnding.style.display = 'block';
        document.body.style.overflow = 'hidden'; // 禁止背景滚动

        // 添加淡入效果
        marukiEnding.style.animation = 'maruki-fade-in 1s ease forwards';

        // 滚动到顶部
        marukiEnding.scrollTop = 0;
    });

    // 点击"返回真实世界"按钮，隐藏丸喜结局
    if (backToRealityBtn) {
        backToRealityBtn.addEventListener('click', function() {
            marukiEnding.style.animation = 'maruki-fade-out 0.5s ease forwards';

            setTimeout(() => {
                marukiEnding.style.display = 'none';
                document.body.style.overflow = ''; // 恢复滚动
            }, 500);
        });
    }

    // 添加淡出动画样式
    const fadeOutStyle = document.createElement('style');
    fadeOutStyle.textContent = `
        @keyframes maruki-fade-out {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(fadeOutStyle);
}

// 初始化彩蛋
document.addEventListener('DOMContentLoaded', initEasterEgg);