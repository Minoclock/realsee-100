export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body style={{ fontFamily: 'sans-serif', padding: 40, backgroundColor: '#f9f9f9' }}>
        {children}
      </body>
    </html>
  );
}