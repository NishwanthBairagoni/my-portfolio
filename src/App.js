import React, { useState, useEffect } from "react";
import Header from './components/Header';
import Magnetic from './components/Magnetic';
import './App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Magnetic button effect logic
  useEffect(() => {
    const buttons = document.querySelectorAll('.magnetic-btn');
    let mouseX = 0, mouseY = 0;
    let raf;

    function handleMouseMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      buttons.forEach(btn => {
        const rect = btn.getBoundingClientRect();
        const btnX = rect.left + rect.width / 2;
        const btnY = rect.top + rect.height / 2;
        const dist = Math.hypot(mouseX - btnX, mouseY - btnY);
        const threshold = 120; // px
        if (dist < threshold) {
          // Calculate offset
          const strength = 0.22;
          const dx = (mouseX - btnX) * strength;
          const dy = (mouseY - btnY) * strength;
          btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.08)`;
          btn.classList.add('magnetic-hover');
        } else {
          btn.style.transform = '';
          btn.classList.remove('magnetic-hover');
        }
      });
      raf = requestAnimationFrame(() => {}); // keep animation smooth
    }

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      buttons.forEach(btn => {
        btn.style.transform = '';
        btn.classList.remove('magnetic-hover');
      });
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert(`Thank you for your message, ${formData.name}! I'll get back to you soon at ${formData.email}.`);
      setFormData({ name: '', email: '', company: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const portfolioData = {
    name: "Bairagoni Nishwanth",
    title: "Computer Science Student",
    subtitle: "Passionate about Technology & Innovation",
    aboutMe: "I'm a passionate Computer Science student with a strong foundation in programming and web development. I love exploring new technologies and building innovative solutions. Currently pursuing my degree while actively participating in coding competitions and open-source projects. I'm eager to learn, grow, and contribute to meaningful projects.",
    skills: {
      frontend: ["React", "Next.js", "Tailwind CSS", "Redux"],
      backend: ["Node.js", "Python", "MongoDB"],
      tools: ["Git", "Docker", "AWS", "CI/CD"]
    },
    academic: {
      institution: "CMR Institute of Technology",
      degree: "Computer Science",
      cgpa: 8.3,
      location: "India",
      achievements: ["Strong academic performance", "Consistent CGPA of 8.3", "Active in technical projects"]
    },
    certifications: [
      {
        name: "EduSkills Virtual Internships",
        issuer: "EduSkills",
        date: "2024",
        credentialId: "Multiple Cohorts",
        image: "https://img.icons8.com/color/96/000000/graduation-cap.png",
        description: "Completed multiple virtual internships in cutting-edge technologies",
        subCertifications: [
          {
            name: "Google Android Developer Virtual Internship",
            cohort: "Cohort 7",
            status: "Completed",
            verificationUrl: "#"
          },
          {
            name: "Google AI-ML Virtual Internship", 
            cohort: "Cohort 8",
            status: "Completed",
            verificationUrl: "#"
          },
          {
            name: "AWS Cloud Virtual Internship",
            cohort: "Cohort 9", 
            status: "Completed",
            verificationUrl: "#"
          }
        ]
      },
      {
        name: "Certified System Administrator",
        issuer: "ServiceNow",
        date: "2025",
        credentialId: "CSA-2025",
        image: "https://img.icons8.com/ios-filled/100/000000/settings.png",
        description: "ServiceNow Certified System Administrator - Demonstrates expertise in ServiceNow platform administration and configuration",
        verificationUrl: "https://drive.google.com/file/d/1i0HXrRHrNPvQJI29Se4oElAeNrgd2pP4/view?usp=sharing"
      },
      {
        name: "React.js Certification",
        issuer: "Meta",
        date: "2024",
        credentialId: "REACT-2024",
        image: "https://img.icons8.com/color/96/000000/react-native.png",
        description: "React.js development certification - Demonstrates expertise in building modern web applications with React",
        verificationUrl: "#"
      },
      {
        name: "MongoDB Certification",
        issuer: "MongoDB University",
        date: "2024",
        credentialId: "MONGODB-2024",
        image: "https://img.icons8.com/color/96/000000/mongodb.png",
        description: "MongoDB database certification - Demonstrates expertise in NoSQL database management and development",
        verificationUrl: "#"
      }
    ],
    codingProfiles: [
      {
        platform: "LeetCode",
        username: "nishwanth2003",
        rating: 1484,
        problemsSolved: 148,
        rank: "Top 49.47%",
        badge: "50 Days Badge 2025",
        profileUrl: "https://leetcode.com/u/nishwanth2003/",
        achievements: ["Solved 148 problems", "50 Days Badge 2025", "93 active days", "Max streak: 11 days", "32 contests attended"],
        languages: ["Java", "C", "Python"],
        image: "https://leetcode.com/static/images/LeetCode_Sharing.png"
      },
      {
        platform: "Codeforces",
        username: "nishwanth2003",
        rating: 1100,
        problemsSolved: 45,
        rank: "Pupil",
        badge: "Pupil",
        profileUrl: "https://codeforces.com/profile/nishwanth2003",
        achievements: ["Pupil Rating", "45+ problems solved", "Active contest participant", "Algorithm enthusiast"],
        languages: ["C++", "Python", "Java"],
        image: "https://cdn.iconscout.com/icon/free/png-256/free-codeforces-3628695-3029920.png"
      },
      {
        platform: "HackerRank",
        username: "nishwanth2003",
        rating: 3,
        problemsSolved: 120,
        rank: "3 Stars",
        badge: "Problem Solving",
        profileUrl: "https://hackerrank.com/nishwanth2003",
        achievements: ["3 Stars in Problem Solving", "120+ problems solved", "Python Certificate", "Algorithm mastery"],
        languages: ["Python", "Java", "C++"],
        image: "https://via.placeholder.com/300x200/00EA64/FFFFFF?text=HackerRank"
      },
      {
        platform: "GitHub",
        username: "NishwanthBairagoni",
        rank: "Active Contributor",
        badge: "Contributor",
        profileUrl: "https://github.com/NishwanthBairagoni",
        achievements: ["Data Structures & Algorithms", "Web Development (React, Firebase)", "Full Stack Projects", "Hackathons & Coding Challenges"],
        languages: ["Java", "Python", "C", "React"],
        image: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
      }
    ],
    projects: [
      {
        name: "Grocery Application",
        description: "A comprehensive grocery management application with inventory tracking, shopping lists, and budget management features.",
        technologies: ["React", "Node.js", "MongoDB", "Express"],
        github: "https://github.com/NishwanthBairagoni/CofeeShop-FrontEnd",
        live: "https://grocery-app-demo.com",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTBCOTgxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Hcm9jZXJ5PC90ZXh0Pjwvc3ZnPg=="
      },
      {
        name: "Heart Disease Prediction",
        description: "Machine learning application that predicts heart disease risk using patient data and medical parameters.",
        technologies: ["Python", "Machine Learning", "Flask", "Scikit-learn"],
        github: "https://github.com/NishwanthBairagoni/Heart-Disease-Prediction",
        live: "https://heart-disease-prediction-demo.com",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRUY0NDQ0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5IZWFydCBNTDwvdGV4dD48L3N2Zz4="
      },
      {
        name: "Task Scheduler",
        description: "Intelligent task scheduling application with priority management, deadline tracking, and productivity analytics.",
        technologies: ["React", "Node.js", "MongoDB", "JavaScript"],
        github: "https://github.com/NishwanthBairagoni/WSMA-Exp",
        live: "https://task-scheduler-demo.com",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjM0I4MkY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5UYXNrPC90ZXh0Pjwvc3ZnPg=="
      },
      {
        name: "Plagiarism Checker",
        description: "Advanced plagiarism detection tool that compares documents and provides similarity analysis with detailed reports.",
        technologies: ["Python", "NLP", "Flask", "Text Processing"],
        github: "https://github.com/NishwanthBairagoni/Plagiarism_Detector",
        live: "https://plagiarism-checker-demo.com",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOEI1Q0Y2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5QbGFnaWFyaXNtPC90ZXh0Pjwvc3ZnPg=="
      }
    ],
    contactInfo: {
      email: "nishwanth.bairagoni@gmail.com",
      linkedin: "https://linkedin.com/in/nishwanth2003",
      github: "https://github.com/nishwanth2003",
      twitter: "https://twitter.com/nishwanth2003"
    }
  };

  return (
    <div className={`App ${isLoaded ? 'loaded' : ''}`}>
      {/* Header Component */}
      <Header />

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">{portfolioData.name}</h1>
            <h2 className="hero-subtitle">{portfolioData.title}</h2>
            <p className="hero-description">{portfolioData.subtitle}</p>
            <div className="hero-buttons">
              <Magnetic>
                <a href="#projects" className="btn btn-primary magnetic">View My Work</a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" className="btn btn-secondary magnetic">Get In Touch</a>
              </Magnetic>
            </div>
          </div>
          <div className="hero-image">
            <div className="profile-card">
              <div className="profile-avatar">
                <div className="avatar-placeholder">BN</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>{portfolioData.aboutMe}</p>
            </div>
            <div className="about-stats">
              <div className="stat">
                <h3>10+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat">
                <h3>148</h3>
                <p>Problems Solved</p>
              </div>
              <div className="stat">
                <h3>{portfolioData.academic.cgpa}</h3>
                <p>CGPA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Frontend</h3>
              <div className="skill-tags">
                {portfolioData.skills.frontend.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <h3>Backend</h3>
              <div className="skill-tags">
                {portfolioData.skills.backend.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <h3>Tools & Others</h3>
              <div className="skill-tags">
                {portfolioData.skills.tools.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="certifications">
        <div className="container">
          <h2 className="section-title">Certifications</h2>
          <div className="certifications-grid">
            {portfolioData.certifications.map((cert, index) => (
              <div key={index} className="certification-card">
                <div className="certification-image">
                  <img src={cert.image} alt={cert.name} />
                </div>
                <div className="certification-content">
                  <h3>{cert.name}</h3>
                  <p>{cert.description}</p>
                  <p><strong>Issued by:</strong> {cert.issuer}</p>
                  <p><strong>Date:</strong> {cert.date}</p>
                                    <p><strong>Credential ID:</strong> {cert.credentialId}</p>
                  
                  {cert.subCertifications && (
                    <div className="sub-certifications">
                      <h4>Completed Internships:</h4>
                      <div className="sub-certifications-list">
                        {cert.subCertifications.map((subCert, subIndex) => (
                          <div key={subIndex} className="sub-certification-item">
                            <div className="sub-certification-info">
                              <strong>{subCert.name}</strong>
                              <span>{subCert.cohort} ({subCert.status})</span>
                            </div>
                            <a href={subCert.verificationUrl} target="_blank" rel="noopener noreferrer" className="btn btn-small btn-primary">
                              View Credential
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {!cert.subCertifications && (
                    <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer" className="btn btn-small btn-primary">
                      View Credential
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coding Profiles Section */}
      <section id="coding-profiles" className="coding-profiles">
        <div className="container">
          <h2 className="section-title">Coding Profiles & Achievements</h2>
          <div className="coding-profiles-grid">
            {portfolioData.codingProfiles.map((profile, index) => (
              <div key={index} className="coding-profile-card">
                <div className="coding-profile-image">
                  <img src={profile.image} alt={profile.platform} />
                </div>
                <div className="coding-profile-content">
                  <div className="coding-profile-header">
                    <h3>{profile.platform}</h3>
                    <span className="coding-profile-badge">{profile.badge}</span>
                  </div>
                  {profile.platform !== "GitHub" && (
                    <div className="coding-profile-stats">
                      <div className="coding-stat">
                        <span className="stat-label">Rating</span>
                        <span className="stat-value">{profile.rating}</span>
                      </div>
                      <div className="coding-stat">
                        <span className="stat-label">Problems</span>
                        <span className="stat-value">{profile.problemsSolved}</span>
                      </div>
                      <div className="coding-stat">
                        <span className="stat-label">Rank</span>
                        <span className="stat-value">{profile.rank}</span>
                      </div>
                    </div>
                  )}
                  <div className="coding-profile-achievements">
                    <h4>Achievements</h4>
                    <ul>
                      {profile.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="coding-profile-languages">
                    <h4>Languages</h4>
                    <div className="language-tags">
                      {profile.languages.map((language, languageIndex) => (
                        <span key={languageIndex} className="language-tag">{language}</span>
                      ))}
                    </div>
                  </div>
                  <div className="coding-profile-links">
                    <a 
                      href={profile.profileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-small btn-primary"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {portfolioData.projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.name} />
                </div>
                <div className="project-content">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-small">GitHub</a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-small btn-primary">Live Demo</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <p>I'm actively seeking internship opportunities and exciting projects to enhance my skills and gain real-world experience. Feel free to reach out for collaborations, mentorship, or any opportunities!</p>
              
              {/* Contact Form */}
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Your full name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="your.email@example.com"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="company">Company / Organization</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company" 
                    placeholder="Your company or organization"
                    value={formData.company}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                </div>
                
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
              
              <div className="contact-links">
                <a href={`mailto:${portfolioData.contactInfo.email}`} className="contact-link">
                  <span className="contact-icon">📧</span>
                  {portfolioData.contactInfo.email}
                </a>
                <a href={portfolioData.contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
                  <span className="contact-icon">💼</span>
                  LinkedIn
                </a>
                <a href={portfolioData.contactInfo.github} target="_blank" rel="noopener noreferrer" className="contact-link">
                  <span className="contact-icon">🐙</span>
                  GitHub
                </a>
                <a href={portfolioData.contactInfo.twitter} target="_blank" rel="noopener noreferrer" className="contact-link">
                  <span className="contact-icon">🐦</span>
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 {portfolioData.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
