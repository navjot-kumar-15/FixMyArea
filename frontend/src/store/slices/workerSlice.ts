import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkerProfile } from '@/types';

export const MOCK_WORKERS: WorkerProfile[] = [
  {
    id: '64f1a2b3c4d5e6f7a8b9c002',
    name: 'Marcus Vance',
    email: 'worker@civicconnect.org',
    phone: '+1 (555) 901-2345',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    specialization: 'Road Works & Infrastructure',
    assignedArea: 'Metropolitan Sector 4',
    pincode: '94105',
    locationDetails: 'Sector 4, Central Highway Hub',
    activeTasksCount: 2,
    completedTasksCount: 48,
    rating: 4.9,
    status: 'ON_TASK',
  },
  {
    id: '64f1a2b3c4d5e6f7a8b9c004',
    name: 'Elena Rostova',
    email: 'elena.r@civicconnect.org',
    phone: '+1 (555) 901-7890',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    specialization: 'Water Utilities & Sanitation',
    assignedArea: 'Westside Heights',
    pincode: '94110',
    locationDetails: 'Parkline Water Reservoir',
    activeTasksCount: 1,
    completedTasksCount: 52,
    rating: 4.8,
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
    updateWorkerDetails: (
      state,
      action: PayloadAction<Partial<WorkerProfile> & { id: string }>
    ) => {
      const worker = state.workers.find((w) => w.id === action.payload.id);
      if (worker) {
        Object.assign(worker, action.payload);
      }
    },
    addWorker: (state, action: PayloadAction<WorkerProfile>) => {
      state.workers.unshift(action.payload);
    },
  },
});

export const { setSelectedWorker, updateWorkerStatus, updateWorkerDetails, addWorker } = workerSlice.actions;
export default workerSlice.reducer;
