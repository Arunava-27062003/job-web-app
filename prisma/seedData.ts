// Data-driven content for the CBT career-path game.
// Each stream has a small bank of shared "subject" levels (reused across many
// careers) plus one unique "capstone" level per career testing profession
// specific knowledge. This keeps every career genuinely playable while
// keeping the question bank a manageable size.

export type QSeed = {
  text: string;
  options: [string, string, string, string];
  correct: number;
  hint: string;
  explanation: string;
  difficulty?: number;
};

export type SubjectLevel = {
  key: string;
  stream: "SCIENCE" | "HUMANITIES";
  subject: string;
  title: string;
  description: string;
  questions: QSeed[];
};

export type CareerSeed = {
  slug: string;
  name: string;
  stream: "SCIENCE" | "HUMANITIES";
  icon: string;
  tagline: string;
  description: string;
  order: number;
  subjectLevelKeys: string[]; // order matters -> path order
  capstoneTitle: string;
  capstoneDescription: string;
  capstoneQuestions: QSeed[];
};

const d = (n: number) => n; // difficulty helper for readability

export const subjectLevels: SubjectLevel[] = [
  {
    key: "physics",
    stream: "SCIENCE",
    subject: "Physics",
    title: "Physics Foundations",
    description: "Motion, forces, energy, electricity and the laws that govern the physical world.",
    questions: [
      { text: "What is the SI unit of electric current?", options: ["Ampere", "Volt", "Ohm", "Coulomb"], correct: 0, hint: "Named after André-Marie Ampère.", explanation: "Electric current is measured in Amperes (A).", difficulty: d(1) },
      { text: "Newton's First Law is also known as the law of:", options: ["Inertia", "Action-reaction", "Gravitation", "Momentum conservation"], correct: 0, hint: "It's about objects resisting a change in motion.", explanation: "An object stays at rest or in uniform motion unless acted on by a force — this is inertia.", difficulty: d(1) },
      { text: "The formula for kinetic energy is:", options: ["½mv²", "mv", "mgh", "m/v"], correct: 0, hint: "It depends on mass and the square of speed.", explanation: "Kinetic energy = ½ × mass × velocity².", difficulty: d(2) },
      { text: "Which mirror is used in vehicle side mirrors, to give a wider field of view?", options: ["Convex", "Concave", "Plane", "None of these"], correct: 0, hint: "It curves outward, like the back of a spoon.", explanation: "Convex mirrors diverge light rays, giving a wider (though smaller) field of view.", difficulty: d(1) },
      { text: "The SI unit of electrical resistance is the:", options: ["Ohm", "Ampere", "Watt", "Farad"], correct: 0, hint: "Named after Georg Ohm.", explanation: "Resistance is measured in Ohms (Ω).", difficulty: d(1) },
      { text: "In physics, lowercase 'g' represents:", options: ["Acceleration due to gravity", "The universal gravitational constant", "Mass", "Weight"], correct: 0, hint: "It's roughly 9.8 on Earth's surface.", explanation: "g ≈ 9.8 m/s² is the acceleration due to gravity near Earth's surface.", difficulty: d(2) },
      { text: "The approximate speed of light in vacuum is:", options: ["3×10⁸ m/s", "3×10⁶ m/s", "3×10⁵ m/s", "3×10¹⁰ m/s"], correct: 0, hint: "About 300,000 kilometres per second.", explanation: "Light travels at approximately 3×10⁸ metres per second in a vacuum.", difficulty: d(2) },
    ],
  },
  {
    key: "chemistry",
    stream: "SCIENCE",
    subject: "Chemistry",
    title: "Chemistry Foundations",
    description: "Atoms, bonds, reactions and the building blocks of matter.",
    questions: [
      { text: "In a neutral atom, the number of electrons equals the number of:", options: ["Protons", "Neutrons", "Isotopes", "Molecules"], correct: 0, hint: "Charge balance keeps the atom neutral.", explanation: "A neutral atom has equal protons and electrons so charges cancel out.", difficulty: d(1) },
      { text: "The modern periodic table arranges elements by increasing:", options: ["Atomic number", "Atomic mass", "Number of neutrons", "Density"], correct: 0, hint: "This equals the number of protons.", explanation: "Mendeleev used atomic mass; the modern table uses atomic number (proton count).", difficulty: d(2) },
      { text: "Avogadro's number is approximately:", options: ["6.022×10²³", "3.14×10²³", "9.8×10²³", "1×10²³"], correct: 0, hint: "It's the number of particles in one mole.", explanation: "One mole of any substance contains 6.022×10²³ particles.", difficulty: d(2) },
      { text: "A covalent bond is formed by:", options: ["Sharing of electron pairs", "Complete transfer of electrons", "Overlap of metal ions", "Hydrogen attraction only"], correct: 0, hint: "Think 'co-' as in cooperating.", explanation: "Covalent bonds form when atoms share electron pairs.", difficulty: d(1) },
      { text: "The pH of a neutral solution at 25°C is:", options: ["7", "0", "14", "1"], correct: 0, hint: "Halfway on the 0–14 scale.", explanation: "Pure water at 25°C has a pH of 7, the neutral point.", difficulty: d(1) },
      { text: "The functional group -OH represents an:", options: ["Alcohol", "Aldehyde", "Ketone", "Carboxylic acid"], correct: 0, hint: "Think of ethanol.", explanation: "The hydroxyl group (-OH) is characteristic of alcohols.", difficulty: d(2) },
      { text: "Which gas is produced when zinc reacts with dilute hydrochloric acid?", options: ["Hydrogen", "Oxygen", "Chlorine", "Nitrogen"], correct: 0, hint: "It's the lightest element.", explanation: "Zn + 2HCl → ZnCl₂ + H₂, releasing hydrogen gas.", difficulty: d(2) },
    ],
  },
  {
    key: "biology",
    stream: "SCIENCE",
    subject: "Biology",
    title: "Biology Foundations",
    description: "Cells, genetics, physiology and the living world.",
    questions: [
      { text: "Which organelle is known as the 'powerhouse of the cell'?", options: ["Mitochondria", "Nucleus", "Ribosome", "Golgi body"], correct: 0, hint: "It generates most of the cell's energy (ATP).", explanation: "Mitochondria produce ATP through cellular respiration.", difficulty: d(1) },
      { text: "DNA stands for:", options: ["Deoxyribonucleic acid", "Dinitrogen acid", "Diribonucleic acid", "Deoxyribose nitrate"], correct: 0, hint: "It carries genetic information.", explanation: "DNA = Deoxyribonucleic acid.", difficulty: d(1) },
      { text: "Who proposed the theory of natural selection?", options: ["Charles Darwin", "Gregor Mendel", "Louis Pasteur", "Carl Linnaeus"], correct: 0, hint: "Author of 'On the Origin of Species'.", explanation: "Charles Darwin proposed natural selection as the mechanism of evolution.", difficulty: d(1) },
      { text: "The human heart has how many chambers?", options: ["4", "2", "3", "6"], correct: 0, hint: "Two atria and two ventricles.", explanation: "The human heart has 4 chambers: 2 atria and 2 ventricles.", difficulty: d(1) },
      { text: "Photosynthesis mainly occurs in the:", options: ["Chloroplast", "Mitochondria", "Nucleus", "Vacuole"], correct: 0, hint: "It contains chlorophyll.", explanation: "Chloroplasts contain chlorophyll and carry out photosynthesis.", difficulty: d(1) },
      { text: "Which blood cells primarily help fight infection?", options: ["White blood cells", "Red blood cells", "Platelets", "Plasma"], correct: 0, hint: "Part of the immune system.", explanation: "White blood cells (leukocytes) defend the body against infection.", difficulty: d(1) },
      { text: "The basic physical unit of heredity, made of DNA, is called a:", options: ["Gene", "Cell", "Tissue", "Organ"], correct: 0, hint: "It codes for a specific trait.", explanation: "A gene is a segment of DNA that codes for a particular trait.", difficulty: d(2) },
    ],
  },
  {
    key: "maths",
    stream: "SCIENCE",
    subject: "Mathematics",
    title: "Mathematics Foundations",
    description: "Algebra, trigonometry, calculus and problem solving.",
    questions: [
      { text: "The value of sin 90° is:", options: ["1", "0", "-1", "Undefined"], correct: 0, hint: "It's the maximum value sine can take.", explanation: "sin 90° = 1, the peak of the sine function.", difficulty: d(1) },
      { text: "The derivative of x² with respect to x is:", options: ["2x", "x", "2", "x²"], correct: 0, hint: "Bring the power down and reduce it by one.", explanation: "d/dx(x²) = 2x by the power rule.", difficulty: d(2) },
      { text: "The roots of x² − 5x + 6 = 0 are:", options: ["2 and 3", "1 and 6", "-2 and -3", "2 and -3"], correct: 0, hint: "Find two numbers that multiply to 6 and add to 5.", explanation: "(x-2)(x-3)=0, so x = 2 or x = 3.", difficulty: d(2) },
      { text: "The distance between points (x1,y1) and (x2,y2) is given by:", options: ["√((x2-x1)²+(y2-y1)²)", "(x2-x1)+(y2-y1)", "x1x2 + y1y2", "None of these"], correct: 0, hint: "It's a Pythagoras-style formula.", explanation: "This is the distance formula derived from the Pythagorean theorem.", difficulty: d(2) },
      { text: "The probability of getting a head in one fair coin toss is:", options: ["1/2", "1", "0", "1/4"], correct: 0, hint: "There are two equally likely outcomes.", explanation: "One favourable outcome (head) out of two possible outcomes gives 1/2.", difficulty: d(1) },
      { text: "The value of π (pi), approximately, is:", options: ["3.14159", "2.71828", "1.61803", "1.41421"], correct: 0, hint: "Ratio of a circle's circumference to its diameter.", explanation: "π ≈ 3.14159.", difficulty: d(1) },
      { text: "The sum of the interior angles of a triangle is:", options: ["180°", "90°", "360°", "270°"], correct: 0, hint: "A straight line is 180°.", explanation: "The angles of any triangle always add up to 180°.", difficulty: d(1) },
    ],
  },
  {
    key: "csLogic",
    stream: "SCIENCE",
    subject: "Computer Science & Logic",
    title: "Computer Science & Logic",
    description: "Programming basics, algorithms and logical reasoning.",
    questions: [
      { text: "The binary equivalent of the decimal number 2 is:", options: ["10", "11", "100", "1"], correct: 0, hint: "Binary only uses 0s and 1s, base 2.", explanation: "2 in decimal = 10 in binary (1×2¹ + 0×2⁰).", difficulty: d(2) },
      { text: "Which of these is a programming language?", options: ["Python", "Photoshop", "Excel", "Word"], correct: 0, hint: "It's named after a comedy group, not a snake.", explanation: "Python is a widely used programming language; the others are application software.", difficulty: d(1) },
      { text: "CPU stands for:", options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Unit", "Central Processor Utility"], correct: 0, hint: "It's often called the 'brain' of the computer.", explanation: "CPU = Central Processing Unit.", difficulty: d(1) },
      { text: "An algorithm is best described as:", options: ["A step-by-step procedure to solve a problem", "A programming language", "A type of computer hardware", "A database of files"], correct: 0, hint: "Think of it as a recipe.", explanation: "An algorithm is a well-defined sequence of steps to solve a problem.", difficulty: d(1) },
      { text: "If all A are B, and all B are C, then:", options: ["All A are C", "No A are C", "Some A are not C", "Cannot be determined"], correct: 0, hint: "Follow the chain of logic through.", explanation: "By transitivity, if A⊆B and B⊆C, then A⊆C.", difficulty: d(2) },
      { text: "Which data structure works on a First-In-First-Out (FIFO) basis?", options: ["Queue", "Stack", "Tree", "Graph"], correct: 0, hint: "Think of a line at a ticket counter.", explanation: "A queue removes elements in the order they were added — FIFO.", difficulty: d(2) },
      { text: "In technology, 'AI' commonly stands for:", options: ["Artificial Intelligence", "Automated Interface", "Applied Informatics", "Analog Input"], correct: 0, hint: "It refers to machines simulating human intelligence.", explanation: "AI = Artificial Intelligence.", difficulty: d(1) },
    ],
  },
  {
    key: "engSci",
    stream: "SCIENCE",
    subject: "English & Aptitude",
    title: "English & Aptitude",
    description: "Verbal ability, comprehension and logical/numerical aptitude.",
    questions: [
      { text: "Choose the correctly spelled word:", options: ["Definitely", "Definately", "Definitly", "Defenitely"], correct: 0, hint: "It contains 'finite'.", explanation: "'Definitely' is the correct spelling.", difficulty: d(1) },
      { text: "Choose the synonym of 'Abundant':", options: ["Plentiful", "Scarce", "Rare", "Empty"], correct: 0, hint: "Think of 'a lot of something'.", explanation: "Abundant means existing in large quantities — plentiful.", difficulty: d(1) },
      { text: "Choose the antonym of 'Ancient':", options: ["Modern", "Old", "Historic", "Aged"], correct: 0, hint: "The opposite of very old.", explanation: "Modern is the opposite of ancient.", difficulty: d(1) },
      { text: "Complete the idiom: 'Practice makes ___'", options: ["Perfect", "Perfectly", "Better", "Best"], correct: 0, hint: "It's a very common English proverb.", explanation: "'Practice makes perfect' is the standard idiom.", difficulty: d(1) },
      { text: "Choose the grammatically correct sentence:", options: ["She is going to the market.", "She go to the market.", "She going to market.", "She goes to the market yesterday."], correct: 0, hint: "Check subject-verb agreement and tense.", explanation: "'She is going...' correctly uses the present continuous tense.", difficulty: d(1) },
      { text: "If 5 workers build a wall in 10 days, how many days will 10 workers take (same rate)?", options: ["5", "10", "20", "2"], correct: 0, hint: "Double the workers, half the time.", explanation: "Work is inversely proportional to number of workers: 5×10 = 10×x, so x = 5 days.", difficulty: d(2) },
      { text: "Identify the odd one out:", options: ["Triangle", "Square", "Circle", "Apple"], correct: 3, hint: "Three of these are shapes.", explanation: "Apple is a fruit; the others are geometric shapes.", difficulty: d(1) },
    ],
  },
  {
    key: "history",
    stream: "HUMANITIES",
    subject: "History",
    title: "History Foundations",
    description: "Ancient civilisations to the modern freedom struggle.",
    questions: [
      { text: "Who was the first Prime Minister of India?", options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Patel", "B.R. Ambedkar"], correct: 0, hint: "He served from 1947 to 1964.", explanation: "Jawaharlal Nehru became India's first Prime Minister in 1947.", difficulty: d(1) },
      { text: "The Quit India Movement was launched in:", options: ["1942", "1930", "1947", "1919"], correct: 0, hint: "It was during World War II.", explanation: "Gandhi launched the Quit India Movement in August 1942.", difficulty: d(2) },
      { text: "The Indus Valley Civilization developed along which river?", options: ["Indus", "Ganga", "Yamuna", "Godavari"], correct: 0, hint: "It shares its name with the civilization.", explanation: "The civilization is named after the Indus river.", difficulty: d(1) },
      { text: "World War II ended in the year:", options: ["1945", "1939", "1918", "1950"], correct: 0, hint: "It began in 1939 and lasted 6 years.", explanation: "WWII ended in 1945 with the surrender of Japan and Germany.", difficulty: d(1) },
      { text: "Who commissioned the construction of the Taj Mahal?", options: ["Shah Jahan", "Akbar", "Aurangzeb", "Babur"], correct: 0, hint: "He built it for his wife Mumtaz Mahal.", explanation: "Emperor Shah Jahan built the Taj Mahal as a memorial to Mumtaz Mahal.", difficulty: d(1) },
      { text: "The French Revolution began in the year:", options: ["1789", "1776", "1848", "1917"], correct: 0, hint: "It's associated with the storming of the Bastille.", explanation: "The French Revolution began in 1789.", difficulty: d(2) },
      { text: "Mahatma Gandhi's famous Salt March (Dandi March) took place in:", options: ["1930", "1920", "1942", "1947"], correct: 0, hint: "It protested the British salt tax.", explanation: "The Dandi March took place in 1930.", difficulty: d(2) },
    ],
  },
  {
    key: "geography",
    stream: "HUMANITIES",
    subject: "Geography",
    title: "Geography Foundations",
    description: "Physical and human geography of India and the world.",
    questions: [
      { text: "Which is the largest continent by area?", options: ["Asia", "Africa", "Europe", "Australia"], correct: 0, hint: "It includes India and China.", explanation: "Asia is the largest continent both by area and population.", difficulty: d(1) },
      { text: "Which is the longest river in the world?", options: ["Nile", "Amazon", "Ganga", "Yangtze"], correct: 0, hint: "It flows through Egypt.", explanation: "The Nile, at about 6,650 km, is generally considered the longest river.", difficulty: d(1) },
      { text: "Which planet is known as the 'Red Planet'?", options: ["Mars", "Venus", "Jupiter", "Saturn"], correct: 0, hint: "Its surface has iron oxide (rust).", explanation: "Mars appears red due to iron oxide on its surface.", difficulty: d(1) },
      { text: "What is the highest mountain peak in the world?", options: ["Mount Everest", "K2", "Kangchenjunga", "Nanga Parbat"], correct: 0, hint: "It's in the Himalayas, on the Nepal-China border.", explanation: "Mount Everest, at 8,849 m, is Earth's highest peak.", difficulty: d(1) },
      { text: "The monsoon winds that bring rain to India mainly blow from the:", options: ["South-West", "North-East", "South-East", "North-West"], correct: 0, hint: "They arrive from the Arabian Sea/Indian Ocean.", explanation: "The South-West monsoon brings most of India's rainfall.", difficulty: d(2) },
      { text: "Which is the smallest continent by area?", options: ["Australia", "Europe", "Antarctica", "South America"], correct: 0, hint: "It's also a single country.", explanation: "Australia is the smallest continent by land area.", difficulty: d(2) },
      { text: "The Great Barrier Reef is located near:", options: ["Australia", "India", "Brazil", "Japan"], correct: 0, hint: "It's the world's largest coral reef system.", explanation: "The Great Barrier Reef lies off the coast of Queensland, Australia.", difficulty: d(1) },
    ],
  },
  {
    key: "polity",
    stream: "HUMANITIES",
    subject: "Political Science",
    title: "Political Science Foundations",
    description: "The Indian Constitution, governance and political theory.",
    questions: [
      { text: "The Constitution of India came into effect on:", options: ["26 January 1950", "15 August 1947", "26 November 1949", "2 October 1950"], correct: 0, hint: "This day is celebrated as Republic Day.", explanation: "The Constitution came into force on 26 January 1950.", difficulty: d(1) },
      { text: "Who is known as the chief architect ('Father') of the Indian Constitution?", options: ["B.R. Ambedkar", "Jawaharlal Nehru", "Mahatma Gandhi", "Rajendra Prasad"], correct: 0, hint: "He chaired the Constitution's Drafting Committee.", explanation: "Dr. B.R. Ambedkar chaired the Drafting Committee of the Constitution.", difficulty: d(1) },
      { text: "India has which form of government?", options: ["Parliamentary democracy", "Presidential democracy", "Absolute monarchy", "Military dictatorship"], correct: 0, hint: "The Prime Minister leads the executive, answerable to Parliament.", explanation: "India follows a parliamentary system of democracy.", difficulty: d(1) },
      { text: "The Preamble of the Indian Constitution begins with the words:", options: ["'We, the people of India'", "'We, the citizens of India'", "'In the name of India'", "'By the Republic of India'"], correct: 0, hint: "It emphasizes that power comes from the people.", explanation: "The Preamble opens with 'We, the people of India...'", difficulty: d(2) },
      { text: "Which house of the Indian Parliament is known as the 'Upper House'?", options: ["Rajya Sabha", "Lok Sabha", "Vidhan Sabha", "Vidhan Parishad"], correct: 0, hint: "Its members are not directly elected by the public.", explanation: "The Rajya Sabha (Council of States) is the Upper House.", difficulty: d(2) },
      { text: "How many fundamental rights are currently guaranteed by the Indian Constitution?", options: ["6", "5", "8", "10"], correct: 0, hint: "The Right to Property was removed from this list in 1978.", explanation: "There are currently 6 fundamental rights after the 44th Amendment.", difficulty: d(3) },
      { text: "The United Nations was founded in the year:", options: ["1945", "1919", "1950", "1939"], correct: 0, hint: "It was formed right after World War II.", explanation: "The UN was established in 1945.", difficulty: d(1) },
    ],
  },
  {
    key: "economics",
    stream: "HUMANITIES",
    subject: "Economics",
    title: "Economics Foundations",
    description: "Markets, money, and how economies function.",
    questions: [
      { text: "GDP stands for:", options: ["Gross Domestic Product", "General Domestic Product", "Gross Development Plan", "Global Domestic Product"], correct: 0, hint: "It measures total output of a country.", explanation: "GDP = Gross Domestic Product, the value of all goods/services produced.", difficulty: d(1) },
      { text: "Inflation refers to:", options: ["A general and sustained rise in prices", "A fall in prices", "An increase in exports", "A decrease in population"], correct: 0, hint: "It reduces the purchasing power of money.", explanation: "Inflation is a sustained increase in the general price level.", difficulty: d(1) },
      { text: "Who is often called the father of modern Economics?", options: ["Adam Smith", "Karl Marx", "John Keynes", "David Ricardo"], correct: 0, hint: "He wrote 'The Wealth of Nations'.", explanation: "Adam Smith is widely regarded as the father of modern economics.", difficulty: d(2) },
      { text: "The Reserve Bank of India functions as:", options: ["India's central bank", "A commercial bank", "A stock exchange", "A tax authority"], correct: 0, hint: "It regulates all other banks and controls money supply.", explanation: "The RBI is India's central banking institution.", difficulty: d(1) },
      { text: "Demand and supply curves intersect at the:", options: ["Equilibrium point", "Origin", "Break-even point", "Maximum point"], correct: 0, hint: "This is where quantity demanded equals quantity supplied.", explanation: "The intersection of demand and supply gives the market equilibrium price.", difficulty: d(2) },
      { text: "Agriculture belongs to which sector of the economy?", options: ["Primary sector", "Secondary sector", "Tertiary sector", "Quaternary sector"], correct: 0, hint: "It involves directly extracting resources from nature.", explanation: "Agriculture, mining and fishing are part of the primary sector.", difficulty: d(1) },
      { text: "A budget deficit occurs when:", options: ["Government expenditure exceeds its revenue", "Revenue exceeds expenditure", "Revenue equals expenditure", "Taxes are zero"], correct: 0, hint: "The government is spending more than it earns.", explanation: "A budget deficit means expenditure is greater than revenue.", difficulty: d(2) },
    ],
  },
  {
    key: "sociology",
    stream: "HUMANITIES",
    subject: "Sociology & Psychology",
    title: "Sociology & Psychology Foundations",
    description: "Society, human behaviour, and the mind.",
    questions: [
      { text: "The study of society and social relationships is called:", options: ["Sociology", "Psychology", "Anthropology", "Economics"], correct: 0, hint: "'Socio-' relates to society.", explanation: "Sociology is the scientific study of society and social relationships.", difficulty: d(1) },
      { text: "Who is known as the father of Sociology?", options: ["Auguste Comte", "Sigmund Freud", "Karl Marx", "Max Weber"], correct: 0, hint: "He coined the term 'sociology'.", explanation: "Auguste Comte coined the term 'sociology' and is considered its founder.", difficulty: d(2) },
      { text: "Sigmund Freud is best known for developing:", options: ["Psychoanalysis", "Behaviorism", "Cognitive theory", "Humanistic theory"], correct: 0, hint: "It focuses on the unconscious mind.", explanation: "Freud founded psychoanalysis, focused on the unconscious mind.", difficulty: d(1) },
      { text: "Which term describes learning through rewards and punishments?", options: ["Conditioning", "Cognition", "Perception", "Socialization"], correct: 0, hint: "Think of Pavlov's dogs.", explanation: "Conditioning is learning through associating behaviour with consequences.", difficulty: d(2) },
      { text: "The process of learning a society's culture and norms is called:", options: ["Socialization", "Modernization", "Urbanization", "Globalization"], correct: 0, hint: "It happens from childhood through family, school etc.", explanation: "Socialization is how individuals learn the norms and values of their society.", difficulty: d(2) },
      { text: "In Maslow's hierarchy of needs, which need forms the base of the pyramid?", options: ["Physiological needs", "Self-actualization", "Esteem", "Safety"], correct: 0, hint: "Think food, water, sleep.", explanation: "Physiological needs (food, water, shelter) form the foundation of Maslow's pyramid.", difficulty: d(2) },
      { text: "A group formed based on shared caste, religion, or region is called a:", options: ["Social group", "Random sample", "Formal organization", "Nuclear family"], correct: 0, hint: "It's based on a shared social identity.", explanation: "Such collections of people are studied as social groups.", difficulty: d(1) },
    ],
  },
  {
    key: "engHum",
    stream: "HUMANITIES",
    subject: "English & Aptitude",
    title: "English & Aptitude",
    description: "Verbal ability, comprehension and reasoning.",
    questions: [
      { text: "Choose the correctly spelled word:", options: ["Necessary", "Neccessary", "Necesary", "Neccesary"], correct: 0, hint: "One 'c', two 's'.", explanation: "'Necessary' is the correct spelling.", difficulty: d(1) },
      { text: "Choose the synonym of 'Eloquent':", options: ["Well-spoken", "Silent", "Rude", "Confused"], correct: 0, hint: "Think of a great public speaker.", explanation: "Eloquent means fluent and persuasive in speaking.", difficulty: d(1) },
      { text: "Choose the antonym of 'Optimistic':", options: ["Pessimistic", "Hopeful", "Cheerful", "Positive"], correct: 0, hint: "It means expecting the worst.", explanation: "Pessimistic is the opposite of optimistic.", difficulty: d(1) },
      { text: "Choose the grammatically correct sentence:", options: ["He has been working here since 2015.", "He is working here since 2015.", "He working here since 2015.", "He works here since 2015 onward yesterday."], correct: 0, hint: "'Since' pairs with the present perfect continuous tense.", explanation: "'has been working since' correctly uses present perfect continuous.", difficulty: d(2) },
      { text: "Fill in the blank: 'She is good ___ mathematics.'", options: ["at", "in", "on", "for"], correct: 0, hint: "It's a fixed preposition pairing.", explanation: "The correct idiom is 'good at' a subject.", difficulty: d(1) },
      { text: "Identify the odd one out:", options: ["Democracy", "Monarchy", "Dictatorship", "River"], correct: 3, hint: "Three of these are forms of government.", explanation: "River is a geographical feature; the others are forms of government.", difficulty: d(1) },
      { text: "A person who writes for newspapers is called a:", options: ["Journalist", "Historian", "Economist", "Sociologist"], correct: 0, hint: "They report news stories.", explanation: "A journalist writes and reports news for media outlets.", difficulty: d(1) },
    ],
  },
];

const sci = (keys: string[]) => keys;

// When a student types in a career that isn't in the curated list, they still
// get a real 5-level path: these 4 shared subject levels (a solid general
// foundation for the stream) plus one shared "generic capstone" per stream
// (see genericCapstones below). The API personalizes the capstone's displayed
// name using whatever the student typed, so it reads as tailored to them.
export const genericSubjectLevelKeys: Record<"SCIENCE" | "HUMANITIES", string[]> = {
  SCIENCE: ["physics", "chemistry", "biology", "maths"],
  HUMANITIES: ["history", "geography", "polity", "economics"],
};

export type GenericCapstoneSeed = {
  stream: "SCIENCE" | "HUMANITIES";
  subject: string;
  title: string;
  description: string;
  questions: QSeed[];
};

export const genericCapstones: GenericCapstoneSeed[] = [
  {
    stream: "SCIENCE",
    subject: "Career Readiness",
    title: "Career Challenge",
    description: "A final challenge testing the reasoning and aptitude every science career needs.",
    questions: [
      { text: "A train travels 60 km in 1.5 hours. What is its average speed?", options: ["40 km/h", "60 km/h", "90 km/h", "30 km/h"], correct: 0, hint: "Speed = distance ÷ time.", explanation: "60 km ÷ 1.5 h = 40 km/h.", difficulty: d(2) },
      { text: "What is the correct first step of the scientific method?", options: ["Observation", "Conclusion", "Publication", "Experiment"], correct: 0, hint: "You notice something before you can question it.", explanation: "The scientific method begins with observation, then hypothesis, experiment, and conclusion.", difficulty: d(1) },
      { text: "Look at the pattern: 2, 4, 8, 16, ? What comes next?", options: ["32", "24", "20", "18"], correct: 0, hint: "Each number is double the one before it.", explanation: "The pattern doubles each time: 16 × 2 = 32.", difficulty: d(1) },
      { text: "Which unit would best measure a very large distance in space?", options: ["Light-year", "Kilogram", "Litre", "Second"], correct: 0, hint: "It measures distance, based on how far light travels.", explanation: "A light-year measures the vast distances between stars and galaxies.", difficulty: d(1) },
      { text: "Effective problem-solving in any technical field generally begins with:", options: ["Clearly defining the problem", "Guessing the answer immediately", "Ignoring constraints", "Skipping research"], correct: 0, hint: "You can't solve what you haven't defined.", explanation: "Good problem-solving starts by clearly understanding what's being asked." },
      { text: "If 3 machines make 3 items in 3 minutes, how long would 100 machines take to make 100 items?", options: ["3 minutes", "100 minutes", "33 minutes", "10 minutes"], correct: 0, hint: "Each machine makes one item in the same fixed time.", explanation: "Each machine independently makes 1 item every 3 minutes, so 100 machines make 100 items in the same 3 minutes.", difficulty: d(3) },
    ],
  },
  {
    stream: "HUMANITIES",
    subject: "Career Readiness",
    title: "Career Challenge",
    description: "A final challenge testing the reasoning and judgment every humanities career needs.",
    questions: [
      { text: "Critical thinking primarily involves:", options: ["Analyzing information objectively before concluding", "Accepting all claims at face value", "Avoiding evidence", "Ignoring context"], correct: 0, hint: "It's about weighing evidence, not just believing what you hear.", explanation: "Critical thinking means objectively analyzing information before forming a conclusion." },
      { text: "Which skill is most essential for a career built around working with people and society?", options: ["Communication", "Avoiding teamwork", "Working in isolation", "Ignoring feedback"], correct: 0, hint: "You need to be understood, and to understand others.", explanation: "Strong communication underpins nearly every people-facing career." },
      { text: "A 'primary source' in research refers to:", options: ["Firsthand evidence from the time studied", "A textbook summary", "A movie adaptation", "An opinion blog"], correct: 0, hint: "It comes directly from the period or event itself.", explanation: "Primary sources are original, firsthand materials — letters, records, artifacts — from the time being studied." },
      { text: "A project originally planned for 8 weeks is delayed by 2 weeks. What percentage of the original timeline was the delay?", options: ["25%", "10%", "50%", "5%"], correct: 0, hint: "Divide the delay by the original total.", explanation: "2 weeks ÷ 8 weeks = 25%.", difficulty: d(2) },
      { text: "Effective leadership generally requires:", options: ["Clear communication and empathy", "Avoiding all responsibility", "Ignoring team input", "Working without any plan"], correct: 0, hint: "Good leaders listen as much as they direct.", explanation: "Communication and empathy are core to leading people well." },
      { text: "Asking 'why did this happen?' and 'what were the consequences?' about a historical event is an example of:", options: ["Critical/analytical thinking", "Rote memorization", "Guessing", "Plagiarism"], correct: 0, hint: "It goes beyond just recalling facts.", explanation: "Asking why and what-if questions is analytical, critical thinking rather than memorization." },
    ],
  },
];

export const careers: CareerSeed[] = [
  // ---------------- SCIENCE ----------------
  {
    slug: "doctor", name: "Doctor (MBBS)", stream: "SCIENCE", icon: "🩺", order: 1,
    tagline: "Heal, diagnose, and save lives",
    description: "Become a physician who diagnoses illness and cares for patients.",
    subjectLevelKeys: sci(["biology", "chemistry", "physics", "engSci"]),
    capstoneTitle: "NEET & Clinical Reasoning", capstoneDescription: "Test your readiness for medical entrance and real clinical scenarios.",
    capstoneQuestions: [
      { text: "Which entrance exam is required for MBBS admission in India?", options: ["NEET", "JEE", "CLAT", "CAT"], correct: 0, hint: "It's the National Eligibility cum Entrance Test.", explanation: "NEET is the standard entrance exam for medical courses in India." },
      { text: "The normal human body temperature is approximately:", options: ["37°C", "42°C", "30°C", "45°C"], correct: 0, hint: "It's often quoted as 98.6°F.", explanation: "Normal body temperature is about 37°C (98.6°F)." },
      { text: "A patient develops high fever and severe body ache after a mosquito bite. The most likely cause is:", options: ["Malaria or Dengue", "Common cold", "Fracture", "Diabetes"], correct: 0, hint: "Mosquitoes transmit specific vector-borne diseases.", explanation: "Malaria and dengue are classic mosquito-borne diseases causing fever and body ache." },
      { text: "The medical term for high blood pressure is:", options: ["Hypertension", "Hypotension", "Hyperglycemia", "Hypoglycemia"], correct: 0, hint: "'Hyper-' means high, '-tension' relates to pressure.", explanation: "Hypertension is the medical term for high blood pressure." },
    ],
  },
  {
    slug: "mechanical-engineer", name: "Mechanical Engineer", stream: "SCIENCE", icon: "⚙️", order: 2,
    tagline: "Design the machines that move the world",
    description: "Design, build and maintain mechanical systems and machines.",
    subjectLevelKeys: sci(["physics", "maths", "chemistry", "csLogic"]),
    capstoneTitle: "Engineering Design Challenge", capstoneDescription: "Prove your engineering entrance and design fundamentals.",
    capstoneQuestions: [
      { text: "Which entrance exam is commonly required for engineering admission in India?", options: ["JEE", "NEET", "CLAT", "NDA"], correct: 0, hint: "Joint Entrance Examination.", explanation: "JEE (Main/Advanced) is the standard gateway to engineering in India." },
      { text: "The SI unit of force is the:", options: ["Newton", "Joule", "Pascal", "Watt"], correct: 0, hint: "Named after the scientist behind the laws of motion.", explanation: "Force is measured in Newtons (N)." },
      { text: "A gear system is mainly used to:", options: ["Transmit and change motion or torque", "Store electricity", "Cool a system", "Measure temperature"], correct: 0, hint: "Think of a bicycle's chain and sprockets.", explanation: "Gears transmit rotational motion and can change speed/torque." },
      { text: "Which of the following is a simple machine?", options: ["Lever", "Computer", "Battery", "Antenna"], correct: 0, hint: "A see-saw is an example.", explanation: "A lever is one of the six classical simple machines." },
    ],
  },
  {
    slug: "software-engineer", name: "Software Engineer", stream: "SCIENCE", icon: "💻", order: 3,
    tagline: "Build the software that powers everything",
    description: "Design and build applications, websites and systems.",
    subjectLevelKeys: sci(["maths", "csLogic", "physics", "engSci"]),
    capstoneTitle: "Coding & Systems Challenge", capstoneDescription: "Show you understand programming and computer systems fundamentals.",
    capstoneQuestions: [
      { text: "Which of these is NOT a programming language?", options: ["HTTP", "Python", "Java", "C++"], correct: 0, hint: "It's a protocol used to transfer web pages.", explanation: "HTTP is a network protocol, not a programming language." },
      { text: "What does 'debugging' mean?", options: ["Finding and fixing errors in code", "Writing new code from scratch", "Deleting a program", "Designing a user interface"], correct: 0, hint: "It's named after removing literal bugs from early computers.", explanation: "Debugging is the process of finding and fixing defects in code." },
      { text: "Which sorting algorithm repeatedly swaps adjacent elements if they're in the wrong order?", options: ["Bubble sort", "Binary search", "Merge sort", "Hashing"], correct: 0, hint: "Larger elements 'bubble' to the end.", explanation: "Bubble sort repeatedly compares and swaps adjacent out-of-order elements." },
      { text: "What does 'API' stand for?", options: ["Application Programming Interface", "Automated Program Instruction", "Applied Programming Index", "Advanced Processing Interface"], correct: 0, hint: "It lets two software systems communicate.", explanation: "API = Application Programming Interface." },
    ],
  },
  {
    slug: "civil-engineer", name: "Civil Engineer", stream: "SCIENCE", icon: "🏗️", order: 4,
    tagline: "Build the roads, bridges, and buildings of tomorrow",
    description: "Plan and construct infrastructure like buildings, roads and bridges.",
    subjectLevelKeys: sci(["physics", "maths", "chemistry", "csLogic"]),
    capstoneTitle: "Structures & Infrastructure Challenge", capstoneDescription: "Test your grasp of construction and structural fundamentals.",
    capstoneQuestions: [
      { text: "Which material is most commonly used for modern building construction?", options: ["Reinforced concrete", "Wood", "Glass", "Plastic"], correct: 0, hint: "It combines concrete with steel bars.", explanation: "Reinforced concrete combines concrete's compressive strength with steel's tensile strength." },
      { text: "The strength of a concrete mix depends mainly on the ratio of:", options: ["Cement, sand, and aggregate", "Only cement", "Only water", "Only sand"], correct: 0, hint: "It's a mix of multiple materials, not one alone.", explanation: "Concrete strength depends on the proportion of cement, sand and aggregate used." },
      { text: "A structure designed to hold back water is called a:", options: ["Dam", "Bridge", "Tunnel", "Tower"], correct: 0, hint: "Think of hydroelectric power stations.", explanation: "A dam holds back water, often for irrigation or hydropower." },
      { text: "Which shape distributes weight most evenly and is common in arches and domes?", options: ["Arch/Triangle", "Square", "Circle only", "Straight line"], correct: 0, hint: "Ancient Roman aqueducts used this shape.", explanation: "Arches (triangular load paths) efficiently distribute weight, which is why they're used in domes and bridges." },
    ],
  },
  {
    slug: "electrical-engineer", name: "Electrical Engineer", stream: "SCIENCE", icon: "🔌", order: 5,
    tagline: "Power the world with circuits and energy",
    description: "Design electrical systems, circuits and power networks.",
    subjectLevelKeys: sci(["physics", "maths", "csLogic", "chemistry"]),
    capstoneTitle: "Circuits & Power Systems Challenge", capstoneDescription: "Test your grasp of circuits and electrical systems.",
    capstoneQuestions: [
      { text: "Ohm's Law is expressed as:", options: ["V = IR", "V = I/R", "V = I + R", "V = IR²"], correct: 0, hint: "Voltage equals current times resistance.", explanation: "Ohm's Law: V (voltage) = I (current) × R (resistance)." },
      { text: "Which device converts AC to DC?", options: ["Rectifier", "Transformer", "Generator", "Inverter"], correct: 0, hint: "It 'straightens' alternating current.", explanation: "A rectifier converts alternating current (AC) to direct current (DC)." },
      { text: "The unit of electrical power is the:", options: ["Watt", "Ohm", "Ampere", "Volt"], correct: 0, hint: "Light bulbs are rated in this unit.", explanation: "Power is measured in Watts (W)." },
      { text: "Which of these is a renewable energy source?", options: ["Solar power", "Coal", "Petroleum", "Natural gas"], correct: 0, hint: "It comes from the sun.", explanation: "Solar energy is renewable, unlike fossil fuels like coal, petroleum and natural gas." },
    ],
  },
  {
    slug: "data-scientist", name: "Data Scientist", stream: "SCIENCE", icon: "📊", order: 6,
    tagline: "Turn data into decisions",
    description: "Analyse data to uncover insights and build predictive models.",
    subjectLevelKeys: sci(["maths", "csLogic", "engSci", "physics"]),
    capstoneTitle: "Data & Statistics Challenge", capstoneDescription: "Test your statistical thinking and data fundamentals.",
    capstoneQuestions: [
      { text: "The average of 2, 4, 6, 8 is:", options: ["5", "6", "4", "20"], correct: 0, hint: "Sum them and divide by how many there are.", explanation: "(2+4+6+8)/4 = 20/4 = 5." },
      { text: "Which chart shows data spread using quartiles?", options: ["Box plot", "Pie chart", "Line graph", "Bar chart"], correct: 0, hint: "It looks like a box with 'whiskers'.", explanation: "A box plot displays the median, quartiles, and outliers of a dataset." },
      { text: "In statistics, the middle value of a sorted dataset is called the:", options: ["Median", "Mean", "Mode", "Range"], correct: 0, hint: "It's the value exactly in the centre.", explanation: "The median is the middle value when data is sorted." },
      { text: "Which language is widely used for data analysis?", options: ["Python", "HTML", "CSS", "Photoshop"], correct: 0, hint: "It also appears in the software-engineer path.", explanation: "Python (with libraries like pandas) is a top choice for data analysis." },
    ],
  },
  {
    slug: "pharmacist", name: "Pharmacist", stream: "SCIENCE", icon: "💊", order: 7,
    tagline: "Master medicines and patient care",
    description: "Dispense medication and advise on safe, effective drug use.",
    subjectLevelKeys: sci(["chemistry", "biology", "engSci", "physics"]),
    capstoneTitle: "Pharmacology Challenge", capstoneDescription: "Test your knowledge of medicines and drug science.",
    capstoneQuestions: [
      { text: "Paracetamol is commonly used to treat:", options: ["Fever and pain", "Diabetes", "Hypertension", "Infection only"], correct: 0, hint: "It's a common household medicine cabinet staple.", explanation: "Paracetamol is an analgesic and antipyretic, used for pain and fever." },
      { text: "The study of drug effects on the body is called:", options: ["Pharmacology", "Pathology", "Physiology", "Anatomy"], correct: 0, hint: "'Pharma-' relates to drugs.", explanation: "Pharmacology is the science of how drugs affect the body." },
      { text: "Antibiotics are used to treat infections caused by:", options: ["Bacteria", "Vitamin deficiency", "Stress", "Allergies only"], correct: 0, hint: "They don't work against viruses like the common cold.", explanation: "Antibiotics specifically target bacterial infections." },
      { text: "Which subjects are typically required in class 12 to pursue pharmacy in India?", options: ["Physics, Chemistry, Biology/Maths", "Only English", "Only History", "Only Economics"], correct: 0, hint: "It's a science-based profession.", explanation: "Pharmacy courses require a Science background with PCB or PCM." },
    ],
  },
  {
    slug: "biotechnologist", name: "Biotechnologist", stream: "SCIENCE", icon: "🧬", order: 8,
    tagline: "Engineer life to solve real-world problems",
    description: "Apply biology and technology to medicine, agriculture and industry.",
    subjectLevelKeys: sci(["biology", "chemistry", "maths", "engSci"]),
    capstoneTitle: "Biotech Research Challenge", capstoneDescription: "Test your understanding of biotechnology concepts.",
    capstoneQuestions: [
      { text: "PCR, a key lab technique in biotech, stands for:", options: ["Polymerase Chain Reaction", "Protein Chain Replication", "Plasmid Cell Reaction", "Peptide Chain Response"], correct: 0, hint: "It's used to amplify DNA.", explanation: "PCR (Polymerase Chain Reaction) amplifies specific DNA segments." },
      { text: "Genetic engineering commonly involves the manipulation of:", options: ["DNA", "Only proteins", "Only sugars", "Only fats"], correct: 0, hint: "It's the molecule that carries genetic instructions.", explanation: "Genetic engineering directly modifies an organism's DNA." },
      { text: "A vaccine works mainly by:", options: ["Training the immune system to recognize a pathogen", "Killing all bacteria in the body", "Replacing blood cells", "Increasing body temperature"], correct: 0, hint: "It prepares your immune system in advance.", explanation: "Vaccines expose the immune system to a harmless form of a pathogen so it can respond quickly to the real thing." },
      { text: "CRISPR is a technology used for:", options: ["Gene editing", "Data storage", "Space travel", "Water purification"], correct: 0, hint: "It lets scientists precisely cut and edit DNA.", explanation: "CRISPR is a revolutionary gene-editing tool." },
    ],
  },
  {
    slug: "architect", name: "Architect", stream: "SCIENCE", icon: "🏛️", order: 9,
    tagline: "Shape the spaces people live and work in",
    description: "Design buildings that are functional, safe and beautiful.",
    subjectLevelKeys: sci(["maths", "physics", "engSci", "chemistry"]),
    capstoneTitle: "Design & Spatial Reasoning Challenge", capstoneDescription: "Test your architecture entrance and design fundamentals.",
    capstoneQuestions: [
      { text: "NATA is an entrance exam required for which course in India?", options: ["Architecture (B.Arch)", "Medicine", "Law", "Engineering only"], correct: 0, hint: "National Aptitude Test in Architecture.", explanation: "NATA is the standard entrance test for B.Arch admissions." },
      { text: "In architectural drawing, a 'floor plan' shows a building from which view?", options: ["Top-down view", "Side view", "3D perspective only", "Rear view only"], correct: 0, hint: "Imagine looking straight down with the roof removed.", explanation: "A floor plan is a top-down, scaled diagram of a room or building layout." },
      { text: "Which of these is a famous architectural landmark of India?", options: ["Taj Mahal", "Eiffel Tower", "Great Wall of China", "Colosseum"], correct: 0, hint: "It's in Agra.", explanation: "The Taj Mahal is one of India's most iconic architectural monuments." },
      { text: "Sustainable architecture primarily focuses on:", options: ["Reducing environmental impact", "Maximizing cost", "Ignoring climate", "Using only glass"], correct: 0, hint: "Think energy efficiency and eco-friendly materials.", explanation: "Sustainable architecture minimizes a building's environmental footprint." },
    ],
  },
  {
    slug: "pilot", name: "Pilot", stream: "SCIENCE", icon: "✈️", order: 10,
    tagline: "Navigate the skies as a commercial or defence pilot",
    description: "Fly aircraft safely as a commercial or air force pilot.",
    subjectLevelKeys: sci(["physics", "maths", "engSci", "chemistry"]),
    capstoneTitle: "Aviation Aptitude Challenge", capstoneDescription: "Test your aviation science and aptitude.",
    capstoneQuestions: [
      { text: "The four forces acting on an aircraft in flight are:", options: ["Lift, weight, thrust, drag", "Only lift and weight", "Only thrust and drag", "Speed and altitude"], correct: 0, hint: "Two act vertically, two act horizontally.", explanation: "Lift, weight, thrust and drag are the four fundamental forces of flight." },
      { text: "Which exam is commonly taken to join the Indian Air Force as a pilot?", options: ["NDA / AFCAT", "NEET", "CLAT", "CAT"], correct: 0, hint: "National Defence Academy exam.", explanation: "NDA (after school) or AFCAT (after graduation) are common routes into the Air Force." },
      { text: "An altimeter is an instrument used to measure:", options: ["Altitude", "Speed", "Temperature", "Fuel level"], correct: 0, hint: "'Alti-' refers to height.", explanation: "An altimeter measures an aircraft's height above sea level." },
      { text: "'Mayday' is a distress call meaning:", options: ["Emergency - immediate danger", "Routine check", "Weather update", "Landing confirmation"], correct: 0, hint: "It's called three times in real emergencies.", explanation: "'Mayday' signals a life-threatening emergency requiring immediate assistance." },
    ],
  },
  {
    slug: "veterinarian", name: "Veterinarian", stream: "SCIENCE", icon: "🐾", order: 11,
    tagline: "Care for animals big and small",
    description: "Diagnose and treat illnesses and injuries in animals.",
    subjectLevelKeys: sci(["biology", "chemistry", "engSci", "physics"]),
    capstoneTitle: "Animal Science Challenge", capstoneDescription: "Test your veterinary science fundamentals.",
    capstoneQuestions: [
      { text: "The entrance exam for veterinary courses in India is generally:", options: ["NEET", "JEE", "CLAT", "CAT"], correct: 0, hint: "The same exam used for medical courses.", explanation: "NEET scores are also used for admission to veterinary (BVSc) courses." },
      { text: "Rabies in animals is caused by a:", options: ["Virus", "Bacteria", "Fungus", "Parasite"], correct: 0, hint: "It's often transmitted through a bite.", explanation: "Rabies is caused by a virus, usually transmitted via animal bites." },
      { text: "Which of these animals is a ruminant (has a multi-chambered stomach)?", options: ["Cow", "Dog", "Cat", "Horse"], correct: 0, hint: "It chews cud.", explanation: "Cows are ruminants with a four-chambered stomach for digesting plant matter." },
      { text: "Vaccination in animals helps to:", options: ["Build immunity against disease", "Increase body size", "Improve eyesight", "Change fur color"], correct: 0, hint: "Same principle as human vaccines.", explanation: "Vaccines train an animal's immune system to fight specific pathogens." },
    ],
  },
  {
    slug: "environmental-scientist", name: "Environmental Scientist", stream: "SCIENCE", icon: "🌱", order: 12,
    tagline: "Protect the planet through science",
    description: "Study ecosystems and develop solutions for environmental problems.",
    subjectLevelKeys: sci(["biology", "chemistry", "physics", "engSci"]),
    capstoneTitle: "Ecology & Sustainability Challenge", capstoneDescription: "Test your environmental science fundamentals.",
    capstoneQuestions: [
      { text: "The layer that protects Earth from harmful UV rays is called the:", options: ["Ozone layer", "Troposphere", "Ionosphere", "Exosphere"], correct: 0, hint: "It's been damaged by CFCs historically.", explanation: "The ozone layer in the stratosphere absorbs most of the sun's harmful UV radiation." },
      { text: "The greenhouse gas most associated with global warming is:", options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"], correct: 0, hint: "It's released by burning fossil fuels.", explanation: "CO₂ is the primary greenhouse gas driving climate change." },
      { text: "Renewable resources are those that:", options: ["Replenish naturally over time", "Never get used up instantly", "Cannot be reused", "Are always man-made"], correct: 0, hint: "Think solar, wind, and water.", explanation: "Renewable resources naturally regenerate within a human timescale." },
      { text: "Biodiversity refers to:", options: ["The variety of life forms in an ecosystem", "Only plant species", "Only animal species", "Weather patterns"], correct: 0, hint: "It covers plants, animals, and microorganisms together.", explanation: "Biodiversity is the full variety of life within a given ecosystem." },
    ],
  },
  {
    slug: "aerospace-engineer", name: "Aerospace Engineer", stream: "SCIENCE", icon: "🚀", order: 13,
    tagline: "Engineer aircraft and spacecraft",
    description: "Design and build aircraft, satellites and spacecraft.",
    subjectLevelKeys: sci(["physics", "maths", "chemistry", "csLogic"]),
    capstoneTitle: "Aerodynamics Challenge", capstoneDescription: "Test your aerospace science fundamentals.",
    capstoneQuestions: [
      { text: "Which principle helps explain how airplane wings generate lift?", options: ["Bernoulli's principle", "Newton's third law only", "Pascal's law", "Archimedes' principle"], correct: 0, hint: "It relates to fluid speed and pressure.", explanation: "Bernoulli's principle (with Newton's laws) helps explain lift generation over a wing." },
      { text: "ISRO stands for:", options: ["Indian Space Research Organisation", "Indian Satellite Research Office", "International Space Research Organisation", "Indian Science Research Office"], correct: 0, hint: "It's India's space agency.", explanation: "ISRO = Indian Space Research Organisation." },
      { text: "The speed of sound is also referred to as:", options: ["Mach 1", "Mach 0", "Escape velocity", "Terminal velocity"], correct: 0, hint: "Aircraft exceeding this are 'supersonic'.", explanation: "Mach 1 equals the local speed of sound." },
      { text: "A rocket moves forward mainly due to:", options: ["Newton's third law (action-reaction)", "Gravity pulling it forward", "Air resistance", "Magnetism"], correct: 0, hint: "Exhaust gases push out, the rocket pushes forward.", explanation: "Rocket propulsion is a direct application of Newton's third law." },
    ],
  },
  {
    slug: "chemical-engineer", name: "Chemical Engineer", stream: "SCIENCE", icon: "🧪", order: 14,
    tagline: "Turn raw materials into everyday products",
    description: "Design processes that convert raw materials into useful products.",
    subjectLevelKeys: sci(["chemistry", "physics", "maths", "biology"]),
    capstoneTitle: "Process Engineering Challenge", capstoneDescription: "Test your chemical process fundamentals.",
    capstoneQuestions: [
      { text: "The process of separating components of crude oil is called:", options: ["Fractional distillation", "Filtration", "Evaporation", "Sublimation"], correct: 0, hint: "It separates based on boiling points.", explanation: "Fractional distillation separates crude oil into fractions like petrol, diesel, etc." },
      { text: "Catalysts work by:", options: ["Speeding up a reaction without being consumed", "Slowing down a reaction", "Changing the products formed", "Cooling the reaction"], correct: 0, hint: "They lower the activation energy needed.", explanation: "A catalyst speeds up a reaction but is not consumed in the process." },
      { text: "Which gas is essential for combustion?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Helium"], correct: 0, hint: "Fire needs it to burn.", explanation: "Combustion requires oxygen to react with a fuel." },
      { text: "A polymer is formed by joining many:", options: ["Monomers", "Atoms only", "Ions", "Electrons"], correct: 0, hint: "'Poly-' means many.", explanation: "Polymers are large molecules made of repeating monomer units." },
    ],
  },
  {
    slug: "nurse", name: "Nurse", stream: "SCIENCE", icon: "👩‍⚕️", order: 15,
    tagline: "Provide compassionate patient care",
    description: "Support patient health through direct clinical care.",
    subjectLevelKeys: sci(["biology", "chemistry", "engSci", "physics"]),
    capstoneTitle: "Patient Care Challenge", capstoneDescription: "Test your nursing and patient-care fundamentals.",
    capstoneQuestions: [
      { text: "A normal resting human heart rate is approximately:", options: ["60-100 beats per minute", "150-200 bpm", "20-40 bpm", "300 bpm"], correct: 0, hint: "Check your own pulse for reference.", explanation: "A healthy resting adult heart rate is typically 60-100 bpm." },
      { text: "The instrument used to measure blood pressure is called a:", options: ["Sphygmomanometer", "Thermometer", "Stethoscope only", "Otoscope"], correct: 0, hint: "It uses an inflatable cuff around the arm.", explanation: "A sphygmomanometer measures blood pressure." },
      { text: "CPR stands for:", options: ["Cardiopulmonary Resuscitation", "Cardiac Pressure Release", "Chest Pain Recovery", "Continuous Patient Recording"], correct: 0, hint: "It's used to revive someone whose heart has stopped.", explanation: "CPR = Cardiopulmonary Resuscitation, an emergency life-saving procedure." },
      { text: "A deficiency of which vitamin commonly causes scurvy?", options: ["Vitamin C", "Vitamin A", "Vitamin D", "Vitamin B12"], correct: 0, hint: "Citrus fruits are rich in it.", explanation: "Scurvy is caused by a lack of Vitamin C." },
    ],
  },
  {
    slug: "dentist", name: "Dentist", stream: "SCIENCE", icon: "🦷", order: 16,
    tagline: "Care for oral health and smiles",
    description: "Diagnose and treat problems of the teeth and gums.",
    subjectLevelKeys: sci(["biology", "chemistry", "engSci", "physics"]),
    capstoneTitle: "Dental Science Challenge", capstoneDescription: "Test your dental science fundamentals.",
    capstoneQuestions: [
      { text: "The hardest substance in the human body is:", options: ["Tooth enamel", "Bone", "Nail", "Hair"], correct: 0, hint: "It coats the visible part of your teeth.", explanation: "Tooth enamel is the hardest tissue in the human body." },
      { text: "An adult human typically has how many permanent teeth?", options: ["32", "28", "20", "24"], correct: 0, hint: "This includes wisdom teeth.", explanation: "Adults typically have 32 permanent teeth including 4 wisdom teeth." },
      { text: "Plaque buildup on teeth is primarily caused by:", options: ["Bacteria", "Vitamin deficiency", "Cold weather", "Genetics only"], correct: 0, hint: "Regular brushing helps remove it.", explanation: "Dental plaque is a sticky film formed by bacteria." },
      { text: "The entrance exam required for BDS (dental) courses in India is:", options: ["NEET", "JEE", "CLAT", "CAT"], correct: 0, hint: "Same exam as MBBS.", explanation: "NEET scores are used for BDS admissions as well." },
    ],
  },
  {
    slug: "psychiatrist", name: "Psychiatrist", stream: "SCIENCE", icon: "🧠", order: 17,
    tagline: "Diagnose and treat mental health through medicine",
    description: "A medical doctor specialising in diagnosing and treating mental illness.",
    subjectLevelKeys: sci(["biology", "chemistry", "engSci", "physics"]),
    capstoneTitle: "Mind & Medicine Challenge", capstoneDescription: "Test your understanding of psychiatry and the brain.",
    capstoneQuestions: [
      { text: "A psychiatrist differs from a psychologist mainly because a psychiatrist:", options: ["Is a medical doctor who can prescribe medication", "Only talks, and isn't medically qualified", "Cannot treat patients", "Only works with children"], correct: 0, hint: "It requires an MBBS first.", explanation: "Psychiatrists are medical doctors (MD) who can prescribe medication, unlike most psychologists." },
      { text: "Which part of the brain is primarily responsible for memory formation?", options: ["Hippocampus", "Cerebellum", "Liver", "Pancreas"], correct: 0, hint: "The liver and pancreas aren't part of the brain at all.", explanation: "The hippocampus plays a key role in forming new memories." },
      { text: "Depression is classified as a:", options: ["Mental health disorder", "Physical injury", "Contagious disease", "Genetic mutation only"], correct: 0, hint: "It affects mood and thinking, not a physical wound.", explanation: "Depression is a recognized mental health disorder." },
      { text: "Neurotransmitters are chemicals that:", options: ["Transmit signals between neurons", "Build bones", "Digest food", "Filter blood"], correct: 0, hint: "They cross the synapse between nerve cells.", explanation: "Neurotransmitters carry signals across synapses between neurons." },
    ],
  },
  {
    slug: "astronomer", name: "Astronomer / Astrophysicist", stream: "SCIENCE", icon: "🔭", order: 18,
    tagline: "Explore the mysteries of the universe",
    description: "Study stars, planets, and the physics of the cosmos.",
    subjectLevelKeys: sci(["physics", "maths", "chemistry", "csLogic"]),
    capstoneTitle: "Cosmos Challenge", capstoneDescription: "Test your knowledge of astronomy and astrophysics.",
    capstoneQuestions: [
      { text: "The closest star to Earth (other than the Sun) is:", options: ["Proxima Centauri", "Sirius", "Betelgeuse", "Polaris"], correct: 0, hint: "It's part of the Alpha Centauri system.", explanation: "Proxima Centauri, about 4.2 light-years away, is the nearest star to our Sun." },
      { text: "A black hole forms when:", options: ["A massive star collapses under its own gravity", "A planet loses its atmosphere", "Two stars merge into gas", "A comet burns up"], correct: 0, hint: "It happens at the end of a very massive star's life.", explanation: "Black holes form from the gravitational collapse of massive dying stars." },
      { text: "Which galaxy do we live in?", options: ["Milky Way", "Andromeda", "Triangulum", "Whirlpool"], correct: 0, hint: "It's visible as a hazy band across the night sky.", explanation: "Our solar system is located within the Milky Way galaxy." },
      { text: "The Big Bang theory describes:", options: ["The origin and expansion of the universe", "The formation of mountains", "The water cycle", "Continental drift"], correct: 0, hint: "It's the leading cosmological model.", explanation: "The Big Bang theory explains how the universe began and has been expanding." },
    ],
  },

  // ---------------- HUMANITIES ----------------
  {
    slug: "civil-servant", name: "Civil Servant (IAS/UPSC)", stream: "HUMANITIES", icon: "🏛️", order: 1,
    tagline: "Serve the nation through public administration",
    description: "Administer government policy and public services as a top civil officer.",
    subjectLevelKeys: sci(["polity", "history", "economics", "engHum"]),
    capstoneTitle: "UPSC Mains Challenge", capstoneDescription: "Test your civil services and public administration knowledge.",
    capstoneQuestions: [
      { text: "The UPSC Civil Services Exam recruits for which services?", options: ["IAS, IPS, IFS and other central services", "Only IAS", "Only banking jobs", "Only teaching jobs"], correct: 0, hint: "It's a single exam feeding many different services.", explanation: "The Civil Services Exam recruits for the IAS, IPS, IFS and many other central services." },
      { text: "Who heads the district administration in India?", options: ["District Collector/Magistrate", "Prime Minister", "Chief Justice", "Governor"], correct: 0, hint: "This officer is usually an IAS appointee.", explanation: "The District Collector (or District Magistrate) heads administration at the district level." },
      { text: "The Indian Administrative Service was formerly known, under British rule, as the:", options: ["Indian Civil Service (ICS)", "Indian Police Service", "Indian Foreign Service", "Indian Revenue Service"], correct: 0, hint: "It's often called the 'steel frame of India'.", explanation: "The ICS was the colonial precursor to today's IAS." },
      { text: "Which of these is a core function of the UPSC?", options: ["Recruiting candidates for civil services", "Passing laws", "Deciding court cases", "Printing currency"], correct: 0, hint: "It conducts the entrance exams.", explanation: "The Union Public Service Commission conducts exams to recruit civil servants." },
    ],
  },
  {
    slug: "lawyer", name: "Lawyer", stream: "HUMANITIES", icon: "⚖️", order: 2,
    tagline: "Argue, advise, and uphold justice",
    description: "Represent clients, interpret laws, and argue cases in court.",
    subjectLevelKeys: sci(["polity", "history", "engHum", "sociology"]),
    capstoneTitle: "Legal Reasoning Challenge", capstoneDescription: "Test your legal knowledge and reasoning ability.",
    capstoneQuestions: [
      { text: "CLAT is the common entrance exam for admission to:", options: ["National Law Universities", "Medical colleges", "Engineering colleges", "Management colleges"], correct: 0, hint: "It stands for Common Law Admission Test.", explanation: "CLAT is used for admission to National Law Universities in India." },
      { text: "The highest court in India is the:", options: ["Supreme Court", "High Court", "District Court", "Sessions Court"], correct: 0, hint: "It's located in New Delhi.", explanation: "The Supreme Court of India is the apex judicial body." },
      { text: "A 'contract' is legally defined as:", options: ["An agreement enforceable by law", "Any verbal promise", "A government order", "A business plan"], correct: 0, hint: "It must be legally enforceable, not just a casual promise.", explanation: "A contract is an agreement that the law will enforce." },
      { text: "Citizens can directly approach which court to enforce Fundamental Rights?", options: ["Supreme Court (Article 32)", "Only the local police", "Parliament", "The Election Commission"], correct: 0, hint: "Dr. Ambedkar called this the 'heart' of the Constitution.", explanation: "Article 32 gives citizens the right to move the Supreme Court directly for enforcement of Fundamental Rights." },
    ],
  },
  {
    slug: "journalist", name: "Journalist", stream: "HUMANITIES", icon: "📰", order: 3,
    tagline: "Report the truth and tell the world's stories",
    description: "Investigate, write and report news stories for the public.",
    subjectLevelKeys: sci(["engHum", "history", "polity", "economics"]),
    capstoneTitle: "Newsroom Challenge", capstoneDescription: "Test your journalism fundamentals.",
    capstoneQuestions: [
      { text: "The '5 Ws' a journalist must answer in a story are Who, What, When, Where and:", options: ["Why", "Whom", "Which", "Whether"], correct: 0, hint: "It asks for the reason behind an event.", explanation: "The 5 Ws are Who, What, When, Where, and Why." },
      { text: "An 'editorial' in a newspaper primarily expresses:", options: ["The opinion of the publication", "Only factual sports scores", "Government orders", "Advertisements"], correct: 0, hint: "It's an opinion piece, not straight news.", explanation: "Editorials express the publication's viewpoint on an issue." },
      { text: "Freedom of the press in India is protected under which fundamental right?", options: ["Freedom of speech and expression", "Right to equality", "Right to property", "Right to education"], correct: 0, hint: "It's covered under Article 19.", explanation: "Press freedom flows from the fundamental right to freedom of speech and expression." },
      { text: "A 'byline' in journalism refers to:", options: ["The author's name on an article", "The headline", "The photo caption", "The page number"], correct: 0, hint: "It tells you who wrote the piece.", explanation: "A byline credits the writer of the article." },
    ],
  },
  {
    slug: "psychologist", name: "Psychologist", stream: "HUMANITIES", icon: "🧠", order: 4,
    tagline: "Understand the human mind and help people thrive",
    description: "Study behaviour and mental processes to help people cope and grow.",
    subjectLevelKeys: sci(["sociology", "engHum", "history", "polity"]),
    capstoneTitle: "Human Behaviour Challenge", capstoneDescription: "Test your psychology fundamentals.",
    capstoneQuestions: [
      { text: "Classical conditioning was famously demonstrated through experiments by:", options: ["Ivan Pavlov", "Sigmund Freud", "Jean Piaget", "B.F. Skinner"], correct: 0, hint: "Think of dogs salivating at the sound of a bell.", explanation: "Pavlov's dog experiments demonstrated classical conditioning." },
      { text: "Cognitive psychology primarily studies:", options: ["Mental processes like memory and thinking", "Only childhood development", "Only animal behavior", "Only genetics"], correct: 0, hint: "'Cognitive' relates to thought processes.", explanation: "Cognitive psychology focuses on mental processes such as perception, memory and reasoning." },
      { text: "A psychologist (unlike a psychiatrist) typically does NOT:", options: ["Prescribe medication", "Conduct therapy", "Administer tests", "Study behavior"], correct: 0, hint: "That requires a medical degree.", explanation: "Most psychologists are not medical doctors and cannot prescribe medication." },
      { text: "Piaget's theory is most associated with:", options: ["Stages of cognitive development in children", "Adult personality disorders", "Group dynamics", "Economic behavior"], correct: 0, hint: "Think of how children's thinking changes as they grow.", explanation: "Jean Piaget proposed stages of cognitive development in children." },
    ],
  },
  {
    slug: "teacher", name: "Teacher / Professor", stream: "HUMANITIES", icon: "📚", order: 5,
    tagline: "Educate and inspire the next generation",
    description: "Teach, mentor, and shape young minds in schools or colleges.",
    subjectLevelKeys: sci(["history", "polity", "engHum", "economics"]),
    capstoneTitle: "Pedagogy Challenge", capstoneDescription: "Test your teaching and education fundamentals.",
    capstoneQuestions: [
      { text: "The Right to Education (RTE) Act in India guarantees free education to children of which age group?", options: ["6 to 14 years", "3 to 18 years", "0 to 6 years", "14 to 18 years"], correct: 0, hint: "It covers primary and upper-primary schooling.", explanation: "The RTE Act mandates free education for children aged 6 to 14." },
      { text: "B.Ed. is a professional degree required mainly for becoming a:", options: ["School teacher", "Lawyer", "Doctor", "Engineer"], correct: 0, hint: "It stands for Bachelor of Education.", explanation: "A B.Ed. degree qualifies graduates to teach in schools." },
      { text: "A curriculum refers to:", options: ["The planned content and courses of a study program", "Only textbooks", "Only exams", "Only a classroom"], correct: 0, hint: "It's broader than just the books used.", explanation: "A curriculum is the overall planned educational content and structure of a program." },
      { text: "Formative assessment in teaching is used mainly to:", options: ["Monitor ongoing learning and give feedback", "Give a single final grade only", "Rank students nationally", "Replace all exams"], correct: 0, hint: "It happens during the learning process, not just at the end.", explanation: "Formative assessment tracks a student's progress and provides ongoing feedback." },
    ],
  },
  {
    slug: "economist", name: "Economist", stream: "HUMANITIES", icon: "📈", order: 6,
    tagline: "Analyze markets, money, and policy",
    description: "Study how economies work and advise on financial policy.",
    subjectLevelKeys: sci(["economics", "polity", "engHum", "history"]),
    capstoneTitle: "Economic Policy Challenge", capstoneDescription: "Test your grasp of economic policy.",
    capstoneQuestions: [
      { text: "Which institution formulates monetary policy in India?", options: ["Reserve Bank of India", "Ministry of Finance", "SEBI", "NITI Aayog"], correct: 0, hint: "It's India's central bank.", explanation: "The RBI is responsible for setting India's monetary policy." },
      { text: "'Fiscal policy' primarily refers to government decisions about:", options: ["Taxation and spending", "Interest rates only", "Currency printing only", "Foreign trade only"], correct: 0, hint: "It's the budget side of economic policy.", explanation: "Fiscal policy concerns government taxation and expenditure decisions." },
      { text: "A country's Gross Domestic Product measures:", options: ["Total value of goods and services produced", "Total population", "Total land area", "Total exports only"], correct: 0, hint: "It's the headline measure of economic output.", explanation: "GDP measures the total value of all goods and services produced in a country." },
      { text: "Which term describes a period of declining economic activity?", options: ["Recession", "Boom", "Inflation only", "Equilibrium"], correct: 0, hint: "It's the opposite of an economic boom.", explanation: "A recession is a significant decline in economic activity." },
    ],
  },
  {
    slug: "diplomat", name: "Diplomat (Foreign Service)", stream: "HUMANITIES", icon: "🌐", order: 7,
    tagline: "Represent your nation on the world stage",
    description: "Represent your country's interests abroad and manage international relations.",
    subjectLevelKeys: sci(["polity", "history", "economics", "engHum"]),
    capstoneTitle: "Diplomacy Challenge", capstoneDescription: "Test your international relations knowledge.",
    capstoneQuestions: [
      { text: "Indian diplomats join the country's Foreign Service through which exam?", options: ["UPSC Civil Services Exam (IFS)", "CLAT", "NEET", "CAT"], correct: 0, hint: "Same exam as the IAS, different cadre.", explanation: "The Indian Foreign Service (IFS) is one of the services recruited via the UPSC Civil Services Exam." },
      { text: "An 'embassy' represents a country's interests in:", options: ["A foreign country's capital", "Its own capital only", "A neutral international zone", "The United Nations only"], correct: 0, hint: "Think of the Indian Embassy in Washington D.C.", explanation: "An embassy is a country's diplomatic mission in a foreign nation's capital." },
      { text: "The United Nations Security Council has how many permanent members?", options: ["5", "10", "15", "3"], correct: 0, hint: "They each hold veto power.", explanation: "The UNSC has 5 permanent members: USA, UK, France, Russia and China." },
      { text: "A 'treaty' between nations is best described as:", options: ["A formally binding agreement", "An informal chat", "A trade advertisement", "A tourist visa"], correct: 0, hint: "It's legally binding under international law.", explanation: "A treaty is a formal, legally binding agreement between states." },
    ],
  },
  {
    slug: "social-worker", name: "Social Worker", stream: "HUMANITIES", icon: "🤝", order: 8,
    tagline: "Support communities and drive social change",
    description: "Help individuals and communities overcome social challenges.",
    subjectLevelKeys: sci(["sociology", "polity", "history", "engHum"]),
    capstoneTitle: "Community Impact Challenge", capstoneDescription: "Test your understanding of social work.",
    capstoneQuestions: [
      { text: "Social work primarily aims to:", options: ["Help individuals and communities improve wellbeing", "Only enforce laws", "Only collect taxes", "Only build infrastructure"], correct: 0, hint: "It's a helping profession.", explanation: "Social work focuses on improving the wellbeing of individuals and communities." },
      { text: "An NGO is best defined as:", options: ["A Non-Governmental Organization working for social causes", "A government ministry", "A private company", "A political party"], correct: 0, hint: "It's independent of the government.", explanation: "NGOs are independent, typically non-profit, organizations working on social/community issues." },
      { text: "Which of these is a key rural welfare scheme in India?", options: ["MGNREGA (rural employment guarantee)", "Space research funding", "Currency printing", "Foreign trade treaties"], correct: 0, hint: "It guarantees a minimum number of workdays per year.", explanation: "MGNREGA guarantees 100 days of wage employment to rural households." },
      { text: "'Community mobilization' refers to:", options: ["Organizing people to act collectively toward a shared goal", "Only fundraising", "Only advertising", "Only voting"], correct: 0, hint: "It's about bringing people together for action.", explanation: "Community mobilization organizes people to collectively address shared issues." },
    ],
  },
  {
    slug: "historian", name: "Historian / Archaeologist", stream: "HUMANITIES", icon: "🏺", order: 9,
    tagline: "Uncover and preserve the past",
    description: "Research the past through records, artifacts and excavation.",
    subjectLevelKeys: sci(["history", "geography", "engHum", "sociology"]),
    capstoneTitle: "Heritage Challenge", capstoneDescription: "Test your history and archaeology fundamentals.",
    capstoneQuestions: [
      { text: "Archaeologists primarily study the past through:", options: ["Excavated artifacts and remains", "Only written records", "Only oral tradition", "Only paintings"], correct: 0, hint: "Think of digging at ancient sites.", explanation: "Archaeology relies mainly on physical artifacts and excavated remains." },
      { text: "The Archaeological Survey of India (ASI) is responsible for:", options: ["Protecting and researching India's monuments and sites", "Printing history textbooks", "Running museums abroad", "Issuing passports"], correct: 0, hint: "It manages sites like the Taj Mahal.", explanation: "ASI is the government body for archaeological research and monument conservation." },
      { text: "Carbon dating is a technique used to:", options: ["Estimate the age of ancient organic remains", "Measure temperature", "Predict weather", "Test water purity"], correct: 0, hint: "It measures radioactive decay of carbon isotopes.", explanation: "Carbon dating estimates the age of organic materials based on carbon-14 decay." },
      { text: "The Harappan civilization is also known as the:", options: ["Indus Valley Civilization", "Vedic Civilization", "Mauryan Civilization", "Gupta Civilization"], correct: 0, hint: "It developed along the Indus river.", explanation: "The Harappan and Indus Valley Civilization refer to the same ancient culture." },
    ],
  },
  {
    slug: "urban-planner", name: "Geographer / Urban Planner", stream: "HUMANITIES", icon: "🏙️", order: 10,
    tagline: "Design the cities and spaces of tomorrow",
    description: "Plan how land, cities and regions are developed and used.",
    subjectLevelKeys: sci(["geography", "economics", "polity", "engHum"]),
    capstoneTitle: "Urban Planning Challenge", capstoneDescription: "Test your urban planning fundamentals.",
    capstoneQuestions: [
      { text: "Urban planning primarily deals with:", options: ["Organizing land use and infrastructure in cities", "Only building roads", "Only farming layouts", "Only forests"], correct: 0, hint: "It's about how a whole city is organized.", explanation: "Urban planning organizes land use, housing, transport and infrastructure in cities." },
      { text: "A 'master plan' for a city typically outlines:", options: ["Long-term land use and development strategy", "A single building's blueprint", "A tourist map", "A traffic ticket system"], correct: 0, hint: "It looks decades into the future, not one building.", explanation: "A master plan is a long-term strategic plan for a city's development." },
      { text: "Which of these is an example of urban infrastructure?", options: ["Public transport systems", "Only farmland", "Only rivers", "Only mountains"], correct: 0, hint: "Think of buses, metros, and roads.", explanation: "Public transport is a core piece of urban infrastructure." },
      { text: "Rapid unplanned urban growth often leads to:", options: ["Slums and overcrowding", "Population decline", "Increased forest cover", "Lower pollution"], correct: 0, hint: "Housing can't keep pace with people moving in.", explanation: "Unplanned urbanization often results in slums and overcrowded housing." },
    ],
  },
  {
    slug: "content-writer", name: "Content Writer / Author", stream: "HUMANITIES", icon: "✍️", order: 11,
    tagline: "Craft stories and words that move people",
    description: "Write compelling content, stories and articles for an audience.",
    subjectLevelKeys: sci(["engHum", "history", "sociology", "polity"]),
    capstoneTitle: "Storytelling Challenge", capstoneDescription: "Test your writing and storytelling fundamentals.",
    capstoneQuestions: [
      { text: "A 'narrative' in writing refers to:", options: ["A structured account of connected events", "A list of facts only", "A price list", "A legal document"], correct: 0, hint: "Think of the plot of a story.", explanation: "A narrative tells a structured, connected sequence of events." },
      { text: "'Plagiarism' refers to:", options: ["Using someone else's work without credit", "Editing your own draft", "Publishing on time", "Using quotation marks correctly"], correct: 0, hint: "It's considered academic and creative theft.", explanation: "Plagiarism is presenting someone else's work as your own without attribution." },
      { text: "Which point of view uses 'I' and 'we'?", options: ["First person", "Second person", "Third person", "None of these"], correct: 0, hint: "The narrator is speaking directly about themselves.", explanation: "First-person narration uses pronouns like 'I' and 'we'." },
      { text: "A 'protagonist' in a story is:", options: ["The main character", "The setting", "The genre", "The publisher"], correct: 0, hint: "The story typically revolves around them.", explanation: "The protagonist is the central character of a story." },
    ],
  },
  {
    slug: "public-relations", name: "Public Relations / Mass Comm", stream: "HUMANITIES", icon: "📢", order: 12,
    tagline: "Shape narratives and manage public image",
    description: "Manage communication and public image for organizations.",
    subjectLevelKeys: sci(["engHum", "sociology", "economics", "polity"]),
    capstoneTitle: "Media Strategy Challenge", capstoneDescription: "Test your PR and media fundamentals.",
    capstoneQuestions: [
      { text: "The main goal of Public Relations is to:", options: ["Manage and shape public perception of an organization", "Sell products directly", "Audit finances", "Design buildings"], correct: 0, hint: "It's about reputation, not direct sales.", explanation: "PR professionals manage how the public perceives an organization." },
      { text: "A 'press release' is used to:", options: ["Officially announce news to media outlets", "Sign contracts", "File taxes", "Register a company"], correct: 0, hint: "Journalists often use it as a source for stories.", explanation: "A press release is an official statement issued to the media to announce news." },
      { text: "'Target audience' refers to:", options: ["The specific group a message is intended to reach", "Everyone in the world", "Only journalists", "Only competitors"], correct: 0, hint: "It's the specific group you want your message to reach.", explanation: "A target audience is the defined group a communication strategy is aimed at." },
      { text: "Social media strategy is important in PR mainly because it:", options: ["Reaches audiences directly and quickly", "Is only used for entertainment", "Has no real impact", "Is limited to print"], correct: 0, hint: "It allows organizations to speak to the public without a middleman.", explanation: "Social media lets organizations communicate directly and rapidly with audiences." },
    ],
  },
  {
    slug: "hr-manager", name: "Human Resource Manager", stream: "HUMANITIES", icon: "🧑‍💼", order: 13,
    tagline: "Build great teams and workplace culture",
    description: "Manage recruitment, training and employee wellbeing at organizations.",
    subjectLevelKeys: sci(["sociology", "economics", "engHum", "polity"]),
    capstoneTitle: "People Management Challenge", capstoneDescription: "Test your HR and people-management fundamentals.",
    capstoneQuestions: [
      { text: "HR's primary responsibility includes:", options: ["Recruitment, training, and employee welfare", "Only marketing", "Only accounting", "Only IT support"], correct: 0, hint: "It covers the whole employee lifecycle.", explanation: "HR manages recruitment, training, and overall employee welfare." },
      { text: "'Onboarding' refers to the process of:", options: ["Integrating a new employee into an organization", "Firing an employee", "Auditing finances", "Filing taxes"], correct: 0, hint: "It happens right after someone is hired.", explanation: "Onboarding helps new employees settle into their role and organization." },
      { text: "A performance appraisal is used to:", options: ["Evaluate an employee's work performance", "Set company prices", "Design logos", "Plan holidays only"], correct: 0, hint: "It's usually done periodically, e.g. annually.", explanation: "Performance appraisals formally review an employee's work output and progress." },
      { text: "Workplace diversity refers to:", options: ["Having employees from varied backgrounds and perspectives", "Hiring only one type of person", "Reducing team size", "Avoiding teamwork"], correct: 0, hint: "It's about variety, not uniformity.", explanation: "Diversity means including people of varied backgrounds, identities, and perspectives." },
    ],
  },
  {
    slug: "political-analyst", name: "Political Analyst", stream: "HUMANITIES", icon: "🗳️", order: 14,
    tagline: "Decode politics, policy, and elections",
    description: "Analyze political trends, elections and government policy.",
    subjectLevelKeys: sci(["polity", "history", "economics", "engHum"]),
    capstoneTitle: "Election & Policy Analysis Challenge", capstoneDescription: "Test your political analysis fundamentals.",
    capstoneQuestions: [
      { text: "The Election Commission of India is responsible for:", options: ["Conducting free and fair elections", "Passing laws", "Printing currency", "Running courts"], correct: 0, hint: "It's an independent constitutional body.", explanation: "The Election Commission conducts and oversees elections in India." },
      { text: "'Exit polls' are surveys conducted:", options: ["Right after voters leave polling stations", "Before campaigning begins", "A year after elections", "During vote counting only"], correct: 0, hint: "They ask people how they voted, right as they leave.", explanation: "Exit polls survey voters immediately after they cast their vote." },
      { text: "A 'coalition government' is formed when:", options: ["No single party wins a majority and parties join together", "One party wins all seats", "The military takes over", "Courts appoint a government"], correct: 0, hint: "Multiple parties combine their seats to form a majority.", explanation: "A coalition forms when parties combine to reach a governing majority." },
      { text: "The minimum voting age in India is:", options: ["18 years", "21 years", "16 years", "25 years"], correct: 0, hint: "It was lowered from 21 by a constitutional amendment.", explanation: "The voting age in India is 18 years." },
    ],
  },
  {
    slug: "fashion-designer", name: "Fashion Designer", stream: "HUMANITIES", icon: "👗", order: 15,
    tagline: "Turn creativity into wearable art",
    description: "Create clothing and accessories that express style and function.",
    subjectLevelKeys: sci(["engHum", "sociology", "geography", "history"]),
    capstoneTitle: "Design Thinking Challenge", capstoneDescription: "Test your fashion and design fundamentals.",
    capstoneQuestions: [
      { text: "A 'mood board' in design is used to:", options: ["Visually convey design ideas, themes, and inspiration", "Track finances", "File legal paperwork", "Store fabric only"], correct: 0, hint: "It's a visual collage of ideas.", explanation: "A mood board visually communicates the themes and inspiration behind a design." },
      { text: "NIFT is a well-known Indian institute for:", options: ["Fashion and design education", "Medicine", "Law", "Engineering"], correct: 0, hint: "It stands for National Institute of Fashion Technology.", explanation: "NIFT is India's premier fashion design institute." },
      { text: "'Sustainable fashion' focuses on:", options: ["Reducing environmental and social impact of clothing", "Maximizing fast production only", "Ignoring the materials used", "Only luxury branding"], correct: 0, hint: "Think eco-friendly fabrics and ethical labor.", explanation: "Sustainable fashion aims to minimize the environmental and social harm of clothing production." },
      { text: "A fashion 'silhouette' refers to:", options: ["The overall shape/outline of a garment", "The fabric color", "The brand logo", "The price tag"], correct: 0, hint: "Think of the overall outline you'd see in shadow.", explanation: "A silhouette is the outer shape or outline of a garment." },
    ],
  },
  {
    slug: "hotel-management", name: "Hotel Management / Hospitality", stream: "HUMANITIES", icon: "🏨", order: 16,
    tagline: "Master the art of service and hospitality",
    description: "Manage hotels, resorts and guest experiences.",
    subjectLevelKeys: sci(["geography", "engHum", "economics", "sociology"]),
    capstoneTitle: "Hospitality Challenge", capstoneDescription: "Test your hospitality management fundamentals.",
    capstoneQuestions: [
      { text: "The hospitality industry primarily focuses on:", options: ["Providing service and guest experience", "Manufacturing goods", "Mining resources", "Farming"], correct: 0, hint: "It's centered on people and their experience.", explanation: "Hospitality is a service industry centered on guest experience." },
      { text: "'Front office' in a hotel handles mainly:", options: ["Guest check-in, check-out and reservations", "Cooking", "Housekeeping only", "Accounting only"], correct: 0, hint: "It's the first team guests interact with.", explanation: "The front office manages reservations, check-in and check-out." },
      { text: "Tourism contributes to a country's economy mainly through:", options: ["Foreign exchange earnings and employment", "Only tax evasion", "Reducing employment", "Only agriculture"], correct: 0, hint: "Think of foreign visitors spending money locally.", explanation: "Tourism generates foreign exchange earnings and creates significant employment." },
      { text: "A 'concierge' in a hotel primarily helps guests with:", options: ["Recommendations and arranging services", "Cooking meals", "Cleaning rooms", "Managing finances"], correct: 0, hint: "They help you plan your stay — bookings, directions, tickets.", explanation: "A concierge assists guests with recommendations, bookings and arrangements." },
    ],
  },
  {
    slug: "bank-officer", name: "Bank / Finance Officer", stream: "HUMANITIES", icon: "🏦", order: 17,
    tagline: "Manage money, banking, and financial services",
    description: "Work in banking, managing accounts, loans and financial services.",
    subjectLevelKeys: sci(["economics", "polity", "engHum", "sociology"]),
    capstoneTitle: "Banking Aptitude Challenge", capstoneDescription: "Test your banking and finance fundamentals.",
    capstoneQuestions: [
      { text: "IBPS/SBI exams are common entry routes for which career?", options: ["Bank Probationary Officer/Clerk", "Doctor", "Lawyer", "Architect"], correct: 0, hint: "They recruit for public sector banks.", explanation: "IBPS and SBI conduct exams to recruit bank officers and clerks." },
      { text: "A 'fixed deposit' is a banking product where:", options: ["Money is deposited for a fixed period at a fixed interest rate", "Money can be withdrawn anytime with no interest", "It is a type of loan", "It is a type of insurance"], correct: 0, hint: "You lock in your money for a set term.", explanation: "A fixed deposit locks funds for a set term at a predetermined interest rate." },
      { text: "'NPA' in banking stands for:", options: ["Non-Performing Asset", "New Payment Account", "National Provident Amount", "Net Profit Analysis"], correct: 0, hint: "It refers to loans that are not being repaid.", explanation: "NPA = Non-Performing Asset, a loan where repayments have stopped." },
      { text: "The central regulatory body for banks in India is the:", options: ["Reserve Bank of India", "SEBI", "IRDAI", "NITI Aayog"], correct: 0, hint: "Same institution that sets monetary policy.", explanation: "The RBI regulates banks and the overall banking system in India." },
    ],
  },
  {
    slug: "human-rights-activist", name: "Human Rights Activist", stream: "HUMANITIES", icon: "✊", order: 18,
    tagline: "Champion justice, equality, and human dignity",
    description: "Advocate for justice, equality and human dignity for all.",
    subjectLevelKeys: sci(["polity", "history", "sociology", "engHum"]),
    capstoneTitle: "Human Rights Challenge", capstoneDescription: "Test your human rights knowledge.",
    capstoneQuestions: [
      { text: "The Universal Declaration of Human Rights was adopted by the United Nations in:", options: ["1948", "1919", "1945", "1990"], correct: 0, hint: "It was adopted right after the UN itself was founded.", explanation: "The UDHR was adopted by the UN General Assembly in 1948." },
      { text: "The National Human Rights Commission of India was established to:", options: ["Protect and promote human rights", "Print currency", "Conduct elections", "Run schools"], correct: 0, hint: "It's an independent statutory body.", explanation: "The NHRC protects and promotes human rights in India." },
      { text: "Which of these is considered a fundamental human right?", options: ["Right to life and liberty", "Right to a specific job title", "Right to a car", "Right to a passport only"], correct: 0, hint: "It's one of the most basic rights recognized worldwide.", explanation: "The right to life and liberty is a core, universally recognized human right." },
      { text: "Advocacy for marginalized groups mainly aims to:", options: ["Ensure equal rights and opportunities", "Increase division", "Reduce awareness", "Ignore inequality"], correct: 0, hint: "It works toward fairness and inclusion.", explanation: "Advocacy for marginalized groups seeks equal rights and opportunities for them." },
    ],
  },
];
