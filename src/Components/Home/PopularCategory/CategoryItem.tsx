import type { ElementType } from "react";

const CategoryItem = ({
  icon: Icon,
  title,
  amount,
}: {
  icon: ElementType;
  title: string;
  amount: string;
}) => {
  return (
    <li className="p-6 gap-4 flex items-center group hover:shadow-[0px_12px_40px_0px_rgba(0,44,109,0.04)]">
      <div className="size-17 bg-(--primary50) rounded-lg flex items-center justify-center group-hover:bg-(--primary5) transition-colors duration-150 ">
        <Icon className="text-8 text-(--primary5) group-hover:text-white transition-colors duration-150 " />
      </div>
      <div>
        <p className="body_large_500 group-hover:text-(--primary5) transition-colors duration-150 ">
          {title}
        </p>
        <p className="mt-2 body_small text-(--gray5)">{amount} Open position</p>
      </div>
    </li>
  );
};

export default CategoryItem;
