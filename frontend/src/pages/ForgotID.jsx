import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRScanner from '../components/QRScanner';

const ForgotID = () => {
  const [migrantId, setMigrantId] = useState('');
  const navigate = useNavigate();

  const handleScanSuccess = (data) => {
    setMigrantId(data);
    localStorage.setItem('migrantIdRecovered', data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 px-4">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold text-center text-indigo-700 mb-4">Recover Migrant ID via QR</h2>

        <QRScanner onScanSuccess={handleScanSuccess} />

        {migrantId && (
          <div className="text-center text-green-700 font-semibold mt-4">
            Detected ID: {migrantId}
          </div>
        )}

        <button
          onClick={() => navigate('/login')}
          disabled={!migrantId}
          className="w-full mt-6 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
        >
          Proceed to Login
        </button>

        <button
          onClick={() => navigate('/')}
          className="mt-3 text-sm text-indigo-600 hover:underline"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ForgotID;
