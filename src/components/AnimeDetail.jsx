import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAnimeDetails } from '../services/jikanApi';
import Header from './Header';
import Loader from './Loader';

const AnimeDetail = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      try {
        const data = await getAnimeDetails(id);
        setAnime(data.data);
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
        <div className="text-text-primary-light dark:text-text-primary-dark">Anime not found</div>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-primary-light dark:text-text-primary-dark">
      <Header />
      <main className="flex-grow mt-16 page-transition">
        <div className="w-full h-64 md:h-80 lg:h-96 bg-center bg-no-repeat bg-cover flex flex-col justify-end" style={{ backgroundImage: `linear-gradient(to top, rgba(25, 16, 34, 1) 0%, rgba(25, 16, 34, 0) 50%), url("${anime.images.jpg.large_image_url}")` }}></div>
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 -mt-24 md:-mt-32">
          <div className="layout-content-container flex flex-col max-w-7xl mx-auto flex-1">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0 w-40 sm:w-48 md:w-56 -mt-10">
                <img alt={anime.title} className="w-full h-auto object-cover rounded-lg shadow-2xl" src={anime.images.jpg.large_image_url} />
              </div>
              <div className="flex-grow pt-4">
                <div className="flex flex-wrap justify-between gap-3">
                  <div className="flex flex-col gap-2">
                    <p className="text-white text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">{anime.title}</p>
                    <p className="text-white/70 text-sm sm:text-base font-normal leading-normal">Rating: {anime.score}/10 | {anime.episodes} Episode | {anime.status}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {anime.genres.map((genre) => (
                    <span key={genre.mal_id} className="text-xs font-medium text-white bg-white/10 rounded-full px-3 py-1">{genre.name}</span>
                  ))}
                </div>
                <p className="text-white/90 text-sm sm:text-base font-normal leading-normal pt-4 max-w-3xl">{anime.synopsis}</p>
                <div className="flex justify-stretch">
                  <div className="flex flex-1 gap-3 flex-wrap py-5 justify-start">
                    <Link to={`/player/${id}`} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] gap-2">
                      <span className="material-symbols-outlined">play_arrow</span>
                      <span className="truncate">Tonton Episode 1</span>
                    </Link>
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-white/10 text-white text-base font-bold leading-normal tracking-[0.015em] gap-2">
                      <span className="material-symbols-outlined">add</span>
                      <span className="truncate">Tambah ke Daftar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="border-b border-white/10">
                <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                  <Link to={`/episodes/${id}`} className="whitespace-nowrap border-b-2 border-primary px-1 py-4 text-sm font-bold text-primary">Episode</Link>
                  <a className="whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-white/70 hover:text-white hover:border-white/30" href="#">Detail</a>
                  <a className="whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-white/70 hover:text-white hover:border-white/30" href="#">Rekomendasi</a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnimeDetail;
