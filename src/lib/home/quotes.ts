/**
 * Local quote database for the Daily Inspiration widget.
 * Curated across success, business, productivity, leadership, technology,
 * entrepreneurship, discipline, innovation, learning, Indian leaders,
 * scientists, engineers, founders, life, programming and design.
 * A stable quote is picked per calendar day (see daily.ts) so it changes
 * once a day and stays the same throughout the day. Easily extensible.
 */
export interface Quote {
  text: string;
  author: string;
  category: string;
}

export const quotes: Quote[] = [
  // Success
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: "Success" },
  { text: "The secret of success is to do the common things uncommonly well.", author: "John D. Rockefeller", category: "Success" },
  { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau", category: "Success" },
  { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller", category: "Success" },
  { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill", category: "Success" },
  { text: "The road to success and the road to failure are almost exactly the same.", author: "Colin R. Davis", category: "Success" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier", category: "Success" },
  // Business
  { text: "Your most unhappy customers are your greatest source of learning.", author: "Bill Gates", category: "Business" },
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker", category: "Business" },
  { text: "If you are not embarrassed by the first version of your product, you've launched too late.", author: "Reid Hoffman", category: "Business" },
  { text: "Chase the vision, not the money; the money will end up following you.", author: "Tony Hsieh", category: "Business" },
  { text: "Great companies are built on great products.", author: "Elon Musk", category: "Business" },
  { text: "Get closer than ever to your customers. So close that you tell them what they need before they realise it.", author: "Steve Jobs", category: "Business" },
  { text: "In business, what's dangerous is not to evolve.", author: "Jeff Bezos", category: "Business" },
  // Productivity
  { text: "Until we can manage time, we can manage nothing else.", author: "Peter Drucker", category: "Productivity" },
  { text: "Focus on being productive instead of busy.", author: "Tim Ferriss", category: "Productivity" },
  { text: "It's not always that we need to do more but rather that we need to focus on less.", author: "Nathan W. Morris", category: "Productivity" },
  { text: "You don't need more time, you just need to decide.", author: "Seth Godin", category: "Productivity" },
  { text: "Amateurs sit and wait for inspiration, the rest of us just get up and go to work.", author: "Stephen King", category: "Productivity" },
  { text: "Do the hard jobs first. The easy jobs will take care of themselves.", author: "Dale Carnegie", category: "Productivity" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney", category: "Productivity" },
  // Leadership
  { text: "A leader is one who knows the way, goes the way, and shows the way.", author: "John C. Maxwell", category: "Leadership" },
  { text: "Leadership is the capacity to translate vision into reality.", author: "Warren Bennis", category: "Leadership" },
  { text: "Before you are a leader, success is all about growing yourself.", author: "Jack Welch", category: "Leadership" },
  { text: "The function of leadership is to produce more leaders, not more followers.", author: "Ralph Nader", category: "Leadership" },
  { text: "Do not follow where the path may lead. Go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson", category: "Leadership" },
  { text: "A genuine leader is not a searcher for consensus but a molder of consensus.", author: "Martin Luther King Jr.", category: "Leadership" },
  // Technology
  { text: "Technology is best when it brings people together.", author: "Matt Mullenweg", category: "Technology" },
  { text: "It has become appallingly obvious that our technology has exceeded our humanity.", author: "Albert Einstein", category: "Technology" },
  { text: "The science of today is the technology of tomorrow.", author: "Edward Teller", category: "Technology" },
  { text: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke", category: "Technology" },
  { text: "The great growling engine of change — technology.", author: "Alvin Toffler", category: "Technology" },
  { text: "First we build the tools, then they build us.", author: "Marshall McLuhan", category: "Technology" },
  // Entrepreneurship
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb", category: "Entrepreneurship" },
  { text: "Ideas are easy. Implementation is hard.", author: "Guy Kawasaki", category: "Entrepreneurship" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney", category: "Entrepreneurship" },
  { text: "Whether you think you can, or you think you can't — you're right.", author: "Henry Ford", category: "Entrepreneurship" },
  { text: "Risk more than others think is safe. Dream more than others think is practical.", author: "Howard Schultz", category: "Entrepreneurship" },
  { text: "Timing, perseverance, and ten years of trying will eventually make you look like an overnight success.", author: "Biz Stone", category: "Entrepreneurship" },
  { text: "Make something people want.", author: "Paul Graham", category: "Entrepreneurship" },
  // Discipline
  { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn", category: "Discipline" },
  { text: "We must all suffer one of two things: the pain of discipline or the pain of regret.", author: "Jim Rohn", category: "Discipline" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln", category: "Discipline" },
  { text: "Motivation gets you going, but discipline keeps you growing.", author: "John C. Maxwell", category: "Discipline" },
  { text: "Success doesn't come from what you do occasionally, it comes from what you do consistently.", author: "Marie Forleo", category: "Discipline" },
  { text: "Small disciplines repeated with consistency lead to great achievements.", author: "John C. Maxwell", category: "Discipline" },
  // Innovation
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs", category: "Innovation" },
  { text: "The best way to have a good idea is to have a lot of ideas.", author: "Linus Pauling", category: "Innovation" },
  { text: "Innovation is taking two things that exist and putting them together in a new way.", author: "Tom Freston", category: "Innovation" },
  { text: "If you always do what you always did, you will always get what you always got.", author: "Albert Einstein", category: "Innovation" },
  { text: "Creativity is thinking up new things. Innovation is doing new things.", author: "Theodore Levitt", category: "Innovation" },
  { text: "Everything that can be invented has been invented — is always proven wrong.", author: "Unknown", category: "Innovation" },
  // Learning
  { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi", category: "Learning" },
  { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King", category: "Learning" },
  { text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.", author: "Benjamin Franklin", category: "Learning" },
  { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci", category: "Learning" },
  { text: "The more that you read, the more things you will know.", author: "Dr. Seuss", category: "Learning" },
  { text: "Anyone who stops learning is old, whether at twenty or eighty.", author: "Henry Ford", category: "Learning" },
  { text: "Develop a passion for learning. If you do, you will never cease to grow.", author: "Anthony J. D'Angelo", category: "Learning" },
  // Indian Leaders
  { text: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi", category: "Indian Leaders" },
  { text: "Arise, awake, and stop not till the goal is reached.", author: "Swami Vivekananda", category: "Indian Leaders" },
  { text: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi", category: "Indian Leaders" },
  { text: "Freedom is not worth having if it does not include the freedom to make mistakes.", author: "Mahatma Gandhi", category: "Indian Leaders" },
  { text: "A nation's culture resides in the hearts and in the soul of its people.", author: "Mahatma Gandhi", category: "Indian Leaders" },
  { text: "Take up one idea. Make that one idea your life.", author: "Swami Vivekananda", category: "Indian Leaders" },
  { text: "The best brains of the nation may be found on the last benches of the classroom.", author: "A. P. J. Abdul Kalam", category: "Indian Leaders" },
  { text: "Watch your habits, for they become your character.", author: "Sardar Vallabhbhai Patel", category: "Indian Leaders" },
  // Scientists
  { text: "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.", author: "A. P. J. Abdul Kalam", category: "Scientists" },
  { text: "If you want to shine like a sun, first burn like a sun.", author: "A. P. J. Abdul Kalam", category: "Scientists" },
  { text: "Imagination is more important than knowledge.", author: "Albert Einstein", category: "Scientists" },
  { text: "Nothing in life is to be feared, it is only to be understood.", author: "Marie Curie", category: "Scientists" },
  { text: "Somewhere, something incredible is waiting to be known.", author: "Carl Sagan", category: "Scientists" },
  { text: "Science is a way of thinking much more than it is a body of knowledge.", author: "Carl Sagan", category: "Scientists" },
  { text: "An expert is a person who has made all the mistakes that can be made in a very narrow field.", author: "Niels Bohr", category: "Scientists" },
  { text: "Research is what I'm doing when I don't know what I'm doing.", author: "Wernher von Braun", category: "Scientists" },
  // Engineers
  { text: "Scientists study the world as it is; engineers create the world that has never been.", author: "Theodore von Kármán", category: "Engineers" },
  { text: "Engineering is the art of directing the great sources of power in nature for the use of humankind.", author: "Thomas Tredgold", category: "Engineers" },
  { text: "The engineer's first problem in any design situation is to discover what the problem really is.", author: "Unknown", category: "Engineers" },
  { text: "One machine can do the work of fifty ordinary men. No machine can do the work of one extraordinary man.", author: "Elbert Hubbard", category: "Engineers" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman", category: "Engineers" },
  // Founders
  { text: "Stay hungry. Stay foolish.", author: "Steve Jobs", category: "Founders" },
  { text: "Move fast and break things.", author: "Mark Zuckerberg", category: "Founders" },
  { text: "Your brand is what other people say about you when you're not in the room.", author: "Jeff Bezos", category: "Founders" },
  { text: "When something is important enough, you do it even if the odds are not in your favor.", author: "Elon Musk", category: "Founders" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "Founders" },
  { text: "Ideas don't come out fully formed. They only become clear as you work on them.", author: "Mark Zuckerberg", category: "Founders" },
  { text: "If you double the number of experiments you do per year, you're going to double your inventiveness.", author: "Jeff Bezos", category: "Founders" },
  // Life
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "Life" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein", category: "Life" },
  { text: "The purpose of our lives is to be happy.", author: "Dalai Lama", category: "Life" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela", category: "Life" },
  { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama", category: "Life" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins", category: "Life" },
  { text: "What we think, we become.", author: "Buddha", category: "Life" },
  // Programming
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson", category: "Programming" },
  { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson", category: "Programming" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House", category: "Programming" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman", category: "Programming" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck", category: "Programming" },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler", category: "Programming" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds", category: "Programming" },
  { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs", category: "Programming" },
  // Design
  { text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs", category: "Design" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci", category: "Design" },
  { text: "Good design is as little design as possible.", author: "Dieter Rams", category: "Design" },
  { text: "Design adds value faster than it adds costs.", author: "Joel Spolsky", category: "Design" },
  { text: "You can't use up creativity. The more you use, the more you have.", author: "Maya Angelou", category: "Design" },
  { text: "Content precedes design. Design in the absence of content is not design, it's decoration.", author: "Jeffrey Zeldman", category: "Design" },
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
