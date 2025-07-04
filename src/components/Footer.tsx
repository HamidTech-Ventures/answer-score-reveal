
import { Copyright, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-2">QuizMaster</h3>
            <p className="text-gray-300 text-sm">
              Test your knowledge with our comprehensive quiz platform
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">
                About Us
              </p>
              <p className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">
                Privacy Policy
              </p>
              <p className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">
                Terms of Service
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-white mb-3">Contact</h4>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm">support@quizmaster.com</p>
              <p className="text-gray-300 text-sm">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-300 text-sm">
              <Copyright className="w-4 h-4" />
              <span>
                {currentYear} QuizMaster. All rights reserved.
              </span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-300 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span>for knowledge seekers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
