import { MapPin } from 'lucide-react';

const Header = () => {
  return (
    <header className="glass-panel" style={{ padding: '1rem 2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <MapPin color="var(--color-primary)" size={28} />
        <h1 className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 700 }}>FixMyArea</h1>
      </div>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <button className="btn btn-primary">Report an Issue</button>
      </nav>
    </header>
  );
};

export default Header;
