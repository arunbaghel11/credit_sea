'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import RuleForm from '../components/RuleForm';

export default function RulesPage() {
  const [rules, setRules] = useState<any[]>([]);

  const fetchRules = async () => {
    const res = await axios.get('http://localhost:4000/api/rules');
    setRules(res.data);
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const handleSave = async (rule: any) => {
    if (rule._id) {
      await axios.put(`http://localhost:4000/api/rules/${rule._id}`, rule);
    } else {
      await axios.post('http://localhost:4000/api/rules', rule);
    }
    fetchRules();
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Fraud Rules</h1>
      <RuleForm onSave={handleSave} />
      <div className="space-y-2">
        {rules.map((r) => (
          <div key={r._id} className="p-4 border rounded bg-white">
            <p className="font-medium">{r.name}</p>
            <p className="text-sm">Expr: {r.expression}</p>
            <p className="text-sm">Score: {r.riskScore}</p>
            <p className="text-sm text-green-700">{r.enabled ? 'Enabled' : 'Disabled'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
