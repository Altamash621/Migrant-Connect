import { useEffect, useState, useRef } from 'react';
import translations from '../../i18n';

const Education = () => {
  const lang = localStorage.getItem('language') || 'en';
  const t = translations[lang];
  const migrantId = localStorage.getItem('access_token');
  const [education, setEducation] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredEducation, setFilteredEducation] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    institution: '',
    state: '',
    degree: '',
    year: '',
    details: '',
    marksCard: null
  });
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchEducation = async () => {
      const res = await fetch(`/api/migrants/${migrantId}`);
      const data = await res.json();
      setEducation(data.education || []);
      setFilteredEducation(data.education || []);
    };
    fetchEducation();
  }, [migrantId]);

  useEffect(() => {
    setFilteredEducation(
      education.filter(e =>
        e.institution.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, education]);

  const getCertificateLink = (marksCard) => {
    if (!marksCard || !marksCard.fileData || !marksCard.fileType) return null;
    const href = `data:${marksCard.fileType};base64,${marksCard.fileData}`;
    return (
      <a
        href={href}
        download="certificate"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline ml-2"
      >
        {t.downloadCertificate || "Download Certificate"}
      </a>
    );
  };

  const handleAddEducation = async (e) => {
    e.preventDefault();
    let marksCard = null;
    if (fileInputRef.current.files[0]) {
      const file = fileInputRef.current.files[0];
      const fileData = await file.arrayBuffer();
      marksCard = {
        fileData: btoa(String.fromCharCode(...new Uint8Array(fileData))),
        fileType: file.type
      };
    }
    await fetch(`/api/migrants/${migrantId}/education`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        marksCard,
        source: 'user',
        status: 'User Added'
      })
    });
    setShowForm(false);
    setFormData({
      institution: '',
      state: '',
      degree: '',
      year: '',
      details: '',
      marksCard: null
    });
    // Refresh education list
    const res = await fetch(`/api/migrants/${migrantId}`);
    const data = await res.json();
    setEducation(data.education || []);
    setFilteredEducation(data.education || []);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-4">{t.education}</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => setShowForm(!showForm)}
      >
        Add Education
      </button>
      {showForm && (
        <form className="mb-4 p-4 border rounded bg-gray-100 grid gap-2" onSubmit={handleAddEducation}>
          <input
            type="text"
            placeholder="Institution"
            value={formData.institution}
            onChange={e => setFormData({ ...formData, institution: e.target.value })}
            required
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="State"
            value={formData.state}
            onChange={e => setFormData({ ...formData, state: e.target.value })}
            required
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Degree"
            value={formData.degree}
            onChange={e => setFormData({ ...formData, degree: e.target.value })}
            required
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Year"
            value={formData.year}
            onChange={e => setFormData({ ...formData, year: e.target.value })}
            required
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Details"
            value={formData.details}
            onChange={e => setFormData({ ...formData, details: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="file"
            ref={fileInputRef}
            accept="application/pdf,image/*"
            className="p-2"
          />
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
            Save
          </button>
        </form>
      )}
      <input
        type="text"
        placeholder={t.searchInstitution || "Filter by institution"}
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className="mb-4 p-2 border rounded w-full max-w-md"
      />
      <div className="grid gap-4">
        {filteredEducation.length === 0 && (
          <div className="text-gray-500">{t.noEducation || "No education records found."}</div>
        )}
        {filteredEducation.map((edu) => (
          <div key={edu._id} className="border rounded p-4 shadow bg-gray-50">
            <div><strong>{t.institution || "Institution"}:</strong> {edu.institution}</div>
            <div><strong>{t.state || "State"}:</strong> {edu.state}</div>
            <div><strong>{t.degree || "Degree"}:</strong> {edu.degree}</div>
            <div><strong>{t.year || "Year"}:</strong> {edu.year}</div>
            <div><strong>{t.details || "Details"}:</strong> {edu.details}</div>
            {edu.marksCard && edu.marksCard.fileData && (
              <div>
                <strong>{t.certificate || "Certificate"}:</strong>
                {getCertificateLink(edu.marksCard)}
                <span className="ml-2 text-xs text-gray-500">
                  ({edu.status || (edu.source === "user" ? "User Added" : "Verified")})
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;