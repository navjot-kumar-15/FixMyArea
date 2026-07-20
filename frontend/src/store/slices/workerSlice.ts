import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkerProfile } from '@/types';

export const MOCK_WORKERS: WorkerProfile[] = [
  {
    id: 'usr-worker-1',
    name: 'Marcus Vance',
    email: 'marcus.v@civicconnect.org',
    phone: '+1 (555) 876-5432',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    specialization: 'Road Works & Infrastructure',
    assignedArea: 'Downtown North',
    activeTasksCount: 2,
    completedTasksCount: 48,
    rating: 4.9,
    status: 'ON_TASK',
  },
  {
    id: 'usr-worker-2',
    name: 'Robert Garcia',
    email: 'robert.g@civicconnect.org',
    phone: '+1 (555) 345-6789',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    specialization: 'Electrical & Street Lighting',
    assignedArea: 'Oakwood District',
    activeTasksCount: 1,
    completedTasksCount: 36,
    rating: 4.8,
    status: 'AVAILABLE',
  },
  {
    id: 'usr-worker-3',
    name: 'Elena Rostova',
    email: 'elena.r@civicconnect.org',
    phone: '+1 (555) 456-7890',
    avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=250',
    specialization: 'Water Utilities & Sanitation',
    assignedArea: 'Westside Heights',
    activeTasksCount: 0,
    completedTasksCount: 52,
    rating: 5.0,
    status: 'AVAILABLE',
  },
];

interface WorkerState {
  workers: WorkerProfile[];
  selectedWorker: WorkerProfile | null;
  loading: boolean;
}

const initialState: WorkerState = {
  workers: MOCK_WORKERS,
  selectedWorker: MOCK_WORKERS[0],
  loading: false,
};

export const workerSlice = createSlice({
  name: 'workers',
  initialState,
  reducers: {
    setSelectedWorker: (state, action: PayloadAction<WorkerProfile | null>) => {
      state.selectedWorker = action.payload;
    },
    updateWorkerStatus: (
      state,
      action: PayloadAction<{ workerId: string; status: WorkerProfile['status'] }>
    ) => {
      const worker = state.workers.find((w) => w.id === action.payload.workerId);
      if (worker) {
        worker.status = action.payload.status;
      }
    },
    addWorker: (state, action: PayloadAction<WorkerProfile>) => {
      state.workers.unshift(action.payload);
    },
  },
});

export const { setSelectedWorker, updateWorkerStatus, addWorker } = workerSlice.actions;
export default workerSlice.reducer;
