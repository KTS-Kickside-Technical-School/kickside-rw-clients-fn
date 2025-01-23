import React from 'react';
import Header from '../Components/Header';
import ContactForm from '../Components/ContactForm';
import MostPopular from '../Components/MostPopularArticle';

const ContactUs: React.FC = () => {
  return (
      <>
      <Header/>
    <div className=" w-full md:w-[80%] m-auto p-3 text-white px-5">
      <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
          <div>
            <h2 className="text-2xl text-black font-bold mb-4">Contact Us</h2>
            <h5 className="text-lg text-black font-sembold mb-2">News Tips</h5>

            <p className="text-[#444444] mb-8">
              Got a news tip or inside information about a topic we covered? We'd love to hear from you. Please drop us a note at tips@kickside.rw.
              If you prefer to remain anonymous, click here to contact us, which includes SecureDrop (instructions here) and various encrypted messaging apps.
            </p>
            <h3 className="text-xl  text-black font-bold mb-4">Advertising & Sponsorships</h3>
            <p className="text-black mb-8">
              Please complete this form and an account executive will get back to you quickly.
            </p>
            <h3 className="text-xl text-black font-bold mb-4">Other Inquiries</h3>
            <ContactForm />
          </div>
          <div className="lg:w-80 lg:mx-32 ">
            {/*  ads area*/}
            <div className=" border-4 border-blue-700 rounded-lg h-96  p-4  w-[303] ">
              <p className="text-center text-gray-700 ">Advertisement</p>
            </div>
        <MostPopular />
          </div>
        </div>
      </div>
    </div>
    </> );
};

export default ContactUs;