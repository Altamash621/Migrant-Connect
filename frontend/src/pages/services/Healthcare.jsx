import { useEffect, useState } from 'react';
import translations from '../../i18n';

const Healthcare = () => {
  const lang = localStorage.getItem('language') || 'en';
  const t = translations[lang];
  const migrantId = localStorage.getItem('access_token');
  const [healthcare, setHealthcare] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredHealthcare, setFilteredHealthcare] = useState([]);

  useEffect(() => {
    const fetchHealthcare = async () => {
      try {
        const res = await fetch(`/api/migrants/${migrantId}`);
        const data = await res.json();
        setHealthcare(data.healthcare || []);
        setFilteredHealthcare(data.healthcare || []);
      } catch (err) {
        setHealthcare([]);
        setFilteredHealthcare([]);
      }
    };
    if (migrantId) fetchHealthcare();
  }, [migrantId]);

  useEffect(() => {
    if (!filter) {
      setFilteredHealthcare(healthcare);
    } else {
      setFilteredHealthcare(
        healthcare.filter(h =>
          h.facilityName?.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }
  }, [filter, healthcare]);

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-4">{t.healthcare || "Healthcare Records"}</h1>
      <input
        type="text"
        placeholder={t.searchHospital || "Filter by hospital name"}
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className="mb-4 p-2 border rounded w-full max-w-md"
      />
      <div className="grid gap-4">
        {filteredHealthcare.length === 0 && (
          <div className="text-gray-500">{t.noHealthcare || "No healthcare records found."}</div>
        )}
        {filteredHealthcare.map((entry) => (
          <div key={entry._id} className="border rounded p-4 shadow bg-gray-50">
            <div><strong>{t.visitDate || "Visit Date"}:</strong> {entry.visitDate}</div>
            <div><strong>{t.facilityName || "Hospital"}:</strong> {entry.facilityName}</div>
            <div><strong>{t.diagnosis || "Diagnosis"}:</strong> {entry.diagnosis}</div>
            <div><strong>{t.treatment || "Treatment"}:</strong> {entry.treatment}</div>
            <div><strong>{t.doctorName || "Doctor"}:</strong> {entry.doctorName}</div>
            <div><strong>{t.state || "State"}:</strong> {entry.state}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Healthcare;
