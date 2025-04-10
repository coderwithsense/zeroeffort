
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real application, you would send this to your backend
      console.log("Subscribing email:", email);
      setIsSubmitted(true);
      setEmail("");

      // Reset the submitted state after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="w-full max-w-[600px] mt-12">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <h3 className="text-2xl font-medium text-[#080808] mb-4">
          Stay updated with Ace
        </h3>
        <div className="w-full flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 border border-[#080808] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#110B53]"
            required
          />
          <CustomButton type="submit" className="px-6 py-3 hover:cursor-pointer hover:bg-accent-foreground hover:text-white transition-colors duration-400">
            Subscribe
          </CustomButton>
        </div>
        {isSubmitted && (
          <p className="mt-2 text-green-600">Thank you for subscribing!</p>
        )}
      </form>
    </div>
  );
};

export default NewsletterForm;
