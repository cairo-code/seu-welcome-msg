import React, { useState, useEffect, useRef } from 'react';
import { Copy, CheckCircle } from 'lucide-react';

const TerminalLoginPage = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { text: 'Ancient Scrolls Terminal System v5.2', type: 'system' },
    { text: '© 1492 Royal Library of Alexandria', type: 'system' },
    { text: '----------------------------------------', type: 'system' },
    { text: 'ENCRYPTED MESSAGE RECEIVED...', type: 'alert' },
    { text: 'King Caesar left a message for you:', type: 'system' },
    { text: '"The username is \'seu\'. Guard it with your life."', type: 'message' },
    { text: 'And a telegram from Mr. Morse (WW1 Communications Officer):', type: 'system' },
    { text: '"PASSWORD TRANSMITTED IN MY CODE: .--. .- ... ... .-- --- .-. -.."', type: 'message', copyable: true, copyText: '.--. .- ... ... .-- --- .-. -..' },
    { text: '----------------------------------------', type: 'system' },
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
            `Wrong ${username !== correctUsername ? 'username' : 'password'}! The scrolls remain sealed.`
          ];
          
          const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];
          
          setHistory(prev => [
            ...prev,
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
      }, 50);
      
      return () => clearInterval(timer);
    }, [text]);
    
    return <span>{displayText}</span>;
  };
  
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-black border-2 border-gray-700 rounded-lg overflow-hidden shadow-2xl">
          <div className="bg-gray-800 px-4 py-2 flex items-center">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors cursor-pointer"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors cursor-pointer"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors cursor-pointer"></div>
            </div>
            <div className="text-gray-300 text-sm font-mono flex-grow text-center">
              ancient-scrolls ~ zsh ~ 80x24
            </div>
          </div>
          
          <div 
            ref={terminalRef}
            className="p-4 h-96 overflow-y-auto font-mono text-sm"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((item, i) => (
              <div key={i} className={`${
                item.type === 'system' ? 'text-gray-400' : 
                item.type === 'user' ? 'text-white' : 
                item.type === 'prompt' ? 'text-green-400' : 
                item.type === 'success' ? 'text-green-500' :
                item.type === 'error' ? 'text-red-500' :
                item.type === 'alert' ? 'text-yellow-500 font-bold' :
                item.type === 'message' ? 'text-blue-400 italic' :
                item.type === 'loading' ? 'text-purple-400' :
                item.type === 'progress' ? 'text-cyan-400' :
                item.type === 'funny' ? 'text-amber-400 font-bold' : ''
              } ${item.type === 'alert' || item.type === 'success' || item.type === 'error' ? 'my-1' : ''} flex items-center`}>
                <span className="flex-grow">{item.text}</span>
                {item.copyable && (
                  <button 
                    onClick={() => handleCopy(item.copyText, i)}
                    className="ml-2 text-gray-500 hover:text-white transition-colors focus:outline-none"
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
                    {input}
                    <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity ml-0.5`}>▋</span>
                  </span>
                )}
              </div>
            ))}
            
            {loginState === 'logged-in' && (
              <div className="mt-6 border border-gray-700 p-4 rounded bg-gray-900 animate-fade-in">
                <div className="text-center text-green-400 mb-4 text-lg">ACCESS GRANTED</div>
                <div className="border-2 border-green-700 p-1 rounded">
                  <img src="/api/placeholder/480/320" alt="Welcome" className="mx-auto" />
                </div>
                <div className="text-center text-gray-400 mt-2">./welcome.png</div>
                <div className="mt-4 text-center text-amber-400">
                  <TypedText text={funnyMessage} />
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 font-mono flex justify-between">
            <span>{loginState === 'password' ? 'Password: [Hidden]' : `User: ${input}`}</span>
            <span>Tab: Autocomplete | Enter: Submit | ↑: History</span>
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
    </div>
  );
};

export default TerminalLoginPage;