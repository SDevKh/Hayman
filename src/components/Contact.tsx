import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    alert('Thank you for your message! We\'ll get back to you soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-slate-900 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#374151] font-keania mb-6">
            Get In <span className="text-blue-400">Touch</span>
          </h2>
          <p className="text-xl text-[#374151] font-keania max-w-3xl mx-auto">
            Ready to start your project? Let's discuss how we can help bring your vision to life
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-[#374151] font-keania mb-6">Let's Talk</h3>
              <p className="text-[#374151] font-keania text-lg leading-relaxed mb-8">
                We're always excited to work on new projects and help businesses grow. 
                Reach out to us and let's discuss how we can help you achieve your goals.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-blue-600 p-3 rounded-full mr-4">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-medium">Email</h4>
                  <p className="text-gray-300">hayman9182890@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-blue-600 p-3 rounded-full mr-4">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-medium">Phone</h4>
                  <p className="text-gray-300">+91 6350455133</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-blue-600 p-3 rounded-full mr-4">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-medium">Location</h4>
                  <p className="text-gray-300">Mumbai, Maharashtra</p>
                  <h4 className="text-white font-medium">Location 2</h4>
                  <p className="text-gray-300">Jaipur, Rajasthan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-white font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Project inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Send Message
                <Send className="ml-2" size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
