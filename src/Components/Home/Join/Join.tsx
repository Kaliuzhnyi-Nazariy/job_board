import { Link } from "react-router";
import Section from "../../Section";

import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";

const Join = () => {
  return (
    <Section extraStyles="py-25 grid grid-cols-2 gap-6">
      <div className="h-72.5 rounded-xl p-12.5 bg-(--gray1)">
        <h4>Become a Candidate</h4>
        <article className="mt-4 body_small text-(--gray6) w-78">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus a
          dolor convallis efficitur.
        </article>
        <Link
          to="/auth/signup"
          className="mt-6.5 inline-block px-6 py-3 bg-white text-(--primary5) button rounded-sm hover:text-white hover:bg-(--primary5) transition-colors duration-150 "
        >
          Register now <ArrowRightAltOutlinedIcon />
        </Link>
      </div>

      <div className="h-72.5 rounded-xl p-12.5 bg-(--primary6) text-white">
        <h4>Become a Employer</h4>
        <article className="mt-4 body_small  w-78">
          Cras in massa pellentesque, mollis ligula non, luctus dui. Morbi sed
          efficitur dolor. Pelque augue risus, aliqu.
        </article>
        <Link
          to="/auth/signup"
          className="mt-6.5 inline-block px-6 py-3 bg-white text-(--primary5) button rounded-sm hover:text-white hover:bg-(--primary5) transition-colors duration-150 "
        >
          Register now <ArrowRightAltOutlinedIcon />
        </Link>
      </div>
    </Section>
  );
};

export default Join;
