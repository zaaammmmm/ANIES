import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));
  const [pageTitle, setPageTitle] = useState('AnimeStream');
  const [activePage, setActivePage] = useState('/');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      html.classList.add('dark');
      setIsDarkMode(true);
    }
  };

  useEffect(() => {
    const path = location.pathname;
    let title = 'AnimeStream';

    switch (path) {
      case '/':
      case '/dashboard':
        title = 'Beranda - AnimeStream';
        break;
      case '/anime-list':
        title = 'Daftar Anime - AnimeStream';
        break;
      case '/schedule':
        title = 'Jadwal Rilis - AnimeStream';
        break;
      case '/genres':
        title = 'Genre Anime - AnimeStream';
        break;
      case '/search':
        title = 'Pencarian - AnimeStream';
        break;
      case '/about':
        title = 'Tentang Kami - AnimeStream';
        break;
      case '/login':
        title = 'Login - AnimeStream';
        break;
      default:
        if (path.startsWith('/anime/')) {
          title = 'Detail Anime - AnimeStream';
        } else if (path.startsWith('/episodes/')) {
          title = 'Daftar Episode - AnimeStream';
        } else if (path.startsWith('/player/')) {
          title = 'Player - AnimeStream';
        }
        break;
    }

    setPageTitle(title);
    setActivePage(path);
    document.title = title;
  }, [location.pathname]);

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-secondary-light dark:border-secondary-dark px-4 md:px-10 py-3 fixed top-0 left-0 right-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm transition-all duration-300">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-4 text-text-primary-light dark:text-text-primary-dark hover:scale-105 transition-transform">
          <div className="size-6 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">ANIES</h2>
        </Link>
        <nav className="hidden md:flex items-center gap-9">
          <Link className={`text-sm font-medium leading-normal hover:scale-105 transition-all ${activePage === '/' || activePage === '/dashboard' ? 'text-primary' : 'hover:text-primary'}`} to="/">Beranda</Link>
          <Link className={`text-sm font-medium leading-normal hover:scale-105 transition-all ${activePage === '/anime-list' ? 'text-primary' : 'hover:text-primary'}`} to="/anime-list">Daftar Anime</Link>
          <Link className={`text-sm font-medium leading-normal hover:scale-105 transition-all ${activePage === '/schedule' ? 'text-primary' : 'hover:text-primary'}`} to="/schedule">Jadwal</Link>
          <Link className={`text-sm font-medium leading-normal hover:scale-105 transition-all ${activePage === '/genres' ? 'text-primary' : 'hover:text-primary'}`} to="/genres">Genre</Link>
        </nav>
      </div>
      <div className="flex flex-1 justify-end items-center gap-4">
        <form onSubmit={handleSearch} className="flex flex-col min-w-40 !h-10 max-w-64">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
            <div className="text-text-secondary-light dark:text-text-secondary-dark flex bg-secondary-light dark:bg-secondary-dark items-center justify-center pl-3 rounded-l-lg border-r-0">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary border-none bg-secondary-light dark:bg-secondary-dark h-full placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal transition-all"
              placeholder="Cari anime..."
            />
          </div>
        </form>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg bg-secondary-light dark:bg-secondary-dark hover:bg-primary/10 transition-all"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <span className="material-symbols-outlined text-text-primary-light dark:text-text-primary-dark">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
        {/* <Link to="/login" className="hidden sm:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 hover:scale-105 transition-all">
          <span className="truncate">Login</span>
        </Link> */}
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 hover:scale-110 transition-transform cursor-pointer" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAxd9SPnjig9KMaK6AUTo8mtiBHUWxHmWNaROj2VIRp-yJw7MDlBC_RPaAy6_qBY8PjOSKWrluSQt4beVwAAwSP68BMjj2OwOSh0ceswDsWfrhSvgPlxtXBGWF6KroNgCqYtf6BdgGONUhtoMsopnb8QMvsM9pUo0sgvLnjGr0Fh-9-LAv917o_9Yr4KaSAMKXDu6uw8qcWvfpmTqXKnQ_OfK8E8Tq9Rj61Ek1Bzu_0lQOPk67ndJ580fs8F78sT07PTjBk7pJXZw");' }}></div>
      </div>
    </header>
  );
};

export default Header;
