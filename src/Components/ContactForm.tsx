import React, { useState } from 'react';
import MostPopular from './MostPopularArticle';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  inquiry: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    email: '',
    inquiry: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to server)
    console.log('Form submitted:', formValues);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-3">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-black">
          First Name <span className='text-red-700'>*</span>
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formValues.firstName}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md border-gray-700  text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-black">
          Last Name <span className='text-red-700'>*</span>
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formValues.lastName}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md border-gray-700  text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-black">
          Email <span className='text-red-700'>*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md  border-gray-700 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="inquiry" className="block text-sm font-medium text-black">
          What is your inquiry about? <span className='text-red-700'>*</span>
        </label>
        <input
          type="text"
          id="inquiry"
          name="inquiry"
          value={formValues.inquiry}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md  border-gray-700 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-black">
          Message <span className='text-red-700'>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formValues.message}
          
          className="mt-1 p-2 w-full border rounded-md  border-gray-700 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
  <MostPopular></MostPopular>
};

export default ContactForm;