import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="dark:bg-background-dark border-t border-secondary-light dark:border-white/10 mt-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="material-symbols-outlined text-primary text-3xl">play_circle</span>
              <span className="font-bold text-xl text-text-primary-light dark:text-white">AnimeStream</span>
            </div>
            <p className="text-text-secondary-light dark:text-white/70 text-sm mb-4">
              Platform streaming anime terdepan dengan koleksi lengkap dan fitur canggih untuk pengalaman menonton yang tak tertandingi.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-text-secondary-light dark:text-white/50 hover:text-text-primary-light dark:hover:text-white transition-colors">
                <span className="material-symbols-outlined">facebook</span>
              </a>
              <a href="#" className="text-text-secondary-light dark:text-white/50 hover:text-text-primary-light dark:hover:text-white transition-colors">
                <span className="material-symbols-outlined">twitter</span>
              </a>
              <a href="#" className="text-text-secondary-light dark:text-white/50 hover:text-text-primary-light dark:hover:text-white transition-colors">
                <span className="material-symbols-outlined">instagram</span>
              </a>
              <a href="#" className="text-text-secondary-light dark:text-white/50 hover:text-text-primary-light dark:hover:text-white transition-colors">
                <span className="material-symbols-outlined">youtube</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-text-primary-light dark:text-white font-semibold mb-4">Navigasi</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-text-secondary-light dark:text-white/50 hover:text-text-primary-light dark:hover:text-white transition-colors text-sm">Beranda</Link></li>
              <li><Link to="/anime-list" className="text-text-secondary-light dark:text-white/50 hover:text-text-primary-light dark:hover:text-white transition-colors text-sm">Daftar Anime</Link></li>
              <li><Link to="/genres" className="text-text-secondary-light dark:text-white/50 hover:text-text-primary-light dark:hover:text-white transition-colors text-sm">Genre</Link></li>
              <li><Link to="/schedule" className="text-text-secondary-light dark:text-white/50 hover:text-text-primary-light dark:hover:text-white transition-colors text-sm">Jadwal</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-text-primary-light dark:text-white font-semibold mb-4">Bantuan</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-text-secondary-light dark:text-white/50 hover:text-text-primary-light dark:hover:text-white transition-colors text-sm">Tentang Kami</Link></li>
              <li><a href="#" className="text-text-secondary-light dark:text-white/50 hover:text-text-primary-light dark:hover:text-white transition-colors text-sm">Kontak</a></li>
              <li><a href="#" className="text-text-secondary-light dark:text-white/50 hover:text-text-primary-light dark:hover:text-white transition-colors text-sm">FAQ</a></li>
              <li><a href="#" className="text-text-secondary-light dark:text-white/50 hover:text-text-primary-light dark:hover:text-white transition-colors text-sm">Kebijakan Privasi</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-secondary-light dark:border-white/10 mt-8 pt-8 text-center">
          <p className="text-text-secondary-light dark:text-white/50 text-sm">© 2025 ANIES. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
