// API layer separate from UI
// like in carshop example

import type { TrainingWithCustomer } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchTrainings = (): Promise<TrainingWithCustomer[]> =>
  // not /trainings because that returns a link to the customer not their data
  fetch(`${BASE_URL}/gettrainings`).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch trainings");
    return res.json();
    // not wrapped in _embedded, returns a plain array directly
  });

export const addTraining = (training: {
  date: string;
  duration: number;
  activity: string;
  customer: string; // customer self href URL
}): Promise<void> =>
  fetch(`${BASE_URL}/trainings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(training),
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to add training");
  });

export const deleteTraining = (id: number): Promise<void> =>
  fetch(`${BASE_URL}/trainings/${id}`, { method: "DELETE" }).then((res) => {
    if (!res.ok) throw new Error("Failed to delete training");
  });
