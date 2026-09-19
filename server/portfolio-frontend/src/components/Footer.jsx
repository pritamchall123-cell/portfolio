import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>© {year} Pritam Chall</p>
      <span className="footer__status"><i /> Available for opportunities</span>
      <p>Designed &amp; built by Pritam</p>
    </footer>
  );
}