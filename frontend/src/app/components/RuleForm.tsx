'use client';

import { useState } from 'react';

export default function RuleForm({ onSave }: { onSave: (rule: any) => void }) {
  const [form, setForm] = useState({
    name: '',
    expression: '',
    riskScore: 0,
    enabled: true,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSave(form);
    setForm({ name: '', expression: '', riskScore: 0, enabled: true });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border rounded space-y-2">
      <input
        className="w-full p-2 border rounded"
        type="text"
        name="name"
        placeholder="Rule name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        className="w-full p-2 border rounded"
        type="text"
        name="expression"
        placeholder="Expression (e.g. txn.amount > 5000)"
        value={form.expression}
        onChange={handleChange}
        required
      />
      <input
        className="w-full p-2 border rounded"
        type="number"
        name="riskScore"
        placeholder="Risk Score"
        value={form.riskScore}
        onChange={handleChange}
        required
      />
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="enabled"
          checked={form.enabled}
          onChange={handleChange}
        />
        <span>Enabled</span>
      </label>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Save Rule
      </button>
    </form>
  );
}
