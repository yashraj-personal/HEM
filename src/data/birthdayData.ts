import { QuizQuestion, ThisOrThatPair, NoteCard } from '../types';

export const RECIPIENT_NAME = "Hemali";
export const BIRTHDAY_DATE = "14 October 2026";
export const DEFAULT_SENDER_NAME = "Your Bestie";
export const CORE_THEME = "Different souls, one friendship. Besties today, tomorrow and forever. 💗";

export const FRIENDSHIP_PROMISES = [
  {
    id: 1,
    title: "Celebrate Your Wins",
    text: "I promise to celebrate your little wins and your giant milestones with equal hype and joy.",
    icon: "🎉",
    badge: "Promise 01"
  },
  {
    id: 2,
    title: "Always Listen",
    text: "I promise to listen when you need someone, whether you want advice, comfort, or just a safe space.",
    icon: "🎧",
    badge: "Promise 02"
  },
  {
    id: 3,
    title: "Laugh Together",
    text: "I promise to laugh with you and sometimes at your jokes (even the questionable ones).",
    icon: "😂",
    badge: "Promise 03"
  },
  {
    id: 4,
    title: "Remind You of Your Worth",
    text: "I promise to remind you how amazing, resilient, and uniquely gifted you are whenever self-doubt creeps in.",
    icon: "✨",
    badge: "Promise 04"
  },
  {
    id: 5,
    title: "Support Your Dreams",
    text: "I promise to support your dreams and be your number one cheerleader through every bold adventure.",
    icon: "🚀",
    badge: "Promise 05"
  },
  {
    id: 6,
    title: "Honest Conversations",
    text: "I promise to make space for honest conversations with warmth, trust, and zero judgment.",
    icon: "💬",
    badge: "Promise 06"
  },
  {
    id: 7,
    title: "Fun & Kindness",
    text: "I promise to keep our friendship full of fun, spontaneous memories, comfort foods, and genuine kindness.",
    icon: "🌸",
    badge: "Promise 07"
  },
  {
    id: 8,
    title: "Forever In My Heart",
    text: "I promise that you will always have an irreplaceable, special place in my heart.",
    icon: "💖",
    badge: "Promise 08"
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What makes a friendship truly strong?",
    options: [
      "Expensive gifts",
      "Trust and understanding",
      "Competing with each other",
      "Talking only when bored"
    ],
    correctAnswer: 1,
    explanation: "Trust, deep understanding, and mutual care form the unbreakable foundation of true besties!"
  },
  {
    id: 2,
    question: "Your bestie has a bad day. What is the best first move?",
    options: [
      "Judge her",
      "Listen and ask what she needs",
      "Ignore her",
      "Tell everyone her business"
    ],
    correctAnswer: 1,
    explanation: "Offering a gentle ear, comfort snacks, or silence without judgment is pure bestie warmth."
  },
  {
    id: 3,
    question: "What is the ultimate bestie superpower?",
    options: [
      "Reading minds",
      "Making every moment a competition",
      "Making each other laugh and feel supported",
      "Never replying"
    ],
    correctAnswer: 2,
    explanation: "Lifting each other up and laughing until your stomach hurts is the greatest superpower."
  },
  {
    id: 4,
    question: "What belongs in the perfect bestie day?",
    options: [
      "Fun conversations",
      "Random laughter",
      "Supporting each other",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "All of the above! Conversations, random giggles, and endless love make the perfect day."
  },
  {
    id: 5,
    question: "What is more important than a perfect social media post?",
    options: [
      "Genuine friendship",
      "Getting more likes than everyone",
      "Pretending to be someone else",
      "Comparing lives"
    ],
    correctAnswer: 0,
    explanation: "Real smiles and unscripted connection will always beat any curated online highlight reel."
  },
  {
    id: 6,
    question: "Your bestie achieves a big goal. What do you do?",
    options: [
      "Feel jealous",
      "Celebrate her success",
      "Change the subject",
      "Downplay it"
    ],
    correctAnswer: 1,
    explanation: "Her win is our win! True best friends celebrate each other with immense pride and confetti."
  },
  {
    id: 7,
    question: "What is the secret ingredient of a lasting friendship?",
    options: [
      "Trust, respect, honesty, and fun",
      "Keeping score",
      "Never communicating",
      "Always agreeing on everything"
    ],
    correctAnswer: 0,
    explanation: "Trust, unconditional respect, honesty, and having tons of fun together make besties forever."
  }
];

export const THIS_OR_THAT_PAIRS: ThisOrThatPair[] = [
  {
    id: 1,
    optionA: { text: "Late-night talks 🌙", icon: "🌙" },
    optionB: { text: "Random shopping 🛍️", icon: "🛍️" }
  },
  {
    id: 2,
    optionA: { text: "Cute handwritten letters 💌", icon: "💌" },
    optionB: { text: "Surprise gifts 🎁", icon: "🎁" }
  },
  {
    id: 3,
    optionA: { text: "Matching bracelets 🎀", icon: "🎀" },
    optionB: { text: "Matching outfits 💗", icon: "👗" }
  },
  {
    id: 4,
    optionA: { text: "Unlimited snacks 🍫", icon: "🍫" },
    optionB: { text: "Unlimited shopping 🛍️", icon: "🛍️" }
  },
  {
    id: 5,
    optionA: { text: "Movie night 🍿", icon: "🍿" },
    optionB: { text: "Music and dancing 🎶", icon: "🎶" }
  },
  {
    id: 6,
    optionA: { text: "Cute birthday cake 🎂", icon: "🎂" },
    optionB: { text: "A giant gift box 🎁", icon: "🎁" }
  },
  {
    id: 7,
    optionA: { text: "Funny memories 😂", icon: "😂" },
    optionB: { text: "Heartfelt conversations 🫂", icon: "🫂" }
  },
  {
    id: 8,
    optionA: { text: "Cozy day indoors 🧸", icon: "🧸" },
    optionB: { text: "Spontaneous adventure 🌈", icon: "🌈" }
  }
];

export const COMPLIMENTS: string[] = [
  "Your smile deserves its own spotlight. ✨",
  "Never forget how much you can achieve.",
  "You deserve friendships that feel safe and genuine.",
  "Your dreams are worth chasing.",
  "You bring your own kind of magic.",
  "You are allowed to grow at your own pace.",
  "Your kindness is a strength.",
  "You deserve happiness that feels peaceful.",
  "Keep becoming the person you dream of being.",
  "You don't need to be perfect to be wonderful.",
  "The world is undeniably brighter with you in it.",
  "Your laughter is contagious and comforting.",
  "You have an innate gift for making people feel seen.",
  "Your bravery in facing new challenges inspires me.",
  "You carry an effortless elegance and sweet spirit.",
  "Anyone lucky enough to know you knows how special you are.",
  "You are worthy of every good thing that comes your way.",
  "Your heart is made of pure gold and resilience.",
  "You make the ordinary moments feel extraordinary.",
  "You are loved, appreciated, and cherished beyond measure."
];

export const BIRTHDAY_WISHES: string[] = [
  "May your smile stay bright even on the hardest days.",
  "May your dreams become plans, and your plans become achievements.",
  "May you find peace, courage, laughter, and genuine happiness.",
  "May the next year surprise you with wonderful opportunities.",
  "May you always know your worth and never settle for less.",
  "May you be surrounded by people who respect and appreciate you.",
  "May every new chapter bring growth and beautiful experiences.",
  "May you always find reasons to celebrate yourself.",
  "May your heart be light and your days filled with pure joy.",
  "May you conquer every ambition you set your eyes on.",
  "May good health, serenity, and boundless luck follow you everywhere.",
  "May life bring you people as loyal and sweet as your soul.",
  "May your confidence bloom like spring flowers.",
  "May you have endless warm cups of coffee, great talks, and sunny skies.",
  "May all the kindness you give to others return to you tenfold.",
  "May you always have an exciting reason to wake up with excitement.",
  "May your journey ahead be blessed with tranquility and victory.",
  "May unexpected wonders meet you around every corner this year.",
  "May you embrace your uniqueness and shine without apology.",
  "May this birthday mark the start of your most magical year yet!"
];

export const INITIAL_NOTES: NoteCard[] = [
  {
    id: "note-1",
    text: "Keep shining, Hemali.",
    author: "Your Bestie",
    color: "bg-rose-50 border-rose-200 text-rose-900",
    rotation: "-rotate-2"
  },
  {
    id: "note-2",
    text: "Your happiness matters.",
    author: "Your Bestie",
    color: "bg-pink-50 border-pink-200 text-pink-900",
    rotation: "rotate-1"
  },
  {
    id: "note-3",
    text: "Your dreams deserve space to grow.",
    author: "Your Bestie",
    color: "bg-purple-50 border-purple-200 text-purple-900",
    rotation: "-rotate-1"
  },
  {
    id: "note-4",
    text: "Never underestimate yourself.",
    author: "Your Bestie",
    color: "bg-amber-50 border-amber-200 text-amber-900",
    rotation: "rotate-2"
  },
  {
    id: "note-5",
    text: "More laughter, more adventures, more memories.",
    author: "Your Bestie",
    color: "bg-pink-50 border-pink-200 text-pink-900",
    rotation: "-rotate-3"
  },
  {
    id: "note-6",
    text: "BESTIES FOREVER. ♾️💗",
    author: "Your Bestie",
    color: "bg-fuchsia-50 border-fuchsia-200 text-fuchsia-900",
    rotation: "rotate-1"
  }
];

export const GIFT_BOX_DATA = [
  {
    id: 1,
    title: "GIFT 1 — A LITTLE LAUGH 😂",
    subtitle: "Because our silliness is legendary",
    revealTitle: "A Bestie Laugh! 😂",
    revealMessage: "“Best friends are the people who know your weird side and still choose to stay for the snacks.”",
    boxColor: "from-pink-400 to-rose-400",
    lidColor: "from-pink-500 to-rose-500",
    ribbonColor: "bg-amber-300",
    accent: "😂"
  },
  {
    id: 2,
    title: "GIFT 2 — A LITTLE LOVE 💗",
    subtitle: "A reminder of how much you mean to me",
    revealTitle: "From the Heart 💗",
    revealMessage: "“Thank you for being you, Hemali. Your friendship is something worth appreciating every day.”",
    boxColor: "from-purple-400 to-pink-400",
    lidColor: "from-purple-500 to-pink-500",
    ribbonColor: "bg-rose-200",
    accent: "💗"
  },
  {
    id: 3,
    title: "GIFT 3 — A BIG BIRTHDAY WISH 🎂",
    subtitle: "For your brand new chapter",
    revealTitle: "My Grand Wish for You 🎂",
    revealMessage: "“May this new chapter bring you confidence, genuine happiness, wonderful opportunities, and memories you will love looking back on.”",
    boxColor: "from-rose-400 to-amber-300",
    lidColor: "from-rose-500 to-amber-400",
    ribbonColor: "bg-white",
    accent: "🎂"
  }
];
