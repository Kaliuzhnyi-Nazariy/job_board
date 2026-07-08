import DataBlock from "./DataBlock";

const NextInvoices = ({
  price,
  currency,
  nextInvoiceDate,
  date,
}: {
  price: number;
  currency: string;
  nextInvoiceDate: string;
  date: string;
}) => {
  return (
    <DataBlock position="row-start-2">
      <p className="body_medium_500 mb-4">Next Inovices</p>
      <h3 className=" uppercase text-(--primary5)">
        ${price} {currency}
      </h3>
      <p className="mt-3">{nextInvoiceDate}</p>
      <p className="text-(--gray5)">
        Package started: <span className="text-black">{date}</span>
      </p>
      <p className="text-(--gray5) mt-2">
        You have to pay this amount of money every month.
      </p>
    </DataBlock>
  );
};

export default NextInvoices;
