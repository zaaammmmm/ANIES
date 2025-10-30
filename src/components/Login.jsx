import { useState } from 'react';
import Header from './Header';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for login logic
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-primary-light dark:text-text-primary-dark min-h-screen">
      <Header />
      <main className="flex flex-1 justify-center items-center py-5 mt-16 page-transition">
        <div className="layout-content-container flex flex-col w-full max-w-md flex-1 px-4 md:px-10">
          <div className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Login ke AnimeStream</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors font-bold"
              >
                Login
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm">Belum punya akun? <a href="#" className="text-primary hover:underline">Daftar sekarang</a></p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
