// src/components/jobs/JobCard.tsx
import React from 'react';
import { Edit, Trash2, Eye, MapPin, IndianRupee, Users } from 'lucide-react';
import { StatusBadge } from '../UI/StatusBadge'; // Assuming this exists
import { Job } from '../../types/job';

interface JobCardProps {
  job: Job;
  onView: (job: Job) => void;
  onEdit: (job: Job) => void;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onView, onEdit, onToggleStatus, onDelete }) => {
  return (
    <div className="gradient-card p-6 rounded-2xl gradient-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
          <p className="text-gray-600 text-sm">{job.company}</p>
        </div>
        <StatusBadge status={job.status} />
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          {job.location}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <IndianRupee className="h-4 w-4 mr-2" />
          {job.salary}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Users className="h-4 w-4 mr-2" />
          {job.applicants} applicants
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium gradient-primary text-white capitalize">
          {job.category}
        </span>
        <span className="text-xs text-gray-500">
          {new Date(job.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onView(job)}
          className="flex-1 gradient-card text-gray-700 px-3 py-2 rounded-lg hover:gradient-primary hover:text-white gradient-hover text-sm font-medium flex items-center justify-center"
        >
          <Eye className="h-4 w-4 mr-1" />
          View
        </button>
        <button
          onClick={() => onEdit(job)}
          className="flex-1 gradient-secondary text-white px-3 py-2 rounded-lg hover:gradient-accent gradient-hover text-sm font-medium flex items-center justify-center"
        >
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </button>
        <button
          onClick={() => onToggleStatus(job.id)}
          className={`px-3 py-2 rounded-lg text-sm font-medium gradient-hover ${
            job.status === 'active'
              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
              : 'bg-green-100 text-green-800 hover:bg-green-200'
          }`}
        >
          {job.status === 'active' ? 'Pause' : 'Activate'}
        </button>
        <button
          onClick={() => onDelete(job.id)}
          className="px-3 py-2 rounded-lg text-sm font-medium bg-red-100 text-red-800 hover:bg-red-200 gradient-hover"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};