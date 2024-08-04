// src/pages/about.tsx
import React from "react";

const AboutUs = () => {
  return (
    <section className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-lg leading-relaxed">
          At HospEase, our mission is to bridge the gap between patients and healthcare facilities. We aim to provide a comprehensive platform where users can easily find detailed information about hospitals, including available beds, specialties, and pricing. Our goal is to enhance transparency and accessibility in the healthcare sector, ensuring that everyone can find the care they need, when they need it.
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">What We Offer</h2>
        <p className="text-lg leading-relaxed">
          HospEase is a one-stop solution for accessing up-to-date information on hospitals. Our platform allows users to:
        </p>
        <ul className="list-disc ml-6 text-lg leading-relaxed">
          <li>Search for hospitals by location and specialty.</li>
          <li>View detailed hospital profiles, including available beds, average bed prices, and specialties offered.</li>
          <li>Contact hospitals directly through provided phone numbers and email addresses.</li>
          <li>Access verified documents and images of hospitals for better decision-making.</li>
          <li>Register and manage hospital profiles for healthcare providers.</li>
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Our Story</h2>
        <p className="text-lg leading-relaxed">
          Founded in 2024, HospEase was born out of a need to simplify the process of finding and accessing healthcare facilities. Our founders, Nilesh Verma, realized that many people struggled to find accurate and reliable information about hospitals. This inspired them to create a platform that not only provides comprehensive hospital data but also enhances communication between patients and healthcare providers.
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Our Team</h2>
        <p className="text-lg leading-relaxed">
          Our team is comprised of dedicated professionals from various fields, including healthcare, technology, and customer service. We are passionate about making healthcare more accessible and transparent for everyone. Our team works tirelessly to keep the information on our platform up-to-date and to provide the best possible user experience.
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p className="text-lg leading-relaxed">
          We love to hear from our users! Whether you have a question, feedback, or need assistance, please feel free to reach out to us at <a href="mailto:support@HospEase.com" className="text-blue-500">support@HospEase.com</a>.
        </p>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Join Us</h2>
        <p className="text-lg leading-relaxed">
          Interested in joining our team or collaborating with us? Visit our <a href="/careers" className="text-blue-500">Careers</a> page for more information.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
