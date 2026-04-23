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
