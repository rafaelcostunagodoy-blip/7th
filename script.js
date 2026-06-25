const relationshipStart = new Date("2025-12-25T00:00:00+08:00");

const timelineMemories = [
  {
    month: "Month 1",
    title: "The Beginning",
    text: "The first chapter of us, when everything felt new, soft, and beautifully possible."
  },
  {
    month: "Month 2",
    title: "Closer Every Day",
    text: "We learned each other's little rhythms and started feeling even more like home."
  },
  {
    month: "Month 3",
    title: "Favorite Habits",
    text: "Your laugh, your stories, your gentle ways became the sweetest parts of my routine."
  },
  {
    month: "Month 4",
    title: "More Than Magic",
    text: "We made memories that still glow whenever I think about them."
  },
  {
    month: "Month 5",
    title: "Us, Stronger",
    text: "Every day proved that loving you is both peaceful and exciting."
  },
  {
    month: "Month 6",
    title: "Our Monthsary",
    text: "Six months in, and my heart still chooses you in every tiny moment."
  }
];

const timelinePhotos = [
  "month1.png",
  "month2.png",
  "month3.png",
  "month4.png",
  "month5.png",
  "month6.png"
];

const galleryItems = [
  ["SC 1", "A photo for your favorite memories."],
  ["SC 2", "A memory that felt wrapped in lavender light."],
  ["SC 3", "The kind of moment I want to keep forever."],
  ["SC 4", "Proof that anywhere is special when I am with you."],
  ["SC 5", "A snapshot that still feels warm in my heart."],
  ["SC 6", "A place for our newest favorite memory."]
];

const galleryPhotos = [
  "sc1.png",
  "sc2.png",
  "sc3.png",
  "sc4.png",
  "sc5.png",
  "sc6.png"
];

const reasons = [
  "You make ordinary days feel precious.",
  "Your laugh makes my whole heart lighter.",
  "You listen in a way that makes me feel safe.",
  "You turn tiny moments into memories.",
  "Your kindness is one of my favorite things.",
  "I love the way you care.",
  "You make love feel peaceful.",
  "You are beautiful in every mood.",
  "You make me excited for tomorrow.",
  "You feel like home.",
  "You understand the quiet parts of me.",
  "You make me want to be better.",
  "Your smile stays with me all day.",
  "You are my favorite notification.",
  "You make every goodbye harder.",
  "You are soft, strong, and magical.",
  "You make my world brighter.",
  "You are my calm in busy days.",
  "You make six months feel like a dream.",
  "I love you simply because you are you."
];

const jarMessages = [
  "I would choose you in every version of every day.",
  "Your love is the softest place I know.",
  "Six months with you feels like a beautiful beginning.",
  "You are my favorite reason to smile.",
  "I love the way your presence changes the whole room.",
  "You make my heart feel brave and tender at the same time.",
  "Every memory with you becomes a little treasure.",
  "I am grateful for you in ways words keep trying to catch up to.",
  "You make forever feel warm instead of far away.",
  "My favorite story is still the one where I get to love you."
];

const gardenMessages = [
  "You make my heart bloom without even trying.",
  "Every yellow bell is a tiny thank you for loving me.",
  "My favorite place is anywhere your hand is close to mine.",
  "You are the gentle magic in my everyday life.",
  "I keep finding new reasons to fall for you.",
  "You make love feel golden, soft, and real.",
  "You are the sweetest chapter I never want to end.",
  "I adore the little world we are growing together.",
  "You are my today, my tomorrow, and my always."
];

const futurePlans = [
  {
    title: "More dates",
    icon: "♡",
    text: "Soft little plans, pretty outfits, and tables where we can talk for hours."
  },
  {
    title: "More adventures",
    icon: "✦",
    text: "New places, tiny surprises, and stories we will keep retelling."
  },
  {
    title: "Travel together",
    icon: "✧",
    text: "Suitcases, window seats, and a world that feels sweeter beside you."
  },
  {
    title: "Movie marathons",
    icon: "♥",
    text: "Blankets, snacks, sleepy smiles, and one more episode because it is us."
  },
  {
    title: "Matching outfits",
    icon: "♡",
    text: "Cute colors, shared details, and photos that feel like little love notes."
  },
  {
    title: "Growing together",
    icon: "✦",
    text: "Choosing patience, laughter, and the kind of love that keeps becoming deeper."
  },
  {
    title: "Forever together",
    icon: "♥",
    text: "Every month after this, every season after that, still choosing each other."
  }
];

let audioContext;
let musicTimer;
let musicPlaying = false;

function storageKey(key) {
  return `sixMonthsary:${key}`;
}

function saveText(key, value) {
  localStorage.setItem(storageKey(key), value);
}

function loadText(key, fallback) {
  return localStorage.getItem(storageKey(key)) ?? fallback;
}

function formatNumber(value) {
  return String(value).padStart(2, "0");
}

function addMonths(date, months) {
  const next = new Date(date);
  const originalDay = next.getDate();
  next.setMonth(next.getMonth() + months);

  if (next.getDate() !== originalDay) {
    next.setDate(0);
  }

  return next;
}

function getRelationshipParts(start, now) {
  let months = 0;

  while (addMonths(start, months + 1) <= now) {
    months += 1;
  }

  const cursor = addMonths(start, months);
  let remaining = Math.max(0, now - cursor);

  const weeks = Math.floor(remaining / (7 * 24 * 60 * 60 * 1000));
  remaining -= weeks * 7 * 24 * 60 * 60 * 1000;

  const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
  remaining -= days * 24 * 60 * 60 * 1000;

  const hours = Math.floor(remaining / (60 * 60 * 1000));
  remaining -= hours * 60 * 60 * 1000;

  const minutes = Math.floor(remaining / (60 * 1000));
  remaining -= minutes * 60 * 1000;

  const seconds = Math.floor(remaining / 1000);

  const displayMonths = months + 1;

return {
  months: displayMonths,
  weeks,
  days,
  hours,
  minutes,
  seconds
};
}

function updateCountdown() {
  const parts = getRelationshipParts(relationshipStart, new Date());

  Object.entries(parts).forEach(([key, value]) => {
    const element = document.getElementById(key);

    if (element) {
      element.textContent = key === "months" ? value : formatNumber(value);
    }
  });
}

function setupLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;

  const hideLoader = () => {
    setTimeout(() => {
      loader.classList.add("is-hidden");
    }, 1200);
  };

  if (document.readyState === "complete") {
    hideLoader();
  } else {
    window.addEventListener("load", hideLoader, { once: true });
  }

  setTimeout(() => {
    loader.classList.add("is-hidden");
  }, 2800);
}

function setupReveals() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function setupEditableText() {
  document.querySelectorAll("[contenteditable][data-save-key]").forEach((element) => {
    const key = element.dataset.saveKey;
    element.textContent = loadText(key, element.textContent.trim());

    element.addEventListener("blur", () => saveText(key, element.textContent.trim()));
  });

  document.querySelectorAll("[data-save-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.saveTarget;
      const target = document.querySelector(`[data-save-key="${key}"]`);

      if (!target) return;

      saveText(key, target.textContent.trim());
      button.textContent = "Saved";

      setTimeout(() => {
        button.textContent = "Save Letter";
      }, 1200);
    });
  });
}

function renderTimeline() {
  const timeline = document.getElementById("timelineList");
  if (!timeline) return;

  timelineMemories.forEach((item, index) => {
    const key = `timeline-${index}`;
    const photoSrc = timelinePhotos[index] || "";

    const article = document.createElement("article");
    article.className = "timeline-item reveal";

    const photoSlot = document.createElement("div");
    photoSlot.className = "photo-slot has-image";
    
    const image = document.createElement("img");
    image.src = photoSrc;
    image.alt = `${item.month} photo`;
    image.loading = "lazy";
    photoSlot.appendChild(image);

    const copy = document.createElement("div");
    copy.className = "timeline-copy";
    copy.innerHTML = `
      <h3>${item.month}</h3>
      <p class="editable" contenteditable="true" data-save-key="${key}">${loadText(key, item.text)}</p>
    `;

    article.append(photoSlot, copy);
    timeline.appendChild(article);
  });
}

function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  galleryItems.forEach(([title, caption], index) => {
    const captionKey = `gallery-caption-${index}`;
    const photoSrc = galleryPhotos[index] || "";
    const card = document.createElement("article");
    card.className = "scrap-card reveal";

    const photoSlot = document.createElement("div");
    photoSlot.className = "photo-slot has-image";
    
    const image = document.createElement("img");
    image.src = photoSrc;
    image.alt = `${title} scrapbook photo`;
    image.loading = "lazy";
    photoSlot.appendChild(image);

    const heading = document.createElement("h3");
    heading.textContent = title;

    const text = document.createElement("p");
    text.className = "editable";
    text.contentEditable = "true";
    text.dataset.saveKey = captionKey;
    text.textContent = loadText(captionKey, caption);

    card.append(photoSlot, heading, text);
    grid.appendChild(card);
  });
}

function renderReasons() {
  const grid = document.getElementById("reasonsGrid");
  if (!grid) return;

  reasons.forEach((reason, index) => {
    const key = `reason-${index}`;
    const card = document.createElement("article");
    card.className = "flip-card reveal";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Reason I Love You ${index + 1}`);
    card.innerHTML = `
      <span class="flip-inner">
        <span class="flip-face flip-front">
          <strong>Reason ${index + 1}</strong>
        </span>
        <span class="flip-face flip-back">
          <span class="reason-text editable" contenteditable="true" data-save-key="${key}">${loadText(key, reason)}</span>
        </span>
      </span>
    `;

    card.addEventListener("click", (event) => {
      if (event.target.closest("[contenteditable='true']")) return;
      card.classList.toggle("is-flipped");
    });

    card.addEventListener("keydown", (event) => {
      if (event.target.closest("[contenteditable='true']")) return;

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.classList.toggle("is-flipped");
      }
    });

    grid.appendChild(card);
  });
}

function renderGarden() {
  const garden = document.getElementById("gardenBed");
  const message = document.getElementById("gardenMessage");
  if (!garden || !message) return;

  gardenMessages.forEach((text, index) => {
    const button = document.createElement("button");
    button.className = "flower-button";
    button.type = "button";
    button.setAttribute("aria-label", `Yellow bell flower ${index + 1}`);
    button.style.setProperty("--delay", `${index * -0.3}s`);
    button.innerHTML = `<span class="flower"><span class="bell"></span></span>`;

    button.addEventListener("click", () => {
      message.textContent = text;
      message.animate(
        [
          { opacity: 0, transform: "translateY(10px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        { duration: 360, easing: "ease-out" }
      );
    });

    garden.appendChild(button);
  });
}

function renderFuturePlans() {
  const grid = document.getElementById("futurePlansGrid");
  if (!grid) return;

  futurePlans.forEach((plan, index) => {
    const titleKey = `future-plan-title-${index}`;
    const textKey = `future-plan-text-${index}`;
    const card = document.createElement("article");
    card.className = "future-card reveal";
    card.innerHTML = `
      <span class="future-icon" aria-hidden="true">${plan.icon}</span>
      <h3 class="editable" contenteditable="true" data-save-key="${titleKey}">${loadText(titleKey, plan.title)}</h3>
      <p class="future-text editable" contenteditable="true" data-save-key="${textKey}">${loadText(textKey, plan.text)}</p>
    `;

    grid.appendChild(card);
  });
}

function setupEnvelope() {
  const envelope = document.getElementById("openEnvelope");
  const letterCard = document.getElementById("letterCard");

  if (!envelope || !letterCard) return;

  envelope.addEventListener("click", () => {
    envelope.classList.toggle("is-open");
    letterCard.classList.add("is-visible");
  });
}

function playChord(context, notes, start, duration) {
  const master = context.createGain();
  master.gain.setValueAtTime(0, start);
  master.gain.linearRampToValueAtTime(0.045, start + 0.25);
  master.gain.linearRampToValueAtTime(0.025, start + duration - 0.35);
  master.gain.linearRampToValueAtTime(0, start + duration);
  master.connect(context.destination);

  notes.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = index === 0 ? "sine" : "triangle";
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.22, start);

    oscillator.connect(gain);
    gain.connect(master);
    oscillator.start(start);
    oscillator.stop(start + duration);
  });
}

function startMusic() {
  const button = document.getElementById("startJourney");

  if (!audioContext) {
    audioContext = new AudioContext();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  if (!musicPlaying) {
    const progression = [
      [261.63, 329.63, 392.0],
      [220.0, 261.63, 349.23],
      [246.94, 293.66, 392.0],
      [196.0, 246.94, 329.63]
    ];

    let step = 0;

    const schedule = () => {
      const start = audioContext.currentTime + 0.04;
      playChord(audioContext, progression[step % progression.length], start, 3.6);
      step += 1;
    };

    schedule();
    musicTimer = setInterval(schedule, 3400);
    musicPlaying = true;
    button.querySelector("span").textContent = "Music Playing";
  }

  document.getElementById("countdown")?.scrollIntoView({ behavior: "smooth" });
}

function setupJourneyButton() {
  const button = document.getElementById("startJourney");
  if (!button) return;

  button.addEventListener("click", startMusic);
}

function setupJar() {
  const message = document.getElementById("jarMessage");
  const pickButton = document.getElementById("pickMemory");
  const addButton = document.getElementById("addMemory");
  const input = document.getElementById("newMemory");
  const noteList = document.getElementById("sweetNoteList");

  if (!message || !pickButton || !addButton || !input || !noteList) return;

  const saved = JSON.parse(localStorage.getItem(storageKey("jarMessages")) || "null");
  const messages = Array.isArray(saved) ? saved : [...jarMessages];

  const persistMessages = () => {
    localStorage.setItem(storageKey("jarMessages"), JSON.stringify(messages));
  };

  const renderSweetNotes = () => {
    noteList.innerHTML = "";

    messages.forEach((note, index) => {
      const editor = document.createElement("div");
      editor.className = "editable sweet-note-editor";
      editor.contentEditable = "true";
      editor.textContent = note;
      editor.setAttribute("aria-label", `Sweet message ${index + 1}`);

      editor.addEventListener("blur", () => {
        messages[index] = editor.textContent.trim();
        persistMessages();
      });

      noteList.appendChild(editor);
    });
  };

  renderSweetNotes();

  pickButton.addEventListener("click", () => {
    const activeMessages = messages.map((item) => item.trim()).filter(Boolean);
    if (!activeMessages.length) {
      message.textContent = "Add a new sweet note, then pick from the jar again.";
      return;
    }

    const random = activeMessages[Math.floor(Math.random() * activeMessages.length)];
    message.textContent = random;
    message.animate(
      [
        { opacity: 0, transform: "translateY(10px) scale(0.98)" },
        { opacity: 1, transform: "translateY(0) scale(1)" }
      ],
      { duration: 360, easing: "ease-out" }
    );
  });

  addButton.addEventListener("click", () => {
    const value = input.textContent.trim();
    if (!value) return;

    messages.push(value);
    persistMessages();
    renderSweetNotes();
    message.textContent = value;
    input.textContent = "";
  });
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function effectLayer() {
  return document.getElementById("effectLayer");
}

function spawnHeart(x, y, options = {}) {
  const layer = effectLayer();
  if (!layer) return;

  const heart = document.createElement("span");
  heart.className = "fx-heart";
  heart.textContent = Math.random() > 0.55 ? "♥" : "♡";
  heart.style.setProperty("--x", `${x}px`);
  heart.style.setProperty("--y", `${y}px`);
  heart.style.setProperty("--dx", `${randomBetween(-90, 90)}px`);
  heart.style.setProperty("--dy", `${randomBetween(-40, 24)}px`);
  heart.style.setProperty("--rotate", `${randomBetween(-28, 28)}deg`);
  heart.style.setProperty("--size", `${randomBetween(options.minSize ?? 1.25, options.maxSize ?? 2.6)}rem`);
  heart.style.setProperty("--fx-color", options.color ?? (Math.random() > 0.5 ? "#ff5ba8" : "#d9c4ff"));
  layer.appendChild(heart);

  setTimeout(() => heart.remove(), 1800);
}

function spawnConfetti(x, y) {
  const layer = effectLayer();
  if (!layer) return;

  const colors = ["#ffd84a", "#ff7dbd", "#d9c4ff", "#9be7c6", "#fffafd"];
  const confetti = document.createElement("span");
  confetti.className = "fx-confetti";
  confetti.style.setProperty("--x", `${x}px`);
  confetti.style.setProperty("--y", `${y}px`);
  confetti.style.setProperty("--dx", `${randomBetween(-170, 170)}px`);
  confetti.style.setProperty("--dy", `${randomBetween(-40, 80)}px`);
  confetti.style.setProperty("--rotate", `${randomBetween(0, 180)}deg`);
  confetti.style.setProperty("--fx-color", colors[Math.floor(Math.random() * colors.length)]);
  layer.appendChild(confetti);

  setTimeout(() => confetti.remove(), 1700);
}

function spawnSpark(x, y) {
  const layer = effectLayer();
  if (!layer) return;

  const spark = document.createElement("span");
  spark.className = "fx-spark";
  spark.style.setProperty("--x", `${x}px`);
  spark.style.setProperty("--y", `${y}px`);
  spark.style.setProperty("--dx", `${randomBetween(-120, 120)}px`);
  spark.style.setProperty("--dy", `${randomBetween(-120, 120)}px`);
  layer.appendChild(spark);

  setTimeout(() => spark.remove(), 1200);
}

function buttonCenter(button) {
  const rect = button.getBoundingClientRect();

  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
}

function launchHearts(button, count = 18) {
  const { x, y } = buttonCenter(button);

  for (let index = 0; index < count; index += 1) {
    setTimeout(() => spawnHeart(x + randomBetween(-24, 24), y + randomBetween(-18, 18)), index * 34);
  }
}

function launchDateCelebration(button) {
  const { x, y } = buttonCenter(button);

  for (let index = 0; index < 38; index += 1) {
    setTimeout(() => spawnConfetti(x, y), index * 18);
  }

  for (let index = 0; index < 24; index += 1) {
    setTimeout(() => spawnHeart(x, y, { minSize: 1.1, maxSize: 2.15 }), index * 30);
  }

  for (let index = 0; index < 16; index += 1) {
    setTimeout(() => spawnSpark(x + randomBetween(-80, 80), y + randomBetween(-60, 60)), index * 26);
  }
}

function setupHugButton() {
  const button = document.getElementById("hugButton");
  const stage = button?.closest(".hug-stage");
  if (!button || !stage) return;

  button.addEventListener("click", () => {
    stage.classList.remove("is-hugging");
    void stage.offsetWidth;
    stage.classList.add("is-hugging");
    launchHearts(button, 26);

    setTimeout(() => {
      stage.classList.remove("is-hugging");
    }, 1500);
  });
}

function setupPlanDateButton() {
  const button = document.getElementById("planDateButton");
  if (!button) return;

  button.addEventListener("click", () => {
    launchDateCelebration(button);
    button.querySelector("span").textContent = "Date Magic Sent";

    setTimeout(() => {
      button.querySelector("span").textContent = "Plan Our Next Date";
    }, 1600);
  });
}

function setupDynamicSaves() {
  document.addEventListener(
    "blur",
    (event) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) return;
      if (!target.matches("[contenteditable][data-save-key]")) return;

      saveText(target.dataset.saveKey, target.textContent.trim());
    },
    true
  );
}

function boot() {
  setupLoader();
  renderTimeline();
  renderGallery();
  renderReasons();
  renderGarden();
  renderFuturePlans();
  setupEditableText();
  setupDynamicSaves();
  setupReveals();
  setupEnvelope();
  setupJourneyButton();
  setupJar();
  setupHugButton();
  setupPlanDateButton();
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

boot();

window.addEventListener("beforeunload", () => {
  if (musicTimer) {
    clearInterval(musicTimer);
  }
});
