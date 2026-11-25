export default function Nav() {
  return (
    <nav className="nav" id="nav">
      <div className="wrap">
        <a className="logo" href="#top" aria-label="Back to top">harley<span className="acc">.qa</span><span className="cur">_</span></a>
        <div className="links">
          <a href="#work">Work</a>
          <a href="#studio">AI QA Studio</a>
          <a href="#automation">Automation</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a className="btn pri" href="#contact">Hire me</a>
        </div>
      </div>
    </nav>
  );
}
