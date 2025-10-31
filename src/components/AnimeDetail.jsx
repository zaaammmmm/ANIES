import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAnimeDetails } from '../services/jikanApi';
import Header from './Header';
import Loader from './Loader';
import { addToPlaylist, isInPlaylist, removeFromPlaylist } from './Playlist';

const AnimeDetail = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInPlaylistState, setIsInPlaylistState] = useState(false);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      try {
        const data = await getAnimeDetails(id);
        setAnime(data.data);
        // Check if anime is in playlist
        setIsInPlaylistState(isInPlaylist(parseInt(id)));
      } catch (error) {
        console.error('Failed to fetch anime details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background-light dark:bg-background-dark">
        <Loader size="lg" />
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background-light dark:bg-background-dark">
        <div className="text-text-primary-light dark:text-white">Anime not found</div>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-primary-light dark:text-text-primary-dark">
      <Header />
      <main className="flex-grow mt-16 page-transition">
        <div className="w-full h-64 md:h-80 lg:h-96 bg-center bg-no-repeat bg-cover flex flex-col justify-end" style={{ backgroundImage: `linear-gradient(to top, rgba(25, 16, 34, 1) 0%, rgba(25, 16, 34, 0) 50%), url("${anime.images.jpg.large_image_url}")` }}></div>
        <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 -mt-20 md:-mt-24 lg:-mt-32">
          <div className="layout-content-container flex flex-col max-w-7xl mx-auto flex-1">
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
              <div className="flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-56 mx-auto lg:mx-0 -mt-8 md:-mt-10">
                <img alt={anime.title} className="w-full h-auto object-cover rounded-lg shadow-2xl" src={anime.images.jpg.large_image_url} />
              </div>
              <div className="flex-grow pt-2 md:pt-4 text-center lg:text-left">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <p className="text-text-secondary-light dark:text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em]">{anime.title}</p>
                    <p className="text-text-secondary-light dark:text-white/70 text-sm sm:text-base font-normal leading-normal">Rating: {anime.score}/10 | {anime.episodes} Episode | {anime.status}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 justify-center lg:justify-start">
                  {anime.genres.map((genre) => (
                    <span key={genre.mal_id} className="text-xs font-medium text-text-primary-light dark:text-white bg-secondary-light dark:bg-white/10 rounded-full px-3 py-1">{genre.name}</span>
                  ))}
                </div>
                <p className="text-text-secondary-light dark:text-white/90 text-sm sm:text-base font-normal leading-normal pt-4 max-w-3xl mx-auto lg:mx-0">{anime.synopsis}</p>
                <div className="flex justify-center lg:justify-start">
                  <div className="flex flex-col sm:flex-row gap-3 flex-wrap py-5 justify-center lg:justify-start w-full sm:w-auto">
                    {/* <Link to={`/player/${id}`} className="flex min-w-[200px] sm:min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] gap-2 hover:bg-primary/90 transition-all">
                      <span className="material-symbols-outlined">play_arrow</span>
                      <span className="truncate">Tonton Episode 1</span>
                    </Link> */}
                    <button
                      onClick={() => {
                        if (isInPlaylistState) {
                          removeFromPlaylist(parseInt(id));
                          setIsInPlaylistState(false);
                        } else {
                          addToPlaylist(anime);
                          setIsInPlaylistState(true);
                        }
                      }}
                      className={`flex min-w-[200px] sm:min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 text-base font-bold leading-normal tracking-[0.015em] gap-2 transition-all ${
                        isInPlaylistState
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-secondary-light dark:bg-white/10 text-text-primary-light dark:text-white hover:bg-opacity-80'
                      }`}
                    >
                      <span className="material-symbols-outlined">
                        {isInPlaylistState ? 'remove' : 'add'}
                      </span>
                      <span className="truncate">
                        {isInPlaylistState ? 'Hapus dari Playlist' : 'Tambah ke Playlist'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10">
              {/* <div className="border-b border-secondary-light dark:border-white/10">
                <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                  <Link to={`/episodes/${id}`} className="whitespace-nowrap border-b-2 border-primary px-1 py-4 text-sm font-bold text-primary">Episode</Link>
                  <a className="whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-text-secondary-light dark:text-white/70 hover:text-text-primary-light dark:hover:text-white hover:border-secondary-light dark:hover:border-white/30" href="#">Detail</a>
                  <a className="whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-text-secondary-light dark:text-white/70 hover:text-text-primary-light dark:hover:text-white hover:border-secondary-light dark:hover:border-white/30" href="#">Rekomendasi</a>
                </nav>
              </div> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnimeDetail;
