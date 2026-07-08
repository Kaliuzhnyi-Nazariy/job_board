import SubscriptionSlider from "./SubscriptionSlider";
import type { ISubscription } from "../../../features/subscription/interface";

const SubscriptionBuy = ({
  isFetching,
  subscriptions,
}: {
  isFetching: boolean;
  subscriptions: ISubscription[];
}) => {
  return (
    <>
      <div className="w-full flex items-center flex-col-reverse gap-6 md:flex-row md:gap-34">
        <div className="text-center md:text-left">
          <h4>Buy Premium Subscription to Post a Job</h4>
          <p className="body_medium text-(--gray6) mt-4">
            Donec eu dui ut dolor commodo ornare. Sed arcu libero, malesuada
            quis justo sit amet, varius tempus neque. Quisque ultrices mi sed
            lorem condimentum, vel tempus lectus ultricies.
          </p>
        </div>
        <img src="/Subscription.png" alt="pop-up message" />
      </div>
      {isFetching ? (
        <p>Loading</p>
      ) : (
        <SubscriptionSlider subscriptions={subscriptions} />
      )}
    </>
  );
};

export default SubscriptionBuy;
