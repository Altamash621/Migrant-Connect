import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import translations from '../i18n';

const Login = () => {
  const [migrantId, setMigrantId] = useState('');
  const [error, setError] = useState('');
  const lang = localStorage.getItem('language') || 'en';
  const t = translations[lang];
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    try {
      const res = await fetch('/api/migrants/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ migrantId }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('tempName', data.migrant.fullName);
        navigate('/services');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">{t.login || "Login"}</h1>

        <input
          type="text"
          placeholder={t.enterMigrantId || "Enter Migrant ID"}
          value={migrantId}
          onChange={(e) => setMigrantId(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition"
        >
          {t.login || "Login"}
        </button>

        {/* Forgot ID Link */}
        <p
          onClick={() => navigate('/forgot-id')}
          className="mt-4 text-sm text-indigo-600 hover:underline cursor-pointer"
        >
          Forgot Migrant ID?
        </p>

        {error && <div className="text-red-600 mt-4 text-sm font-medium">{error}</div>}
      </div>
    </div>
  );
};

export default Login;
