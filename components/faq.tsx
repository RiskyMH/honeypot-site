"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check } from "lucide-react";

export const faqs = [
  {
    question: "Is Honeypot free to use?",
    answer:
      "Yes! Honeypot is completely free to use. There are no premium tiers or hidden costs. All features are available to everyone.",
  },
  {
    question: "Will it ban legitimate users?",
    answer:
      "No. Honeypot only takes action on users who post in the dedicated honeypot channel. Legitimate users who follow server rules will never be affected.",
  },
  {
    question: "Can I customize the action (ban or kick)?",
    answer:
      "Yes! You can configure whether Honeypot bans or kicks users using the /honeypot command. The default is a softban (ban and immediate unban) which removes the user and their recent messages.",
  },
  {
    question: "Where are actions logged?",
    answer:
      "Actions are logged to an admin channel of your choice. You can configure this with the /honeypot command when setting up the bot.",
  },
  {
    question: "Does it work in all servers?",
    answer:
      "Yes, Honeypot works in any Discord server. Just make sure the bot has the necessary permissions (Ban Members, Manage Channels, etc.) and that its role is positioned correctly in the role hierarchy.",
  },

];

const benefits = [
  "No manual setup",
  "Low resource usage",
  "Privacy focused",
  "Actively maintained",
];

export function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
          FAQ
        </h2>
        <div className="grid gap-8 lg:grid-cols-3">
          {/* FAQ Accordion */}
          <div className="col-span-2">
            <Accordion multiple={false} keepMounted className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-border"
                >
                  <AccordionTrigger className="text-left text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Built for Discord Communities card */}
          <div className="flex items-start justify-center lg:justify-start max-lg:hidden">
            <div className="w-full max-w-md rounded-xl border border-border bg-[#12151a] p-6 overflow-hidden">
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                Built for Discord Communities
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Lightweight, reliable, and always watching the bait.
              </p>
              <div className="flex">
                <ul className="space-y-2">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2 text-sm">
                      <Check className="size-4 text-green-400" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-end ms-auto mt-auto -mb-8 -me-10">
                  {/* <Image
                  src="/honeypot.svg"
                  alt="Honeypot"
                  width={80}
                  height={80}
                  className="opacity-60"
                /> */}
                  <DiscordIcon className="size-30 text-muted-foreground opacity-40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}
