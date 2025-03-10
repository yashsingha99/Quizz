import React, { useState } from "react";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <footer className="bg-gray-800 text-white w-full">
      {/* Mobile footer (collapsed by default) */}
      <div className="md:hidden">
        <div className="p-4 flex justify-between items-center">
          <div>
            <a
              href="https://github.com/yashsingha99/Quizz"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <GitHubIcon style={{ fontSize: 24 }} />
            </a>
          </div>
          
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-white focus:outline-none"
          >
            {expanded ? "Close ▲" : "Menu ▼"}
          </button>
        </div>
        
        {expanded && (
          <div className="p-4 flex flex-col space-y-4 border-t border-gray-700">
            <div className="text-left">
              <p>Contact us: singhaly914@gmail.com</p>
            </div>
            
            <div className="flex flex-col space-y-2">
              <Link to="/about" className="hover:text-gray-400">About Us</Link>
              <Link to="/contact" className="hover:text-gray-400">Contact Us</Link>
              <Link to="/terms" className="hover:text-gray-400">Terms of Service</Link>
              <Link to="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
            </div>
            
            <div className="text-sm text-gray-400">
              © 2024 All Rights Reserved
            </div>
          </div>
        )}
      </div>
      
      {/* Desktop footer */}
      <div className="hidden md:flex flex-wrap items-center justify-between p-6">
        <div className="w-full lg:w-auto mb-4 lg:mb-0">
          <div className="flex items-center">
            <span>Contact us: </span>
            <a 
              href="mailto:singhaly914@gmail.com" 
              className="ml-2 underline hover:text-gray-400"
            >
              singhaly914@gmail.com
            </a>
          </div>
        </div>

        <div className="w-full lg:w-auto flex justify-center mb-4 lg:mb-0">
          <a
            href="https://github.com/yashsingha99/Quizz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 flex items-center"
          >
            <GitHubIcon style={{ fontSize: 28 }} />
            <span className="ml-2">View on GitHub</span>
          </a>
        </div>

        <div className="w-full lg:w-auto">
          <div className="flex flex-wrap justify-center lg:justify-end gap-x-4">
            <Link to="/about" className="hover:text-gray-400">About Us</Link>
            <Link to="/contact" className="hover:text-gray-400">Contact Us</Link>
            <Link to="/terms" className="hover:text-gray-400">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
          </div>
          <div className="mt-2 text-sm text-gray-400 text-center lg:text-right">
            © 2024 All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;