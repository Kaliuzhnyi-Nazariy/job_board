export interface ISubscription {
  name: string;
  price: number;
  id: string;
  limits: number;
}

export interface IInvoice {
  date: string;
  plan: "pro" | "standard" | "basic";
  id: string;
  amount: number;
  pdf: string;
}
