import React from 'react';

const Input = ({ label, id, type = 'text', placeholder, icon: Icon, ...props }) => {
  return (
    <div className="input-group">
      {label && <label htmlFor={id} className="input-label">{label}</label>}
      <div style={{ position: 'relative' }}>
        {Icon && (
          <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>
            <Icon size={18} />
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className="input-field"
          style={{ paddingLeft: Icon ? '2.5rem' : '1rem' }}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
