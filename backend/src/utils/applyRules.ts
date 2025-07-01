import { Rule } from '../models/Rule';

export function applyRules(txn: any, rules: any[]): any {
  const matchedRules: string[] = [];
  let riskScore = 0;

  for (const rule of rules) {
    try {
      const isMatch = eval(`(function(txn){ return ${rule.expression}; })`)(txn);
      if (isMatch) {
        matchedRules.push(rule._id.toString());
        riskScore += rule.riskScore;
      }
    } catch (err) {
      console.error('Rule evaluation error:', err);
    }
  }

  return {
    ...txn,
    matchedRules,
    riskScore,
  };
}
