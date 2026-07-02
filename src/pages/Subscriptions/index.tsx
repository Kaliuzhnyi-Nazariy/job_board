import { useQuery } from "@tanstack/react-query";
import DashboardSection from "../../Components/Dashboard/DashboardSection";
import SubscriptionCard from "../../Components/Subscriptions/SubscriptionCard";
import subscriptionsRequest from "../../../features/subscription/requests";

const Subscriptions = () => {
  const { data: subscriptions, isFetching } = useQuery({
    queryKey: ["getSubscriptions"],
    queryFn: () => subscriptionsRequest.getAllSubscriptions(),
  });

  const { data: mySubscription, isFetched } = useQuery({
    queryKey: ["getMySubscription"],
    queryFn: () => subscriptionsRequest.getMySubscription(),
  });

  return (
    <DashboardSection extraStyles="flex flex-col gap-4 text-center items-center justify-center">
      <h2>Subscriptions</h2>
      <small className="text-xs opacity-50">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit eligendi
        suscipit eos obcaecati, id libero vel quae, tempora repellat incidunt,
        aut doloribus! Labore saepe laudantium odit vel dolorem ducimus sed.
      </small>
      {isFetching ? (
        <p>Loading</p>
      ) : (
        <ul className="">
          {subscriptions.map(
            (sub: {
              id: string;
              name: "basic" | "pro" | "premium";
              price: number;
            }) => {
              return (
                <SubscriptionCard
                  mySubscription={isFetched && mySubscription.plan_id}
                  mySubscriptionId={isFetched && mySubscription.subscription_id}
                  subscriptionId={sub.id}
                  title={sub.name}
                  price={sub.price}
                  key={sub.id}
                />
              );
            },
          )}
        </ul>
      )}
    </DashboardSection>
  );
};

export default Subscriptions;
