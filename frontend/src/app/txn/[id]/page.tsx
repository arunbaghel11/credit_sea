'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function TransactionDetail({ params }: { params: { id: string } }) {
  const [txn, setTxn] = useState<any>(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/transactions/${params.id}`)
      .then(res => setTxn(res.data));
  }, [params.id]);

  if (!txn) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Transaction Detail</h1>
      <pre className="p-4 bg-gray-100 rounded">{JSON.stringify(txn, null, 2)}</pre>
    </div>
  );
}
