(() => {
  'use strict';

  /* ╔══════════════════════════════════════════════════════════════════╗
     ║   РЕДАКТИРУЕМАЯ ЧАСТЬ — НАСТРОЙКИ И ВАШИ ИСТОРИИ               ║
     ║   Ниже можно менять текст, героев, картинки, сцены и переходы.    ║
     ╚══════════════════════════════════════════════════════════════════╝ */

  const GAME_CONFIG = {
    title: 'Созвездие наших историй',
    subtitle: 'Каждое счастливое мгновение становится легендой',
    menuBackground: '', // Например: 'assets/menu/palace.webp'
    menuPosition: 'center center',
    menuDim: 0.26, // 0 — без затемнения; 1 — полностью тёмное изображение
    menuMusic: '', // Например: 'assets/audio/menu.mp3'
    openAllChapters: false,
    saveSlots: 3,
    defaultSettings: {
      music: true, sounds: true, volume: 65, typewriter: true,
      typingSpeed: 28, reduceEffects: false
    }
  };

  // Схема: story -> chapters[] с start -> scenes по ID.
  // Для материалов используйте только относительные пути: assets/...
  // effects: { stats:{romance:2}, relationships:{hero:1},
  //            flags:{secret:true}, items:['key'], removeItems:['key'] }
  // when: {stat:{key:'romance',gte:2}}, {flag:{key:'...'}},
  //       {relationship:{character:'hero',gte:2}}, {item:'key'},
  //       {outfit:{character:'hero',is:'blue'}}, {decision:{scene:'...',option:'...'}},
  //       {all:[...]}, {any:[...]}, {not:{...}}.

  const STORY_LIBRARY = [
    {
      id: 'midnight-ball',
      title: 'Бал полуночных желаний',
      description: 'Когда часы дворца пробьют полночь, одно желание сможет изменить целое королевство. История о смелости, нежности и выборе сердца.',
      genre: 'Романтическое фэнтези', icon: '♕', cover: '', coverVariant: 0,
      available: true, music: '',
      initial: {
        stats: { romance: 0, courage: 0, quizPoints: 0 },
        flags: { knowsSecret: false }, relationships: { elian: 0, mira: 0 },
        inventory: []
      },
      characters: {
        heroine: { name: 'Незнакомка', color: '#f5c7df', position: 'left', images: { neutral: '', happy: '', thoughtful: '' }, outfitSprites: {} },
        elian: { name: 'Элиан', color: '#f2dc9e', position: 'right', images: { neutral: '', happy: '', surprised: '' } },
        mira: { name: 'Мира', color: '#ffd5a9', position: 'left', images: { neutral: '', happy: '' } }
      },
      chapters: [
        { id: 'chapter1', title: 'Приглашение в полночь', description: 'Таинственное приглашение и выбор наряда.', start: 'arrival' },
        { id: 'chapter2', title: 'Секрет созвездий', description: 'Потерянные воспоминания и решающее желание.', start: 'second_opening' }
      ],
      scenes: {
        arrival: {
          type: 'dialogue', background: { preset: 'palace' },
          cast: [{ id: 'heroine', position: 'left' }, { id: 'elian', position: 'right' }],
          lines: [
            { speaker: null, text: 'В ночь, когда над королевством рассыпались золотые звёзды, у ворот древнего дворца остановилась незнакомка.' },
            { speaker: 'heroine', emotion: 'thoughtful', text: 'Странно... На приглашении нет имени. Только надпись: «Тебя ждёт то, о чём ты давно мечтаешь».' },
            { speaker: 'elian', emotion: 'happy', text: 'Значит, письмо нашло именно тебя. Добро пожаловать на Бал полуночных желаний.' },
            { speaker: 'heroine', text: 'А если моё желание окажется слишком смелым?' },
            { speaker: 'elian', text: 'Тогда звёзды будут светить ярче.' }
          ], next: 'destination'
        },
        destination: {
          type: 'choice', background: { preset: 'palace' }, cast: [{ id: 'elian', position: 'right' }],
          question: 'До начала бала ещё есть время. Куда отправимся?',
          options: [
            { id: 'garden', text: 'Прогуляться по лунному саду', next: 'garden_walk', effects: { stats: { romance: 2 }, relationships: { elian: 2 }, flags: { knowsSecret: true }, items: ['silver-ribbon'], toast: 'Получена серебряная лента' } },
            { id: 'hall', text: 'Осмотреть великолепный бальный зал', next: 'ballroom_walk', effects: { stats: { courage: 2 }, relationships: { mira: 1 } } }
          ]
        },
        garden_walk: {
          type: 'dialogue', background: { preset: 'garden' },
          cast: [{ id: 'heroine', position: 'left' }, { id: 'elian', position: 'right' }],
          lines: [
            { speaker: null, text: 'В саду серебряные цветы шептали друг другу старинные сказки.' },
            { speaker: 'elian', emotion: 'happy', text: 'Здесь я прятался в детстве, когда весь дворец казался слишком шумным.' },
            { speaker: 'heroine', emotion: 'happy', text: 'Теперь у этого места будет ещё одно воспоминание.' },
            { speaker: null, text: 'Между ветвями вспыхнула серебряная лента. Элиан осторожно протянул её тебе.' }
          ], next: 'meet_mira'
        },
        ballroom_walk: {
          type: 'dialogue', background: { preset: 'ballroom' },
          cast: [{ id: 'heroine', position: 'left' }, { id: 'mira', position: 'right' }],
          lines: [
            { speaker: null, text: 'Сотни свечей отражались в зеркалах зала. Музыка будто звучала прямо из стен.' },
            { speaker: 'mira', emotion: 'happy', text: 'Ты здесь впервые? Я Мира, распорядительница праздника. Если понадобится смелость — у меня её с запасом!' },
            { speaker: 'heroine', text: 'Пожалуй, немного смелости мне пригодится.' }
          ], next: 'meet_mira'
        },
        meet_mira: {
          type: 'dialogue', background: { preset: 'ballroom' },
          cast: [{ id: 'heroine', position: 'left' }, { id: 'mira', position: 'right' }],
          lines: [
            { speaker: 'mira', emotion: 'happy', text: 'Главная гостья уже здесь! Осталось выбрать платье. Ночь должна запомнить тебя.' },
            { speaker: 'heroine', thought: true, text: 'Как будто в этой сказке я могу стать кем захочу...' }
          ], next: 'dress_room'
        },
        dress_room: {
          type: 'outfit', background: { preset: 'palace' }, character: 'heroine',
          title: 'Наряд для волшебного бала', description: 'Выбери платье, в котором отправишься навстречу полуночи.',
          outfits: [
            { id: 'starlight', name: 'Звёздное сияние', description: 'Лёгкая ткань мерцает, будто ночное небо.', symbol: '✧', color: '#756cb0', image: '' },
            { id: 'rose', name: 'Королевская роза', description: 'Бордовый бархат с изящной золотой вышивкой.', symbol: '♛', color: '#9e4e70', image: '' },
            { id: 'moonlight', name: 'Лунный шёлк', description: 'Светлое платье цвета первого снега.', symbol: '☽', color: '#a8a9c8', image: '' }
          ], next: 'memory_album'
        },
        memory_album: {
          type: 'gallery', background: { preset: 'stars' },
          title: 'Альбом забытых мгновений', description: 'Мира показывает тебе волшебные страницы дворцового альбома.',
          photos: [
            { title: 'Первая звезда', caption: 'Вечер, когда над дворцом исполнилось первое желание.', symbol: '✦', image: '' },
            { title: 'Лунная оранжерея', caption: 'Место, где даже цветы умеют хранить секреты.', symbol: '❀', image: '' },
            { title: 'Музыка двух сердец', caption: 'Некоторые мелодии никогда не заканчиваются.', symbol: '♫', image: '' }
          ], next: 'riddle'
        },
        riddle: {
          type: 'quiz', background: { preset: 'ballroom' },
          title: 'Испытание феи воспоминаний', description: 'Чтобы открыть волшебные часы, ответь на два вопроса.',
          questions: [
            { prompt: 'Что светит ярче всего, когда рядом дорогой человек?', correct: 'heart',
              options: [{ id: 'gold', text: 'Золотая корона' }, { id: 'heart', text: 'Тёплое сердце' }, { id: 'mirror', text: 'Хрустальное зеркало' }],
              rightFeedback: 'Мира улыбается: «Самое главное всегда рядом».', wrongFeedback: 'Мира шепчет: «Магия часто скрыта в самом простом».' },
            { prompt: 'Что останется с нами, когда бал закончится?', correct: 'memory',
              options: [{ id: 'dance', text: 'Только музыка' }, { id: 'memory', text: 'Воспоминания' }, { id: 'clock', text: 'Полночный звон' }],
              rightFeedback: 'Фея одобрительно кивает.', wrongFeedback: 'Волшебные часы всё равно открываются — впереди ещё будет шанс.' }
          ], scoreStat: 'quizPoints', passScore: 1, passNext: 'first_finale', failNext: 'first_finale'
        },
        first_finale: {
          type: 'ending', background: { preset: 'ballroom' }, title: 'Первый танец',
          text: 'Часы отбили двенадцать, и зал озарился золотым сиянием. Но у сказки ещё есть секрет — он ждёт тебя среди созвездий.',
          symbol: '♕', effect: 'confetti', final: false, nextChapter: 'chapter2'
        },
        second_opening: {
          type: 'dialogue', background: { preset: 'stars' },
          cast: [{ id: 'heroine', position: 'left' }, { id: 'elian', position: 'right' }],
          lines: [
            { speaker: null, text: 'Утро не наступило. Волшебные часы остановили время ради одного последнего желания.' },
            { speaker: 'elian', emotion: 'surprised', text: 'Звёзды потеряли пары. Пока мы не найдём их, дверь в завтрашний день останется закрыта.' },
            { speaker: 'heroine', emotion: 'happy', text: 'Значит, поможем им снова встретиться!' }
          ], next: 'pair_stars'
        },
        pair_stars: {
          type: 'minigame', game: 'pairs', background: { preset: 'stars' },
          title: 'Найди родственные звёзды', description: 'Открывай карточки и находи одинаковые символы.',
          pairs: [
            { id: 'moon', label: '☽' }, { id: 'heart', label: '♥' },
            { id: 'star', label: '✦' }, { id: 'flower', label: '❀' }
          ], completeEffects: { stats: { romance: 1 }, relationships: { elian: 1 }, toast: 'Созвездия снова сияют!' },
          next: 'last_choice'
        },
        last_choice: {
          type: 'choice', background: { preset: 'sunset' },
          cast: [{ id: 'heroine', position: 'left' }, { id: 'elian', position: 'right' }],
          question: 'Звёзды исполнят одно желание. Что ты выберешь?',
          options: [
            { id: 'eternity', text: 'Пусть наша звёздная история никогда не угаснет', next: 'star_promise', when: { stat: { key: 'romance', gte: 2 } }, locked: 'Нужно 2 очка романтики' },
            { id: 'morning', text: 'Пусть каждое утро дарит новые приключения', next: 'dawn_promise', effects: { stats: { courage: 1 } } },
            { id: 'secret', text: 'Вспомнить секрет лунного сада', next: 'star_promise', when: { all: [{ flag: { key: 'knowsSecret', equals: true } }, { item: 'silver-ribbon' }] }, hidden: true }
          ]
        },
        star_promise: {
          type: 'dialogue', background: { preset: 'stars' },
          cast: [{ id: 'heroine', position: 'left' }, { id: 'elian', position: 'right' }],
          lines: [
            { speaker: 'elian', emotion: 'happy', text: 'Есть обещания, для которых не нужны слова. Достаточно просто быть рядом.' },
            { speaker: 'heroine', emotion: 'happy', text: 'Тогда начнём с одного: встречать каждую звезду вместе.' }
          ], next: 'ending_stars'
        },
        dawn_promise: {
          type: 'dialogue', background: { preset: 'sunset' },
          cast: [{ id: 'mira', position: 'left' }, { id: 'heroine', position: 'right' }],
          lines: [
            { speaker: 'mira', emotion: 'happy', text: 'Ура! Значит, завтра у нас будет новая история. И послезавтра тоже!' },
            { speaker: 'heroine', emotion: 'happy', text: 'Волшебство не заканчивается, если мы сами продолжаем его создавать.' }
          ], next: 'ending_dawn'
        },
        ending_stars: { type: 'ending', background: { preset: 'stars' }, final: true, endingId: 'star-vow', title: 'Навсегда под звёздами', text: 'Когда два сердца находят свой свет, даже бесконечная ночь становится началом счастья.', symbol: '♥', effect: 'hearts' },
        ending_dawn: { type: 'ending', background: { preset: 'sunset' }, final: true, endingId: 'new-dawn', title: 'Рассвет новых историй', text: 'Самое прекрасное чудо — знать, что впереди ещё тысячи незабываемых мгновений.', symbol: '☀', effect: 'confetti' }
      }
    },
    {
      id: 'star-letters', title: 'Письма из созвездий',
      description: 'В старой башне спрятано письмо, которое может прочитать только человек, верящий в чудеса.',
      genre: 'Сказка о дружбе', icon: '✉', cover: '', coverVariant: 1, available: true, music: '',
      initial: { stats: { wonder: 0 }, flags: {}, relationships: {}, inventory: [] },
      characters: { keeper: { name: 'Хранительница', color: '#f0d99b', position: 'right', images: {} } },
      chapters: [{ id: 'letters1', title: 'Письмо без адреса', description: 'Один вечер, одна звезда, один выбор.', start: 'letters_open' }],
      scenes: {
        letters_open: { type: 'dialogue', background: { preset: 'stars' }, cast: [{ id: 'keeper', position: 'right' }], lines: [
          { speaker: null, text: 'На самом верху башни лежал конверт, запечатанный лунным светом.' },
          { speaker: 'keeper', text: 'Этот конверт откроется тому, кто знает, где искать настоящие сокровища.' },
          { speaker: null, text: 'Ты берёшь письмо в руки. На печати мерцают два символа.' }
        ], next: 'letters_choice' },
        letters_choice: { type: 'choice', background: { preset: 'palace' }, question: 'Какое слово шепнуть волшебному письму?', options: [
          { id: 'friendship', text: 'Дружба', next: 'letters_friends', effects: { stats: { wonder: 1 } } },
          { id: 'hope', text: 'Надежда', next: 'letters_hope', effects: { flags: { foundHope: true } } }
        ] },
        letters_friends: { type: 'dialogue', background: { preset: 'garden' }, lines: [{ speaker: null, text: 'Конверт раскрывается. На пустой странице появляются имена всех, кто когда-либо согревал твоё сердце.' }], next: 'letters_end' },
        letters_hope: { type: 'dialogue', background: { preset: 'sunset' }, lines: [{ speaker: null, text: 'Конверт раскрывается. На странице написано: «Каждый новый день — приглашение к счастью».' }], next: 'letters_end' },
        letters_end: { type: 'ending', background: { preset: 'stars' }, final: true, endingId: 'letter-received', title: 'Письмо доставлено', text: 'Оказывается, чудесам не нужен адрес. Они всегда знают дорогу к сердцу.', symbol: '✉', effect: 'sparkles' }
      }
    }
  ];

  /* ╔══════════════════════════════════════════════════════════════════╗
     ║   ДВИЖОК — обычно редактировать код ниже не требуется.         ║
     ╚══════════════════════════════════════════════════════════════════╝ */

  const SAVE_VERSION = 1;
  const STORAGE_PREFIX = 'fairytale-novel:v1:';
  const STORY_MAP = new Map(STORY_LIBRARY.map(story => [story.id, story]));
  const SCREENS = ['home', 'detail', 'game', 'error'];
  const $ = id => document.getElementById(id);
  const dom = {
    storyList: $('story-list'), chapterList: $('chapter-list'), detailActions: $('detail-actions'),
    sceneSheet: $('scene-sheet'), dialogueDock: $('dialogue-dock'),
    gameBack: $('game-back'), characterLayer: $('character-layer'),
    modal: $('modal'), modalBody: $('modal-body'), toastStack: $('toast-stack'),
    effectLayer: $('effect-layer')
  };
  let currentStory = null;
  let state = null;
  let settings = loadSettings();
  let activeScreen = 'home';
  let typingTimer = null;
  let typing = false;
  let fullLine = [];
  let shownCharacters = 0;
  let lastAdvanceTime = 0;
  let backgroundRequest = 0;
  let previouslyFocused = null;
  let pendingConfirm = null;
  let storageWarningShown = false;
  const temporary = { opened: [], pairLock: false };

  const audio = {
    music: null, musicPath: '', context: null, unlocked: false,
    unlock() {
      this.unlocked = true;
      if (this.context?.state === 'suspended') this.context.resume().catch(() => {});
      this.refresh();
    },
    refresh(path = this.musicPath) {
      if (path !== this.musicPath) {
        this.music?.pause();
        this.music = null;
        this.musicPath = path || '';
      }
      if (!this.musicPath || !settings.music || settings.volume === 0) {
        this.music?.pause();
        return;
      }
      if (!this.unlocked) return;
      if (!this.music) {
        try {
          this.music = new Audio(this.musicPath);
          this.music.loop = true;
          this.music.preload = 'none';
          this.music.addEventListener('error', () => { this.music?.pause(); }, { once: true });
        } catch (_) { return; }
      }
      this.music.volume = settings.volume / 100;
      if (this.music.paused) this.music.play().catch(() => {});
    },
    cue(type = 'tap') {
      if (!this.unlocked || !settings.sounds || settings.volume === 0) return;
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        if (!this.context) this.context = new AudioContextClass();
        if (this.context.state !== 'running') return;
        const osc = this.context.createOscillator();
        const gain = this.context.createGain();
        const now = this.context.currentTime;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(type === 'choice' ? 530 : 690, now);
        osc.frequency.exponentialRampToValueAtTime(type === 'choice' ? 820 : 490, now + .12);
        gain.gain.setValueAtTime(.0001, now);
        gain.gain.exponentialRampToValueAtTime(Math.max(.0002,settings.volume / 3500), now + .015);
        gain.gain.exponentialRampToValueAtTime(.0001, now + .16);
        osc.connect(gain).connect(this.context.destination);
        osc.start(now); osc.stop(now + .17);
      } catch (_) { /* Звук необязателен, отсутствие поддержки безопасно. */ }
    }
  };

  function element(tag, className = '', text = null) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== null && text !== undefined) node.textContent = String(text);
    return node;
  }
  function makeButton(label, action, className = 'btn', data = {}) {
    const button = element('button', className, label);
    button.type = 'button';
    button.dataset.action = action;
    Object.entries(data).forEach(([key, value]) => { button.dataset[key] = String(value); });
    return button;
  }
  function add(parent, ...children) {
    for (const child of children) if (child) parent.append(child);
    return parent;
  }
  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function findChapter(id) { return currentStory?.chapters.find(ch => ch.id === id); }
  function getScene(id = state?.sceneId) { return currentStory?.scenes[id]; }
  function saveKey(storyId, slot = 'auto') { return `${STORAGE_PREFIX}${storyId}:${slot}`; }
  function safeRead(key) {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : null; }
    catch (err) { console.warn('[Сохранения] Невозможно прочитать:', key, err); return null; }
  }
  function safeWrite(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (err) {
      console.warn('[Сохранения] Запись недоступна:', err);
      if (!storageWarningShown) { storageWarningShown = true; notify('Сохранения недоступны в этом браузере'); }
      return false;
    }
  }
  function safeRemove(key) {
    try { localStorage.removeItem(key); return true; }
    catch (err) { console.warn('[Сохранения] Удаление недоступно:', err); return false; }
  }
  function loadSettings() {
    const stored = safeRead(`${STORAGE_PREFIX}settings`);
    const base = GAME_CONFIG.defaultSettings;
    if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return clone(base);
    return {
      music: typeof stored.music === 'boolean' ? stored.music : base.music,
      sounds: typeof stored.sounds === 'boolean' ? stored.sounds : base.sounds,
      volume: Number.isFinite(stored.volume) ? Math.max(0,Math.min(100,stored.volume)) : base.volume,
      typewriter: typeof stored.typewriter === 'boolean' ? stored.typewriter : base.typewriter,
      typingSpeed: [0,15,28,45,70].includes(stored.typingSpeed) ? stored.typingSpeed : base.typingSpeed,
      reduceEffects: typeof stored.reduceEffects === 'boolean' ? stored.reduceEffects : base.reduceEffects
    };
  }
  function applySettings() {
    document.body.classList.toggle('reduce-effects', settings.reduceEffects);
    safeWrite(`${STORAGE_PREFIX}settings`, settings);
    audio.refresh();
    if (!settings.typewriter || settings.typingSpeed === 0) finishTyping();
  }
  function createState(story) {
    const base = story.initial || {};
    return {
      version: SAVE_VERSION, storyId: story.id,
      chapterId: story.chapters[0].id, sceneId: '', lineIndex: 0,
      stats: clone(base.stats || {}), flags: clone(base.flags || {}),
      relationships: clone(base.relationships || {}), inventory: clone(base.inventory || []),
      outfits: {}, decisions: {}, visited: [], unlockedChapters: [story.chapters[0].id],
      completedChapters: [], endings: [], log: [], history: [], interactive: null,
      updatedAt: Date.now()
    };
  }
  function isValidState(saved, story) {
    if (!saved || saved.version !== SAVE_VERSION || saved.storyId !== story.id) return false;
    if (!story.chapters.some(c => c.id === saved.chapterId)) return false;
    if (saved.sceneId && !story.scenes[saved.sceneId]) return false;
    if (!Number.isInteger(saved.lineIndex) || saved.lineIndex < 0) return false;
    if (saved.sceneId && story.scenes[saved.sceneId].type === 'dialogue'
        && saved.lineIndex >= story.scenes[saved.sceneId].lines.length) return false;
    const records = ['stats','flags','relationships','outfits','decisions'];
    const lists = ['inventory','visited','unlockedChapters','completedChapters','endings','log','history'];
    return records.every(k => saved[k] && typeof saved[k] === 'object' && !Array.isArray(saved[k]))
      && lists.every(k => Array.isArray(saved[k]))
      && (!saved.interactive || (typeof saved.interactive === 'object' && !Array.isArray(saved.interactive)))
      && saved.history.length <= 100 && saved.log.length <= 500;
  }
  function readState(story, slot = 'auto') {
    const data = safeRead(saveKey(story.id,slot));
    return isValidState(data,story) ? data : null;
  }
  function persist() {
    if (!state || !currentStory) return;
    state.updatedAt = Date.now();
    safeWrite(saveKey(currentStory.id),state);
  }
  function snapshot() {
    if (!state) return;
    const { history, ...rest } = state;
    state.history.push(clone(rest));
    if (state.history.length > 45) state.history.shift();
  }
  function restorePrevious() {
    if (!state || !canBack()) return;
    const history = state.history;
    const previous = history.pop();
    state = { ...clone(previous), history };
    temporary.opened = []; temporary.pairLock = false;
    renderGame(); persist(); audio.cue();
  }
  function canBack() {
    if (!state || !state.history.length) return false;
    const sceneType = getScene()?.type;
    return sceneType === 'dialogue' || sceneType === 'choice';
  }
  function notify(message) {
    if (!message) return;
    const node = element('div','toast',message);
    dom.toastStack.append(node);
    while (dom.toastStack.children.length > 3) dom.toastStack.firstChild.remove();
    setTimeout(() => node.remove(),3600);
  }
  function showScreen(name) {
    SCREENS.forEach(id => { $(`${id}-screen`).hidden = id !== name; });
    activeScreen = name;
    document.title = `${GAME_CONFIG.title}${name === 'game' && currentStory ? ' — ' + currentStory.title : ''}`;
  }
  function showError(message) {
    console.error('[Движок новеллы]',message);
    stopTyping(); closeModal(); $('error-description').textContent = String(message);
    showScreen('error'); audio.refresh('');
  }
  function updateMenuImage() {
    const img = $('menu-image');
    img.hidden = true;
    if (!GAME_CONFIG.menuBackground) return;
    img.style.objectPosition = GAME_CONFIG.menuPosition;
    img.style.filter = `brightness(${1 - Math.max(0,Math.min(1,GAME_CONFIG.menuDim))})`;
    img.onload = () => { img.hidden = false; };
    img.onerror = () => { img.hidden = true; console.warn('[Медиа] Фон меню не найден:',img.src); };
    img.src = GAME_CONFIG.menuBackground;
  }
  function attachImage(parent, path, className = 'cover-image') {
    if (!path) return null;
    const img = element('img', className);
    img.alt = '';
    img.hidden = true;
    img.loading = 'lazy';
    img.onload = () => { img.hidden = false; };
    img.onerror = () => { img.hidden = true; };
    img.src = path;
    parent.append(img);
    return img;
  }
  function createCover(story, type = 'story-cover') {
    const cover = element('div',`cover-art cover-variant-${story.coverVariant || 0} ${type}`);
    const center = element('div','cover-center');
    add(center,element('span','cover-symbol',story.icon || '♕'),element('span','',story.genre || 'Сказка'));
    cover.append(center);
    attachImage(cover,story.cover);
    return cover;
  }
  function storyProgress(story) {
    const save = readState(story);
    const done = save?.completedChapters.filter(id => story.chapters.some(c => c.id === id)).length || 0;
    return { save, done, percentage: Math.round(done / story.chapters.length * 100) };
  }
  function openHome() {
    closeModal(); stopTyping(); currentStory = null; state = null;
    temporary.opened = []; temporary.pairLock = false;
    $('home-title').textContent = GAME_CONFIG.title;
    $('home-subtitle').textContent = GAME_CONFIG.subtitle;
    updateMenuImage();
    dom.storyList.replaceChildren();
    STORY_LIBRARY.forEach((story,index) => {
      const progress = storyProgress(story);
      const card = element('article','story-card');
      card.style.animationDelay = `${index * .09}s`;
      card.append(createCover(story));
      const info = element('div','story-info');
      add(info,element('div','story-meta',`${story.genre || 'История'} · ${story.chapters.length} гл.`),
        element('h3','',story.title), element('p','',story.description));
      const status = element('div','story-meta',progress.done ? `Пройдено ${progress.done} из ${story.chapters.length}` : 'Новая история');
      const meter = element('div','meter');
      const fill = element('span'); fill.style.width = `${progress.percentage}%`;
      meter.append(fill);
      const button = makeButton(!story.available ? 'Скоро' : progress.save?.sceneId ? 'Открыть · продолжить' : 'Открыть историю','open-story','btn btn-primary',{id:story.id});
      button.disabled = story.available === false;
      add(info,status,meter,button); card.append(info); dom.storyList.append(card);
    });
    showScreen('home'); audio.refresh(GAME_CONFIG.menuMusic);
  }
  function openStory(id) {
    const story = STORY_MAP.get(id);
    if (!story || story.available === false) { notify('История пока недоступна'); return; }
    closeModal(); stopTyping(); currentStory = story;
    state = readState(story) || createState(story);
    $('detail-title').textContent = story.title;
    $('detail-description').textContent = story.description;
    $('detail-genre').textContent = story.genre || 'Сказка';
    const cover = $('detail-cover');
    cover.className = `detail-cover cover-art cover-variant-${story.coverVariant || 0}`;
    cover.querySelector('.cover-symbol').textContent = story.icon || '♕';
    cover.querySelectorAll('img').forEach(el => el.remove());
    attachImage(cover,story.cover);
    const progress = storyProgress(story);
    $('detail-progress').textContent = `Прогресс истории: ${progress.percentage}% · Открыто концовок: ${state.endings.length}`;
    dom.detailActions.replaceChildren();
    if (state.sceneId) {
      dom.detailActions.append(makeButton('▶ Продолжить','continue','btn btn-primary'));
    } else {
      dom.detailActions.append(makeButton('✦ Начать историю','start-chapter','btn btn-primary',{id:story.chapters[0].id}));
    }
    dom.detailActions.append(makeButton('Начать заново','reset-story','btn'));
    dom.chapterList.replaceChildren();
    story.chapters.forEach((chapter,index) => {
      const unlocked = GAME_CONFIG.openAllChapters || index === 0 || state.unlockedChapters.includes(chapter.id);
      const done = state.completedChapters.includes(chapter.id);
      const button = makeButton('','start-chapter','chapter-item',{id:chapter.id});
      button.disabled = !unlocked;
      add(button, element('span','chapter-number',unlocked ? String(index + 1).padStart(2,'0') : '♧'));
      const text = element('div');
      add(text,element('strong','',chapter.title),element('small','',chapter.description || 'Новая глава'));
      add(button,text,element('span','chapter-state',done ? '✓' : unlocked ? '→' : 'Закрыта'));
      dom.chapterList.append(button);
    });
    showScreen('detail'); audio.refresh(story.music || GAME_CONFIG.menuMusic);
  }
  function beginChapter(id) {
    if (!state || !currentStory) return;
    const chapter = findChapter(id);
    const unlocked = GAME_CONFIG.openAllChapters || state.unlockedChapters.includes(id);
    if (!chapter || !unlocked) { notify('Глава ещё не открыта'); return; }
    state.chapterId = id;
    state.history = [];
    enterScene(chapter.start,false);
  }
  function resume() {
    if (!state || !currentStory) return;
    if (!state.sceneId) return beginChapter(state.chapterId);
    renderGame(); audio.refresh(getScene()?.music || currentStory.music || '');
  }
  function resetCurrentStory() {
    if (!currentStory) return;
    state = createState(currentStory);
    for (let i = 1; i <= GAME_CONFIG.saveSlots; i++) safeRemove(saveKey(currentStory.id,String(i)));
    safeRemove(saveKey(currentStory.id));
    openStory(currentStory.id);
    notify('История начата с чистого листа');
  }

  /* Игровые переменные, условия и эффекты */
  function checkCondition(when, depth = 0) {
    if (!when) return true;
    if (depth > 15 || typeof when !== 'object' || !state) return false;
    if (Array.isArray(when.all)) return when.all.every(c => checkCondition(c,depth + 1));
    if (Array.isArray(when.any)) return when.any.some(c => checkCondition(c,depth + 1));
    if (when.not) return !checkCondition(when.not,depth + 1);
    if (when.stat) return compare(state.stats[when.stat.key] ?? 0,when.stat);
    if (when.relationship) return compare(state.relationships[when.relationship.character] ?? 0,when.relationship);
    if (when.flag) return (state.flags[when.flag.key] ?? false) === (when.flag.equals ?? true);
    if (when.item) return state.inventory.includes(when.item);
    if (when.outfit) return state.outfits[when.outfit.character] === when.outfit.is;
    if (when.decision) return state.decisions[when.decision.scene] === when.decision.option;
    if (when.visited) return state.visited.includes(when.visited);
    if (when.chapter) return state.completedChapters.includes(when.chapter);
    return false;
  }
  function compare(actual,test) {
    if (Object.hasOwn(test,'gte') && actual < test.gte) return false;
    if (Object.hasOwn(test,'gt') && actual <= test.gt) return false;
    if (Object.hasOwn(test,'lte') && actual > test.lte) return false;
    if (Object.hasOwn(test,'lt') && actual >= test.lt) return false;
    if (Object.hasOwn(test,'eq') && actual !== test.eq) return false;
    if (Object.hasOwn(test,'neq') && actual === test.neq) return false;
    return ['gte','gt','lte','lt','eq','neq'].some(k => Object.hasOwn(test,k));
  }
  function applyEffects(effects = {}) {
    for (const [key,delta] of Object.entries(effects.stats || {})) {
      if (typeof delta === 'number' && Number.isFinite(delta)) state.stats[key] = (Number(state.stats[key]) || 0) + delta;
    }
    for (const [key,delta] of Object.entries(effects.relationships || {})) {
      if (typeof delta === 'number' && Number.isFinite(delta)) state.relationships[key] = (Number(state.relationships[key]) || 0) + delta;
    }
    for (const [key,value] of Object.entries(effects.flags || {})) state.flags[key] = value;
    for (const item of effects.items || []) if (!state.inventory.includes(item)) state.inventory.push(item);
    for (const item of effects.removeItems || []) state.inventory = state.inventory.filter(id => id !== item);
    for (const [key,value] of Object.entries(effects.outfits || {})) state.outfits[key] = value;
    if (effects.toast) notify(effects.toast);
    if (effects.special) specialEffect(effects.special);
  }
  function recordLog(kind,name,text,key = '') {
    if (!text) return;
    if (key && state.log.at(-1)?.key === key) return;
    state.log.push({ kind, name: name || 'Рассказчик', text: String(text), key });
    if (state.log.length > 120) state.log.splice(0,state.log.length - 120);
  }

  /* Сцена и переходы: эффекты входа применяются только при реальном входе. */
  function enterScene(id, withCheckpoint = true) {
    if (!currentStory?.scenes[id]) return showError(`Неизвестная сцена «${id}» в истории «${currentStory?.title || '?'}».`);
    stopTyping();
    if (withCheckpoint) snapshot();
    state.sceneId = id;
    state.lineIndex = 0;
    state.interactive = null;
    temporary.opened = []; temporary.pairLock = false;
    state.visited.push(id);
    if (state.visited.length > 800) state.visited.shift();
    const scene = getScene();
    if (scene.onEnter) applyEffects(scene.onEnter);
    renderGame(); persist();
    if (scene.effect && scene.type !== 'ending') specialEffect(scene.effect);
    audio.cue('choice');
  }
  function setSceneBackground(background = {}) {
    if (typeof background === 'string') background = { preset: background };
    const stage = $('game-stage');
    stage.className = `game-stage preset-${['palace','garden','stars','ballroom','sunset'].includes(background.preset) ? background.preset : 'palace'}`;
    const photo = $('scene-photo');
    const requestId = ++backgroundRequest;
    photo.hidden = true;
    photo.removeAttribute('src');
    if (!background.image) return;
    const preload = new Image();
    preload.onload = () => {
      if (backgroundRequest !== requestId) return;
      photo.src = background.image;
      photo.style.objectPosition = background.position || 'center center';
      photo.style.filter = `brightness(${1 - Math.max(0,Math.min(1,background.dim ?? .16))}) ${background.filter || ''}`;
      photo.hidden = false;
    };
    preload.onerror = () => { if (backgroundRequest === requestId) console.warn('[Медиа] Нет фона:',background.image); };
    preload.src = background.image;
  }
  function renderCharacters(scene, line = null) {
    const cast = line?.cast || scene.cast || (line?.speaker ? [{ id: line.speaker }] : []);
    dom.characterLayer.replaceChildren();
    for (const entry of cast.slice(0,3)) {
      const id = typeof entry === 'string' ? entry : entry.id;
      const character = currentStory.characters[id];
      if (!character) continue;
      const position = typeof entry === 'string' ? character.position : entry.position || character.position;
      const emotion = line?.speaker === id ? line.emotion || 'neutral' : entry.emotion || 'neutral';
      const wrapper = element('div',`character position-${['left','right','center'].includes(position) ? position : 'center'}${line?.speaker === id ? ' is-active' : ''}`);
      const worn = character.outfitSprites?.[state.outfits[id]];
      const imagePath = typeof worn === 'string' ? worn : worn?.[emotion] || character.images?.[emotion] || character.images?.neutral;
      const fallback = element('div','character-fallback');
      const hue = [...id].reduce((acc,ch) => acc + ch.charCodeAt(0),0) % 4;
      fallback.style.setProperty('--dress',['#865078','#6a608c','#9c526a','#557386'][hue]);
      fallback.style.setProperty('--hair',['#36253d','#684458','#402b3d','#493955'][hue]);
      add(fallback,element('span','silhouette-crown','♛'),element('span','silhouette-head'),
        element('span','silhouette-body'),element('span','silhouette-name',character.name));
      wrapper.append(fallback);
      if (imagePath) {
        const img = element('img'); img.alt = '';
        img.hidden = true;
        img.onload = () => { img.hidden = false; fallback.hidden = true; };
        img.onerror = () => { img.remove(); fallback.hidden = false; };
        img.src = imagePath; wrapper.append(img);
      }
      dom.characterLayer.append(wrapper);
    }
  }
  function renderGame() {
    if (!currentStory || !state) return;
    const scene = getScene();
    if (!scene || !sceneHandlers[scene.type]) return showError(`Не поддерживается сцена: ${state.sceneId}`);
    stopTyping(); showScreen('game');
    $('game-story-name').textContent = currentStory.title;
    $('game-chapter-name').textContent = findChapter(state.chapterId)?.title || '';
    dom.gameBack.disabled = !canBack();
    dom.dialogueDock.hidden = scene.type !== 'dialogue';
    dom.sceneSheet.hidden = scene.type === 'dialogue';
    setSceneBackground(scene.background);
    renderCharacters(scene);
    sceneHandlers[scene.type](scene);
    audio.refresh(scene.music ?? currentStory.music ?? '');
  }
  function stopTyping() {
    if (typingTimer !== null) clearTimeout(typingTimer);
    typingTimer = null; typing = false;
  }
  function finishTyping() {
    if (!typing) return;
    stopTyping();
    $('dialogue-text').textContent = fullLine.join('');
    $('dialogue-hint').textContent = 'Коснись, чтобы продолжить';
  }
  function typeLine(text) {
    const box = $('dialogue-text');
    fullLine = Array.from(String(text || ''));
    shownCharacters = 0; box.textContent = '';
    if (!settings.typewriter || !settings.typingSpeed || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      box.textContent = fullLine.join(''); typing = false; return;
    }
    typing = true; $('dialogue-hint').textContent = 'Коснись, чтобы показать текст';
    const tick = () => {
      if (!typing || activeScreen !== 'game') return;
      shownCharacters = Math.min(fullLine.length,shownCharacters + 1);
      box.textContent = fullLine.slice(0,shownCharacters).join('');
      if (shownCharacters < fullLine.length) typingTimer = setTimeout(tick,settings.typingSpeed);
      else { stopTyping(); $('dialogue-hint').textContent = 'Коснись, чтобы продолжить'; }
    };
    tick();
  }
  function advanceDialogue() {
    if (activeScreen !== 'game' || !dom.modal.hidden || getScene()?.type !== 'dialogue') return;
    if (typing) { finishTyping(); return; }
    const now = performance.now();
    if (now - lastAdvanceTime < 135) return;
    lastAdvanceTime = now;
    const scene = getScene();
    if (state.lineIndex + 1 < scene.lines.length) {
      snapshot(); state.lineIndex++;
      sceneHandlers.dialogue(scene); persist();
    } else if (scene.next) enterScene(scene.next);
    else showError(`У сцены ${state.sceneId} не указан следующий переход.`);
    audio.cue();
  }
  function createSceneCard(kicker,heading,description) {
    const card = element('div','scene-card');
    if (kicker) card.append(element('span','scene-kicker',kicker));
    if (heading) card.append(element('h2','',heading));
    if (description) card.append(element('p','',description));
    dom.sceneSheet.replaceChildren(card);
    return card;
  }

  /* Реестр типов сцен — расширяется новым ключом и обработчиком. */
  const sceneHandlers = {
    dialogue(scene) {
      if (!scene.lines?.[state.lineIndex]) return showError(`Отсутствует реплика ${state.lineIndex} в сцене ${state.sceneId}`);
      const line = scene.lines[state.lineIndex];
      if (line.background) setSceneBackground(line.background);
      renderCharacters(scene,line);
      $('dialogue-frame').classList.toggle('is-thought',Boolean(line.thought));
      const speaker = line.speaker ? currentStory.characters[line.speaker] : null;
      $('speaker-name').textContent = line.thought ? 'Мысли' : speaker?.name || 'Рассказчик';
      $('speaker-name').style.color = speaker?.color || '';
      const key = `${state.chapterId}/${state.sceneId}/${state.lineIndex}`;
      recordLog('line',speaker?.name || (line.thought ? 'Мысли' : 'Рассказчик'),line.text,key);
      typeLine(line.text);
      dom.gameBack.disabled = !canBack();
      persist();
    },
    choice(scene) {
      const card = createSceneCard('✧ ТВОЙ ВЫБОР',scene.question || 'Как поступить?',scene.description);
      const list = element('div','option-list');
      let count = 0;
      scene.options.forEach(option => {
        const unlocked = checkCondition(option.when);
        if (!unlocked && option.hidden) return;
        count++;
        const button = makeButton(option.text,'choose-option','choice-option',{id:option.id});
        if (!unlocked) {
          button.disabled = true;
          button.append(element('span','locked-note',option.locked || '🔒'));
        }
        list.append(button);
      });
      if (!count) list.append(element('p','empty-state','Нет доступных вариантов. Проверьте условия сценария.'));
      card.append(list);
    },
    outfit(scene) {
      if (!state.interactive || state.interactive.sceneId !== state.sceneId) state.interactive = { type:'outfit',sceneId:state.sceneId,index:0 };
      const index = Math.min(state.interactive.index,scene.outfits.length - 1);
      const outfit = scene.outfits[index];
      const card = createSceneCard('♛ ГАРДЕРОБ',scene.title,scene.description);
      const preview = element('div','outfit-preview');
      preview.style.setProperty('--outfit-glow',outfit.color || '#87618d');
      preview.append(element('span','outfit-icon',outfit.symbol || '♛'));
      attachImage(preview,outfit.image,'outfit-image');
      add(preview,element('strong','',outfit.name),element('p','',outfit.description || ''));
      card.append(preview);
      card.append(createCarouselControls(index,scene.outfits.length,'outfit-prev','outfit-next'));
      card.append(makeButton('Надеть этот наряд','outfit-confirm','btn btn-primary'));
      persist();
    },
    gallery(scene) {
      if (!state.interactive || state.interactive.sceneId !== state.sceneId) state.interactive = { type:'gallery',sceneId:state.sceneId,index:0 };
      const index = Math.min(state.interactive.index,scene.photos.length - 1);
      const photo = scene.photos[index];
      const card = createSceneCard('✧ АЛЬБОМ',scene.title,scene.description);
      const open = makeButton('','gallery-zoom','',{});
      open.className = 'gallery-picture';
      open.setAttribute('aria-label','Открыть изображение на весь экран');
      open.textContent = photo.symbol || '✧';
      attachImage(open,photo.image);
      card.append(open);
      const caption = element('div','gallery-caption');
      add(caption,element('strong','',photo.title),element('p','',photo.caption || ''));
      card.append(caption);
      card.append(createCarouselControls(index,scene.photos.length,'gallery-prev','gallery-next'));
      card.append(makeButton('Закрыть альбом и продолжить','gallery-done','btn btn-primary'));
      persist();
    },
    quiz(scene) {
      if (!state.interactive || state.interactive.sceneId !== state.sceneId) {
        state.interactive = { type:'quiz',sceneId:state.sceneId,index:0,score:0,answers:[] };
      }
      const quiz = state.interactive;
      const question = scene.questions[quiz.index];
      if (!question) return showError(`Некорректный вопрос викторины: ${state.sceneId}`);
      const card = createSceneCard(`✧ ВОПРОС ${quiz.index + 1} ИЗ ${scene.questions.length}`,scene.title,question.prompt);
      const list = element('div','option-list');
      const answered = quiz.answers[quiz.index];
      question.options.forEach(option => {
        const button = makeButton(option.text,'quiz-answer','choice-option',{id:option.id});
        button.disabled = answered !== undefined;
        if (answered === option.id) button.style.borderColor = '#f5d99c';
        list.append(button);
      });
      card.append(list);
      if (answered !== undefined) {
        const right = answered === question.correct;
        card.append(element('div','quiz-feedback',right ? question.rightFeedback || 'Верно!' : question.wrongFeedback || 'Не совсем, но история продолжается.'));
        card.append(makeButton(quiz.index === scene.questions.length - 1 ? 'Узнать результат' : 'Следующий вопрос','quiz-next','btn btn-primary'));
      }
      card.append(element('p','mini-stats',`Правильных ответов: ${quiz.score}`));
      persist();
    },
    minigame(scene) {
      const handler = minigameHandlers[scene.game];
      if (!handler) return showError(`Неизвестная мини-игра «${scene.game}».`);
      handler.render(scene);
    },
    ending(scene) {
      let newlyCompleted = false;
      if (!state.completedChapters.includes(state.chapterId)) {
        state.completedChapters.push(state.chapterId); newlyCompleted = true;
      }
      if (scene.nextChapter && !state.unlockedChapters.includes(scene.nextChapter)) {
        state.unlockedChapters.push(scene.nextChapter); newlyCompleted = true;
      }
      if (scene.final && scene.endingId && !state.endings.includes(scene.endingId)) {
        state.endings.push(scene.endingId); newlyCompleted = true;
      }
      const card = createSceneCard(scene.final ? '✦ КОНЕЦ ИСТОРИИ ✦' : '✦ ГЛАВА ЗАВЕРШЕНА ✦',scene.title,scene.text);
      if (scene.image) {
        const illustration = element('div','ending-illustration',scene.symbol || '♕');
        attachImage(illustration,scene.image);
        card.prepend(illustration);
      } else card.prepend(element('span','ending-symbol',scene.symbol || '♕'));
      const actions = element('div','ending-actions');
      if (scene.nextChapter) actions.append(makeButton('Следующая глава →','start-chapter','btn btn-primary',{id:scene.nextChapter}));
      actions.append(makeButton('К выбору глав','story-detail','btn'));
      actions.append(makeButton('В каталог историй','home','btn'));
      actions.append(makeButton('Начать историю заново','reset-story','btn btn-small'));
      card.append(actions);
      if (newlyCompleted) {
        persist();
        specialEffect(scene.effect || 'confetti');
        notify(scene.final ? 'Новая концовка открыта!' : 'Следующая глава открыта!');
      }
    }
  };

  function createCarouselControls(index,total,previousAction,nextAction) {
    const row = element('div','carousel-controls');
    const previous = makeButton('‹',previousAction,'icon-button');
    previous.setAttribute('aria-label','Назад');
    const next = makeButton('›',nextAction,'icon-button');
    next.setAttribute('aria-label','Вперёд');
    previous.disabled = total <= 1; next.disabled = total <= 1;
    add(row,previous,element('span','carousel-indicator',`${index + 1} / ${total}`),next);
    return row;
  }
  function moveCarousel(change,type) {
    const scene = getScene();
    const values = type === 'outfit' ? scene.outfits : scene.photos;
    if (!values || !state.interactive) return;
    state.interactive.index = (state.interactive.index + change + values.length) % values.length;
    sceneHandlers[type](scene);
    audio.cue();
  }
  function chooseOption(optionId) {
    const scene = getScene();
    if (scene?.type !== 'choice') return;
    const option = scene.options.find(item => item.id === optionId);
    if (!option || !checkCondition(option.when)) return;
    snapshot();
    state.decisions[state.sceneId] = option.id;
    recordLog('choice','Твой выбор',option.text);
    applyEffects(option.effects);
    enterScene(option.next,false);
  }
  function confirmOutfit() {
    const scene = getScene();
    if (scene?.type !== 'outfit' || !state.interactive) return;
    const outfit = scene.outfits[state.interactive.index];
    if (!outfit) return;
    snapshot();
    state.outfits[scene.character] = outfit.id;
    recordLog('choice','Выбран наряд',outfit.name);
    applyEffects(outfit.effects);
    applyEffects(scene.completeEffects);
    enterScene(scene.next,false);
    notify(`Выбран наряд «${outfit.name}»`);
  }
  function zoomGallery() {
    const scene = getScene();
    if (scene?.type !== 'gallery') return;
    const photo = scene.photos[state.interactive.index];
    openModal(photo.title, body => {
      if (!photo.image) return body.append(element('div','zoom-fallback',photo.symbol || '✧'));
      const fallback = element('div','zoom-fallback',photo.symbol || '✧');
      const img = element('img','zoom-image'); img.alt = photo.title; img.hidden = true;
      img.onload = () => { img.hidden = false; fallback.hidden = true; };
      img.onerror = () => { img.remove(); fallback.hidden = false; };
      img.src = photo.image;
      add(body,fallback,img,element('p','setting-note',photo.caption || ''));
    });
  }
  function answerQuiz(optionId) {
    const scene = getScene();
    if (scene?.type !== 'quiz') return;
    const quiz = state.interactive;
    if (quiz.answers[quiz.index] !== undefined) return;
    const question = scene.questions[quiz.index];
    const option = question.options.find(item => item.id === optionId);
    if (!option) return;
    snapshot();
    quiz.answers[quiz.index] = optionId;
    if (optionId === question.correct) {
      quiz.score++;
      if (scene.scoreStat) state.stats[scene.scoreStat] = (state.stats[scene.scoreStat] || 0) + 1;
      applyEffects(question.correctEffects);
    } else applyEffects(question.wrongEffects);
    applyEffects(option.effects);
    recordLog('choice','Ответ на вопрос',option.text);
    sceneHandlers.quiz(scene);
    audio.cue('choice');
  }
  function nextQuiz() {
    const scene = getScene();
    if (scene?.type !== 'quiz') return;
    const quiz = state.interactive;
    if (quiz.answers[quiz.index] === undefined) return;
    if (quiz.index + 1 < scene.questions.length) {
      quiz.index++; sceneHandlers.quiz(scene); persist();
    } else {
      const destination = quiz.score >= (scene.passScore ?? scene.questions.length) ? scene.passNext : scene.failNext;
      snapshot(); applyEffects(scene.completeEffects);
      enterScene(destination || scene.next,false);
    }
  }

  /* Подключаемые мини-игры: добавьте новый ключ с render/handle. */
  const minigameHandlers = {
    pairs: {
      render(scene) {
        if (!state.interactive || state.interactive.sceneId !== state.sceneId) {
          const deck = scene.pairs.flatMap(pair => [{pairId:pair.id,copy:1},{pairId:pair.id,copy:2}]);
          for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i],deck[j]] = [deck[j],deck[i]];
          }
          state.interactive = { type:'minigame',sceneId:state.sceneId,deck,matched:[],moves:0 };
        }
        const game = state.interactive;
        const card = createSceneCard('✧ ВОЛШЕБНАЯ ИГРА',scene.title,scene.description);
        const grid = element('div','memory-grid');
        game.deck.forEach((tile,index) => {
          const opened = temporary.opened.includes(index) || game.matched.includes(tile.pairId);
          const match = game.matched.includes(tile.pairId);
          const button = makeButton('','pair-flip',`memory-tile${opened ? ' is-open' : ''}${match ? ' is-matched' : ''}`,{index});
          const pair = scene.pairs.find(item => item.id === tile.pairId);
          button.disabled = match || opened || temporary.pairLock;
          button.setAttribute('aria-label',opened ? `Открыта: ${pair.label || pair.id}` : `Перевернуть карту ${index + 1}`);
          if (opened) {
            if (pair.image) {
              const fallback = element('span','',pair.label || '✦'); button.append(fallback);
              const img = attachImage(button,pair.image,'tile-image');
              if (img) { img.onload = () => { img.hidden = false; fallback.hidden = true; }; }
            } else button.textContent = pair.label || pair.id;
          } else button.append(element('span','tile-back','✧'));
          grid.append(button);
        });
        card.append(grid);
        card.append(element('p','mini-stats',`Найдено пар: ${game.matched.length} / ${scene.pairs.length} · Ходов: ${game.moves}`));
        if (game.matched.length === scene.pairs.length) {
          card.append(element('div','quiz-feedback','Все звёзды нашли свою пару!'));
          card.append(makeButton('Продолжить историю','pair-done','btn btn-primary'));
        }
        persist();
      },
      handle(index) {
        const scene = getScene();
        if (scene?.type !== 'minigame' || temporary.pairLock) return;
        const game = state.interactive;
        const tile = game.deck[index];
        if (!tile || game.matched.includes(tile.pairId) || temporary.opened.includes(index)) return;
        temporary.opened.push(index);
        audio.cue();
        if (temporary.opened.length === 2) {
          game.moves++;
          const [first,second] = temporary.opened.map(i => game.deck[i]);
          if (first.pairId === second.pairId) {
            game.matched.push(first.pairId);
            temporary.opened = [];
            this.render(scene);
            if (game.matched.length === scene.pairs.length) specialEffect('sparkles');
          } else {
            temporary.pairLock = true;
            this.render(scene);
            setTimeout(() => {
              if (state?.interactive !== game || getScene() !== scene) return;
              temporary.opened = []; temporary.pairLock = false;
              if (activeScreen === 'game') this.render(scene);
            },700);
          }
        } else this.render(scene);
      }
    }
  };
  function finishPairs() {
    const scene = getScene();
    if (scene?.type !== 'minigame' || scene.game !== 'pairs') return;
    if (state.interactive.matched.length !== scene.pairs.length) return;
    snapshot(); applyEffects(scene.completeEffects);
    enterScene(scene.next,false);
  }

  /* Настройки, журнал, сохранения и доступные с клавиатуры окна */
  function openModal(title,builder) {
    if (!dom.modal.hidden) closeModal();
    previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    $('modal-title').textContent = title;
    dom.modalBody.replaceChildren();
    builder(dom.modalBody);
    dom.modal.hidden = false;
    document.body.classList.add('modal-open');
    dom.modal.querySelector('.modal-panel').focus();
  }
  function closeModal() {
    if (dom.modal.hidden) return;
    dom.modal.hidden = true;
    document.body.classList.remove('modal-open');
    dom.modalBody.replaceChildren();
    pendingConfirm = null;
    if (previouslyFocused?.isConnected) previouslyFocused.focus();
    previouslyFocused = null;
  }
  function confirmAction(title,text,action) {
    openModal(title,body => {
      body.append(element('p','',text));
      const actions = element('div','modal-actions');
      add(actions,makeButton('Подтвердить','confirm-yes','btn btn-danger'),makeButton('Отмена','close-modal','btn'));
      body.append(actions);
    });
    pendingConfirm = action;
  }
  function openPause() {
    if (activeScreen !== 'game') return;
    finishTyping();
    openModal('Игровое меню',body => {
      const actions = element('div','modal-actions');
      add(actions,makeButton('▶ Продолжить','close-modal','btn btn-primary'),
        makeButton('Сохранить или загрузить','saves','btn'),
        makeButton('История диалогов','history','btn'),
        makeButton('Настройки','settings','btn'),
        makeButton('К выбору глав','story-detail','btn'),
        makeButton('В главное меню','home','btn'));
      body.append(actions);
    });
  }
  function openHistory() {
    if (!state) return;
    finishTyping();
    openModal('История диалогов',body => {
      if (!state.log.length) return body.append(element('p','empty-state','Пока нет прочитанных реплик.'));
      state.log.slice(-80).forEach(line => {
        const item = element('article','log-entry');
        add(item,element('strong','',line.name),element('p','',line.text));
        body.append(item);
      });
      body.scrollTop = body.scrollHeight;
    });
  }
  function settingRow(label,control) {
    const row = element('div','setting-row');
    const title = element('label','',label);
    if (control.id) title.htmlFor = control.id;
    add(row,title,control);
    return row;
  }
  function toggleSetting(key,label) {
    const box = element('input');
    box.type = 'checkbox'; box.checked = settings[key];
    box.id = `setting-${key}`; box.dataset.setting = key;
    return settingRow(label,box);
  }
  function openSettings() {
    finishTyping();
    openModal('Настройки',body => {
      body.append(toggleSetting('music','Фоновая музыка'),toggleSetting('sounds','Звуки интерфейса'));
      const slider = element('input');
      slider.id = 'setting-volume'; slider.type = 'range';
      slider.min = '0'; slider.max = '100'; slider.step = '5';
      slider.value = String(settings.volume); slider.dataset.setting = 'volume';
      body.append(settingRow('Громкость',slider));
      body.append(toggleSetting('typewriter','Появление текста по буквам'));
      const select = element('select');
      select.id = 'setting-typingSpeed'; select.dataset.setting = 'typingSpeed';
      for (const [speed,name] of [[0,'Мгновенно'],[15,'Быстро'],[28,'Обычно'],[45,'Медленно'],[70,'Очень медленно']]) {
        const option = element('option','',name);
        option.value = String(speed);
        option.selected = settings.typingSpeed === speed;
        select.append(option);
      }
      body.append(settingRow('Скорость текста',select),toggleSetting('reduceEffects','Уменьшить декоративные эффекты'));
      body.append(element('p','setting-note','Музыка начнётся только после взаимодействия с игрой, если указан аудиофайл. Настройки хранятся в этом браузере.'));
      body.append(makeButton('Сбросить настройки','reset-settings','btn'));
    });
  }
  function openSaves() {
    if (!currentStory || !state) return;
    finishTyping();
    openModal('Сохранения',body => {
      const items = [{slot:'auto',title:'Автосохранение'}];
      for (let i = 1; i <= GAME_CONFIG.saveSlots; i++) items.push({slot:String(i),title:`Слот ${i}`});
      items.forEach(item => {
        const saved = readState(currentStory,item.slot);
        const chapter = saved ? currentStory.chapters.find(ch => ch.id === saved.chapterId) : null;
        const row = element('div','save-row');
        add(row,element('strong','',item.title),element('small','',saved ? `${chapter?.title || 'Глава'} · ${new Date(saved.updatedAt || Date.now()).toLocaleString('ru-RU')}` : 'Пусто'));
        const actions = element('div','save-actions');
        if (item.slot !== 'auto') actions.append(makeButton(saved ? 'Перезаписать' : 'Сохранить','save-slot','btn btn-small',{slot:item.slot}));
        const load = makeButton('Загрузить','load-slot','btn btn-small',{slot:item.slot});
        load.disabled = !saved; actions.append(load);
        if (saved && item.slot !== 'auto') actions.append(makeButton('Удалить','delete-slot','btn btn-small btn-danger',{slot:item.slot}));
        row.append(actions); body.append(row);
      });
      body.append(element('p','setting-note','Автосохранение создаётся при переходах и действиях. Слоты принадлежат только текущей истории.'));
    });
  }
  function saveToSlot(slot) {
    if (!state || slot === 'auto') return;
    if (safeWrite(saveKey(currentStory.id,slot),{...clone(state),updatedAt:Date.now()})) notify(`Сохранено в слот ${slot}`);
    openSaves();
  }
  function loadFromSlot(slot) {
    if (!currentStory) return;
    const saved = readState(currentStory,slot);
    if (!saved) { notify('Сохранение отсутствует или повреждено'); return openSaves(); }
    state = clone(saved);
    temporary.opened = []; temporary.pairLock = false;
    closeModal();
    if (state.sceneId) {
      renderGame(); persist();
      notify('Прохождение восстановлено');
    } else openStory(currentStory.id);
  }
  function deleteSlot(slot) {
    if (slot === 'auto') return;
    confirmAction('Удалить сохранение?',`Удалить слот ${slot}? Это действие нельзя отменить.`,() => {
      safeRemove(saveKey(currentStory.id,slot));
      openSaves(); notify('Сохранение удалено');
    });
  }

  /* Декоративные эффекты — не влияют на прохождение */
  function specialEffect(type) {
    if (settings.reduceEffects || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (type === 'flash' || type === 'fade') {
      const flash = element('div',`flash-effect${type === 'fade' ? ' is-dark' : ''}`);
      dom.effectLayer.append(flash);
      setTimeout(() => flash.remove(),750);
      return;
    }
    if (type === 'fireworks') {
      for (let i = 0; i < 24; i++) {
        const spark = element('span','firework-spark','✦');
        const angle = i * (360 / 12);
        spark.style.left = `${i < 12 ? 30 : 70}%`;
        spark.style.top = `${i < 12 ? 29 : 45}%`;
        spark.style.setProperty('--angle',`${angle}deg`);
        spark.style.animationDelay = `${i < 12 ? 0 : .35}s`;
        dom.effectLayer.append(spark);
        setTimeout(() => spark.remove(),1500);
      }
      return;
    }
    const symbols = type === 'hearts' ? ['♥','♡','✧'] : type === 'confetti' ? ['✦','❀','✧','♥','◆'] : ['✧','✦','⋆'];
    for (let i = 0; i < 26; i++) {
      const piece = element('span','magic-piece',symbols[i % symbols.length]);
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.top = `${-5 - Math.random() * 34}%`;
      piece.style.fontSize = `${12 + Math.random() * 18}px`;
      piece.style.setProperty('--drift',`${Math.random() * 140 - 70}px`);
      piece.style.setProperty('--fall-time',`${1.9 + Math.random() * 1.6}s`);
      piece.style.animationDelay = `${Math.random() * .7}s`;
      dom.effectLayer.append(piece);
      setTimeout(() => piece.remove(),4400);
    }
  }

  /* Одна точка обработки всех кнопок; никаких обработчиков на каждый рендер */
  function handleAction(action, button) {
    const id = button?.dataset.id;
    const slot = button?.dataset.slot;
    switch (action) {
      case 'home': openHome(); break;
      case 'open-story': openStory(id); break;
      case 'story-detail': if (currentStory) openStory(currentStory.id); break;
      case 'start-chapter': closeModal(); beginChapter(id); break;
      case 'continue': resume(); break;
      case 'next': advanceDialogue(); break;
      case 'pause': openPause(); break;
      case 'back': restorePrevious(); break;
      case 'settings': openSettings(); break;
      case 'history': openHistory(); break;
      case 'saves': openSaves(); break;
      case 'close-modal': closeModal(); break;
      case 'reset-story': confirmAction('Начать заново?',`Весь прогресс истории «${currentStory?.title || ''}», её концовки и ручные сохранения будут удалены.`,resetCurrentStory); break;
      case 'reset-settings':
        confirmAction('Сбросить настройки?','Вернуть стандартные значения музыки, звуков и скорости текста?',() => {
          settings = clone(GAME_CONFIG.defaultSettings); applySettings(); openSettings();
        });
        break;
      case 'confirm-yes': {
        const callback = pendingConfirm;
        closeModal();
        if (callback) callback();
        break;
      }
      case 'save-slot':
        if (readState(currentStory,slot)) confirmAction('Перезаписать слот?',`Заменить содержимое слота ${slot} текущим прохождением?`,() => saveToSlot(slot));
        else saveToSlot(slot);
        break;
      case 'load-slot':
        confirmAction('Загрузить игру?',`Несохранённый текущий прогресс будет заменён данными слота ${slot === 'auto' ? 'автосохранения' : slot}.`,() => loadFromSlot(slot));
        break;
      case 'delete-slot': deleteSlot(slot); break;
      case 'choose-option': chooseOption(id); break;
      case 'outfit-prev': moveCarousel(-1,'outfit'); break;
      case 'outfit-next': moveCarousel(1,'outfit'); break;
      case 'outfit-confirm': confirmOutfit(); break;
      case 'gallery-prev': moveCarousel(-1,'gallery'); break;
      case 'gallery-next': moveCarousel(1,'gallery'); break;
      case 'gallery-zoom': zoomGallery(); break;
      case 'gallery-done': snapshot(); enterScene(getScene().next,false); break;
      case 'quiz-answer': answerQuiz(id); break;
      case 'quiz-next': nextQuiz(); break;
      case 'pair-flip': minigameHandlers.pairs.handle(Number(button.dataset.index)); break;
      case 'pair-done': finishPairs(); break;
      default: console.warn('[Интерфейс] Неизвестное действие:',action);
    }
  }
  function bindEvents() {
    document.addEventListener('click',event => {
      const actionElement = event.target.closest('[data-action]');
      if (actionElement) {
        if (actionElement.disabled) return;
        audio.unlock();
        try { handleAction(actionElement.dataset.action,actionElement); }
        catch (err) { console.error(err); showError(`Ошибка действия: ${err.message}`); }
        return;
      }
      if (activeScreen === 'game' && dom.modal.hidden && !dom.dialogueDock.hidden
          && event.target.closest('#dialogue-frame')) advanceDialogue();
    });
    document.addEventListener('input',event => {
      const key = event.target.dataset.setting;
      if (!key) return;
      if (key === 'volume') {
        settings.volume = Math.max(0,Math.min(100,Number(event.target.value)));
        applySettings();
      }
    });
    document.addEventListener('change',event => {
      const key = event.target.dataset.setting;
      if (!key) return;
      if (event.target.type === 'checkbox') settings[key] = event.target.checked;
      else if (key === 'typingSpeed') settings[key] = Number(event.target.value);
      else if (key === 'volume') settings[key] = Number(event.target.value);
      applySettings();
    });
    document.addEventListener('keydown',event => {
      if (!dom.modal.hidden) {
        if (event.key === 'Escape') { closeModal(); event.preventDefault(); return; }
        if (event.key === 'Tab') {
          const focusable = [...dom.modal.querySelectorAll('button:not(:disabled),input,select,[tabindex="0"]')].filter(el => !el.hidden && el.offsetParent !== null);
          if (!focusable.length) return;
          const first = focusable[0], last = focusable.at(-1);
          if (event.shiftKey && (document.activeElement === first || document.activeElement === dom.modal.querySelector('.modal-panel'))) {
            last.focus(); event.preventDefault();
          } else if (!event.shiftKey && document.activeElement === last) { first.focus(); event.preventDefault(); }
        }
        return;
      }
      if (activeScreen !== 'game') return;
      if (event.key === 'Escape') { openPause(); event.preventDefault(); return; }
      const target = document.activeElement;
      if (target?.matches('button,input,select,textarea,a,[contenteditable="true"]')) return;
      if (event.key === 'ArrowLeft') { restorePrevious(); event.preventDefault(); }
      else if (['Enter',' ','ArrowRight'].includes(event.key) && getScene()?.type === 'dialogue') {
        advanceDialogue(); event.preventDefault();
      }
    });
    window.addEventListener('pagehide',() => { if (state) persist(); });
  }

  /* Диагностика сценариев. Запуск: NovelDebug.validateStories() в консоли. */
  function validateStories() {
    const problems = [];
    const seenStories = new Set();
    const supported = new Set(Object.keys(sceneHandlers));
    const report = (story,place,message,severity='warn') => {
      problems.push({ severity,story:story.id,place,message });
      console[severity === 'error' ? 'error' : 'warn'](`[Сценарий: ${story.title}] ${place}: ${message}`);
    };
    for (const story of STORY_LIBRARY) {
      if (!story.id || seenStories.has(story.id)) report(story,'id','Неуникальный либо пустой ID истории','error');
      seenStories.add(story.id);
      if (!story.title || !story.chapters?.length || !story.scenes || !story.characters) {
        report(story,'основа','Отсутствует название, главы, сцены или персонажи','error');
        continue;
      }
      const sceneIds = Object.keys(story.scenes);
      const chapterIds = new Set();
      const edges = new Map(sceneIds.map(id => [id,[]]));
      const addEdge = (from,to) => {
        if (!to) return;
        if (!story.scenes[to]) report(story,from,`Переход в отсутствующую сцену «${to}»`,'error');
        else edges.get(from).push(to);
      };
      for (const chapter of story.chapters) {
        if (chapterIds.has(chapter.id)) report(story,chapter.id,'Повтор ID главы','error');
        chapterIds.add(chapter.id);
        if (!story.scenes[chapter.start]) report(story,chapter.id,`Нет стартовой сцены «${chapter.start}»`,'error');
      }
      for (const [id,scene] of Object.entries(story.scenes)) {
        if (!scene || typeof scene !== 'object') { report(story,id,'Сцена не является объектом','error'); continue; }
        if (scene.id && scene.id !== id) report(story,id,'Поле id не соответствует ключу сцены','warn');
        if (!supported.has(scene.type)) { report(story,id,`Неизвестный тип «${scene.type}»`,'error'); continue; }
        if (scene.cast) for (const entry of scene.cast) {
          const charId = typeof entry === 'string' ? entry : entry.id;
          if (!story.characters[charId]) report(story,id,`Неизвестный персонаж в cast: «${charId}»`,'error');
        }
        if (scene.type === 'dialogue') {
          if (!Array.isArray(scene.lines) || !scene.lines.length) report(story,id,'Нет реплик','error');
          for (const line of scene.lines || []) {
            if (typeof line.text !== 'string') report(story,id,'Реплика без text','error');
            if (line.speaker && !story.characters[line.speaker]) report(story,id,`Неизвестный speaker «${line.speaker}»`,'error');
          }
        }
        if (scene.type === 'choice') {
          if (!scene.options?.length) report(story,id,'Не указаны варианты выбора','error');
          const keys = new Set();
          for (const option of scene.options || []) {
            if (!option.id || !option.text || !option.next) report(story,id,'Неполный вариант выбора','error');
            if (keys.has(option.id)) report(story,id,`Повтор варианта «${option.id}»`,'error');
            keys.add(option.id); addEdge(id,option.next);
          }
        }
        if (scene.type === 'outfit') {
          if (!story.characters[scene.character]) report(story,id,'Неизвестный персонаж для одежды','error');
          if (!scene.outfits?.length || scene.outfits.some(o => !o.id || !o.name)) report(story,id,'Нет корректных нарядов','error');
        }
        if (scene.type === 'gallery' && (!scene.photos?.length || scene.photos.some(p => !p.title))) report(story,id,'Нет корректных фотографий','error');
        if (scene.type === 'quiz') {
          if (!scene.questions?.length) report(story,id,'Нет вопросов викторины','error');
          for (const q of scene.questions || []) {
            if (!q.prompt || !q.options?.length || !q.options.some(o => o.id === q.correct)) report(story,id,'Неверный вопрос, варианты или правильный ответ','error');
          }
          addEdge(id,scene.passNext); addEdge(id,scene.failNext);
          if (!scene.passNext && !scene.failNext && !scene.next) report(story,id,'Не указан переход после викторины','error');
        }
        if (scene.type === 'minigame') {
          if (!minigameHandlers[scene.game]) report(story,id,'Нет обработчика мини-игры','error');
          if (scene.game === 'pairs' && (!scene.pairs?.length || new Set(scene.pairs.map(p => p.id)).size !== scene.pairs.length)) report(story,id,'Пары отсутствуют либо повторяют ID','error');
        }
        if (scene.type === 'ending') {
          if (!scene.title || !scene.text) report(story,id,'Концовка без названия или текста','error');
          if (scene.nextChapter && !chapterIds.has(scene.nextChapter)) {
            // chapterIds дополняется по всему циклу глав выше
            report(story,id,`Следующая глава «${scene.nextChapter}» отсутствует`,'error');
          }
        } else if (!scene.next && !['choice','quiz'].includes(scene.type)) report(story,id,'Тупик: нет next','error');
        addEdge(id,scene.next);
      }
      const reachable = new Set();
      const visit = id => {
        if (!story.scenes[id] || reachable.has(id)) return;
        reachable.add(id);
        for (const next of edges.get(id) || []) visit(next);
      };
      for (const chapter of story.chapters) visit(chapter.start);
      for (const id of sceneIds) if (!reachable.has(id)) report(story,id,'Возможно недостижимая сцена');
      if (![...reachable].some(id => story.scenes[id]?.type === 'ending')) report(story,'граф','Нет достижимой финальной сцены','error');
      // Узлы, из которых вообще существует путь к концовке (циклы сами по себе допустимы).
      const endingReachable = new Set(sceneIds.filter(id => story.scenes[id]?.type === 'ending'));
      let expanded = true;
      while (expanded) {
        expanded = false;
        for (const [id,following] of edges) {
          if (!endingReachable.has(id) && following.some(next => endingReachable.has(next))) {
            endingReachable.add(id); expanded = true;
          }
        }
      }
      for (const id of reachable) {
        if (!endingReachable.has(id)) report(story,id,'Тупиковая ветка либо цикл без пути к концовке');
      }
      // Проверяем достижимость хотя бы одного финала из каждой стартовой сцены.
      for (const chapter of story.chapters) {
        const visited = new Set();
        const stack = [chapter.start];
        let endingFound = false;
        while (stack.length && !endingFound) {
          const id = stack.pop();
          if (visited.has(id)) continue;
          visited.add(id);
          if (story.scenes[id]?.type === 'ending') endingFound = true;
          else stack.push(...(edges.get(id) || []));
        }
        if (!endingFound) report(story,chapter.id,'Из главы не достижима ни одна концовка','error');
      }
    }
    if (!problems.length) console.info('[Сценарии] Проверка завершена: ошибок и предупреждений нет.');
    else console.info(`[Сценарии] Проверено. Замечаний: ${problems.length}.`);
    return problems;
  }

  // Только безопасные диагностические инструменты доступны из консоли.
  window.NovelDebug = Object.freeze({ validateStories, showProgress: () => state ? clone(state) : null });

  try {
    bindEvents();
    document.body.classList.toggle('reduce-effects',settings.reduceEffects);
    validateStories();
    openHome();
  } catch (error) { showError(`Ошибка запуска: ${error.message}`); }
})();
