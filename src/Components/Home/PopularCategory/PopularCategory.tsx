import Section from "../../Section";

import DrawOutlinedIcon from "@mui/icons-material/DrawOutlined";

const PopularCategory = () => {
  return (
    <Section extraStyles="py-20.5">
      <div className="flex justify-between">
        <h1>Popular category</h1>
      </div>
      <ul className="mt-12.5 grid grid-cols-4 gap-6">
        <li className="p-6 gap-4 flex items-center">
          <div className="size-17 bg-(--primary50) rounded-lg flex items-center justify-center">
            <DrawOutlinedIcon className="text-8 text-(--primary5)" />
          </div>
          <div>
            <p className="body_large_500">Graphics & Design</p>
            <p className="mt-2 body_small text-(--gray5)">357 Open position</p>
          </div>
        </li>
      </ul>
    </Section>
  );
};

export default PopularCategory;
