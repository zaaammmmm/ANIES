import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { searchAnime } from '../services/jikanApi';
import ErrorMessage from './ErrorMessage';
import Footer from './Footer';
import Loader from './Loader';
import { AnimeCardSkeleton } from './SkeletonLoader';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const q = searchParams.get('q');
    if (q) {
      setQuery(q);
      handleSearch(q, 1);
    }
  }, [location.search]);

  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    if (query.trim()) {
      const timer = setTimeout(() => {
        setCurrentPage(1);
        setResults([]);
        handleSearch(query, 1);
      }, 500);
      setDebounceTimer(timer);
    } else {
      setResults([]);
      setError(null);
    }

    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [query]);

  const handleSearch = async (searchQuery, page = 1) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await searchAnime(searchQuery, page);
      if (page === 1) {
        setResults(data.data || []);
      } else {
        setResults(prev => [...prev, ...(data.data || [])]);
      }
      setCurrentPage(page);
      setHasNextPage(data.pagination?.has_next_page || false);
    } catch (err) {
      setError('Gagal mencari anime. Silakan coba lagi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (debounceTimer) {
      clearTimeout(debounceTimer);
      setDebounceTimer(null);
    }
    setCurrentPage(1);
    setResults([]);
    handleSearch(query, 1);
  };

  const loadNextPage = () => {
    if (hasNextPage && !loading) {
      handleSearch(query, currentPage + 1);
    }
  };

  const retrySearch = () => {
    handleSearch(query, currentPage);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pt-20 page-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
            Cari Anime
          </h1>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari anime..."
                className="flex-1 px-4 py-3 border border-secondary-light dark:border-secondary-dark rounded-l-lg bg-card-light dark:bg-card-dark text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-primary text-white rounded-r-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              >
                {loading ? <Loader size="sm" /> : 'Cari'}
              </button>
            </div>
          </form>
        </div>

        {error && <ErrorMessage message={error} onRetry={retrySearch} />}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {loading && results.length === 0 ? (
            Array.from({ length: 20 }).map((_, index) => (
              <AnimeCardSkeleton key={index} />
            ))
          ) : (
            results.map((anime, index) => (
              <Link
                key={anime.mal_id}
                to={`/anime/${anime.mal_id}`}
                className={`group bg-card-light dark:bg-card-dark rounded-xl overflow-hidden shadow-lg hover:shadow-2xl dark:shadow-black/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-fade-in`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={anime.images?.jpg?.image_url}
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
                <div className="p-4">
                  <h3 className="font-semibold text-text-primary-light dark:text-text-primary-dark line-clamp-2 mb-2 text-sm">
                    {anime.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-text-secondary-light dark:text-text-secondary-dark">
                    <span>{anime.type}</span>
                    <span>⭐ {anime.score || 'N/A'}</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {results.length === 0 && !loading && query && !error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 text-text-secondary-light dark:text-text-secondary-dark">
              <span className="material-symbols-outlined">search_off</span>
            </div>
            <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
              Tidak ada hasil
            </h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              Tidak ditemukan anime untuk "{query}"
            </p>
          </div>
        )}

        {hasNextPage && results.length > 0 && !loading && (
          <div className="text-center mt-12">
            <button
              onClick={loadNextPage}
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105"
            >
              Muat Lebih Banyak
            </button>
          </div>
        )}

        {loading && results.length > 0 && (
          <div className="text-center mt-8">
            <Loader />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Search;
