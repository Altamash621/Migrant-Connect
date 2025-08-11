import React from 'react';

const Financial = () => {
  // Fake data example
  const userFinance = {
    bankAccount: 'XXXX-1234',
    balance: '₹12,500',
    lastTransaction: '₹2,000 credited on 2025-07-10',
    subsidies: ['PM Kisan', 'Scholarship'],
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-4">Finance Details</h1>
      <div className="border rounded p-4 bg-gray-50">
        <div><strong>Bank Account:</strong> {userFinance.bankAccount}</div>
        <div><strong>Balance:</strong> {userFinance.balance}</div>
        <div><strong>Last Transaction:</strong> {userFinance.lastTransaction}</div>
        <div><strong>Subsidies:</strong> {userFinance.subsidies.join(', ')}</div>
      </div>
    </div>
  );
};

export default Financial;