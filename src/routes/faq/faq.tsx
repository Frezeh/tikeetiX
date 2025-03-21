import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import TikeetiXIcon from "./components/tikeetix-icon";
import TikeetiIcon from "./components/tikeeti-icon";
import instagram from "@/assets/images/instagram.svg";
import linkdln from "@/assets/images/linkedln.svg";
import logo from "@/assets/images/logo-trans.svg";

const DATA = [
  {
    title: "What is TikeetiX ?",
    subtitle:
      "TikeetiX allows you to create, sell, and manage tickets for events, track sales and earnings, withdraw funds, and utilize powerful marketing tools to promote your events to a wider audience",
  },
  {
    title: "How do I create an event and start selling tickets?",
    subtitle:
      'To create an event, simply sign up for an account, go to the "Create Event" section, fill in the details (event name, date, location, ticket pricing), and publish your event. Once published, you can begin selling tickets directly from your event page.',
  },
  {
    title: "How can I track my sales and earnings?",
    subtitle: `You can monitor your sales and earnings in real-time from the "Dashboard" under the "Manage Orders" tab. It provides a comprehensive breakdown of your ticket sales, total revenue, and number of tickets sold.`,
  },
  {
    title:
      "What payment methods are available for ticket purchases and withdrawals?",
    subtitle:
      "Our platform supports various payment methods, including credit/debit cards, PayPal, and bank transfers. In the nearest future, you will be able to configure your preferred payment methods for both purchases and withdrawals.",
  },
  {
    title: "How do I withdraw my earnings?",
    subtitle: `To withdraw your funds, go to the "Finance" section, select your withdrawal method, and specify the amount you wish to transfer. Processing typically takes 1-2 business days`,
  },
  {
    title: "Are there any fees for selling tickets on the platform?",
    subtitle: "No, we do not charge you a fee for tickets created and sold.",
  },
  {
    title: "Can I offer discounts or promo codes for my tickets?",
    subtitle:
      "Yes! Our platform enables you to create custom discount codes or promotional offers for your events. You can set a discount percentage, expiration date,  for each promo code.",
  },
  {
    title:
      "Is there a way to offer different ticket types (e.g., VIP, general admission)?",
    subtitle:
      "Yes! Our platform allows you to create different ticket types with varying pricing, seating options, and access levels. You can offer VIP tickets, general admission tickets, and more.",
  },
  {
    title: "Can I set a limit on the number of tickets sold?",
    subtitle:
      "Yes! You can set a specific ticket limit for your event. This helps manage availability and ensures that you do not oversell tickets for your event.",
  },
  {
    title: "How do I handle refunds or cancellations?",
    subtitle:
      "You can manage refund process and cancellations directly through the platform",
  },
  {
    title: "What if I need support or have an issue with my account?",
    subtitle:
      "Our support team is available 24/7. You can contact us through via mail support@tikeetix.com or via tel : +44000000000000",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="relative">
      <div className="bg-[#F5FFF0] flex items-center justify-center px-4 py-3 md:px-8 xl:px-20 border-b border-b-[#F2F4F7] fixed w-full top-0 z-50">
        <div className="flex items-center gap-10">
          <div className="flex items-center space-x-[10px]">
            <Link to="/">
              <TikeetiXIcon color="#133205" />
            </Link>
          </div>
        </div>
      </div>

      <div className="py-32 md:py-40 flex flex-col justify-between gap-20 items-center relative bg-[#F5FFF0] w-full overflow-hidden duration-100 transition-all ease-in-out">
        <div className="flex flex-col px-8 gap-8 justify-center items-center self-center z-10">
          <div className="flex flex-col justify-center items-center gap-6">
            <div className="bg-[#EAFFE0] rounded-[16px] p-1 px-3 flex items-center w-fit justify-center border border-[#C7FFAC]">
              <p className="font-medium text-sm text-[#133205]">Support</p>
            </div>
            <h1 className="text-4xl font-hurme md:text-[60px] text-[#133205] font-semibold text-center leading-[120%] tracking-[0%]">
              Frequently Asked Questions (FAQs)
            </h1>
            <h2 className="text-center text-base md:text-xl text-[#72B354] md:max-w-[1000px]">
              Everything you need to know about TikeetiX. Can’t find the answer
              you’re looking for? Please chat with our friendly team.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Button className="h-12 bg-[#2A680C] from-[#2A680C] to-[#2A680C] hover:from-[#2A680C] hover:to-[#2A680C]">
              Chat with support
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-5 mx-6 sm:mx-12 lg:mx-[150px] py-16">
        <Accordion
          type="single"
          collapsible
          className="w-full md:w-[640px] lg:w-[768px] animate-in fade-in zoom-in duration-700"
        >
          {DATA.map(({ title, subtitle }, index) => (
            <AccordionItem
              value={`item-${index + 1}`}
              className="last-of-type:border-none border-[#E4E7EC]"
            >
              <AccordionTrigger
                className="flex justify-between items-start gap-10 text-left"
                triggerIcon={
                  <div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d={
                          openIndex === index
                            ? "M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                            : "M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                        }
                        stroke="#72B354"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                }
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <p className="font-medium text-lg text-[#101828]">{title}</p>
              </AccordionTrigger>
              <AccordionContent className="text-base text-[#667085]">
                {subtitle}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="bg-white">
        <div className="space-y-8 md:space-y-12 py-16 mx-6 sm:mx-12 lg:mx-[150px]">
          <TikeetiIcon width={144} height={34} />
          <p className="text-base text-[#667085]">
            Craft unforgettable experiences for your customers.
          </p>
          <div className="grid grid-cols-3 md:flex items-center gap-8">
            <Link
              to="/"
              className="text-base text-[#667085] transition-all hover:text-black"
            >
              Features
            </Link>
            <Link
              to="/"
              className="text-base text-[#667085] transition-all hover:text-black"
            >
              About us
            </Link>
            <Link
              to="/"
              className="text-base text-[#667085] transition-all hover:text-black"
            >
              Career
            </Link>
            <Link
              to="/"
              className="text-base text-[#667085] transition-all hover:text-black"
            >
              Blogs
            </Link>
            <Link
              to="/"
              className="text-base text-[#667085] transition-all hover:text-black"
            >
              Help
            </Link>
            <Link
              to="/"
              className="text-base text-[#667085] transition-all hover:text-black"
            >
              Privacy
            </Link>
          </div>
        </div>
        <div className="mb-24 border-t-[1px] mx-6 text-center sm:mx-12 lg:mx-[150px] border-t-[#EAECF0]">
          <div className="flex flex-col md:flex-row text-sm justify-between md:items-center gap-6 mt-8">
            <div className="md:w-full text-left text-[#98A2B3]">
              © {new Date().getFullYear()} Tikeeti. All rights reserved.
            </div>
            <div className="flex md:mx-auto mb-3 md:mb-0">
              <a
                target="_blank"
                href="https://www.linkedin.com/company/tikeeetisystems"
                rel="noopener noreferrer"
              >
                <img src={linkdln} className="mr-3" width={24} height={24} />
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/tikeetisystems/"
                rel="noopener noreferrer"
              >
                <img src={instagram} width={24} height={24} />
              </a>
            </div>
          </div>
        </div>
        <img
          src={logo}
          style={{
            width: "100%",
          }}
        />
      </div>
    </div>
  );
}
