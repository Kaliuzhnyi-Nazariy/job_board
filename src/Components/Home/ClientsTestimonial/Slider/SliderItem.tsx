import StarOutlinedIcon from "@mui/icons-material/StarOutlined";

const SliderItem = ({
  comment,
  name,
  job,
}: {
  comment: string;
  name: string;
  job: string;
}) => {
  return (
    <div className="keen-slider__slide bg-white flex flex-col justify-between px-6 pt-6 pb-6.5 h-85 min-[768px]:h-73.5 w-72 min-[1440px]:w-106 rounded-xl  ">
      <div className="">
        <ul className="flex">
          <li>
            <StarOutlinedIcon className="size-7 text-(--warning5) text-center" />
          </li>
          <li>
            <StarOutlinedIcon className="size-7 text-(--warning5) text-center" />
          </li>
          <li>
            <StarOutlinedIcon className="size-7 text-(--warning5) text-center" />
          </li>
          <li>
            <StarOutlinedIcon className="size-7 text-(--warning5) text-center" />
          </li>
          <li>
            <StarOutlinedIcon className="size-7 text-(--warning5) text-center" />
          </li>
        </ul>
        <article className="mt-4 text-(--gray7) body_medium">
          {"“"}
          {comment}
          {"”"}
        </article>
      </div>

      <div className="flex justify-between w-full">
        <div className="flex gap-3">
          {" "}
          <div className="size-12 rounded-full bg-purple-500"></div>
          <div className="">
            <p className="body_medium_500">{name}</p>
            <p className="body_small text-(--gray5) mt-1">{job}</p>
          </div>
        </div>
        <img src="Quote.png" alt="quote mark" />
      </div>
    </div>
  );
};

export default SliderItem;
