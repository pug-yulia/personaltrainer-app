import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"; // https://recharts.github.io/en-US/api/BarChart/
import Typography from "@mui/material/Typography";
import { groupBy, sumBy } from "lodash";
import { fetchTrainings } from "../../api/trainingApi";
import type { TrainingWithCustomer } from "../../types";

// The shape of data recharts bars
type ActivityStat = {
  activity: string;
  duration: number;
};

export default function StatsPage() {
  const [stats, setStats] = useState<ActivityStat[]>([]);

  useEffect(() => {
    fetchTrainings()
      .then((trainings: TrainingWithCustomer[]) => {
        // lodash groupBy splits the flat array into groups by activity name
        // { "Activity": [...], "Activity": [...], ... }
        const grouped = groupBy(trainings, "activity");

        // each group turns into a single object with total duration
        // sumBy adds the duration across all trainings in each group
        // https://stackoverflow.com/questions/25047463/group-by-and-sum-using-underscore-lodash
        const result: ActivityStat[] = Object.entries(grouped).map(
          ([activity, group]) => ({
            activity,
            duration: sumBy(group, "duration"),
          }),
        );

        setStats(result);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Statistics
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={stats}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="activity" />
          <YAxis
            label={{
              value: "Duration (min)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          {/* shows exact value when you hover over a bar */}
          <Tooltip />
          <Bar dataKey="duration" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
