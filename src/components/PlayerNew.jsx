import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAnimeEpisodes } from '../services/jikanApi';
import ErrorMessage from './ErrorMessage';
import Footer from './Footer';
import Header from './Header';
import Loader from './Loader';

const Player = () => {
  const { id, episodeId } = useParams();
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        setLoading(true);
        const data = await getAnimeEpisodes(id);
        const foundEpisode = data.data.find(ep => ep.mal_id === parseInt(episodeId));
        setEpisode(foundEpisode);
      } catch (err) {
        setError('Gagal memuat episode. Silakan coba lagi.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id && episodeId) {
      fetchEpisode();
    }
  }, [id, episodeId]);

  const retryFetch = () => {
    setError(null);
    setLoading(true);
    const fetchEpisode = async () => {
      try {
        const data = await getAnimeEpisodes(id);
        const foundEpisode = data.data.find(ep => ep.mal_id === parseInt(episodeId));
        setEpisode(foundEpisode);
      } catch (err) {
        setError('Gagal memuat episode. Silakan coba lagi.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEpisode();
  };

  if (loading) {
    return (
      <div className="bg-background-light dark:bg-background-dark font-display text-text-primary-light dark:text-text-primary-dark min-h-screen">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
          <div className="flex justify-center items-center py-12">
            <Loader size="lg" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background-light dark:bg-background-dark font-display text-text-primary-light dark:text-text-primary-dark min-h-screen">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
          <ErrorMessage message={error} onRetry={retryFetch} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-primary-light dark:text-text-primary-dark min-h-screen">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16 page-transition">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card-light dark:bg-card-dark rounded-xl overflow-hidden shadow-2xl dark:shadow-black/20">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative">
              <div className="text-center">
                <div className="text-8xl mb-6 text-primary/60">
                  <span className="material-symbols-outlined">play_circle</span>
                </div>
                <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                  Episode {episode?.mal_id}
                </h2>
                <p className="text-text-secondary-light dark:text-text-secondary-dark">
                  Video player tidak tersedia untuk episode ini
                </p>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-2">
                  AnimeStream hanya menyediakan informasi anime
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
            </div>
            <div className="p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-2xl">tv</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3">
                    {episode?.title || `Episode ${episode?.mal_id}`}
                  </h1>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 text-lg">
                    {episode?.title_japanese || 'Judul Jepang tidak tersedia'}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-secondary-light dark:bg-secondary-dark rounded-lg p-4">
                      <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-1">Episode</div>
                      <div className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
                        {episode?.mal_id}
                      </div>
                    </div>
                    {episode?.aired && (
                      <div className="bg-secondary-light dark:bg-secondary-dark rounded-lg p-4">
                        <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-1">Tanggal Tayang</div>
                        <div className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
                          {new Date(episode.aired).toLocaleDateString('id-ID')}
                        </div>
                      </div>
                    )}
                    {episode?.score && (
                      <div className="bg-secondary-light dark:bg-secondary-dark rounded-lg p-4">
                        <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-1">Skor</div>
                        <div className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
                          ⭐ {episode.score}
                        </div>
                      </div>
                    )}
                  </div>
                  {episode?.synopsis && (
                    <div className="bg-secondary-light dark:bg-secondary-dark rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-3">
                        Sinopsis
                      </h3>
                      <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                        {episode.synopsis}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Player;
