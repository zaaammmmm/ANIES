import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTopAnime } from '../services/jikanApi';
import Header from './Header';
import Loader from './Loader';

const Dashboard = () => {
  const [topAnime, setTopAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        const data = await getTopAnime(1, 10);
        setTopAnime(data.data);
      } catch (error) {
        console.error('Failed to fetch top anime:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopAnime();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background-light dark:bg-background-dark">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-primary-light dark:text-text-primary-dark">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col w-full max-w-6xl flex-1 px-4 md:px-10">
              <Header />

              {/* Main Content */}
              <main className="flex flex-col gap-12 px-4 md:px-10 py-5 mt-16 page-transition">
                {/* Trending Anime */}
                <section className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-[#191022] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Anime Trending</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topAnime.slice(0, 6).map((anime, index) => (
                      <Link key={anime.mal_id} to={`/anime/${anime.mal_id}`} className={`relative group overflow-hidden rounded-lg cursor-pointer animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
                        <div className="bg-cover bg-center flex flex-col gap-3 rounded-lg justify-end p-4 aspect-[3/4] transition-transform duration-300 group-hover:scale-105" style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 60%), url("${anime.images.jpg.large_image_url}")` }}>
                          <p className="text-white text-base font-bold leading-tight line-clamp-2">{anime.title}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>

                {/* Latest Episodes */}
                <section className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-[#191022] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Episode Terbaru</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topAnime.slice(6, 10).map((anime, index) => (
                      <Link key={anime.mal_id} to={`/anime/${anime.mal_id}`} className={`relative group overflow-hidden rounded-lg cursor-pointer animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
                        <div className="bg-cover bg-center flex flex-col gap-3 rounded-lg justify-end p-4 aspect-[3/4] transition-transform duration-300 group-hover:scale-105" style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 60%), url("${anime.images.jpg.large_image_url}")` }}>
                          <p className="text-white text-base font-bold leading-tight line-clamp-2">{anime.title}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              </main>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-background-dark border-t border-white/10 mt-16">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-white/50 text-sm">© 2024 AnimeStream. All rights reserved.</p>
            <div className="mt-4 flex justify-center space-x-6">
              <Link className="text-white/50 hover:text-white" to="/about">Tentang Kami</Link>
              <a className="text-white/50 hover:text-white" href="#">Kontak</a>
              <a className="text-white/50 hover:text-white" href="#">Kebijakan Privasi</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
