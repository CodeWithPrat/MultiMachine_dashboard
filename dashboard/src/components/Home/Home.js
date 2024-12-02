import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { machineData, companyInfo } from './Data';
import { 
  Home as HomeIcon, 
  Book, 
  ArrowRight, 
  Facebook, 
  Youtube, 
  Linkedin,
  Factory,
  Sun,
  Moon,
  Cpu,
  Zap,
  Layers,
  Globe,
  Compass
} from 'lucide-react';

const HomePage = () => {
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Enhanced theme detection and persistence
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    setIsDarkMode(savedTheme === 'dark' || (!savedTheme && prefersDarkMode));
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  // Animated background component
  const AnimatedBackground = () => (
    <div 
      className={`fixed inset-0 z-[-1] transition-all duration-1000 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' 
          : 'bg-gradient-to-br from-blue-50 via-white to-gray-100'
      }`}
    >
      <div className="absolute inset-0 opacity-20 animate-pulse">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 animate-[shimmer_10s_infinite]"></div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen relative overflow-x-hidden ${
      isDarkMode 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-white text-gray-900'
    } transition-colors duration-500`}>
      <AnimatedBackground />

      {/* Responsive Navigation with Advanced Styling */}
      <nav className={`sticky top-0 z-50 shadow-lg transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-800/80 backdrop-blur-lg' 
          : 'bg-white/80 backdrop-blur-lg'
      }`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Brand Section */}
          <div className="flex items-center space-x-4">
      <Factory className={`h-10 w-10 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
      <div className="flex flex-col">
        <h1 className={`text-xl md:text-2xl font-bold ${
          isDarkMode ? 'text-gray-100' : 'text-gray-800'
        }`}>
          {companyInfo.name}
        </h1>
        
        <h6 className={`text-sm md:text-xl ${
          isDarkMode ? 'text-gray-100' : 'text-gray-800'
        }`}>
          {companyInfo.dept}
        </h6>
      </div>
    </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className={`p-2 rounded-lg ${
                isDarkMode 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>

          {/* Navigation Menu */}
          <div className={`
            fixed inset-0 z-40 flex flex-col md:flex-row md:static md:justify-end 
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
            md:items-center space-y-4 md:space-y-0 md:space-x-6 
             md:bg-transparent 
            transition-transform duration-300 ease-in-out
            p-6 md:p-0
          `}>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              {/* Navigation Links */}
              <Link 
                to="/" 
                className={`flex items-center ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-blue-400' 
                    : 'text-gray-700 hover:text-blue-600'
                } transition-colors group`}
                onClick={() => setIsMenuOpen(false)}
              >
                <HomeIcon className="mr-2 group-hover:rotate-12 transition" /> 
                Home
              </Link>

              <Link 
                to="/docs" 
                className={`flex items-center ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-blue-400 bg-gray-800' 
                    : 'text-gray-700 hover:text-blue-600 bg-white'
                } transition-colors group`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Book className="mr-2 group-hover:rotate-6 transition" /> 
                Docs
              </Link>

              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun /> : <Moon />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content with Responsive Grid Layout */}
      <main className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Machine Grid Section */}
        <section className="md:col-span-2 space-y-8">
          {/* Machine Selection Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {machineData.map((machine) => (
              <div 
                key={machine.id} 
                onClick={() => setSelectedMachine(machine)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl p-4"
              >
                <img 
                  src={machine.image} 
                  alt={machine.name}
                  className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-shadow"
                />
                <h3 className={`text-center mt-4 font-semibold ${
                  isDarkMode 
                    ? 'text-blue-300 group-hover:text-blue-200' 
                    : 'text-amber-100 group-hover:text-blue-600'
                } transition-colors`}>
                  {machine.name}
                </h3>
              </div>
            ))}
          </div>

          {/* Detailed Machine Information */}
          {selectedMachine && (
            <div className={`
              rounded-2xl p-6 
              ${isDarkMode 
                ? 'bg-gray-800 border-blue-900 border' 
                : 'bg-white shadow-xl'
              } transition-all duration-300`}
            >
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <img 
                  src={selectedMachine.image} 
                  alt={selectedMachine.name}
                  className="w-full rounded-xl shadow-lg"
                />
                <div>
                  <h2 className={`text-3xl font-bold mb-4 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-700'
                  }`}>
                    {selectedMachine.name}
                  </h2>
                  <p className={`mb-6 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {selectedMachine.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedMachine.specs).map(([key, value]) => (
                      <div 
                        key={key} 
                        className={`p-3 rounded-lg border-l-4 transition ${
                          isDarkMode 
                            ? 'bg-gray-700 border-blue-600 text-gray-200' 
                            : 'bg-blue-50 border-blue-500 text-gray-800'
                        }`}
                      >
                        <strong className="block text-sm uppercase mb-1">{key}:</strong>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                  <Link 
                    to={selectedMachine.detailLink}
                    className={`mt-6 inline-flex items-center ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                    } px-6 py-3 rounded-lg transition-all`}
                  >
                    Explore Details <ArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Side Information Panel */}
        <aside className={`
          rounded-xl p-6 
          ${isDarkMode 
            ? 'bg-gray-800 border-gray-700 border' 
            : 'bg-gray-100 shadow-lg'
          } transition-all duration-300 space-y-6`}
        >
          <div className="flex items-center space-x-4">
            <Cpu className={`h-10 w-10 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`} />
            <h3 className={`text-xl font-semibold ${
              isDarkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>
              Technology Insights
            </h3>
          </div>
          
          <div className="space-y-4">
            {[
              { Icon: Zap, title: 'High Performance', desc: 'Advanced manufacturing systems' },
              { Icon: Layers, title: 'Integrated Solutions', desc: 'Seamless industry connectivity' },
              { Icon: Globe, title: 'Global Standards', desc: 'ISO certified processes' }
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex items-start space-x-4">
                <Icon className={`h-8 w-8 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                } mt-1`} />
                <div>
                  <h4 className={`font-semibold ${
                    isDarkMode ? 'text-blue-300' : 'text-blue-700'
                  }`}>{title}</h4>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </main>

      {/* Footer with Responsive Layout */}
      <footer className={`py-12 ${
        isDarkMode ? 'bg-black' : 'bg-gray-900'
      } text-white`}>
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          {/* Company Information */}
          <div>
            <h3 className="text-2xl font-bold text-blue-500 mb-4">
              {companyInfo.name}
            </h3>
            <p className="text-gray-400">{companyInfo.address}</p>
            <p className="text-gray-400">{companyInfo.Phone}</p>
            <p className="text-gray-400">{companyInfo.email}</p>
            <p className="text-sm mt-2 text-gray-500">
              © {companyInfo.copyrightYear} All Rights Reserved.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-6">
            {[
              { Icon: Facebook, href: companyInfo.socialMedia.google, color: 'text-blue-500 hover:text-blue-400' },
              { Icon: Youtube, href: companyInfo.socialMedia.youtube, color: 'text-red-500 hover:text-red-400' },
              { Icon: Linkedin, href: companyInfo.socialMedia.linkedin, color: 'text-blue-600 hover:text-blue-500' }
            ].map(({ Icon, href, color }) => (
              <a 
                key={href}
                href={href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${color} transition-colors text-2xl`}
              >
                <Icon className="h-8 w-8" />
              </a>
            ))}
          </div>

          {/* Quick Links */}
          <div className="text-right">
            <h4 className="text-lg font-semibold text-blue-500 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Contact'].map(link => (
                <li key={link}>
                  <Link 
                    to={`/${link.toLowerCase()}`} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;