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
      frontend: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux"],
      backend: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB"],
      tools: ["Git", "Docker", "AWS", "CI/CD", "Jest"]
    },
    certifications: [
      {
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2024",
        credentialId: "AWS-123456789",
        image: "https://via.placeholder.com/80x80/FF9900/FFFFFF?text=AWS",
        description: "Demonstrates expertise in designing distributed systems on AWS",
        verificationUrl: "https://aws.amazon.com/verification"
      },
      {
        name: "Google Cloud Professional Developer",
        issuer: "Google Cloud",
        date: "2023",
        credentialId: "GCP-987654321",
        image: "https://via.placeholder.com/80x80/4285F4/FFFFFF?text=GCP",
        description: "Validates ability to build scalable applications on Google Cloud",
        verificationUrl: "https://cloud.google.com/certification"
      },
      {
        name: "Microsoft Certified: Azure Developer Associate",
        issuer: "Microsoft",
        date: "2023",
        credentialId: "AZ-204-12345",
        image: "https://via.placeholder.com/80x80/0078D4/FFFFFF?text=Azure",
        description: "Proves skills in developing solutions for Microsoft Azure",
        verificationUrl: "https://www.microsoft.com/en-us/learning"
      },
      {
        name: "MongoDB Certified Developer",
        issuer: "MongoDB University",
        date: "2023",
        credentialId: "MDB-456789",
        image: "https://via.placeholder.com/80x80/47A248/FFFFFF?text=MongoDB",
        description: "Validates expertise in MongoDB application development",
        verificationUrl: "https://university.mongodb.com/course_completion"
      },
      {
        name: "React Developer Certification",
        issuer: "Meta",
        date: "2023",
        credentialId: "REACT-789123",
        image: "https://via.placeholder.com/80x80/61DAFB/FFFFFF?text=React",
        description: "Certifies advanced React development skills and best practices",
        verificationUrl: "https://www.meta.com/certification"
      },
      {
        name: "Node.js Certified Developer",
        issuer: "OpenJS Foundation",
        date: "2022",
        credentialId: "NODE-321654",
        image: "https://via.placeholder.com/80x80/339933/FFFFFF?text=Node.js",
        description: "Demonstrates proficiency in Node.js development",
        verificationUrl: "https://openjsf.org/certification"
      }
    ],
    codingProfiles: [
      {
        platform: "LeetCode",
        username: "alexjohnson",
        rating: 1850,
        problemsSolved: 450,
        rank: "Top 5%",
        badge: "Knight",
        profileUrl: "https://leetcode.com/alexjohnson",
        achievements: ["Solved 450+ problems", "Knight Badge", "Top 5% ranking"],
        languages: ["Python", "JavaScript", "Java"],
        image: "https://via.placeholder.com/300x200/FFA116/FFFFFF?text=LeetCode"
      },
      {
        platform: "Codeforces",
        username: "alexjohnson",
        rating: 2100,
        problemsSolved: 380,
        rank: "Expert",
        badge: "Expert",
        profileUrl: "https://codeforces.com/profile/alexjohnson",
        achievements: ["Expert Rating", "380+ problems solved", "Contest participant"],
        languages: ["C++", "Python", "Java"],
        image: "https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Codeforces"
      },
      {
        platform: "HackerRank",
        username: "alexjohnson",
        rating: 5,
        problemsSolved: 280,
        rank: "5 Stars",
        badge: "Problem Solving",
        profileUrl: "https://hackerrank.com/alexjohnson",
        achievements: ["5 Stars in Problem Solving", "280+ problems solved", "Python Certificate"],
        languages: ["Python", "Java", "C++"],
        image: "https://via.placeholder.com/300x200/00EA64/FFFFFF?text=HackerRank"
      },
      {
        platform: "GitHub",
        username: "alexjohnson",
        rating: 0,
        problemsSolved: 0,
        rank: "Active Contributor",
        badge: "Contributor",
        profileUrl: "https://github.com/alexjohnson",
        achievements: ["50+ repositories", "100+ contributions", "Open source projects"],
        languages: ["JavaScript", "Python", "TypeScript"],
        image: "https://via.placeholder.com/300x200/181717/FFFFFF?text=GitHub"
      }
    ],
    projects: [
      {
        name: "E-Commerce Platform",
        description: "A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
        technologies: ["React", "Node.js", "Stripe", "MongoDB"],
        github: "https://github.com/yourusername/ecommerce",
        live: "https://ecommerce-demo.com",
        image: "https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=E-Commerce"
      },
      {
        name: "Task Management App",
        description: "A collaborative task management application with real-time updates and team features.",
        technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
        github: "https://github.com/yourusername/task-manager",
        live: "https://task-manager-demo.com",
        image: "https://via.placeholder.com/300x200/10B981/FFFFFF?text=Task+Manager"
      },
      {
        name: "Portfolio Website",
        description: "A modern, responsive portfolio website built with React and CSS animations.",
        technologies: ["React", "CSS3", "JavaScript"],
        github: "https://github.com/yourusername/portfolio",
        live: "https://portfolio-demo.com",
        image: "https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=Portfolio"
      }
    ],
    contactInfo: {
      email: "alex.johnson@email.com",
      linkedin: "https://linkedin.com/in/alexjohnson",
      github: "https://github.com/alexjohnson",
      twitter: "https://twitter.com/alexjohnson"
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
                <h3>50+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat">
                <h3>450+</h3>
                <p>Problems Solved</p>
              </div>
              <div className="stat">
                <h3>3.8</h3>
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
                  <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer" className="btn btn-small btn-primary">
                    Verify Credential
                  </a>
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
