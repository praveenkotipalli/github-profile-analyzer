// components/HeatmapCard.jsx
import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { subDays, format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";

function HeatmapCard({ commitData }) {
  const today = new Date();
  const startDate = subDays(today, 365);

  // Prepare data for heatmap
  const values = Object.entries(commitData).map(([date, count]) => ({
    date,
    count,
  }));

  return (
    <Card className="border-3 border-black p-2">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Commit Heatmap (Last 1 Year)
        </h3>
        <div className="overflow-x-auto">
          <CalendarHeatmap
            startDate={startDate}
            endDate={today}
            values={values}
            classForValue={(value) => {
              if (!value || value.count === 0) return "color-empty";
              if (value.count < 3) return "color-scale-1";
              if (value.count < 6) return "color-scale-2";
              if (value.count < 10) return "color-scale-3";
              return "color-scale-4";
            }}
            tooltipDataAttrs={(value) =>
              value.date
                ? {
                    "data-tip": `${value.date} — ${value.count} commits`,
                  }
                : undefined
            }
            showWeekdayLabels
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default HeatmapCard;
