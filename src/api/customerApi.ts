// API layer separate from UI
// like in carshop example

import type { Customer } from "../types";

// to access the key
const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchCustomers = (): Promise<Customer[]> =>
  fetch(`${BASE_URL}/customers`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch customers");
      return res.json();
    })
    // unwrap api data so components receive a plain array
    .then((data) => data._embedded.customers);
