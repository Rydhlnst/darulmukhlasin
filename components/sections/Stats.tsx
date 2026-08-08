"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "./Reveal";
import { BookOpenIcon, UsersIcon, AwardIcon, HeartIcon } from "lucide-react";

const stats = [
  {
    icon: UsersIcon,
    value: 100,
    suffix: "+",
    label: "Santri Aktif",
  },
  {
    icon: BookOpenIcon,
    value: 30,
    suffix: " Juz",
    label: "Target Hafalan",
  },
  {
    icon: AwardIcon,
    value: 10,
    suffix: "+",
    label: "Tahun Pengabdian",
  },
  {
    icon: HeartIcon,
    value: 100,
    suffix: "%",
    label: "Akhlak Islami",
  },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;

          const interval = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);

          return () => clearInterval(interval);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, started]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="bg-muted/30 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 100}>
              <Card className="h-full text-center">
                <CardContent>
                  <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <stat.icon className="h-7 w-7" />
                  </div>
                  <div className="text-3xl font-bold text-primary lg:text-4xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
