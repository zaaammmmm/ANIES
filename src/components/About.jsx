import Header from './Header';

const About = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-primary-light dark:text-text-primary-dark">
      <Header />
      <main className="flex flex-1 justify-center py-5 mt-16 page-transition">
        <div className="layout-content-container flex flex-col w-full max-w-6xl flex-1 px-4 md:px-10">
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold mb-8">Tentang AnimeStream</h1>
            <p className="text-lg mb-8">Platform streaming anime terdepan dengan koleksi lengkap dan fitur canggih.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg">
                <div className="text-4xl mb-4 text-primary">
                  <span className="material-symbols-outlined">library_books</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Koleksi Lengkap</h3>
                <p>Ribuan anime dari berbagai genre dan era tersedia untuk ditonton kapan saja.</p>
              </div>
              <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg">
                <div className="text-4xl mb-4 text-primary">
                  <span className="material-symbols-outlined">high_quality</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Kualitas HD</h3>
                <p>Nikmati anime dalam kualitas tinggi dengan streaming yang lancar.</p>
              </div>
              <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg">
                <div className="text-4xl mb-4 text-primary">
                  <span className="material-symbols-outlined">devices</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Multi-Platform</h3>
                <p>Tonton di desktop, mobile, atau tablet dengan pengalaman yang konsisten.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
