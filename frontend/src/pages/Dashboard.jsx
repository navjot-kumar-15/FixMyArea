import React, { useState } from 'react';
import { useReports } from '../hooks/useReports';
import Header from '../components/Header';
import ReportCard from '../components/ReportCard';
import ReportList from '../components/ReportList';
import ControlBar from '../components/ControlBar';
import Modal from '../components/Modal';
import Input from '../components/Input';

const Dashboard = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [modalMode, setModalMode] = useState(null); // 'view' | 'edit' | null

  // For demo purposes, we will fetch data and do local filtering.
  // In a real app, `searchTerm` would be passed down into `useReports(1, 10, searchTerm)`
  const { reports, isLoading, error } = useReports(1, 10);

  const filteredReports = reports.filter(r => 
    r.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openViewModal = (report) => {
    setSelectedReport(report);
    setModalMode('view');
  };

  const openEditModal = (report) => {
    setSelectedReport(report);
    setModalMode('edit');
  };

  const closeModal = () => {
    setSelectedReport(null);
    setModalMode(null);
  };

  const renderModalContent = () => {
    if (!selectedReport) return null;

    if (modalMode === 'view') {
      return (
        <div>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ background: 'var(--color-primary)', color: 'white', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>
              {selectedReport.status}
            </span>
            <span style={{ background: '#f1f5f9', color: 'var(--color-text-muted)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>
              Priority: {selectedReport.priority}
            </span>
          </div>
          <p style={{ color: 'var(--color-text-main)', lineHeight: '1.7', marginBottom: '2rem' }}>
            {selectedReport.description}
          </p>
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            Reported on: {new Date(selectedReport.createdAt).toLocaleDateString()}
          </div>
        </div>
      );
    }

    if (modalMode === 'edit') {
      return (
        <form onSubmit={(e) => { e.preventDefault(); closeModal(); }}>
          <Input id="title" label="Title" defaultValue={selectedReport.title} />
          <div className="input-group">
            <label className="input-label">Description</label>
            <textarea 
              className="input-field" 
              rows="4" 
              defaultValue={selectedReport.description}
            />
          </div>
          <div className="input-group">
            <label className="input-label">Status</label>
            <select className="input-field" defaultValue={selectedReport.status}>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" onClick={closeModal} className="btn" style={{ background: 'transparent', border: '1px solid var(--color-border)' }}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </div>
        </form>
      );
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <Header />
      
      <main>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-main)' }}>Dashboard</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>Manage and track all community issues.</p>
        </div>

        <ControlBar 
          viewMode={viewMode} 
          setViewMode={setViewMode} 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />

        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
            <p style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Loading reports...</p>
          </div>
        ) : error ? (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            Error: {error}
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--color-text-muted)' }}>No reports match your search.</p>
          </div>
        ) : (
          viewMode === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {filteredReports.map((report) => (
                <ReportCard 
                  key={report.id || report._id} 
                  report={report} 
                  onView={openViewModal}
                  onEdit={openEditModal}
                />
              ))}
            </div>
          ) : (
            <ReportList 
              reports={filteredReports} 
              onView={openViewModal}
              onEdit={openEditModal}
            />
          )
        )}
      </main>

      <Modal 
        isOpen={!!modalMode} 
        onClose={closeModal} 
        title={modalMode === 'edit' ? 'Edit Report' : selectedReport?.title}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default Dashboard;
