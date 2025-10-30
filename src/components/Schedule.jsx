import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAnimeSchedules } from '../services/jikanApi';
import Header from './Header';
import Loader from './Loader';

const Schedule = () => {
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState('monday');

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await getAnimeSchedules(selectedDay);
        setSchedule(data.data);
      } catch (error) {
        console.error('Failed to fetch schedule:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [selectedDay]);

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
            <h1 className="text-3xl font-bold mb-4">Jadwal Rilis Anime</h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">Pantau jadwal rilis episode anime terbaru setiap hari</p>
          </div>

          <div className="mb-8">
            <div className="border-b border-secondary-light dark:border-secondary-dark">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium hover:text-primary hover:border-primary/30 ${
                      selectedDay === day ? 'border-primary text-primary' : 'border-transparent text-text-secondary-light dark:text-text-secondary-dark'
                    }`}
                  >
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="space-y-6">
            {schedule.map((anime, index) => (
              <div key={anime.mal_id} className="bg-card-light dark:bg-card-dark rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-2xl font-bold text-primary">{index + 1}</div>
                  <div className="h-px bg-secondary-light dark:bg-secondary-dark flex-1"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link to={`/anime/${anime.mal_id}`} className="flex items-center gap-4 p-4 bg-secondary-light dark:bg-secondary-dark rounded-lg cursor-pointer hover:bg-opacity-80 transition-all">
                    <img className="w-16 h-16 object-cover rounded-lg" src={anime.images.jpg.image_url} alt={anime.title} />
                    <div>
                      <h3 className="font-bold text-text-primary-light dark:text-text-primary-dark">{anime.title}</h3>
                      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Episode {anime.episodes_aired + 1}</p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Schedule;
