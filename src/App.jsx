import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import Work from './components/Work.jsx';
import Studio from './components/Studio.jsx';
import Automation from './components/Automation.jsx';
import Experience from './components/Experience.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';
import Backdrop from './components/Backdrop.jsx';
import usePageEffects from './usePageEffects.js';

export default function App() {
  usePageEffects();
  return (
    <>
      <Backdrop />
      <Nav />
      <Hero />
      <Marquee />
      <main>
        <Work />
        <Studio />
        <Automation />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
