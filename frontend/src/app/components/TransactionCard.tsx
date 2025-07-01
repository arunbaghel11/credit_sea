import Link from 'next/link';

export default function TransactionCard({ transaction }: { transaction: any }) {
  return (
    <Link href={`/txn/${transaction._id}`}>
      <div className="bg-white border hover:bg-blue-50 transition p-4 rounded cursor-pointer">
        <div className="flex justify-between">
          <div>
            <p className="font-medium">User: {transaction.userId}</p>
            <p className="text-sm">Amount: ₹{transaction.amount}</p>
            <p className="text-sm">Matched Rules: {transaction.matchedRules.length}</p>
          </div>
          <div className="text-right text-sm text-gray-500">
            <p>Risk Score: {transaction.riskScore}</p>
            <p>{new Date(transaction.timestamp).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
