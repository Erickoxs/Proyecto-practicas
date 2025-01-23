// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-10">
      <div className="max-w-screen-xl mx-auto text-center">
        <p className="mb-4">&copy; 2024 Your Company. All rights reserved.</p>
        <div className="flex justify-center space-x-6">
          <a href="https://facebook.com" className="text-gray-300 hover:text-white">
            Facebook
          </a>
          <a href="https://twitter.com" className="text-gray-300 hover:text-white">
            Twitter
          </a>
          <a href="https://linkedin.com" className="text-gray-300 hover:text-white">
            LinkedIn
          </a>
          <a href="https://github.com" className="text-gray-300 hover:text-white">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;