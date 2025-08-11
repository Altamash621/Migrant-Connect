import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import translations from '../i18n';

const Welcome = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('Migrant');
  const [lang, setLang] = useState('en');
  const [t, setT] = useState(translations['en']);

  useEffect(() => {
    setT(translations[lang]);
  }, [lang]);

  useEffect(() => {
    const storedName = localStorage.getItem('tempName') || 'Migrant';
    const storedLang = localStorage.getItem('language') || 'en'; // <-- changed 'lang' to 'language'

    setName(storedName);
    setLang(storedLang);
  }, []);

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">
        {t.welcome}, {name} 👋
      </h1>
      <p className="mb-4 text-lg">{t.intro}</p>
      <button
        onClick={handleRegister}
        className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
      >
        {t.makeIdentity}
      </button>
    </div>
  );
};

export default Welcome;
