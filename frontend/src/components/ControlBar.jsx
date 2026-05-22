import React from 'react';
import { Search, LayoutGrid, List } from 'lucide-react';

const ControlBar = ({ viewMode, setViewMode, searchTerm, setSearchTerm }) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: '2rem',
      background: 'var(--color-surface)',
      padding: '1rem',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid var(--color-border)'
    }}>
      {/* Search Input */}
      <div style={{ position: 'relative', width: '300px' }}>
        <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>
          <Search size={18} />
        </div>
        <input 
          type="text" 
          placeholder="Search issues..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field"
          style={{ paddingLeft: '2.5rem', marginBottom: 0 }}
        />
      </div>

      {/* View Toggles */}
      <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--color-background)', padding: '0.25rem', borderRadius: 'var(--radius-md)' }}>
        <button 
          onClick={() => setViewMode('grid')}
          className="btn-icon" 
          style={{ background: viewMode === 'grid' ? 'var(--color-surface)' : 'transparent', color: viewMode === 'grid' ? 'var(--color-primary)' : 'var(--color-text-muted)', boxShadow: viewMode === 'grid' ? 'var(--shadow-sm)' : 'none' }}
        >
          <LayoutGrid size={20} />
        </button>
        <button 
          onClick={() => setViewMode('list')}
          className="btn-icon" 
          style={{ background: viewMode === 'list' ? 'var(--color-surface)' : 'transparent', color: viewMode === 'list' ? 'var(--color-primary)' : 'var(--color-text-muted)', boxShadow: viewMode === 'list' ? 'var(--shadow-sm)' : 'none' }}
        >
          <List size={20} />
        </button>
      </div>
    </div>
  );
};

export default ControlBar;
