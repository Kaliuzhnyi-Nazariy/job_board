import Section from "../../Section";
import CategoryItem from "./CategoryItem";

import { popularCategories } from "../../../extras/categories";

const PopularCategory = () => {
  return (
    <Section extraStyles="py-25">
      <div className="flex justify-between">
        <h1 className="text-center">Popular category</h1>
      </div>
      <ul className="mt-12.5 grid grid-cols-1 min-[640px]:grid-cols-2 min-[1152px]:grid-cols-3 min-[1440px]:grid-cols-4 gap-6">
        {popularCategories.map(({ title, amount, icon: Icon }) => {
          return <CategoryItem icon={Icon} title={title} amount={amount} />;
        })}
      </ul>
    </Section>
  );
};

export default PopularCategory;
