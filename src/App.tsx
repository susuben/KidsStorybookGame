import { useEffect, useState } from "react";

type Scene = {
  title: string;
  text: string;
  question: string;
  choices: { label: string; next: number; star?: boolean }[];
};

const scenes: Scene[] = [
  {
    title: "The Whispering Woods",
    text: "Pip followed a trail of silver leaves until the old oak tree gave a gentle yawn.",
    question: "“A tiny star has fallen,” it whispered. “Will you help me find it?”",
    choices: [
      { label: "Follow the glowing trail", next: 1, star: true },
      { label: "Ask the fireflies", next: 2 },
    ],
  },
  {
    title: "A Sparkly Surprise",
    text: "The trail curled beneath the ferns. There, tucked inside a bluebell, was the sleepy little star!",
    question: "Pip held out a paw. “Let’s get you home before moonrise.”",
    choices: [
      { label: "Climb the moonlit hill", next: 3, star: true },
      { label: "Build a leaf balloon", next: 3 },
    ],
  },
  {
    title: "Firefly Friends",
    text: "The fireflies blinked a secret map: three flashes left, two flashes right, then straight past the mushrooms.",
    question: "At the end of the map, something twinkled inside a bluebell.",
    choices: [
      { label: "Peek inside the flower", next: 1, star: true },
      { label: "Call out a friendly hello", next: 1 },
    ],
  },
  {
    title: "The Star Comes Home",
    text: "Up, up, up floated the little star. It clicked into the sky and shone brighter than ever before.",
    question: "The woods cheered, and the moon gave Pip a glowing goodnight wink.",
    choices: [{ label: "Read the story again", next: 0 }],
  },
];

function SoundIcon({ muted }: { muted: boolean }) {
  return muted ? (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 9 4-3v12l-4-3H2V9h3Zm8-1 7 8m0-8-7 8" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 9 4-3v12l-4-3H2V9h3Zm8 1c1.2 1.2 1.2 2.8 0 4m3-7c3 3 3 7 0 10" /></svg>
  );
}

function StoryArt({ page }: { page: number }) {
  return (
    <svg className="story-art" viewBox="0 0 760 430" role="img" aria-label="Pip the fox in a magical moonlit forest">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#314b70" />
          <stop offset="1" stopColor="#8db2a5" />
        </linearGradient>
        <radialGradient id="moonGlow">
          <stop stopColor="#fff9c8" stopOpacity=".85" />
          <stop offset="1" stopColor="#fff9c8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="760" height="430" fill="url(#sky)" />
      <circle cx="620" cy="85" r="78" fill="url(#moonGlow)" />
      <circle cx="620" cy="85" r="36" fill="#fff4b0" />
      <g fill="#f9efad">
        <path d="m86 66 3 8 8 3-8 3-3 8-3-8-8-3 8-3 3-8Z" />
        <path d="m490 70 2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" />
        <path d="m366 42 2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" />
      </g>
      <g fill="#244c4b">
        <path d="M0 250 75 118l68 132h-35l55-106 61 112H0Z" />
        <path d="m520 250 75-132 68 132h-35l55-106 77 140v75H500Z" />
      </g>
      <path d="M0 324c107-58 201-18 274-45 111-41 243-60 486 30v121H0Z" fill="#315b4d" />
      <path d="M0 371c160-66 277 11 414-26 135-36 245-14 346 32v53H0Z" fill="#51765b" />
      <g transform="translate(530 280)">
        <path d="M-5 87c8-36 41-52 69-51 13 0 25 4 36 10-7 2-16 9-18 18 14 2 27 11 31 23H-5Z" fill="#75936b" />
        <ellipse cx="38" cy="46" rx="10" ry="15" fill="#c7d69c" />
        <path d="M31 33c-18-13-7-31 10-34 8 15 6 27-10 34Zm13 2C48 15 66 16 73 29 63 42 53 43 44 35Z" fill="#9fc17b" />
      </g>
      <g className={page === 3 ? "star-home" : "star-float"} transform={page === 3 ? "translate(620 85)" : "translate(485 267)"}>
        <path d="m0-20 6 13 15 2-11 10 3 15L0 12l-13 8 3-15-11-10 15-2Z" fill="#ffe97c" stroke="#fff7bd" strokeWidth="4" />
      </g>
      <g transform="translate(280 245)">
        <path d="M-43 75c-49-19-64 35-19 40 19 2 41-9 54-24" fill="#d8643f" stroke="#513d3a" strokeWidth="5" strokeLinecap="round" />
        <path d="M-61 110c-15-1-22-8-25-17 14-2 26 4 25 17Z" fill="#fff2da" />
        <ellipse cx="0" cy="64" rx="48" ry="55" fill="#e87949" stroke="#513d3a" strokeWidth="5" />
        <path d="M-37 30-53-18-17 3M37 30 53-18 17 3" fill="#e87949" stroke="#513d3a" strokeWidth="5" strokeLinejoin="round" />
        <path d="m-43-5-4-9 21 12m69-7 4-8-20 14" fill="#f2b27b" />
        <path d="M-31 67c5 32 59 32 63 0-10 10-21 14-32 14S-21 77-31 67Z" fill="#fff2da" />
        <circle cx="-16" cy="48" r="4" fill="#3d3837" />
        <circle cx="16" cy="48" r="4" fill="#3d3837" />
        <path d="m0 61 6 5-6 5-6-5Z" fill="#3d3837" />
        <path d="M-25 111-34 139M25 111l34 28" stroke="#513d3a" strokeWidth="7" strokeLinecap="round" />
      </g>
      <g fill="#d7dfaa">
        <circle cx="175" cy="297" r="5" /><circle cx="198" cy="278" r="3" /><circle cx="460" cy="320" r="4" />
      </g>
      <path d="M42 398c50-38 79-19 110 0m478-2c38-40 70-26 90-1" stroke="#92a97a" strokeWidth="6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default function App() {
  const [page, setPage] = useState(0);
  const [stars, setStars] = useState(0);
  const [muted, setMuted] = useState(false);
  const [screen, setScreen] = useState<"intro" | "menu" | "game">("intro");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const scene = scenes[page];

  useEffect(() => {
    const timer = window.setTimeout(() => setScreen("menu"), 3600);
    return () => window.clearTimeout(timer);
  }, []);

  const choose = (next: number, earnsStar?: boolean) => {
    if (next === 0) setStars(0);
    else if (earnsStar) setStars((value) => Math.min(3, value + 1));
    setPage(next);
  };

  if (screen === "intro") {
    return (
      <main className="opening-screen" aria-label="Opening the storybook">
        <div className="opening-stars" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <div className="opening-book" aria-hidden="true">
          <div className="opening-cover"><span className="cover-moon" /><b>Little<br />Lantern</b><small>A STORY ADVENTURE</small></div>
          <div className="opening-pages left-pages" />
          <div className="opening-pages right-pages" />
          <div className="flutter-page flutter-one" />
          <div className="flutter-page flutter-two" />
          <div className="flutter-page flutter-three" />
          <div className="flutter-page flutter-four" />
          <div className="opening-spine" />
        </div>
        <p className="opening-copy">A story is waking up...</p>
      </main>
    );
  }

  if (screen === "menu") {
    return (
      <main className="title-screen">
        <div className="sky-speckles" aria-hidden="true" />
        <button className="menu-sound" onClick={() => setMuted(!muted)} aria-label={muted ? "Turn sound on" : "Turn sound off"}><SoundIcon muted={muted} /></button>
        <div className="title-book">
          <div className="title-page title-left" aria-hidden="true">
            <span className="paper-star star-one">◆</span><span className="paper-star star-two">◆</span>
            <div className="paper-moon" />
            <div className="menu-hills hill-back" /><div className="menu-hills hill-front" />
            <div className="menu-tree tree-a" /><div className="menu-tree tree-b" />
          </div>
          <div className="title-page title-right">
            <div className="title-content">
              <span className="eyebrow">A LITTLE LANTERN TALE</span>
              <h1 aria-label="The Whispering Woods">
                <small>The</small>
                <span className="rainbow-word"><i>W</i><i>h</i><i>i</i><i>s</i><i>p</i><i>e</i><i>r</i><i>i</i><i>n</i><i>g</i></span>
                <span className="rainbow-word short"><i>W</i><i>o</i><i>o</i><i>d</i><i>s</i></span>
              </h1>
              <p>Every path holds a little bit of magic.</p>
              <button className="play-button" onClick={() => setScreen("game")}>
                <span className="play-triangle" aria-hidden="true" /> Play
              </button>
              <button className="settings-button" onClick={() => setSettingsOpen(true)}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm8 4 2-1-2-4-2 1c-.5-.5-1-.9-1.6-1.2L16 4h-4l-.4 2.8c-.6.3-1.1.7-1.6 1.2L8 7l-2 4 2 1c0 .7.1 1.3.3 1.9L6.7 16 10 19l1.7-1.2c.6.2 1.3.2 1.9.1L15 20l4-2-1-2.1c.4-.5.8-1.1 1-1.8l1 .1Z" /></svg>
                Change settings
              </button>
            </div>
            <div className="menu-fox" aria-hidden="true">
              <i className="fox-ear left" /><i className="fox-ear right" /><span className="fox-face"><i /><b /></span><span className="fox-body" /><span className="fox-tail" />
            </div>
          </div>
          <div className="title-spine" />
        </div>
        <p className="menu-tip">Make choices • Find stars • Shape your story</p>
        {settingsOpen && (
          <div className="modal-backdrop" role="presentation" onMouseDown={() => setSettingsOpen(false)}>
            <section className="settings-card" role="dialog" aria-modal="true" aria-labelledby="settings-title" onMouseDown={(event) => event.stopPropagation()}>
              <button className="close-settings" onClick={() => setSettingsOpen(false)} aria-label="Close settings">×</button>
              <span className="settings-kicker">MAKE IT YOURS</span>
              <h2 id="settings-title">Story Settings</h2>
              <div className="setting-row"><span><b>Story sounds</b><small>Music and forest sounds</small></span><button className={`toggle ${!muted ? "on" : ""}`} onClick={() => setMuted(!muted)} aria-pressed={!muted}><i /></button></div>
              <div className="setting-row"><span><b>Bigger words</b><small>Make story text easier to read</small></span><button className={`toggle ${largeText ? "on" : ""}`} onClick={() => setLargeText(!largeText)} aria-pressed={largeText}><i /></button></div>
              <button className="done-button" onClick={() => setSettingsOpen(false)}>All done</button>
            </section>
          </div>
        )}
      </main>
    );
  }

  return (
    <main className={`min-h-screen ${largeText ? "large-story-text" : ""}`}>
      <header className="topbar">
        <a className="brand" href="#" onClick={(event) => { event.preventDefault(); setScreen("menu"); }}>
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span><b>Little Lantern</b><small>STORY ADVENTURES</small></span>
        </a>
        <div className="header-actions">
          <div className="star-count" aria-label={`${stars} story stars collected`}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z" /></svg>
            <b>{stars}</b><span>Story stars</span>
          </div>
          <button className="icon-button" onClick={() => setMuted(!muted)} aria-label={muted ? "Turn sound on" : "Turn sound off"}>
            <SoundIcon muted={muted} />
          </button>
        </div>
      </header>

      <section className="book-shell">
        <div className="book">
          <div className="art-panel"><StoryArt page={page} /></div>
          <article className="story-panel">
            <div className="chapter-row">
              <span>CHAPTER {page + 1}</span>
              <div className="progress" aria-label={`Chapter ${page + 1} of 4`}>
                {[0, 1, 2, 3].map((step) => <i key={step} className={step <= page ? "active" : ""} />)}
              </div>
            </div>
            <h1>{scene.title}</h1>
            <div className="leaf-rule"><span>◆</span></div>
            <p>{scene.text}</p>
            <p className="question">{scene.question}</p>
            <div className="choices">
              {scene.choices.map((choice, index) => (
                <button key={choice.label} onClick={() => choose(choice.next, choice.star)}>
                  <span className="choice-number">{String.fromCharCode(65 + index)}</span>
                  <span>{choice.label}</span>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
                </button>
              ))}
            </div>
            <p className="hint">{page === 3 ? "THE END — FOR NOW" : "Choose what Pip should do next"}</p>
          </article>
        </div>
      </section>
      <footer><span /> Every choice makes a new story <span /></footer>
    </main>
  );
}
