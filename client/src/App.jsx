import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SchemaMarkup from './components/SchemaMarkup';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import ContactCTA from './components/ContactCTA';
import BlogPreview from './components/BlogPreview';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ServicesPage from './pages/ServicesPage';
import AdminPage from './pages/AdminPage';

function Home() {
  return (
    <>
      <Helmet>
        <title>Nirp Jung Shah | Business Developer & Digital Marketing Strategist — Nepal</title>
        <meta name="description" content="Nirp Jung Shah helps NGOs, startups, banks, and businesses across Nepal grow with business development, digital marketing, and AI automation. Based in Kathmandu." />
        <link rel="canonical" href="https://nirp.com.np" />
      </Helmet>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <BlogPreview />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SchemaMarkup />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
