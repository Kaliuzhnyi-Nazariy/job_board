import {
  useMutation,
  // useQueryClient
} from "@tanstack/react-query";
import subscriptionsRequest from "../../../features/subscription/requests";
import { FaCheck } from "react-icons/fa6";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const Block = ({
  children,
  showBorder = false,
}: {
  children: React.ReactNode;
  showBorder?: boolean;
}) => {
  return (
    <div
      className={
        "flex flex-col text-left p-6 " +
        (showBorder && "border-b border-b-(--gray1)")
      }
    >
      {children}
    </div>
  );
};

const SubscriptionDescriptionBlock = ({ message }: { message: string }) => {
  return (
    <li className="flex items-center gap-2">
      <div className="size-5 flex items-center justify-center rounded-full bg-(--gray50)">
        <FaCheck size={12} className="text-(--primary5)" />
      </div>
      <p>{message}</p>
    </li>
  );
};

const SubscriptionCard = ({
  title,
  price,
  subscriptionId,
  limits,
}: {
  title: string;
  price: number;
  subscriptionId: string;
  limits: number;
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: () => subscriptionsRequest.subscribe({ subscriptionId }),
    onSuccess(data) {
      window.location.href = data.url;
    },
  });

  const descriptionMessages = [
    `${limits} active jobs`,
    "Urgents & Featured Jobs",
    "Highlights Job with Colors",
    "24/7 Critical Support",
  ];

  return (
    <div className="keen-slider__slide border border-(--gray1) rounded-lg  group hover:border-(--primary5) focus:border-(--primary5) has-focus:border-(--primary5) transition-colors duration-200">
      <Block showBorder>
        <h4 className="body_medium_500 uppercase">{title}</h4>
        <p className="body_small text-(--gray5) mt-1">
          Praesent eget pulvinar orci. Duis ut pellentesque ligula convalis.
        </p>
        <p className="mt-4 text-[28px] font-medium text-(--primary5)">
          ${price}
          <span className="body_medium text-(--gray4)">/Monthly</span>
        </p>
      </Block>

      <Block>
        <ul className="flex flex-col gap-4">
          {descriptionMessages.map((mess, ind) => {
            return <SubscriptionDescriptionBlock message={mess} key={ind} />;
          })}
        </ul>
      </Block>
      <div className="w-full px-6 pb-6">
        {!isPending ? (
          <button
            className="w-full py-3 bg-(--primary50) text-(--primary5) rounded-sm cursor-pointer hover:bg-(--primary5) hover:text-white focus:bg-(--primary5) focus:text-white focus:outline-none transition-colors duration-200"
            onClick={() => mutate()}
          >
            Choose Plan <ArrowRightAltIcon />
          </button>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SubscriptionCard;
