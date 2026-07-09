import { useQuery } from "@tanstack/react-query";
import DashboardSection from "../../Components/Dashboard/DashboardSection";
import subscriptionsRequest from "../../../features/subscription/requests";
import SubscriptionBuy from "../../Components/Subscriptions/SubscriptionBuy";

import CurrentPlan from "../../Components/Subscriptions/CurrentPlan";
import NextInvoices from "../../Components/Subscriptions/NextInvoices";
import CardDetails from "../../Components/Subscriptions/CardDetails";
import LastInvoicesTable from "../../Components/Subscriptions/LastInvoicesTable";

const Subscriptions = () => {
  const { data: subscriptions, isFetching } = useQuery({
    queryKey: ["getSubscriptions"],
    queryFn: () => subscriptionsRequest.getAllSubscriptions(),
  });

  const { data: invoices, isFetched } = useQuery({
    queryKey: ["usersInvoice"],
    queryFn: subscriptionsRequest.getInvoices,
  });

  if (!isFetched) {
    return (
      <DashboardSection extraStyles="flex flex-1 gap-4 min-[1440px]:gap-12 text-center items-center justify-center ">
        <p>Loading...</p>
      </DashboardSection>
    );
  }

  return (
    <DashboardSection extraStyles="flex flex-col gap-4 min-[1440px]:gap-12 text-center items-center pb-6 ">
      {invoices ? (
        <div className="flex flex-col flex-1 w-full ">
          <div className="grid max-md:grid-rows-3 grid-cols-1 md:grid-cols-2 md:grid-rows-2 w-full gap-x-6 gap-y-5 ">
            <CurrentPlan
              plan={invoices.invoices[0].plan}
              subscription={invoices.subscription}
            />

            <NextInvoices
              currency={invoices.upcomingInvoice.currency}
              date={invoices.invoices[0].date}
              nextInvoiceDate={invoices.upcomingInvoice.nextInvoiceDate}
              price={invoices.upcomingInvoice.price}
            />

            <CardDetails
              cardBrand={invoices.cardDetails.brand}
              expiry={invoices.cardDetails.expiry}
              last4={invoices.cardDetails.last4}
              name={invoices.cardDetails.name}
            />
          </div>

          <LastInvoicesTable invoices={invoices.invoices} />
        </div>
      ) : (
        <SubscriptionBuy
          isFetching={isFetching}
          subscriptions={subscriptions}
        />
      )}
    </DashboardSection>
  );
};

export default Subscriptions;
