import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-surface py-8 mt-8">
      <div className="max-w-full mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left section: About */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h4 className="text-lg font-semibold text-primary">InterviewSystem</h4>
            <p className="text-muted mt-2 text-sm">
              A platform that connects companies and job seekers for automated interviews.
            </p>
          </div>

          {/* Right section: Social media icons */}
          <div className="flex space-x-6">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-primary-light"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-primary-light"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-primary-light"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://www.github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-primary-light"
            >
              <FaGithub size={24} />
            </a>
          </div>
        </div>

        {/* Footer bottom section */}
        <div className="text-center mt-6 text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} InterviewSystem. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
