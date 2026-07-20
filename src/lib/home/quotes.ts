/**
 * Local quote database for the Daily Inspiration widget.
 * Curated for WORK, effort, discipline, focus and building — strong, genuinely
 * motivating lines only (no filler). A stable quote is picked per calendar day
 * (see daily.ts) so it changes once a day and stays the same all day.
 */
export interface Quote {
  text: string;
  author: string;
  category: string;
}

export const quotes: Quote[] = [
  // Hard work & effort
  { text: "The only place where success comes before work is in the dictionary.", author: "Vidal Sassoon", category: "Hard Work" },
  { text: "Opportunities are usually disguised as hard work, so most people don't recognize them.", author: "Ann Landers", category: "Hard Work" },
  { text: "There are no shortcuts to any place worth going.", author: "Beverly Sills", category: "Hard Work" },
  { text: "The harder I work, the luckier I get.", author: "Samuel Goldwyn", category: "Hard Work" },
  { text: "Nothing works unless you do.", author: "Maya Angelou", category: "Hard Work" },
  { text: "Genius is one percent inspiration and ninety-nine percent perspiration.", author: "Thomas Edison", category: "Hard Work" },
  { text: "I'm a great believer in luck, and I find the harder I work the more I have of it.", author: "Thomas Jefferson", category: "Hard Work" },
  { text: "Work hard in silence, let your success be your noise.", author: "Frank Ocean", category: "Hard Work" },

  // Starting & taking action
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney", category: "Action" },
  { text: "Do the hard jobs first. The easy jobs will take care of themselves.", author: "Dale Carnegie", category: "Action" },
  { text: "Amateurs sit and wait for inspiration, the rest of us just get up and go to work.", author: "Stephen King", category: "Action" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar", category: "Action" },
  { text: "A year from now you may wish you had started today.", author: "Karen Lamb", category: "Action" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb", category: "Action" },
  { text: "Well done is better than well said.", author: "Benjamin Franklin", category: "Action" },
  { text: "Action is the foundational key to all success.", author: "Pablo Picasso", category: "Action" },

  // Discipline & consistency
  { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn", category: "Discipline" },
  { text: "We must all suffer one of two things: the pain of discipline or the pain of regret.", author: "Jim Rohn", category: "Discipline" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln", category: "Discipline" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier", category: "Discipline" },
  { text: "Success doesn't come from what you do occasionally, it comes from what you do consistently.", author: "Marie Forleo", category: "Discipline" },
  { text: "Small disciplines repeated with consistency lead to great achievements.", author: "John C. Maxwell", category: "Discipline" },
  { text: "Motivation gets you going, but discipline keeps you growing.", author: "John C. Maxwell", category: "Discipline" },
  { text: "It's not what we do once in a while that shapes our lives, but what we do consistently.", author: "Tony Robbins", category: "Discipline" },

  // Focus & productivity
  { text: "Focus on being productive instead of busy.", author: "Tim Ferriss", category: "Focus" },
  { text: "It's not always that we need to do more but rather that we need to focus on less.", author: "Nathan W. Morris", category: "Focus" },
  { text: "Until we can manage time, we can manage nothing else.", author: "Peter Drucker", category: "Focus" },
  { text: "Concentrate all your thoughts upon the work at hand. The sun's rays do not burn until brought to a focus.", author: "Alexander Graham Bell", category: "Focus" },
  { text: "You will never reach your destination if you stop and throw stones at every dog that barks.", author: "Winston Churchill", category: "Focus" },
  { text: "The successful warrior is the average man, with laser-like focus.", author: "Bruce Lee", category: "Focus" },
  { text: "Starve your distractions, feed your focus.", author: "Unknown", category: "Focus" },

  // Perseverance
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", category: "Perseverance" },
  { text: "Fall seven times, stand up eight.", author: "Japanese Proverb", category: "Perseverance" },
  { text: "Perseverance is not a long race; it is many short races one after the other.", author: "Walter Elliot", category: "Perseverance" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela", category: "Perseverance" },
  { text: "Our greatest glory is not in never failing, but in rising every time we fail.", author: "Confucius", category: "Perseverance" },
  { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill", category: "Perseverance" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: "Perseverance" },

  // Success
  { text: "The secret of success is to do the common things uncommonly well.", author: "John D. Rockefeller", category: "Success" },
  { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller", category: "Success" },
  { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau", category: "Success" },
  { text: "The difference between successful people and very successful people is that very successful people say no to almost everything.", author: "Warren Buffett", category: "Success" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", category: "Success" },
  { text: "Success is liking yourself, liking what you do, and liking how you do it.", author: "Maya Angelou", category: "Success" },

  // Ambition & mindset
  { text: "Whether you think you can, or you think you can't — you're right.", author: "Henry Ford", category: "Mindset" },
  { text: "Shoot for the moon. Even if you miss, you'll land among the stars.", author: "Norman Vincent Peale", category: "Mindset" },
  { text: "Your limitation — it's only your imagination.", author: "Unknown", category: "Mindset" },
  { text: "Do something today that your future self will thank you for.", author: "Sean Patrick Flanery", category: "Mindset" },
  { text: "Great things never came from comfort zones.", author: "Unknown", category: "Mindset" },
  { text: "If you want to achieve greatness stop asking for permission.", author: "Unknown", category: "Mindset" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes", category: "Mindset" },

  // Business & entrepreneurship
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker", category: "Business" },
  { text: "Chase the vision, not the money; the money will end up following you.", author: "Tony Hsieh", category: "Business" },
  { text: "Your most unhappy customers are your greatest source of learning.", author: "Bill Gates", category: "Business" },
  { text: "Make something people want.", author: "Paul Graham", category: "Business" },
  { text: "Ideas are easy. Implementation is hard.", author: "Guy Kawasaki", category: "Business" },
  { text: "In business, what's dangerous is not to evolve.", author: "Jeff Bezos", category: "Business" },
  { text: "Risk more than others think is safe. Dream more than others think is practical.", author: "Howard Schultz", category: "Business" },
  { text: "Timing, perseverance, and ten years of trying will eventually make you look like an overnight success.", author: "Biz Stone", category: "Business" },

  // Leadership
  { text: "A leader is one who knows the way, goes the way, and shows the way.", author: "John C. Maxwell", category: "Leadership" },
  { text: "Leadership is the capacity to translate vision into reality.", author: "Warren Bennis", category: "Leadership" },
  { text: "Before you are a leader, success is all about growing yourself.", author: "Jack Welch", category: "Leadership" },
  { text: "The function of leadership is to produce more leaders, not more followers.", author: "Ralph Nader", category: "Leadership" },
  { text: "Do not follow where the path may lead. Go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson", category: "Leadership" },

  // Founders
  { text: "Stay hungry. Stay foolish.", author: "Steve Jobs", category: "Founders" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "Founders" },
  { text: "When something is important enough, you do it even if the odds are not in your favor.", author: "Elon Musk", category: "Founders" },
  { text: "Your brand is what other people say about you when you're not in the room.", author: "Jeff Bezos", category: "Founders" },
  { text: "If you double the number of experiments you do per year, you're going to double your inventiveness.", author: "Jeff Bezos", category: "Founders" },
  { text: "Ideas don't come out fully formed. They only become clear as you work on them.", author: "Mark Zuckerberg", category: "Founders" },

  // Innovation
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs", category: "Innovation" },
  { text: "The best way to have a good idea is to have a lot of ideas.", author: "Linus Pauling", category: "Innovation" },
  { text: "Creativity is thinking up new things. Innovation is doing new things.", author: "Theodore Levitt", category: "Innovation" },
  { text: "If you always do what you always did, you will always get what you always got.", author: "Albert Einstein", category: "Innovation" },

  // Learning & growth
  { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi", category: "Learning" },
  { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King", category: "Learning" },
  { text: "Develop a passion for learning. If you do, you will never cease to grow.", author: "Anthony J. D'Angelo", category: "Learning" },
  { text: "Anyone who stops learning is old, whether at twenty or eighty.", author: "Henry Ford", category: "Learning" },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin", category: "Learning" },

  // Indian leaders
  { text: "Arise, awake, and stop not till the goal is reached.", author: "Swami Vivekananda", category: "Indian Leaders" },
  { text: "Take up one idea. Make that one idea your life.", author: "Swami Vivekananda", category: "Indian Leaders" },
  { text: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi", category: "Indian Leaders" },
  { text: "Faith in oneself is the best and safest course.", author: "Swami Vivekananda", category: "Indian Leaders" },
  { text: "Manage your time well and you can manage anything.", author: "Sardar Vallabhbhai Patel", category: "Indian Leaders" },

  // Scientists
  { text: "You have to dream before your dreams can come true.", author: "A. P. J. Abdul Kalam", category: "Scientists" },
  { text: "If you want to shine like a sun, first burn like a sun.", author: "A. P. J. Abdul Kalam", category: "Scientists" },
  { text: "Don't take rest after your first victory because if you fail in second, more lips are waiting to say that your first victory was just luck.", author: "A. P. J. Abdul Kalam", category: "Scientists" },
  { text: "Imagination is more important than knowledge.", author: "Albert Einstein", category: "Scientists" },
  { text: "Nothing in life is to be feared, it is only to be understood.", author: "Marie Curie", category: "Scientists" },
  { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein", category: "Scientists" },

  // Engineers & craft
  { text: "Scientists study the world as it is; engineers create the world that has never been.", author: "Theodore von Kármán", category: "Engineers" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman", category: "Engineers" },
  { text: "The engineer's first problem in any design situation is to discover what the problem really is.", author: "Unknown", category: "Engineers" },
  { text: "Quality means doing it right when no one is looking.", author: "Henry Ford", category: "Engineers" },

  // Programming
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson", category: "Programming" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck", category: "Programming" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House", category: "Programming" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds", category: "Programming" },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler", category: "Programming" },

  // Design
  { text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs", category: "Design" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci", category: "Design" },
  { text: "Good design is as little design as possible.", author: "Dieter Rams", category: "Design" },
  { text: "Details are not the details. They make the design.", author: "Charles Eames", category: "Design" },
];

/** Short, actionable productivity tips shown alongside the daily quote. */
export const productivityTips: string[] = [
  "Finish your hardest task before checking social media.",
  "Batch similar tasks together to stay in flow longer.",
  "Turn off non-essential notifications for two focused hours.",
  "Write tomorrow's top three tasks before you log off today.",
  "Use the two-minute rule: if it takes under two minutes, do it now.",
  "Take a five-minute break every 25 minutes to stay sharp.",
  "Keep a single tab open for the task you're actually doing.",
  "Name your files clearly so future-you finds them instantly.",
  "Compress images before uploading to keep pages fast.",
  "Draft first, edit later — don't polish a blank page.",
  "Close the loop: reply, file, or delete each email once.",
  "Automate one repetitive task this week.",
  "Set a timer for meetings so they end on time.",
  "Keep your desktop empty — clutter is a hidden tax on focus.",
  "Do a two-line daily review: what worked, what didn't.",
];
