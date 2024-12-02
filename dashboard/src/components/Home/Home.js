import React, { useState, useEffect } from 'react';
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
  Moon
} from 'lucide-react';

const HomePage = () => {
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply theme to body and handle theme persistence
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Check for saved theme preference on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  // Theme toggle function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900'} flex flex-col transition-colors duration-300`}>
      {/* Advanced Navbar */}
      <nav className={`${isDarkMode ? 'bg-gray-800 shadow-2xl' : 'bg-white shadow-xl'} p-4 flex justify-between items-center sticky top-0 z-50 transition-colors duration-300`}>
        <div className="flex items-center space-x-4">
          <Factory className={`h-10 w-10 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <span className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          Central Manufacturing Technology Institute
          </span>
        </div>
        
        <div className="flex items-center space-x-6">
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

          <Link 
            to="/" 
            className={`flex items-center ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} transition-colors group`}
          >
            <HomeIcon className="mr-2 group-hover:rotate-12 transition" /> 
            <span className="font-medium">Home</span>
          </Link>
          
          <div className="relative">
            <select 
              onChange={(e) => {
                const machine = machineData.find(m => m.id === parseInt(e.target.value));
                setSelectedMachine(machine);
              }}
              className={`appearance-none ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-gray-200 focus:ring-blue-500' 
                  : 'bg-white border-gray-300 text-gray-700 focus:ring-blue-500'
              } border-2 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:border-transparent transition`}
            >
              <option value="">Select Machine</option>
              {machineData.map((machine) => (
                <option 
                  key={machine.id} 
                  value={machine.id}
                  className={isDarkMode ? 'bg-gray-800 text-gray-200' : ''}
                >
                  {machine.name}
                </option>
              ))}
            </select>
            <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          
          <Link 
            to="/docs" 
            className={`flex items-center ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} transition-colors group`}
          >
            <Book className="mr-2 group-hover:rotate-6 transition" /> 
            <span className="font-medium">Docs</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className={`text-4xl font-extrabold text-center mb-12 ${
          isDarkMode 
            ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400' 
            : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
        }`}>
          {selectedMachine 
            ? `${selectedMachine.name} Insights` 
            : 'Industrial Machine Visualization Platform'}
        </h1>

        {/* Industrial Layout Simulation */}
        <div className={`${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white'} rounded-2xl shadow-2xl p-8 mb-12 overflow-hidden transition-colors duration-300`}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {machineData.map((machine) => (
              <div 
                key={machine.id} 
                onClick={() => setSelectedMachine(machine)}
                className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10"
              >
                <div className={`absolute inset-0 ${
                  isDarkMode ? 'bg-blue-900' : 'bg-blue-500'
                } opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300`}></div>
                <img 
                  src={machine.image} 
                  alt={machine.name}
                  className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow"
                />
                <p className={`text-center mt-3 font-semibold ${
                  isDarkMode 
                    ? 'text-gray-300 group-hover:text-blue-300' 
                    : 'text-gray-700 group-hover:text-blue-600'
                } transition-colors`}>
                  {machine.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Machine Details */}
        {selectedMachine && (
          <div className={`${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white'} rounded-2xl shadow-2xl p-8 transition-colors duration-300`}>
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <img 
                src={selectedMachine.image} 
                alt={selectedMachine.name}
                className="w-full md:w-1/3 h-64 object-cover rounded-lg shadow-lg"
              />
              <div className="flex-1">
                <h2 className={`text-3xl font-bold mb-4 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-700'
                }`}>{selectedMachine.name}</h2>
                <p className={`${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                } mb-6 leading-relaxed`}>{selectedMachine.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedMachine.specs).map(([key, value]) => (
                    <div 
                      key={key} 
                      className={`${
                        isDarkMode 
                          ? 'bg-gray-700 border-blue-600 hover:bg-gray-600' 
                          : 'bg-blue-50 border-blue-500 hover:bg-blue-100'
                      } p-3 rounded-lg border-l-4 transition`}
                    >
                      <strong className={`block mb-1 ${
                        isDarkMode ? 'text-blue-300' : 'text-blue-800'
                      }`}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </strong> 
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{value}</span>
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
      </main>

      {/* Enhanced Footer */}
      <footer className={`${isDarkMode ? 'bg-black' : 'bg-gray-900'} text-white py-12 transition-colors duration-300`}>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div>
            <h3 className={`text-2xl font-bold mb-4 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-500'
            }`}>{companyInfo.name}</h3>
            <p className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>{companyInfo.address}</p>
            <p className={`text-sm mt-2 ${
              isDarkMode ? 'text-gray-600' : 'text-gray-500'
            }`}>
              © {companyInfo.copyrightYear} All Rights Reserved.
            </p>
          </div>
          
          <div className="text-center">
            <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`}>Connect with Us</p>
            <div className="flex justify-center space-x-6">
              {[
                { Icon: Facebook, href: companyInfo.socialMedia.google, 
                  color: isDarkMode ? 'text-blue-500 hover:text-blue-400' : 'text-blue-400 hover:text-blue-300' 
                },
                { Icon: Youtube, href: companyInfo.socialMedia.youtube, 
                  color: isDarkMode ? 'text-red-600 hover:text-red-500' : 'text-red-500 hover:text-red-400' 
                },
                { Icon: Linkedin, href: companyInfo.socialMedia.linkedin, 
                  color: isDarkMode ? 'text-blue-700 hover:text-blue-600' : 'text-blue-600 hover:text-blue-500' 
                }
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
          </div>
          
          <div className="text-right">
            <h4 className={`text-lg font-semibold mb-4 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-500'
            }`}>Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Contact'].map(link => (
                <li key={link}>
                  <Link 
                    to={`/${link.toLowerCase()}`} 
                    className={`${
                      isDarkMode 
                        ? 'text-gray-500 hover:text-white' 
                        : 'text-gray-400 hover:text-white'
                    } transition-colors`}
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