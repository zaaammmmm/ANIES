import { useParams } from 'react-router-dom';
import Header from './Header';

const Player = () => {
  const { id, episode } = useParams();

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-primary-light dark:text-text-primary-dark">
      <Header />
      <main className="flex flex-1 justify-center py-5 mt-16">
        <div className="layout-content-container flex flex-col w-full max-w-6xl flex-1 px-4 md:px-10">
          <div className="bg-black rounded-lg overflow-hidden mb-4">
            <div className="aspect-video flex items-center justify-center">
              <div className="text-white text-center">
                <div className="material-symbols-outlined text-6xl mb-4">play_circle</div>
                <p className="text-xl">Video Player Placeholder</p>
                <p className="text-sm opacity-70">Anime ID: {id} | Episode: {episode || 1}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
              <span className="material-symbols-outlined">skip_previous</span>
              Previous
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
              Next
              <span className="material-symbols-outlined">skip_next</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Player;
