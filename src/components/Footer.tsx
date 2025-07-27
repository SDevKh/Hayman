
import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold text-white mb-4">
              <span className="text-blue-400">HAY</span>MAN
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              We're a passionate team of developers and designers creating exceptional 
              digital experiences that drive business growth and user engagement.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Github size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Web Development</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">E-commerce</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Mobile Apps</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">UI/UX Design</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Consulting</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#portfolio" className="text-gray-300 hover:text-blue-400 transition-colors">Portfolio</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-blue-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} HAYMAN. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
