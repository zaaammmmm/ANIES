import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAnimeByGenre, getAnimeGenres } from '../services/jikanApi';
import Header from './Header';
import Loader from './Loader';

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [animeByGenre, setAnimeByGenre] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getAnimeGenres();
        setGenres(data.data);
      } catch (error) {
        console.error('Failed to fetch genres:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    if (selectedGenre) {
      const fetchAnimeByGenre = async () => {
        try {
          const data = await getAnimeByGenre(selectedGenre.mal_id, 1, 24);
          setAnimeByGenre(data.data);
        } catch (error) {
          console.error('Failed to fetch anime by genre:', error);
        }
      };

      fetchAnimeByGenre();
    }
  }, [selectedGenre]);

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
            <h1 className="text-3xl font-bold mb-4">Genre Anime</h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">Temukan anime favoritmu berdasarkan genre</p>
          </div>

          {!selectedGenre ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                {genres.map((genre) => (
                  <div
                    key={genre.mal_id}
                    className="bg-card-light dark:bg-card-dark rounded-lg p-6 text-center cursor-pointer hover:bg-primary/10 transition-all group"
                    onClick={() => setSelectedGenre(genre)}
                  >
                    <div className="text-4xl mb-4 text-primary group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">
                        {genre.name === 'Action' ? 'swords' :
                         genre.name === 'Adventure' ? 'explore' :
                         genre.name === 'Comedy' ? 'mood' :
                         genre.name === 'Drama' ? 'theater_comedy' :
                         genre.name === 'Fantasy' ? 'auto_stories' :
                         genre.name === 'Romance' ? 'favorite' :
                         genre.name === 'Sci-Fi' ? 'rocket' :
                         genre.name === 'Horror' ? 'visibility_off' :
                         genre.name === 'Mystery' ? 'search' :
                         genre.name === 'Slice of Life' ? 'home' :
                         genre.name === 'Sports' ? 'sports_soccer' :
                         genre.name === 'Mecha' ? 'precision_manufacturing' :
                         'category'}
                      </span>
                    </div>
                    <h3 className="font-bold text-text-primary-light dark:text-text-primary-dark mb-2">{genre.name}</h3>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Anime {genre.name.toLowerCase()}</p>
                  </div>
                ))}
              </div>

              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-8">Genre Terpopuler</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {genres.slice(0, 3).map((genre) => (
                    <div key={genre.mal_id} className="bg-card-light dark:bg-card-dark rounded-lg overflow-hidden shadow-lg">
                      <div className="relative h-48 bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
                        <span className="material-symbols-outlined text-6xl text-white">swords</span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">{genre.name}</h3>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">Genre paling populer dengan cerita menarik</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">1,250+ anime</span>
                          <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-opacity-90 transition-all" onClick={() => setSelectedGenre(genre)}>
                            Jelajahi
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div>
              <button onClick={() => setSelectedGenre(null)} className="mb-4 px-4 py-2 bg-primary text-white rounded-lg">Back to Genres</button>
              <h2 className="text-2xl font-bold mb-4">{selectedGenre.name} Anime</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                {animeByGenre.map((anime) => (
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
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Genres;
