import DataBlock from "./DataBlock";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import subscriptionsRequest from "../../../features/subscription/requests";

const CurrentPlan = ({
  plan,
  subscription,
}: {
  plan: string;
  subscription: string;
}) => {
  const client = useQueryClient();

  const { mutate: cancel, isPending: cancelPending } = useMutation({
    mutationFn: () => subscriptionsRequest.cancelSubscription(subscription),
    onSuccess() {
      console.log("helllo");
      client.invalidateQueries({ queryKey: ["getMySubscription"] });
    },
  });

  return (
    <>
      <DataBlock position="col-start-1 md:col-end-3">
        <p className="body_medium_500 mb-5">Current Plan</p>
        <h3 className="uppercase">{plan}</h3>
        <p className="body_medium text-(--gray5) mt-3">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere.
        </p>

        {cancelPending ? (
          <p>Loading...</p>
        ) : (
          <button
            className="bg-(--gray50) text-(--danger5) px-6 py-3 rounded-sm mt-8 cursor-pointer hover:text-white hover:bg-(--danger5) focus:text-white focus:bg-(--danger5) focus:outline-none transition-colors duration-200      "
            onClick={() => cancel()}
          >
            Cancel plan
          </button>
        )}
      </DataBlock>
    </>
  );
};

export default CurrentPlan;
