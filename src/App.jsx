import { useState, useEffect } from 'react';
import { createContext } from 'react';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Navbar from './components/Navbar';
import PageNotFound from './pages/404';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'preline/preline';

export const AppContext = createContext();

function App() {
  const savedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(savedTheme || "dark");

  useEffect(() => {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
      setTimeout(() => {
        document.documentElement.classList.add("enable-transitions");
      }, 0);
  }, [theme]);

  const switchTheme = () => {
      setTheme(theme === "dark" ? "light" : "dark");
  };
  
  return (
      <AppContext.Provider value={{ theme, switchTheme }}>
        <BrowserRouter>
        <div className="bg-zinc-100 dark:bg-zinc-900">
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        </BrowserRouter>
        
      </AppContext.Provider>
  )
}

export default App;