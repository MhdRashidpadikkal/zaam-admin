// src/components/jobs/JobDetailsModal.tsx
import React from 'react';
import { Modal } from '../UI/Modal'; // Assuming this exists
import { Job } from '../../types/job'; // Import your Job type

interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ isOpen, onClose, job }) => {
  if (!job) return null; // Don't render if no job is selected

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Job Details" size="lg">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
            <p className="text-lg font-semibold text-gray-900">{job.title}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <p className="text-lg font-semibold text-gray-900">{job.company}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium gradient-primary text-white capitalize">
              {job.category}
            </span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <p className="text-sm text-gray-900">{job.location}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
            <p className="text-sm text-gray-900">{job.salary}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
          <div className="gradient-card p-4 rounded-xl">
            <p className="text-gray-900">{job.description}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
          <div className="gradient-card p-4 rounded-xl">
            <ul className="list-disc list-inside space-y-1">
              {job.requirements.map((req, index) => (
                <li key={index} className="text-gray-900">{req}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
          <div className="gradient-card p-4 rounded-xl">
            <ul className="list-disc list-inside space-y-1">
              {job.skills?.map((skill, index) => (
                <li key={index} className="text-gray-900">{skill}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Applications</label>
            <p className="text-2xl font-bold text-gray-900">{job.applicants}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Posted Date</label>
            <p className="text-sm text-gray-900">{new Date(job.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};