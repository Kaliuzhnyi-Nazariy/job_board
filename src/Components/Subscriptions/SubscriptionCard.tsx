import { useMutation, useQueryClient } from "@tanstack/react-query";
import subscriptionsRequest from "../../../features/subscription/requests";

const SubscriptionCard = ({
  title,
  price,
  subscriptionId,
  mySubscription,
  mySubscriptionId,
}: {
  title: string;
  price: number;
  subscriptionId: string;
  mySubscription: string;
  mySubscriptionId: string;
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: () => subscriptionsRequest.subscribe({ subscriptionId }),
    onSuccess(data) {
      window.location.href = data.url;
    },
  });

  const queryClient = useQueryClient();

  const { mutate: cancel, isPending: canceling } = useMutation({
    mutationFn: () => subscriptionsRequest.cancelSubscription(mySubscriptionId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["getMySubscription"] });
    },
  });

  return (
    <li>
      <h4>{title}</h4>
      <p>${price}</p>

      {!mySubscription && (
        <>
          {!isPending ? (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-sm"
              onClick={() => mutate()}
            >
              Buy
            </button>
          ) : (
            <p>Loading...</p>
          )}
        </>
      )}
      {subscriptionId === mySubscription && (
        <>
          {!canceling ? (
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-sm"
              onClick={() => cancel()}
            >
              Cancel
            </button>
          ) : (
            <p>Loading...</p>
          )}
        </>
      )}
    </li>
  );
};

export default SubscriptionCard;
