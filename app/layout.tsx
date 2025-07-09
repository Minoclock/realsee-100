export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body style={{ fontFamily: 'sans-serif', padding: 40, backgroundColor: '#f8f8f8' }}>
        {children}
      </body>
    </html>
  );
}