import { useNavigate } from 'react-router-dom';
import translations from '../i18n'; // import translation file

const ServicesDashboard = () => {
  const name = localStorage.getItem('tempName') || 'Migrant';
  const lang = localStorage.getItem('language') || 'en';
  const t = translations[lang]; // get translated text
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const services = [
    {
      title: t.healthcare,
      icon: '🩺',
      bg: 'bg-red-100',
      path: '/services/healthcare',
    },
    {
      title: t.education,
      icon: '📚',
      bg: 'bg-blue-100',
      path: '/services/education',
    },
    {
      title: t.finance,
      icon: '💸',
      bg: 'bg-green-100',
      path: '/services/financial',
    },
    {
      title: t.welfare,
      icon: '🧺',
      bg: 'bg-yellow-100',
      path: '/services/welfare',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-indigo-700">
          {t.welcome}, {name} 👋
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          {t.logout}
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">{t.services}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => navigate(service.path)}
            className={`rounded-xl shadow p-6 cursor-pointer hover:shadow-lg transition ${service.bg}`}
          >
            <div className="text-4xl mb-2">{service.icon}</div>
            <h3 className="text-lg font-bold">{service.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{t.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesDashboard;
