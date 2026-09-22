export type RoleFocus = "software-engineering" | "ai-ml" | "retrieval-research";

export const roleFocuses: { id: RoleFocus; label: string }[] = [
  { id: "software-engineering", label: "Software Engineering" },
  { id: "ai-ml", label: "AI / Machine Learning" },
];

export type PortfolioItem = { roles: RoleFocus[] };

export const research = [
  { role: "Undergraduate Researcher", project: "Efficient Neural Retrieval", institution: "Cal Poly CENG", dates: "August 2026 - Present", advisor: "Maria Pantoja", summary: "Designing a reproducible evaluation pipeline to compare retrieval effectiveness, index memory, and query latency across dense-retrieval configurations.", highlights: ["Uses Recall@k and nDCG@k to evaluate ranking quality.", "Studies when efficiency choices create meaningful ranking-quality losses.", "Focuses on retrieval effectiveness, latency, and memory use."], detailGroups: [{ label: "What I did", items: ["Designed a reproducible evaluation pipeline for dense-retrieval configurations.", "Used Recall@k and nDCG@k to evaluate ranking quality."] }, { label: "What I learned", items: ["Studied when efficiency choices create meaningful ranking-quality losses."] }, { label: "Impact", items: ["Centered the evaluation on retrieval effectiveness, latency, and index memory."] }], tags: ["Neural Retrieval", "Recall@k", "nDCG@k", "Retrieval Evaluation", "Efficiency"], roles: ["retrieval-research"] as RoleFocus[] },
  { role: "Researcher & Technical Lead", project: "Semantic Recommendations / Session Scout", institution: "Cal Poly CENG", dates: "April 2026 - Present", advisor: "Puneet Agarwal", summary: "Evaluated embedding models for personalized conference recommendation across over 5,000 presentation titles and abstracts.", highlights: ["Compared six embedding models using semantic ranking evaluation.", "Used LLM-as-a-judge evaluation and user feedback.", "BGE-small-en-v1.5 achieved the highest mean relevance score of 2.4714.", "Average recommendation retrieval time was approximately 0.07 seconds.", "95% of user-evaluation participants found the system useful.", "Leading the refactor from Streamlit to Next.js, FastAPI, PostgreSQL, and AWS."], detailGroups: [{ label: "What I did", items: ["Compared six embedding models using semantic ranking evaluation.", "Used LLM-as-a-judge evaluation and user feedback.", "Led the refactor from Streamlit to Next.js, FastAPI, PostgreSQL, and AWS."] }, { label: "What I learned", items: ["Evaluated how embedding choices affect personalized conference recommendations."] }, { label: "Impact", items: ["BGE-small-en-v1.5 achieved a mean relevance score of 2.4714.", "Average recommendation retrieval time was approximately 0.07 seconds.", "95% of user-evaluation participants found the system useful."] }], tags: ["Embeddings", "Semantic Retrieval", "Recommendation Systems", "Next.js", "FastAPI", "PostgreSQL", "AWS"], roles: ["software-engineering", "ai-ml", "retrieval-research"] as RoleFocus[] },
  { role: "Machine Learning Research Assistant", project: "Belonging Beyond Boundaries", institution: "Cal Poly CENG", dates: "October 2025 - March 2026", advisor: "Sumona Mukhopadhyay", summary: "Built Python data pipelines to preprocess, analyze, and visualize more than 2,600 EEG datasets.", highlights: ["Implemented filtering and smoothing.", "Applied anomaly-detection techniques.", "Used MNE and related extraction tools to reduce noise and artifacts."], detailGroups: [{ label: "What I did", items: ["Built Python data pipelines for more than 2,600 EEG datasets.", "Implemented filtering, smoothing, and anomaly-detection techniques."] }, { label: "What I learned", items: ["Used MNE and related extraction tools to work with EEG data."] }, { label: "Impact", items: ["Focused the pipeline on reducing noise and artifacts for downstream analysis."] }], tags: ["Python", "EEG", "MNE", "Signal Processing", "Data Pipelines"], roles: ["ai-ml", "retrieval-research"] as RoleFocus[] },
];

export const skills = [
  { name: "AI / Machine Learning", values: ["TensorFlow", "scikit-learn", "Hugging Face", "LangChain", "Gemini API", "OpenAI API", "NLP", "Embeddings", "Recommendation Systems", "Classification", "Neural Retrieval"], roles: ["ai-ml", "retrieval-research"] as RoleFocus[] },
  { name: "Data & Retrieval", values: ["pandas", "NumPy", "MNE", "PostgreSQL", "SQL", "Vector Similarity", "Retrieval Evaluation", "Recall@k", "nDCG@k"], roles: ["ai-ml", "retrieval-research"] as RoleFocus[] },
  { name: "Software Engineering", values: ["React", "Next.js", "TypeScript", "FastAPI", "Spring Boot", "Express.js", "REST APIs", "MongoDB", "MySQL", "Microservices", "Socket.IO"], roles: ["software-engineering"] as RoleFocus[] },
  { name: "Cloud & Infrastructure", values: ["AWS", "Docker", "Azure", "RabbitMQ", "Spring Cloud Config", "Git"], roles: ["software-engineering"] as RoleFocus[] },
  { name: "Languages", values: ["Python", "Java", "C", "C++", "SQL", "TypeScript", "JavaScript"], roles: ["software-engineering", "ai-ml"] as RoleFocus[] },
];

export const experience = [
  { role: "Web Developer", organization: "California Polytechnic State University - AIP", dates: "January 2026 - Present", summary: "Developed responsive, WCAG-aligned web interfaces and worked on accessibility-focused software for Cal Poly.", highlights: ["Used semantic HTML, structured heading hierarchies, descriptive alt text, and accessible color contrast.", "Partnered with DxHub AWS on an AI-powered executive dashboard.", "The dashboard monitors accessibility compliance across all Cal Poly colleges and more than 4,000 courses."], tags: ["Accessibility", "WCAG", "Web Development", "AWS"], roles: ["software-engineering"] as RoleFocus[] },
  { role: "Software Group Lead", organization: "Abbott x Society of Women Engineers", dates: "October 2025 - May 2026", summary: "Led embedded-systems development for an Arduino-based medical-device clip-closing mechanism.", highlights: ["Worked on microcontroller software.", "Supported hardware and software integration.", "Focused on more consistent actuation."], tags: ["Arduino", "Embedded Systems", "Hardware Integration"], roles: ["software-engineering"] as RoleFocus[] },
];

export const githubRepositoriesUrl = "https://github.com/Yun2828?tab=repositories";
export const linkedinUrl = "https://www.linkedin.com/in/yun-waddy-oo";
export const contactEmail = "yunwaddyoo01@gmail.com";

export const projects = [
  { title: "Semantic Book Recommender", category: "AI / Machine Learning", description: "Built a semantic recommendation engine using embeddings and cosine similarity.", highlights: ["Reduced query latency by 60% through optimized vector storage.", "Added zero-shot text classification for book categories.", "Achieved 78% classification accuracy."], technologies: ["Python", "LangChain", "Gradio", "OpenAI", "pandas", "NumPy", "Matplotlib"], github: "https://github.com/Yun2828/Semantic-Book-Recommender", roles: ["ai-ml", "retrieval-research"] as RoleFocus[] },
  { title: "Malicious URL Analyzer", category: "AI / Machine Learning", description: "Built a phishing-detection prototype combining rule-based URL analysis with machine-learning models.", highlights: ["Combined Logistic Regression and Random Forest.", "Generated interpretable risk scores.", "Detected more than 10 phishing indicators."], technologies: ["Python", "Streamlit", "Logistic Regression", "Random Forest", "Machine Learning"], github: "https://github.com/Yun2828/malicious-urls-analyzer", roles: ["ai-ml"] as RoleFocus[] },
  { title: "Stock Price Predictor", category: "AI / Machine Learning", description: "Built an LSTM model for stock-price prediction using historical market data.", highlights: ["Performed exploratory analysis on data from nine companies.", "Used a sliding 60-day input window.", "Built a five-layer LSTM.", "Used dropout and Adam optimization to reduce overfitting."], technologies: ["Python", "TensorFlow", "Keras", "pandas", "NumPy", "scikit-learn", "Matplotlib"], github: "https://github.com/Yun2828/Stock-Price-Prediction", roles: ["ai-ml"] as RoleFocus[] },
  { title: "Credit Card Fraud Detector", category: "AI / Machine Learning", description: "Built a Random Forest fraud detector for an imbalanced transaction dataset.", highlights: ["Achieved 97.47% precision.", "Achieved 87.01% F1 score.", "Evaluated false positives and false negatives with a confusion matrix."], technologies: ["Python", "pandas", "NumPy", "scikit-learn", "Matplotlib"], github: "https://github.com/Yun2828/Credit-Card-Fraud-Detection", roles: ["ai-ml"] as RoleFocus[] },
  { title: "FitnessIQ", category: "Software Engineering", status: "In Development", description: "Building a full-stack fitness platform for workout tracking and nutrition planning.", highlights: ["Designed a microservices backend with four core services.", "Uses Spring Boot and MySQL.", "Uses RabbitMQ for asynchronous communication.", "Uses Spring Cloud Config for centralized configuration.", "Integrates Gemini API for AI-assisted recommendations."], technologies: ["Java", "Spring Boot", "React", "MySQL", "Gemini API", "REST APIs", "Docker", "AWS", "RabbitMQ", "Microservices"], github: "https://github.com/Yun2828/FitnessIQ", roles: ["software-engineering", "ai-ml"] as RoleFocus[] },
  { title: "Markr", category: "Software Engineering", description: "Built a full-stack notes application supporting images, labels, and user-scoped data.", highlights: ["Owned the note-taking workflow across frontend, API, and database.", "Implemented collaborative note editing for authenticated users."], technologies: ["React", "Express.js", "MongoDB", "REST APIs", "Azure"], github: "https://github.com/307-group/notes-app", roles: ["software-engineering"] as RoleFocus[] },
  { title: "Real-time Chat Rooms", category: "Software Engineering", description: "Built a real-time chat application using Socket.IO and bidirectional communication.", highlights: ["Messages update without page reloads.", "Implemented backend routing with Express."], technologies: ["JavaScript", "Node.js", "Express", "Socket.IO", "HTML", "CSS"], github: "https://github.com/Yun2828/Real-Time-Chat-Rooms", roles: ["software-engineering"] as RoleFocus[] },
];

export const openSourceContributions = [
  { title: "Daft", description: "Contributed PySpark-compatible to_degrees and to_radians aliases to Daft's numeric expression API.", technologies: ["Python"], github: "https://github.com/Yun2828/Daft", roles: ["software-engineering"] as RoleFocus[] },
];

export type Activity = {
  event: string;
  date?: string;
  title?: string;
  description?: string;
  highlights: string[];
  technologies: string[];
  github?: string;
  devpost?: string;
  image?: string;
  images?: string[];
  imageAlt?: string;
  reflection?: string;
  roles: RoleFocus[];
};

export const activities: Activity[] = [
  { event: "AWS AI Summer Camp", title: "Accessibility VPAT Assessment", description: "Prototyped an AI-powered VPAT assessment workflow using AWS Bedrock to help standardize accessibility review. The workflow categorizes findings into four outcomes:", highlights: ["Ready", "Denied", "Human Review Required", "TAAP Required"], technologies: ["Python", "AWS Bedrock", "PyMuPDF", "Pytest"], github: undefined, image: undefined, images: ["/images/events/aws-ai-camp-discussion.png", "/images/events/aws-ai-camp-collaboration.png", "/images/events/aws-ai-camp-group.jpg"], imageAlt: "AWS AI Summer Camp photo", reflection: undefined, roles: ["ai-ml", "software-engineering"] as RoleFocus[] },
  { event: "Cal Hacks 2025", title: "GradPath", description: "An AI-powered platform that helps graduates plan careers and connect with relevant peers.", highlights: ["Built an LLM-powered peer-matching workflow using cosine similarity.", "Generated actionable subtasks from larger career goals.", "Added community chat and one-to-one messaging concepts."], technologies: ["React", "Python", "FastAPI", "ChromaDB", "Sentence Transformers", "Toolhouse AI"], github: "https://github.com/vincent3477/GraduateSupportApp", devpost: "https://devpost.com/software/new-graduate-support", image: undefined, images: [], imageAlt: "GradPath project interface", reflection: undefined, roles: ["software-engineering", "ai-ml"] as RoleFocus[] },
  { event: "Gemini 3 Hackathon", title: "FindMySpot", description: "A privacy-first map app that recommends nearby places using crowd levels, activity, and Gemini-powered search.", highlights: ["Created privacy-first, real-time crowd visualizations.", "Added activity-based discovery for restaurants, parks, libraries, and study spots.", "Integrated Gemini-powered search and recommendations."], technologies: ["TypeScript", "JavaScript", "Tailwind CSS", "Google Gemini API"], github: "https://github.com/Yun2828/FindMySpot", devpost: "https://devpost.com/software/findmyspot-zkmyin", image: undefined, images: [], imageAlt: "FindMySpot project interface", reflection: undefined, roles: ["ai-ml", "software-engineering"] as RoleFocus[] },
  { event: "KiroHacks", title: "Constraint IQ", description: "An AI-assisted tool that checks engineering drawings for manufacturing issues before production.", highlights: ["Analyzed engineering drawings for manufacturing-readiness issues.", "Connected upload, parsing, analysis, and visualization into one workflow.", "Focused on reducing rework, material waste, and production delays."], technologies: ["React", "Python", "FastAPI", "Docker", "Gemini API", "Kiro"], github: "https://github.com/Yun2828/ConstraintIQ", devpost: "https://devpost.com/software/constraint-iq", image: undefined, imageAlt: "Constraint IQ project image", reflection: undefined, roles: ["software-engineering", "ai-ml"] as RoleFocus[] },
];

export const events: Activity[] = [
  { event: "Google I/O 2026", date: "2026", title: "Google I/O 2026", description: "A colorful day of exploring new tools, creative demos, and the people behind the future of technology.", highlights: [], technologies: [], image: undefined, images: ["/images/events/google-io-photo-booth.jpg", "/images/events/google-io-android.jpg", "/images/events/google-io-latte.jpg", "/images/events/google-io-antigravity.jpg"], imageAlt: "Google I/O 2026 event photo", reflection: undefined, roles: ["ai-ml", "software-engineering"] as RoleFocus[] },
  { event: "AI Symposium 2026", date: "2026", title: "AI Symposium 2026", description: "An energizing day of talks from technology leaders and industry experts exploring practical advances in artificial intelligence.", highlights: [], technologies: [], image: "/images/events/ai-symposium.jpeg", imageAlt: "AI Symposium 2026 industry panel", reflection: undefined, roles: ["ai-ml"] as RoleFocus[] },
  { event: "GHC 2026", date: "2026", title: "GHC 2026", description: "Coming soon.", highlights: [], technologies: [], image: undefined, imageAlt: "GHC 2026 event photo", reflection: undefined, roles: ["software-engineering", "ai-ml"] as RoleFocus[] },
  { event: "INFORMS Annual Meeting 2026", date: "2026", title: "INFORMS Annual Meeting 2026", description: "Coming soon.", highlights: [], technologies: [], image: undefined, imageAlt: "INFORMS Annual Meeting 2026 event photo", reflection: undefined, roles: ["ai-ml", "retrieval-research"] as RoleFocus[] },
];

export const presentation = { title: "Session Scout: An AI-Based Decision Support Tool for Discovering Relevant Conference Presentations", status: "Oral presentation accepted", venue: "2026 INFORMS Annual Meeting", location: "San Francisco, California", authors: ["Puneet Agarwal", "T. Erb", "A. Hill", "Yun Waddy Oo"], manuscript: "In preparation", roles: ["retrieval-research", "ai-ml"] as RoleFocus[] };

export const certifications = [
  { title: "Data Science and ML Fundamentals Certificate", topics: ["Python", "pandas", "Unsupervised Learning", "Clustering", "Classification", "Regression", "Prediction"], roles: ["ai-ml"] as RoleFocus[] },
  { title: "AI / Machine Learning Certificate", topics: ["Python", "NLP", "LLMs", "LangChain", "Pinecone", "Speech Recognition"], roles: ["ai-ml", "retrieval-research"] as RoleFocus[] },
  { title: "AWS AI Practitioner Certificate", topics: ["Foundation Model Optimization", "AI Security", "Compliance", "Governance", "Generative AI Solutions"], roles: ["ai-ml", "software-engineering"] as RoleFocus[] },
];

export const education = { school: "California Polytechnic State University, San Luis Obispo", degree: "B.S. Computer Science", expectedGraduation: "May 2027", gpa: "3.8 / 4.0", coursework: ["Knowledge Discovery from Data", "Data Science", "Artificial Intelligence", "Machine Learning", "Database Systems", "System Programming", "Computer Security", "Object-Oriented Programming", "Data Structures", "Algorithms"], affiliations: ["Google Developer Program", "Society of Women Engineers", "Women in Software and Hardware", "CodePath", "Hack Your Summer"], roles: ["software-engineering", "ai-ml", "retrieval-research"] as RoleFocus[] };
