import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import translations from '../i18n';

const Home = () => {
  const [lang, setLang] = useState(localStorage.getItem('language') || 'en');
  const navigate = useNavigate();

  const t = translations[lang];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">{t.welcome}</h1>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          🌐 Select Language
        </label>
        <select
          value={lang}
          onChange={(e) => {
            setLang(e.target.value);
            localStorage.setItem('language', e.target.value);
          }}
          className="w-full p-3 rounded-lg border border-gray-300 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="bn">বাংলা</option>
        </select>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/register')}
            className="bg-green-600 text-white font-semibold py-2 px-6 rounded-xl shadow hover:bg-green-700 transition"
          >
            {t.signup || 'Sign Up'}
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-xl shadow hover:bg-indigo-700 transition"
          >
            {t.login || 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
