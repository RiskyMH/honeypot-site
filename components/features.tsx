import { Zap, Shield, Clock, Settings } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Protection",
    description:
      "Automatically bans or kicks spammers the moment they post in the honeypot channel.",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
  },
  {
    icon: Shield,
    title: "Server Safety",
    description:
      "Stops spam before it spreads and keeps your community clean and secure.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Clock,
    title: "Saves Time",
    description:
      "Reduces moderator workload by handling spam so you don't have to.",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    icon: Settings,
    title: "Easy to Use",
    description: "Simple setup with one command. Set it and forget it.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

export function Features() {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
          Why Choose Honeypot?
        </h2>
        <div className="flex gap-6 overflow-x-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="max-lg:w-60 w-auto lg:flex-1 shrink-0 rounded-xl border border-border bg-[#12151a] p-6 transition-colors"
            >
              <div
                className={`mb-4 flex size-12 items-center justify-center rounded-lg ${feature.bgColor}`}
              >
                <feature.icon className={`size-6 ${feature.color}`} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
