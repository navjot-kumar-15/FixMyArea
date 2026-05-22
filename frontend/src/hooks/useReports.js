import { useEffect } from 'react';
import { fetchReports } from '../api/report.api';
import { useReportStore } from '../store/useReportStore';

// Custom hook separating business logic from UI
export const useReports = (page = 1, limit = 10) => {
  const { reports, total, isLoading, error, setLoading, setError, setReportsData } = useReportStore();

  const loadReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchReports(page, limit);
      // result is ApiResponse { success, message, data: { data, total, page, limit } }
      if (result.success) {
        setReportsData(result.data);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  return { reports, total, isLoading, error, refetch: loadReports };
};
