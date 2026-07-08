import { Link } from "react-router";
import DataBlock from "./DataBlock";
import { GrDownload } from "react-icons/gr";
import type { IInvoice } from "../../../features/subscription/interface";

const LastInvoicesTable = ({ invoices }: { invoices: IInvoice[] }) => {
  return (
    <DataBlock customPaddings="mt-6 py-6">
      <p className="body_medium_500 ml-6">Latest Invoices</p>
      <table className="mt-4 w-full px-6 table-fixed text-xs">
        <thead className="uppercase bg-(--gray50) text-(--gray6) body_xs ">
          <tr>
            <th className="pl-6 py-2 w-1/4 min-[425px]:w-1/2">#id</th>
            <th className="w-1/4">date</th>
            <th className="w-1/4">plan</th>
            <th className="w-1/4">amount</th>
            <th className="w-6 md:w-10"></th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv: IInvoice, index: number) => {
            const isLast = index === invoices.length - 1;
            const borderClass = isLast ? "" : "border-b border-(--gray1)";

            return (
              <tr key={inv.id} className="overflow-hidden">
                <td
                  className={`pl-6 py-4 ${borderClass} max-md:truncate max-md:w-5 font-bold `}
                  title={inv.id}
                >
                  #{inv.id}
                </td>
                <td className={borderClass + " max-md:hidden"}>{inv.date}</td>
                <td className={borderClass + " md:hidden"}>
                  {new Date(invoices[0].date).toLocaleDateString()}
                </td>
                <td className={borderClass}>{inv.plan}</td>
                <td className={borderClass}>${inv.amount}</td>
                <td className={`pr-6 text-right ${borderClass}`}>
                  <Link to={inv.pdf} className="inline-block">
                    <GrDownload className="size-3 md:size-4 lg:size-5  text-(--gray4)" />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </DataBlock>
  );
};

export default LastInvoicesTable;
