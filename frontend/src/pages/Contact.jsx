import React from 'react'
import { useState } from "react";
import contactUs from "../assets/contact_us.png"

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.message) {
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
            setFormData({ name: "", email: "", message: "" });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            {/* Hero Section */}
            <div className="relative w-full h-80">
                <img
                    src={contactUs}
                    alt="Contact"
                    className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                    <h1 className="text-5xl font-bold">Contact Us</h1>
                    <p className="text-lg mt-2">We’d love to hear from you! 📩</p>
                </div>
            </div>

            {/* Contact Content */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Section */}
                    <div>
                        <h2 className="text-3xl font-bold text-blue-600">Get in Touch</h2>
                        <p className="text-gray-600 mt-4">
                            Have any questions or feedback? Fill out the form, and we'll get back to you as soon as possible.
                        </p>
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center space-x-4">
                                <span className="text-blue-500 text-2xl">📍</span>
                                <p className="text-gray-700">123 Quiz Lane, Knowledge City</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-blue-500 text-2xl">📧</span>
                                <p className="text-gray-700">support@owling.com</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-blue-500 text-2xl">📞</span>
                                <p className="text-gray-700">+1 234 567 890</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Contact Form */}
                    <div className="bg-white p-8 shadow-lg rounded-lg">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Send a Message</h2>
                        {submitted && (
                            <div className="p-3 mb-4 text-green-700 bg-green-200 rounded-lg">Message sent successfully! ✅</div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                            <textarea
                                name="message"
                                rows="4"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
