import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTopAnime } from '../services/jikanApi';
import Header from './Header';
import Loader from './Loader';

const AnimeList = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isChangingPage, setIsChangingPage] = useState(false);

  useEffect(() => {
    const fetchAnimeList = async () => {
      try {
        setIsChangingPage(true);
        const data = await getTopAnime(page, 24);
        setAnimeList(data.data);
      } catch (error) {
        console.error('Failed to fetch anime list:', error);
      } finally {
        setLoading(false);
        setIsChangingPage(false);
      }
    };

    fetchAnimeList();
  }, [page]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background-light dark:bg-background-dark">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-primary-light dark:text-text-primary-dark">
      <Header />
      <main className="px-4 md:px-10 py-8 mt-16 page-transition">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Daftar Anime</h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">Temukan anime favoritmu</p>
          </div>

          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 transition-opacity duration-300 ${isChangingPage ? 'opacity-50' : 'opacity-100'}`}>
            {animeList.map((anime, index) => (
              <Link key={anime.mal_id} to={`/anime/${anime.mal_id}`} className="group relative overflow-hidden rounded-xl shadow-lg dark:shadow-black/20 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <img alt={anime.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" src={anime.images.jpg.large_image_url} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-white font-bold text-base leading-tight line-clamp-2">{anime.title}</h3>
                  <p className="text-gray-300 text-xs mt-1">{anime.type} • {anime.episodes} Episodes</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1 || isChangingPage}
              className={`px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50 transition-all duration-200 ${isChangingPage ? 'animate-pulse' : 'hover:scale-105'}`}
            >
              {isChangingPage ? <Loader size="sm" /> : 'Previous'}
            </button>
            <span className="mx-4 flex items-center">Page {page}</span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={isChangingPage}
              className={`px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50 transition-all duration-200 ${isChangingPage ? 'animate-pulse' : 'hover:scale-105'}`}
            >
              {isChangingPage ? <Loader size="sm" /> : 'Next'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnimeList;
