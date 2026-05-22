import React from 'react';
import { Eye, Edit3, Trash2 } from 'lucide-react';

const ReportList = ({ reports, onView, onEdit }) => {
  return (
    <div style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
      <div className="list-row list-header">
        <div>Title</div>
        <div>Status</div>
        <div>Priority</div>
        <div>Date</div>
        <div style={{ textAlign: 'right' }}>Actions</div>
      </div>
      
      {reports.map((report) => (
        <div key={report.id || report._id} className="list-row">
          <div style={{ fontWeight: 500, color: 'var(--color-text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '1rem' }}>
            {report.title}
          </div>
          <div>
            <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--color-primary)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>
              {report.status}
            </span>
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{report.priority}</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{new Date(report.createdAt).toLocaleDateString()}</div>
          <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'flex-end' }}>
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
      ))}
    </div>
  );
};

export default ReportList;
