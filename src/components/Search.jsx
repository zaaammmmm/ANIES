import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAnimeGenres, searchAnime } from '../services/jikanApi';
import Header from './Header';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getAnimeGenres();
        setGenres(data.data);
      } catch (error) {
        console.error('Failed to fetch genres:', error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query && selectedGenres.length === 0 && !status && !type && !year) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        let searchQuery = query;
        if (selectedGenres.length > 0) {
          searchQuery += `&genres=${selectedGenres.join(',')}`;
        }
        if (status) {
          searchQuery += `&status=${status}`;
        }
        if (type) {
          searchQuery += `&type=${type}`;
        }
        if (year) {
          searchQuery += `&start_date=${year}-01-01&end_date=${year}-12-31`;
        }

        const data = await searchAnime(searchQuery, page, 24);
        setResults(data.data);
      } catch (error) {
        console.error('Failed to search anime:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, selectedGenres, status, type, year, page]);

  const handleGenreChange = (genreId) => {
    setSelectedGenres(prev =>
      prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-primary-light dark:text-text-primary-dark">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Filter & Urutkan</h2>
                <button onClick={() => {
                  setQuery('');
                  setSelectedGenres([]);
                  setStatus('');
                  setType('');
                  setYear('');
                }} className="text-sm text-primary hover:underline">Reset</button>
              </div>
              <div className="space-y-6 bg-white dark:bg-white/5 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                <div>
                  <h3 className="font-semibold mb-3">Genre</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {genres.map((genre) => (
                      <label key={genre.mal_id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedGenres.includes(genre.mal_id)}
                          onChange={() => handleGenreChange(genre.mal_id)}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span>{genre.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Status</h3>
                  <div className="space-y-2">
                    {['', 'airing', 'complete', 'upcoming'].map((s) => (
                      <label key={s} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          value={s}
                          checked={status === s}
                          onChange={(e) => setStatus(e.target.value)}
                          className="h-4 w-4 text-primary focus:ring-primary"
                        />
                        <span>{s === '' ? 'Semua' : s.charAt(0).toUpperCase() + s.slice(1)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Tipe</h3>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full text-sm bg-background-light dark:bg-background-dark border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="">Semua Tipe</option>
                    <option value="tv">TV</option>
                    <option value="movie">Movie</option>
                    <option value="ova">OVA</option>
                    <option value="special">Special</option>
                  </select>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Tahun Rilis</h3>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full text-sm bg-background-light dark:bg-background-dark border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="">Semua Tahun</option>
                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
              <h1 className="text-xl font-bold">Menampilkan {results.length} hasil</h1>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Urutkan:</span>
                <select className="text-sm bg-white dark:bg-white/5 border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all py-1.5">
                  <option>Popularitas</option>
                  <option>Skor Tertinggi</option>
                  <option>A-Z</option>
                  <option>Z-A</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div>Loading...</div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {results.map((anime) => (
                  <Link key={anime.mal_id} to={`/anime/${anime.mal_id}`} className="group relative overflow-hidden rounded-xl shadow-lg dark:shadow-black/20">
                    <img alt={anime.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" src={anime.images.jpg.large_image_url} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h3 className="text-white font-bold text-base leading-tight line-clamp-2">{anime.title}</h3>
                      <p className="text-gray-300 text-xs mt-1">{anime.type} • {anime.episodes} Episodes</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {results.length > 0 && (
              <nav aria-label="Pagination" className="flex items-center justify-center mt-10">
                <button onClick={() => setPage(page - 1)} disabled={page === 1} className="relative inline-flex items-center px-2 py-2 text-gray-400 bg-white dark:bg-white/5 rounded-l-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/10 disabled:opacity-50">
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <span className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-primary border border-primary">{page}</span>
                <button onClick={() => setPage(page + 1)} className="relative inline-flex items-center px-2 py-2 text-gray-400 bg-white dark:bg-white/5 rounded-r-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/10">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </nav>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Search;
