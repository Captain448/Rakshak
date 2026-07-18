import { ReactNode } from "react";

interface TimelineItem {
  time: string;
  title: string;
  description: string;
  badge?: ReactNode;
}

interface TimelineCardProps {
  items: TimelineItem[];
}

export default function TimelineCard({ items }: TimelineCardProps) {
  return (
    <div className="flex flex-col relative border-l-2 border-govgray-200 pl-6 ml-3 gap-6">
      {items.map((item, index) => (
        <div key={index} className="relative">
          {/* Bullet node */}
          <div className="absolute -left-[31px] top-1.5 bg-white border-2 border-navy-900 rounded-full h-4 w-4 flex items-center justify-center">
            <div className="h-1.5 w-1.5 bg-saffron-500 rounded-full"></div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <span className="text-[11px] font-bold text-saffron-600 bg-saffron-100 px-2 py-0.5 rounded">
                {item.time}
              </span>
              {item.badge}
            </div>
            <h5 className="font-bold text-xs text-navy-900">{item.title}</h5>
            <p className="text-xs text-govgray-600 leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
