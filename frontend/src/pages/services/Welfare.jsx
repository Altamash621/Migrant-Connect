import React from 'react';

const Welfare = () => {
  // Fake data example
  const userWelfare = {
    rationCard: 'RC-567890',
    schemes: ['Food Security', 'Housing Assistance'],
    lastBenefit: 'Received ₹1,000 on 2025-06-30',
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-4">Social Welfare Details</h1>
      <div className="border rounded p-4 bg-gray-50">
        <div><strong>Ration Card:</strong> {userWelfare.rationCard}</div>
        <div><strong>Schemes:</strong> {userWelfare.schemes.join(', ')}</div>
        <div><strong>Last Benefit:</strong> {userWelfare.lastBenefit}</div>
      </div>
    </div>
  );
};

export default Welfare;