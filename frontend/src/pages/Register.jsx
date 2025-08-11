import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'react-qr-code';
import Select from 'react-select';
import translations from '../i18n';

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const genderOptions = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other' },
];

const stateOptions = indianStates.map(state => ({
  label: state,
  value: state
}));

const Register = () => {
  const navigate = useNavigate();
  const lang = localStorage.getItem('language') || 'en';
  const t = translations[lang];
  const qrRef = useRef(null);

  useEffect(() => {
    localStorage.removeItem('tempName');
  }, []);

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    stateOfOrigin: '',
    currentState: '',
    languagePreference: '',
  });

  const [errors, setErrors] = useState({});
  const [registered, setRegistered] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === 'fullName') {
      if (value === '' || /^[A-Z][a-zA-Z\s]*$/.test(value)) {
        setErrors(prev => {
          const { fullName, ...rest } = prev;
          return rest;
        });
      } else {
        setErrors(prev => ({ ...prev, fullName: 'Start with capital & only letters' }));
      }
    }

    if (name === 'phone') {
      if (value === '' || /^[6-9]\d{9}$/.test(value)) {
        setErrors(prev => {
          const { phone, ...rest } = prev;
          return rest;
        });
      } else {
        setErrors(prev => ({ ...prev, phone: 'Enter valid 10-digit Indian number starting with 6/7/8/9' }));
      }
    }
  };

  const handleSelectChange = (name, selectedOption) => {
    setForm(prev => ({ ...prev, [name]: selectedOption?.value || '' }));
  };

  const validate = () => {
    const errs = {};
    if (!/^[A-Z][a-zA-Z\s]*$/.test(form.fullName))
      errs.fullName = 'Start with capital & only letters';

    if (!/^[6-9]\d{9}$/.test(form.phone))
      errs.phone = 'Enter valid 10-digit number starting with 6/7/8/9';

    if (!form.dateOfBirth)
      errs.dateOfBirth = 'Please select your date of birth.';

    if (!form.gender)
      errs.gender = 'Please select gender.';

    if (!form.stateOfOrigin)
      errs.stateOfOrigin = 'Please select state of origin.';

    if (!form.currentState)
      errs.currentState = 'Please select current state.';

    return errs;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post('/api/migrants/register', form);
      const data = res.data;
      setRegistered(data);
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('tempName', data.migrant.fullName);
    } catch (err) {
      alert("Error during registration.");
    }
  };

  const downloadQR = () => {
    const svg = qrRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'migrant-id-qr.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg">
        {!registered ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">{t.registration}</h2>
            <div className="grid gap-4">

              {/* Inputs and dropdowns */}
              {/* Full Name */}
              <div>
                <input
                  name="fullName"
                  placeholder={t.fullName}
                  value={form.fullName}
                  onChange={handleChange}
                  autoComplete="off"
                  className="p-3 rounded border w-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
              </div>

              {/* Phone */}
              <div>
                <input
                  name="phone"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder={t.phone}
                  value={form.phone}
                  onChange={handleChange}
                  autoComplete="off"
                  maxLength={10}
                  className="p-3 rounded border w-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>

              {/* DOB */}
              <div>
                <input
                  name="dateOfBirth"
                  type="date"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  autoComplete="off"
                  className="p-3 rounded border w-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
              </div>

              {/* Gender */}
              <div>
                <Select
                  options={genderOptions}
                  placeholder={t.gender}
                  value={genderOptions.find(opt => opt.value === form.gender)}
                  onChange={(selected) => handleSelectChange('gender', selected)}
                  className="text-gray-700"
                  styles={{
                    control: (base) => ({
                      ...base,
                      backgroundColor: 'white',
                      borderColor: '#d1d5db',
                      padding: '2px',
                      borderRadius: '0.375rem'
                    })
                  }}
                />
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
              </div>

              {/* State of Origin */}
              <div>
                <Select
                  options={stateOptions}
                  placeholder={t.stateOrigin}
                  value={stateOptions.find(opt => opt.value === form.stateOfOrigin)}
                  onChange={(selected) => handleSelectChange('stateOfOrigin', selected)}
                  className="text-gray-700"
                  styles={{
                    control: (base) => ({
                      ...base,
                      backgroundColor: 'white',
                      borderColor: '#d1d5db',
                      padding: '2px',
                      borderRadius: '0.375rem'
                    })
                  }}
                />
                {errors.stateOfOrigin && <p className="text-red-500 text-sm">{errors.stateOfOrigin}</p>}
              </div>

              {/* Current State */}
              <div>
                <Select
                  options={stateOptions}
                  placeholder={t.currentState}
                  value={stateOptions.find(opt => opt.value === form.currentState)}
                  onChange={(selected) => handleSelectChange('currentState', selected)}
                  className="text-gray-700"
                  styles={{
                    control: (base) => ({
                      ...base,
                      backgroundColor: 'white',
                      borderColor: '#d1d5db',
                      padding: '2px',
                      borderRadius: '0.375rem'
                    })
                  }}
                />
                {errors.currentState && <p className="text-red-500 text-sm">{errors.currentState}</p>}
              </div>

              {/* Language Preference */}
              <input
                name="languagePreference"
                placeholder={t.languagePref}
                value={form.languagePreference}
                onChange={handleChange}
                autoComplete="off"
                className="p-3 rounded border w-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 mt-5 rounded-xl transition duration-200"
            >
              {t.register}
            </button>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-2">{t.idCreated}</h2>
            <p className="mb-4">
              {t.migrantId}: <span className="font-mono">{registered.migrant.migrantId}</span>
            </p>
            <div ref={qrRef} className="mx-auto w-fit bg-white p-4 rounded shadow mb-4">
              <QRCode value={registered.migrant.migrantId || ''} />
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={downloadQR}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Download QR Code
              </button>
              <button
                onClick={() => navigate('/services')}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
              >
                {t.gotoDashboard}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
