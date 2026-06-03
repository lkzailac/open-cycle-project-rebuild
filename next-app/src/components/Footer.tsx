import "./Footer.css";

export default function Footer() {
  return (
    <div id="footer-container">
      <div id="names-container">
        <div className="name-container">
          <div>Laura Zailac</div>
          <div className="socials-container">
            <a href="https://github.com/lkzailac" className="github_logo" target="_blank" rel="noreferrer">
              <img src="https://res.cloudinary.com/dbu0tmeuc/image/upload/v1620051310/gihub_copy_hy6uip.png" alt="GitHub" />
            </a>
            <a href="https://www.linkedin.com/in/laura-zailac/" className="github_logo" target="_blank" rel="noreferrer">
              <img src="https://res.cloudinary.com/dbu0tmeuc/image/upload/v1620007908/linkedin_dviuyr.png" alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>
      <div id="copyright">©2021 Open/ /Cycle/ /Project. All rights reserved.</div>
    </div>
  );
}
