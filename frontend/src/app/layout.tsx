import './globals.css';

export const metadata = {
  title: 'Fraud Rule Explorer',
  description: 'Live Fraud Rule Engine & Transaction Viewer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
