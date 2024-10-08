import Header from "@/components/header/header";
import "./globals.css";
import PropTypes from "prop-types";

export const metadata = {
  title: "Next Feed Posts",
  description: "Browse and share amazing posts.",
};

//export const runtime = "edge";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main> {children}</main>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
