import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAnimeEpisodes } from '../services/jikanApi';
import Header from './Header';
import Loader from './Loader';

const EpisodeList = () => {
  const { id } = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const data = await getAnimeEpisodes(id);
        setEpisodes(data.data);
      } catch (error) {
        console.error('Failed to fetch episodes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [id]);

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
      <main className="px-4 sm:px-10 lg:px-20 flex flex-1 justify-center py-5 mt-16 page-transition">
        <div className="layout-content-container flex flex-col w-full max-w-6xl flex-1">
          <div className="pb-3 pt-6">
            <div className="flex border-b border-white/20 gap-8">
              <Link to={`/anime/${id}`} className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-white/60 hover:text-white transition-colors pb-3 pt-2">
                <p className="text-sm font-bold leading-normal tracking-[0.015em]">Detail</p>
              </Link>
              <div className="flex flex-col items-center justify-center border-b-[3px] border-b-primary text-white pb-3 pt-2">
                <p className="text-white text-sm font-bold leading-normal tracking-[0.015em]">Episode</p>
              </div>
            </div>
          </div>

          <div className="py-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Daftar Episode</h2>
              <label className="relative flex-shrink-0 !h-10 w-full max-w-xs">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
                  <span className="material-symbols-outlined text-xl">search</span>
                </div>
                <input className="form-input w-full h-full rounded-lg bg-white/10 border-none pl-10 pr-4 text-white placeholder:text-white/60 text-sm focus:ring-2 focus:ring-primary/50" placeholder="Cari episode..." />
              </label>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {episodes.map((episode) => (
                <div key={episode.mal_id} className="flex flex-col sm:flex-row items-center gap-4 bg-white/5 hover:bg-white/10 p-3 rounded-lg transition-colors">
                  <div className="flex w-full sm:w-auto items-center gap-4">
                    <img className="w-32 h-20 object-cover rounded-md flex-shrink-0" src={episode.images.jpg.image_url} alt={`Episode ${episode.episode}`} />
                    <div className="flex-grow">
                      <p className="text-white/60 text-sm">Episode {episode.episode}</p>
                      <p className="text-white font-semibold">{episode.title}</p>
                    </div>
                  </div>
                  <div className="flex-grow hidden sm:block"></div>
                  <Link to={`/player/${id}/${episode.episode}`} className="w-full sm:w-auto flex min-w-[150px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-primary/90 text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors">
                    <span className="material-symbols-outlined">play_arrow</span>
                    <span className="truncate">Tonton Sekarang</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EpisodeList;
