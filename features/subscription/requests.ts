import api from "../api/api";
import { errorWrapper } from "../helper";

const getAllSubscriptions = async () => {
  return (await api.get("/subscriptions/all")).data;
};

const getMySubscription = async () => {
  return (await api.get("/subscriptions/my")).data;
};

const subscribe = async ({ subscriptionId }: { subscriptionId: string }) => {
  return (await api.post("/subscriptions/subscribe", { subscriptionId })).data;
};

const cancelSubscription = async (id: string) => {
  return (await api.delete("/subscriptions/cancel/" + id)).data;
};

const getSubscriptionData = async (id: string) => {
  return (await api.get("/subscriptions/data/" + id)).data;
};

const getInvoices = async () => {
  return (await api.get("/subscriptions/invoices")).data;
};

export default {
  getAllSubscriptions: errorWrapper(getAllSubscriptions),
  getMySubscription: errorWrapper(getMySubscription),
  subscribe: errorWrapper(subscribe),
  cancelSubscription: errorWrapper(cancelSubscription),
  getSubscriptionData: errorWrapper(getSubscriptionData),
  getInvoices: errorWrapper(getInvoices),
};
