import React from "react";
import { Link } from "react-router-dom"; 
const ContactPage = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(to bottom, #6a1b9a, #8e24aa, #ab47bc)",
      }}
    >
      <div className="container mx-auto p-8 bg-white rounded-lg shadow-xl max-w-4xl">
        <h1 className="text-4xl font-bold text-purple-700 mb-6 text-center">
          Contact Us
        </h1>
        <p className="text-lg leading-7 text-purple-900 text-center mb-8">
          Got questions or feedback? We’d love to hear from you! Reach out to us
          via email, phone, or the form below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-purple-900 mb-2">
                Contact Information
              </h2>
              <p className="text-purple-900">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:shivagaur2503@gmail.com"
                  className="text-purple-700 hover:underline"
                >
                  shivagaur2503@gmail.com
                </a>
              </p>
              <p className="text-purple-900">
                <strong>Phone:</strong>{" "}
                <a
                  href="tel:+916395276297"
                  className="text-purple-700 hover:underline"
                >
                  +91 xxxxxxxxxx
                </a>
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-purple-900 mb-2">
                Follow Us
              </h2>
              <ul className="space-y-2">
                <li className="text-purple-900">
                  <strong>Twitter:</strong> @QuizWiz
                </li>
                <li className="text-purple-900">
                  <strong>Instagram:</strong> @quizwiz_official
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <form
            action="https://formspree.io/f/xqaklwjr"
            method="POST"
            className="bg-purple-300 p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-semibold text-purple-1000 mb-4">
              Send Us a Message
            </h2>
            <label className="block mb-4">
              <span className="block text-purple-900 font-semibold mb-2">
                Your Email:
              </span>
              <input
                type="email"
                name="email"
                required
                className="w-full p-3 border border-purple-500 rounded-lg focus:outline-none focus:ring focus:ring-purple-400 bg-purple-100 text-purple-1000"
                placeholder="Enter your email"
              />
            </label>
            <label className="block mb-4">
              <span className="block text-purple-900 font-semibold mb-2">
                Your Message:
              </span>
              <textarea
                name="message"
                required
                className="w-full p-3 border border-purple-500 rounded-lg focus:outline-none focus:ring focus:ring-purple-400 bg-purple-100 text-purple-1000"
                placeholder="Enter your message"
                rows="5"
              ></textarea>
            </label>
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-300 w-full"
            >
              Send Message
            </button>
          </form>
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/"  // Navigate to the homepage
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
