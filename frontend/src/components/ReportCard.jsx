import { AlertTriangle, Clock, Eye, Edit3, Trash2 } from 'lucide-react';

const ReportCard = ({ report, onView, onEdit }) => {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
          {report.title}
        </h3>
        <span style={{ 
          background: 'var(--color-primary)', 
          color: 'white', 
          padding: '0.25rem 0.5rem', 
          borderRadius: 'var(--radius-full)', 
          fontSize: '0.75rem', 
          fontWeight: 600 
        }}>
          {report.status}
        </span>
      </div>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {report.description}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', gap: '1rem', color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <AlertTriangle size={14} /> {report.priority}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Clock size={14} /> {new Date(report.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <button onClick={() => onView(report)} className="btn-icon" title="View Details">
            <Eye size={18} />
          </button>
          <button onClick={() => onEdit(report)} className="btn-icon" title="Edit Issue">
            <Edit3 size={18} />
          </button>
          <button className="btn-icon" title="Delete Issue" style={{ color: '#ef4444' }}>
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
