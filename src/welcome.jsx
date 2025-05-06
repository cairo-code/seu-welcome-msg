import React, { useState, useEffect, useRef } from 'react';
import { Copy, CheckCircle, Terminal, Key, User, Lock, AlertTriangle, Loader2 } from 'lucide-react';
import welcome from './welcome.jpeg';

const TerminalLoginPage = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { text: '██████╗ █████╗ ███████╗███████╗██╗  ██╗', type: 'logo' },
    { text: '██╔══██╗██╔══██╗██╔════╝██╔════╝██║  ██║', type: 'logo' },
    { text: '██████╔╝███████║███████╗███████╗███████║', type: 'logo' },
    { text: '██╔═══╝ ██╔══██║╚════██║╚════██║██╔══██║', type: 'logo' },
    { text: '██║     ██║  ██║███████║███████║██║  ██║', type: 'logo' },
    { text: '╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝', type: 'logo' },
    { text: ' ', type: 'system' },
    { text: 'Ancient Scrolls Terminal System v5.2.1', type: 'system' },
    { text: '© 1492 Royal Library of Alexandria', type: 'system' },
    { text: '----------------------------------------', type: 'divider' },
    { text: 'ENCRYPTED MESSAGE RECEIVED...', type: 'alert' },
    { text: 'King Caesar left a message for you:', type: 'system' },
    { text: '"The username is \'seu\'. Guard it with your life."', type: 'message' },
    { text: 'And a telegram from Mr. Morse (WW1 Communications Officer):', type: 'system' },
    { text: '"PASSWORD TRANSMITTED IN MY CODE: .--. .- ... ... .-- --- .-. -.."', type: 'message', copyable: true, copyText: '.--. .- ... ... .-- --- .-. -..' },
    { text: '----------------------------------------', type: 'divider' },
    { text: 'Initializing ancient knowledge database...', type: 'loading' },
    { text: '[■■■■■■■■■■■■■■■■■■■■] 100%', type: 'progress' },
    { text: 'Connection established to the Sacred Archives', type: 'success' },
    { text: 'Please login to continue...', type: 'system' },
    { text: 'login: ', type: 'prompt' }
  ]);
  const [loginState, setLoginState] = useState('username'); // 'username', 'password', 'logged-in'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [attemptCount, setAttemptCount] = useState(0);
  const [funnyMessage, setFunnyMessage] = useState('');
  const [copiedStates, setCopiedStates] = useState({});
  const [isGlitching, setIsGlitching] = useState(false);
  const [terminalTheme, setTerminalTheme] = useState('dark'); // 'dark', 'light', 'matrix'
  
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  // Correct credentials
  const correctUsername = 'seu';
  const correctPassword = 'PASSWORD';
  
  const funnyMessages = [
    "Congratulations! You've unlocked the ancient scrolls. Please don't spill coffee on them like the last guy.",
    "Access granted! Just so you know, the last person who accessed these files mysteriously turned into a cat. Probably unrelated.",
    "Welcome! Ancient knowledge loaded. Spoiler alert: They didn't have WiFi back then.",
    "You're in! Remember, sharing ancient secrets on social media voids your warranty.",
    "Access granted! Please note that any paradoxes created while reading ancient prophecies are your responsibility.",
    "Login successful! Now loading ancient wisdom... and cat hieroglyphics. They loved cats.",
    "Welcome to the archives! Remember: 'YOLO' wasn't a thing in ancient times. They called it 'Carpe Diem'."
  ];
  
  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);
  
  // Auto scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [history]);
  
  // Terminal glitch effect on error
  useEffect(() => {
    if (attemptCount > 0 && loginState === 'username') {
      setIsGlitching(true);
      const timer = setTimeout(() => setIsGlitching(false), 300);
      return () => clearTimeout(timer);
    }
  }, [attemptCount, loginState]);
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEnter();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (loginState === 'username' && input.length > 0) {
        if ('seu'.startsWith(input.toLowerCase())) {
          setInput('seu');
        }
      }
    } else if (e.key === 'ArrowUp' && loginState === 'username' && attemptCount > 0) {
      e.preventDefault();
      setInput(username);
    } else if (e.key === 'Escape') {
      // Cycle through terminal themes
      const themes = ['dark', 'light', 'matrix'];
      const currentIndex = themes.indexOf(terminalTheme);
      const nextIndex = (currentIndex + 1) % themes.length;
      setTerminalTheme(themes[nextIndex]);
    }
  };
  
  const handleEnter = () => {
    if (input.trim() === '') return;
    
    if (loginState === 'username') {
      setUsername(input);
      setHistory(prev => [
        ...prev,
        { text: input, type: 'user' },
        { text: 'password: ', type: 'prompt' }
      ]);
      setLoginState('password');
      setInput('');
    } else if (loginState === 'password') {
      setPassword(input);
      setHistory(prev => [
        ...prev,
        { text: '********', type: 'user' } // Mask password in history
      ]);
      
      // Process login after adding password to history
      setTimeout(() => {
        setAttemptCount(prev => prev + 1);
        
        if (username === correctUsername && input === correctPassword) {
          // Pick a random funny message
          const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
          setFunnyMessage(randomMessage);
          
          setHistory(prev => [
            ...prev,
            { text: 'Verifying credentials...', type: 'loading' },
            { text: 'Decrypting security protocols...', type: 'loading' },
            { text: '[■■■■■■■■■■■■■■■■■■■■] 100%', type: 'progress' },
            { text: 'Authentication successful!', type: 'success' },
            { text: 'Decrypting ancient knowledge...', type: 'loading' },
            { text: '[■■■■■■■■■■■■■■■■■■■■] 100%', type: 'progress' },
            { text: randomMessage, type: 'funny' },
            { text: 'Welcome to the Sacred Archives, Timekeeper!', type: 'success' }
          ]);
          setLoginState('logged-in');
        } else {
          const errorMessages = [
            'Authentication failed! Invalid credentials.',
            'Access denied! The ancient gods are displeased.',
            'ERROR: Time paradox detected. Invalid login.',
            `Wrong ${username !== correctUsername ? 'username' : 'password'}! The scrolls remain sealed.`,
            'Intruder alert! The system has detected unauthorized access.',
            'ERROR 418: I\'m a teapot. Also, wrong credentials.'
          ];
          
          const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];
          
          setHistory(prev => [
            ...prev,
            { text: 'Verifying credentials...', type: 'loading' },
            { text: randomError, type: 'error' },
            { text: 'Please try again...', type: 'system' },
            { text: 'login: ', type: 'prompt' }
          ]);
          setLoginState('username');
        }
        setInput('');
      }, 800);
    }
  };

  // Copy text to clipboard
  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      // Update copied state for this specific item
      setCopiedStates(prev => ({
        ...prev,
        [index]: true
      }));
      
      // Reset after 2 seconds
      setTimeout(() => {
        setCopiedStates(prev => ({
          ...prev,
          [index]: false
        }));
      }, 2000);
    });
  };

  // Animation for typing text effect
  const TypedText = ({ text }) => {
    const [displayText, setDisplayText] = useState('');
    
    useEffect(() => {
      let index = 0;
      const timer = setInterval(() => {
        if (index < text.length) {
          setDisplayText(prev => prev + text.charAt(index));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 30);
      
      return () => clearInterval(timer);
    }, [text]);
    
    return <span>{displayText}</span>;
  };

  // Get terminal theme classes
  const getThemeClasses = () => {
    switch (terminalTheme) {
      case 'light':
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-900',
          border: 'border-gray-300',
          headerBg: 'bg-gray-200',
          headerText: 'text-gray-700',
          prompt: 'text-blue-600',
          success: 'text-green-700',
          error: 'text-red-700',
          alert: 'text-yellow-700',
          message: 'text-blue-600',
          loading: 'text-purple-600',
          progress: 'text-cyan-600',
          funny: 'text-amber-600',
          divider: 'text-gray-400',
          logo: 'text-gray-800'
        };
      case 'matrix':
        return {
          bg: 'bg-black',
          text: 'text-green-400',
          border: 'border-green-700',
          headerBg: 'bg-green-900 bg-opacity-50',
          headerText: 'text-green-400',
          prompt: 'text-green-300',
          success: 'text-green-300',
          error: 'text-red-400',
          alert: 'text-yellow-300',
          message: 'text-green-200',
          loading: 'text-green-300',
          progress: 'text-green-400',
          funny: 'text-green-300',
          divider: 'text-green-700',
          logo: 'text-green-500'
        };
      default: // dark
        return {
          bg: 'bg-gray-900',
          text: 'text-gray-100',
          border: 'border-gray-700',
          headerBg: 'bg-gray-800',
          headerText: 'text-gray-300',
          prompt: 'text-green-400',
          success: 'text-green-500',
          error: 'text-red-500',
          alert: 'text-yellow-500',
          message: 'text-blue-400',
          loading: 'text-purple-400',
          progress: 'text-cyan-400',
          funny: 'text-amber-400',
          divider: 'text-gray-600',
          logo: 'text-gray-300'
        };
    }
  };

  const theme = getThemeClasses();

  return (
    <div className={`min-h-screen ${theme.bg} flex items-center justify-center p-4 ${terminalTheme === 'matrix' ? 'matrix-bg' : ''}`}>
      <div className="w-full max-w-4xl">
        <div className={`${theme.bg} border-2 ${theme.border} rounded-lg overflow-hidden shadow-2xl ${isGlitching ? 'terminal-glitch' : ''}`}>
          <div className={`${theme.headerBg} px-4 py-2 flex items-center border-b ${theme.border}`}>
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors cursor-pointer"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors cursor-pointer"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors cursor-pointer"></div>
            </div>
            <div className={`${theme.headerText} text-sm font-mono flex-grow text-center flex items-center justify-center`}>
              <Terminal className="mr-2 h-4 w-4" />
              <span>ancient-scrolls-terminal ~ zsh ~ 80x24</span>
            </div>
            <div className="text-xs opacity-50">
              {terminalTheme === 'matrix' ? 'MATRIX MODE' : terminalTheme === 'light' ? 'LIGHT MODE' : 'DARK MODE'}
            </div>
          </div>
          
          <div 
            ref={terminalRef}
            className={`p-4 h-[32rem] overflow-y-auto font-mono text-sm ${theme.text} terminal-content`}
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((item, i) => (
              <div key={i} className={`${
                item.type === 'system' ? theme.text : 
                item.type === 'user' ? 'text-white' : 
                item.type === 'prompt' ? theme.prompt : 
                item.type === 'success' ? theme.success :
                item.type === 'error' ? theme.error :
                item.type === 'alert' ? `${theme.alert} font-bold` :
                item.type === 'message' ? `${theme.message} italic` :
                item.type === 'loading' ? theme.loading :
                item.type === 'progress' ? theme.progress :
                item.type === 'funny' ? `${theme.funny} font-bold` :
                item.type === 'divider' ? theme.divider :
                item.type === 'logo' ? theme.logo : ''
              } ${item.type === 'alert' || item.type === 'success' || item.type === 'error' ? 'my-1' : ''} flex items-center`}>
                {item.type === 'prompt' && (
                  <span className="mr-2">
                    {loginState === 'password' ? (
                      <Lock className="h-3 w-3 inline-block" />
                    ) : (
                      <User className="h-3 w-3 inline-block" />
                    )}
                  </span>
                )}
                {item.type === 'error' && (
                  <AlertTriangle className="h-3 w-3 mr-1 inline-block" />
                )}
                {item.type === 'loading' && (
                  <Loader2 className="h-3 w-3 mr-1 inline-block animate-spin" />
                )}
                <span className="flex-grow">{item.text}</span>
                {item.copyable && (
                  <button 
                    onClick={() => handleCopy(item.copyText, i)}
                    className={`ml-2 ${theme.text} hover:opacity-100 opacity-70 transition-opacity focus:outline-none`}
                    title="Copy to clipboard"
                  >
                    {copiedStates[i] ? (
                      <CheckCircle size={16} className="text-green-500" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                )}
                {item.type === 'prompt' && loginState !== 'logged-in' && i === history.length - 1 && (
                  <span className="inline-block">
                    {loginState === 'password' ? '*'.repeat(input.length) : input}
                    <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity ml-0.5 ${theme.text}`}>▋</span>
                  </span>
                )}
              </div>
            ))}
            
            {loginState === 'logged-in' && (
              <div className={`mt-6 border ${theme.border} p-4 rounded ${terminalTheme === 'matrix' ? 'bg-black bg-opacity-70' : 'bg-gray-800'} animate-fade-in`}>
                <div className="text-center text-green-400 mb-4 text-lg flex flex-col items-center">
                  <Key className="h-8 w-8 mb-2" />
                  <span>ACCESS GRANTED</span>
                </div>
                <div className={`border-2 ${theme.border} p-1 rounded`}>
                  <img src={welcome} alt="Welcome" className="mx-auto max-h-64" />
                </div>
                <div className={`text-center ${theme.divider} mt-2`}>./welcome.jpeg</div>
                <div className="mt-4 text-center">
                  <TypedText text={funnyMessage} />
                </div>
                <div className="mt-6 text-center text-xs opacity-70">
                  Press ESC to change terminal theme
                </div>
              </div>
            )}
          </div>
          
          <div className={`${theme.headerBg} px-4 py-2 text-xs ${theme.headerText} font-mono flex justify-between border-t ${theme.border}`}>
            <span>
              {loginState === 'password' ? (
                <span className="flex items-center">
                  <Lock className="h-3 w-3 mr-1" /> Password: {input.length > 0 ? '*'.repeat(input.length) : '[Hidden]'}
                </span>
              ) : (
                <span className="flex items-center">
                  <User className="h-3 w-3 mr-1" /> User: {input || '[Not entered]'}
                </span>
              )}
            </span>
            <span className="text-right">
              <span className="hidden sm:inline">Tab: Autocomplete | </span>
              <span className="hidden sm:inline">Enter: Submit | </span>
              <span className="hidden sm:inline">↑: History | </span>
              ESC: Theme
            </span>
          </div>
          
          <input
            ref={inputRef}
            type={loginState === 'password' ? 'password' : 'text'}
            className="opacity-0 absolute"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
      </div>

      {/* Add some global styles */}
      <style jsx global>{`
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        
        .terminal-glitch {
          animation: glitch 0.1s linear infinite;
        }
        
        .matrix-bg {
          background: #000 url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        }
        
        .terminal-content {
          scrollbar-width: thin;
          scrollbar-color: ${terminalTheme === 'light' ? '#cbd5e0' : '#4a5568'} transparent;
        }
        
        .terminal-content::-webkit-scrollbar {
          width: 6px;
        }
        
        .terminal-content::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .terminal-content::-webkit-scrollbar-thumb {
          background-color: ${terminalTheme === 'light' ? '#cbd5e0' : '#4a5568'};
          border-radius: 3px;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default TerminalLoginPage;