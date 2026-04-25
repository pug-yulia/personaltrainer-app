// API layer separate from UI
// like in carshop example

import type { Customer } from "../types";

// to access the key
const BASE_URL = import.meta.env.VITE_API_URL;

// explicitly typed
export const fetchCustomers = (): Promise<Customer[]> =>
  fetch(`${BASE_URL}/customers`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch customers");
      return res.json();
    })
    // unwrap api data so components receive a plain array
    .then((data) => data._embedded.customers);

export const addCustomer = (
  customer: Omit<Customer, "_links">,
): Promise<Customer> =>
  fetch(`${BASE_URL}/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to add customer");
    return res.json();
  });

export const updateCustomer = (
  url: string,
  customer: Omit<Customer, "_links">,
): Promise<Customer> =>
  fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to update customer");
    return res.json();
  });

export const deleteCustomer = (url: string): Promise<void> =>
  fetch(url, { method: "DELETE" }).then((res) => {
    if (!res.ok) throw new Error("Failed to delete customer");
  });
