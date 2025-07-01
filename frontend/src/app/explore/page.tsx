'use client';

import { useEffect, useState } from 'react';
import socket from '../lib/socket';
import TransactionCard from '../components/TransactionCard';
import axios from 'axios';

export default function ExplorePage() {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    socket.on('transaction', (txn) => {
      setTransactions((prev) => [txn, ...prev.slice(0, 49)]); 
    });

    axios.get('http://localhost:4000/api/transactions')
      .then(res => setTransactions(res.data));

    return () => socket.off('transaction');
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Live Transaction Feed</h1>
      {transactions.map((txn) => (
        <TransactionCard key={txn._id} transaction={txn} />
      ))}
    </div>
  );
}
