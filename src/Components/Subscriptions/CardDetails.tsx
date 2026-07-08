import { FaCcMastercard } from "react-icons/fa";
import DataBlock from "./DataBlock";
import { SiAmericanexpress, SiVisa } from "react-icons/si";

const CardDetails = ({
  cardBrand,
  name,
  expiry,
  last4,
}: {
  cardBrand: string;
  name: string;
  expiry: string;
  last4: string;
}) => {
  return (
    <DataBlock position="row-start-3 md:row-start-2 md:col-start-2">
      <p className="body_medium_500">Payment Card</p>
      <div className="flex flex-col mt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            {cardBrand === "mastercard" ? (
              <FaCcMastercard className="size-12.5" />
            ) : cardBrand === "visa" ? (
              <SiVisa className="size-12.5" />
            ) : (
              <SiAmericanexpress className="size-12.5" />
            )}
            <div>
              <p className="body_xs text-(--gray5)">Name on card</p>
              <p>{name}</p>
            </div>
          </div>
          <div>
            <p className="body_xs text-(--gray5)">Expires date</p>
            <p>{expiry}</p>
          </div>
        </div>
        <div className="h-px w-full bg-(--gray1) mt-5"></div>
        <p className="mt-5 text-2xl">**** **** **** {last4}</p>
      </div>
    </DataBlock>
  );
};

export default CardDetails;
