// src/components/jobs/JobFormModal.tsx
import React, { useState, useEffect } from 'react';
import { Modal } from '../UI/Modal'; // Assuming this exists
import { Job, JobUpsertData } from '../../types/job'; // Import your types

interface JobFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: JobUpsertData) => void;
  title: string;
  initialData: Job | null;
}

export const JobFormModal: React.FC<JobFormModalProps> = ({ isOpen, onClose, onSubmit, title, initialData }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    company: initialData?.company || '',
    category: initialData?.category || 'service',
    location: initialData?.location || '',
    min_salary: initialData?.salary ? (initialData.salary.split(' ')[1] || '').split(' - ')[0] : '',
    max_salary: initialData?.salary ? (initialData.salary.split(' ')[1] || '').split(' - ')[1] || '' : '',
    currency: initialData?.salary ? initialData.salary.split(' ')[0] : 'INR', // Default to INR
    job_type: initialData?.type || 'Full-time',
    description: initialData?.description || '',
    responsibilities: initialData?.requirements?.join('\n') || '',
    skills: initialData?.skills?.join(', ') || '',
    status: initialData?.status === 'draft' ? 'pause' : initialData?.status || 'pause', // Map 'draft' to 'pause' for form
    applicants: initialData?.applicants || 0,
    experience_level: initialData?.experience_level || 'entry-level', // Add experience_level
    tags: initialData?.tags?.join(', ') || '', // Add tags
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: initialData?.title || '',
        company: initialData?.company || '',
        category: initialData?.category || 'service',
        location: initialData?.location || '',
        min_salary: initialData?.salary ? (initialData.salary.split(' ')[1] || '').split(' - ')[0] : '',
        max_salary: initialData?.salary ? (initialData.salary.split(' ')[1] || '').split(' - ')[1] || '' : '',
        currency: initialData?.salary ? initialData.salary.split(' ')[0] : 'INR',
        job_type: initialData?.type || 'Full-time',
        description: initialData?.description || '',
        responsibilities: initialData?.requirements?.join('\n') || '',
        skills: initialData?.skills?.join(', ') || '',
        status: initialData?.status === 'draft' ? 'pause' : initialData?.status || 'pause',
        applicants: initialData?.applicants || 0,
        experience_level: initialData?.experience_level || 'entry-level',
        tags: initialData?.tags?.join(', ') || '',
      });
    }
  }, [isOpen, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend: JobUpsertData = {
      title: formData.title,
      company: formData.company,
      location: formData.location,
      job_type: formData.job_type,
      min_salary: formData.min_salary ? Number(formData.min_salary) : null,
      max_salary: formData.max_salary ? Number(formData.max_salary) : null,
      currency: formData.currency,
      category: formData.category,
      description: formData.description,
      responsibilities: formData.responsibilities.split('\n').map(item => item.trim()).filter(item => item !== ''),
      skills: formData.skills.split(',').map(item => item.trim()).filter(item => item !== ''),
      status: formData.status as 'active' | 'inactive' | 'pause',
      applicants: Number(formData.applicants),
      experience_level: formData.experience_level,
      tags: formData.tags.split(',').map(item => item.trim()).filter(item => item !== ''),
    };

    onSubmit(dataToSend);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 gradient-hover"
              placeholder="e.g., Senior Hotel Manager"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
            <input
              type="text"
              name="company"
              required
              value={formData.company}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 gradient-hover"
              placeholder="e.g., Grand Resort Hotels"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 gradient-hover"
            >
              <option value="hospitality">Hospitality</option>
              <option value="logistics">Logistics</option>
              <option value="construction">Construction</option>
              <option value="travel">Travel</option>
              <option value="tourism">Tourism</option>
              <option value="service">Service</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 gradient-hover"
              placeholder="e.g., Dubai, UAE"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
            <select
              name="job_type"
              value={formData.job_type}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 gradient-hover"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Salary</label>
            <input
              type="number"
              name="min_salary"
              value={formData.min_salary}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 gradient-hover"
              placeholder="e.g., 15000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Salary</label>
            <input
              type="number"
              name="max_salary"
              value={formData.max_salary}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 gradient-hover"
              placeholder="e.g., 20000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <input
              type="text"
              name="currency"
              required
              value={formData.currency}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 gradient-hover"
              placeholder="e.g., USD, AED"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
          <textarea
            name="description"
            required
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 gradient-hover"
            placeholder="Describe the job role, responsibilities, and what you're looking for..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Responsibilities (one per line)</label>
          <textarea
            name="responsibilities"
            rows={4}
            value={formData.responsibilities}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 gradient-hover"
            placeholder="5+ years experience\nBachelor's degree in relevant field\nStrong communication skills"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Skills (comma-separated)</label>
          <textarea
            name="skills"
            rows={4}
            value={formData.skills}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 gradient-hover"
            placeholder="JavaScript, React, Node.js, SQL"
          />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
            <select
                name="experience_level"
                value={formData.experience_level}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 gradient-hover"
            >
                <option value="entry-level">Entry-Level</option>
                <option value="mid-level">Mid-Level</option>
                <option value="senior-level">Senior-Level</option>
                <option value="director">Director</option>
                <option value="executive">Executive</option>
            </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 gradient-hover"
            placeholder="remote, urgent, hospitality"
          />
        </div>

        {initialData && (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 gradient-hover"
              >
                <option value="active">Active</option>
                <option value="pause">Pause</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Applicants</label>
              <input
                type="number"
                name="applicants"
                value={formData.applicants}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 gradient-hover"
                placeholder="e.g., 5"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 gradient-hover"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white gradient-primary hover:gradient-secondary gradient-hover"
          >
            {initialData ? 'Update Job' : 'Create Job'}
          </button>
        </div>
      </form>
    </Modal>
  );
};