import { Bot, Hash, Bug, CheckCircle, FileText, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Bot,
    title: "Bot Joins",
    description: "Invite Honeypot to your server.",
    color: "text-primary",
    bgColor: "bg-[#12151a]",
  },
  {
    icon: Hash,
    title: "Honeypot Channel",
    description: "A #honeypot channel is created (or you set it up).",
    color: "text-foreground",
    bgColor: "bg-[#12151a]",
  },
  {
    icon: Bug,
    title: "Spammer Bites",
    description: "Spammers post in the channel thinking it's safe.",
    color: "text-red-400",
    bgColor: "bg-[#12151a]",
  },
  {
    icon: CheckCircle,
    title: "Instant Action",
    description: "Honeypot bans/kicks the user and deletes their messages.",
    color: "text-green-400",
    bgColor: "bg-[#12151a]",
  },
  {
    icon: FileText,
    title: "Logged",
    description: "The action is logged to your chosen admin channel.",
    color: "text-blue-400",
    bgColor: "bg-[#12151a]",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
          How It Works
        </h2>
        <div className="flex max-sm:flex-wrap items-start justify-center gap-y-10 gap-x-4 md:gap-x-8 md:overflow-x-auto">
          {steps.map((step, index) => (
            /* Use a fixed basis instead of flex-1 to keep them equal size without stretching */
            <div
              key={step.title}
              className="flex items-center gap-2 w-40 md:w-50"
            >
              <div className="flex flex-col items-center w-full">
                <div className={`flex size-14 items-center justify-center rounded-xl border border-border md:size-16 ${step.bgColor}`}>
                  <step.icon className={`size-6 md:size-8 ${step.color}`} />
                </div>
                <div className="mt-3 text-center">
                  <p className="text-sm font-semibold text-foreground">
                    {index + 1}. {step.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-balance">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* The Arrow */}
              {index < steps.length - 1 && (
                <ArrowRight className="-mt-10 hidden size-4 text-muted-foreground lg:block" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
