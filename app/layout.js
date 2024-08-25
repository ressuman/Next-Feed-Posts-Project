import "./globals.css";

export const metadata = {
  title: "Next Feed Posts",
  description: "Browse and share amazing posts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main> {children}</main>
      </body>
    </html>
  );
}
