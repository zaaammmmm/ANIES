import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Loader from './Loader';

// Utility functions for playlist management
const getPlaylist = () => {
  try {
    const playlist = localStorage.getItem('animePlaylist');
    return playlist ? JSON.parse(playlist) : [];
  } catch (error) {
    console.error('Error loading playlist:', error);
    return [];
  }
};

const savePlaylist = (playlist) => {
  try {
    localStorage.setItem('animePlaylist', JSON.stringify(playlist));
  } catch (error) {
    console.error('Error saving playlist:', error);
  }
};

const addToPlaylist = (anime) => {
  const playlist = getPlaylist();
  const exists = playlist.some(item => item.mal_id === anime.mal_id);

  if (!exists) {
    playlist.push(anime);
    savePlaylist(playlist);
    return true;
  }
  return false;
};

const removeFromPlaylist = (malId) => {
  const playlist = getPlaylist();
  const filtered = playlist.filter(item => item.mal_id !== malId);
  savePlaylist(filtered);
  return filtered;
};

const isInPlaylist = (malId) => {
  const playlist = getPlaylist();
  return playlist.some(item => item.mal_id === malId);
};

const Playlist = () => {
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlaylist = () => {
      const data = getPlaylist();
      setPlaylist(data);
      setLoading(false);
    };

    loadPlaylist();
  }, []);

  const handleRemoveFromPlaylist = (malId) => {
    const updatedPlaylist = removeFromPlaylist(malId);
    setPlaylist(updatedPlaylist);
  };

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
            <h1 className="text-3xl font-bold mb-4">Playlist Saya</h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              Koleksi anime favorit Anda ({playlist.length} anime)
            </p>
          </div>

          {playlist.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4 text-text-secondary-light dark:text-text-secondary-dark">
                <span className="material-symbols-outlined">playlist_add</span>
              </div>
              <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                Playlist Kosong
              </h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
                Tambahkan anime favorit Anda ke playlist dari halaman detail anime
              </p>
              <Link
                to="/anime-list"
                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all"
              >
                <span className="material-symbols-outlined mr-2">search</span>
                Jelajahi Anime
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
              {playlist.map((anime, index) => (
                <div key={anime.mal_id} className="group relative bg-card-light dark:bg-card-dark rounded-xl overflow-hidden shadow-lg dark:shadow-black/20 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <Link to={`/anime/${anime.mal_id}`}>
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url}
                        alt={anime.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="font-bold text-white text-sm line-clamp-2 mb-1">
                          {anime.title}
                        </h3>
                        <div className="flex items-center justify-between text-xs text-white/80">
                          <span>{anime.type}</span>
                          <span>⭐ {anime.score || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="p-4">
                    <h3 className="font-semibold text-text-primary-light dark:text-text-primary-dark line-clamp-2 mb-2 text-sm">
                      {anime.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-text-secondary-light dark:text-text-secondary-dark mb-3">
                      <span>{anime.type}</span>
                      <span>⭐ {anime.score || 'N/A'}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveFromPlaylist(anime.mal_id)}
                      className="w-full flex items-center justify-center px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-lg transition-all"
                    >
                      <span className="material-symbols-outlined text-sm mr-1">remove</span>
                      Hapus dari Playlist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Playlist;
export { addToPlaylist, getPlaylist, isInPlaylist, removeFromPlaylist };

