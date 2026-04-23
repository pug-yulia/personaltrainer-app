// Type definitions shared across the whole app
// If API changes, only update in one place

export type Customer = {
  firstname: string;
  lastname: string;
  streetaddress: string;
  postcode: string;
  city: string;
  email: string;
  phone: string;
  // _links.self.href as UID
  _links: {
    self: { href: string };
    customer: { href: string };
    trainings: { href: string };
  };
};

export type TrainingWithCustomer = {
  id: number;
  date: string;
  duration: number;
  activity: string;
  // Customer can be null if a training has no associated customer in the database
  customer: {
    id: number;
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
  } | null;
};
