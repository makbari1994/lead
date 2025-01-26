'use client';
import axiosInstance from '@/lib/axios';
import Link from 'next/link';
import React, { useState } from 'react';

const LeadForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({ name: '', email: '', source: '' });
  const [message, setMessage] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.post('leads', formData);
      setMessage('Lead submitted successfully!');
      setFormData({ name: '', email: '', source: '' });
      setStep(1);
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className='d-flex'>
      <Link href="/admin" > 
        <button className="bg-green-500 my-2 text-white py-2 px-4 rounded hover:bg-green-600">
          Admin Panel
        </button>
      </Link>
      <div className="p-4 max-w-md mx-auto bg-white shadow rounded-lg">

        <h1 className="text-xl font-bold mb-4">Lead Collection Form</h1>
        {message && <p className="mb-4 text-green-500">{message}</p>}
        {step === 1 && (
          <div>
            <label className="block mb-2 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border p-2 rounded mb-4"
              required
            />

            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border p-2 rounded mb-4"
              required
            />

            <button
              onClick={() => setStep(2)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <label className="block mb-2 font-medium">Inquiry Source</label>
            <select
              name="source"
              value={formData.source}
              onChange={handleInputChange}
              className="w-full border p-2 rounded mb-4"
              required
            >
              <option value="">Select Source</option>
              <option value="Google">Google</option>
              <option value="Social Media">Social Media</option>
              <option value="Friends">Friends</option>
            </select>

            <button
              onClick={() => setStep(1)}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mr-2"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadForm;
