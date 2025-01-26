'use client';
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios';

interface Lead {
  id: number;
  name: string;
  email: string;
  source: string;
  salesperson: Salespeople;
  salespersonId: number;
}
interface Salespeople {
  id: number;
  name: string;
}


const LeadsTable: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [salespeople, setSalespeople] = useState<Salespeople[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchSalePeople();
    fetchLeads();
  }, []);

  
  const fetchLeads = async () => {
    try {
      const response = await axiosInstance.get('leads');
      setLeads(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };
   const fetchSalePeople = async () => {
    try {
      const response = await axiosInstance.get('salespeople');
      setSalespeople(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };
  const handleAssign = async (leadId: number, salesperson: number) => {
    try { 
      const person: Salespeople = salespeople.find(a => a.id == salesperson) || {} as Salespeople ;
      console.log(person)
      await axiosInstance.patch(`leads/${leadId}/assign`,  person );
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === leadId ? { ...lead, salesperson: person, salespersonId: person?.id } : lead
        )
      );
    } catch (error) {
      console.error('Error assigning salesperson:', error);
    }
  };

  if (loading) return <p>Loading leads...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white shadow rounded-lg">
      <h1 className="text-xl font-bold mb-4">Admin - Leads Table</h1>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Source</th>
            <th className="border border-gray-300 px-4 py-2">Assigned Salesperson</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td className="border border-gray-300 px-4 py-2">{lead.name}</td>
              <td className="border border-gray-300 px-4 py-2">{lead.email}</td>
              <td className="border border-gray-300 px-4 py-2">{lead.source}</td>
              <td className="border border-gray-300 px-4 py-2">{lead.salesperson?.name || 'Unassigned'}</td>
              <td className="border border-gray-300 px-4 py-2">
              <select
                  onChange={(e) => handleAssign(lead.id, Number(e.target.value))}
                  defaultValue={lead.salespersonId || ''}
                  className="border p-2 rounded"
                >
                  <option value="" disabled>
                    Select Salesperson
                  </option>
                  {salespeople.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable;