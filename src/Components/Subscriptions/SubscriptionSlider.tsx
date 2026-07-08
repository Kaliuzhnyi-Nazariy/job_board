// import "./styles.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import SubscriptionCard from "./SubscriptionCard";
import type { ISubscription } from "../../../features/subscription/interface";

const SubscriptionSlider = ({
  subscriptions,
}: {
  subscriptions: ISubscription[];
}) => {
  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 1,
      spacing: 24,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 24,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 3,
          spacing: 24,
        },
      },
    },
  });
  return (
    <div ref={ref} className="keen-slider">
      {subscriptions.map((sub) => {
        return (
          <SubscriptionCard
            key={sub.id}
            title={sub.name}
            price={sub.price}
            subscriptionId={sub.id}
            limits={sub.limits}
          />
        );
      })}
    </div>
  );
};

export default SubscriptionSlider;
