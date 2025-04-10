import React from "react";
import Link from "next/link";
import NewsletterForm from "@/components/NewsLetterForm";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#FDFDFD] border-t-2 border-[#080808] mt-12 py-16">
      <div className="max-w-[1400px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <Link href="/" className="text-2xl font-semibold font-['Lexend']">
                ZeroEfforts
              </Link>
            </div>
            <p className="text-[#080808] text-lg font-light mb-6">
              The productivity platform that removes friction and lets you focus on what matters most.
            </p>
            <NewsletterForm />
          </div>

          <div>
            <h3 className="text-xl font-medium text-[#080808] mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-[#080808] font-light hover:text-[#110B53]"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#solutions"
                  className="text-[#080808] font-light hover:text-[#110B53]"
                >
                  Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-[#080808] font-light hover:text-[#110B53]"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#080808] font-light hover:text-[#110B53]"
                >
                  Updates
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium text-[#080808] mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-[#080808] font-light hover:text-[#110B53]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#080808] font-light hover:text-[#110B53]"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#080808] font-light hover:text-[#110B53]"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#080808] font-light hover:text-[#110B53]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#080808] flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#080808] font-light mb-4 md:mb-0">
            © {new Date().getFullYear()} ZeroEfforts. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-[#080808] font-light hover:text-[#110B53]"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-[#080808] font-light hover:text-[#110B53]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;