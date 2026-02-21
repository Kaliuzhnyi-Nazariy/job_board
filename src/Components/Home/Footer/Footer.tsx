import Section from "../../Section";

import WorkIcon from "@mui/icons-material/Work";
import FooterNavigation from "./FooterNavigation";
import { Link } from "react-router";

import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const footerNavStyles = "w-full ";

  return (
    <footer className="bg-(--gray9) text-(--gray4)">
      {/* <Section extraStyles="pt-25 py-20  body_medium flex gap-22.5"> */}
      <Section extraStyles="pt-25 py-20  body_medium flex flex-col min-[1440px]:flex-row gap-22.5">
        <div className="max-w-78">
          <span className="flex gap-2 items-center text-white">
            <WorkIcon className="" />

            <h1 className="logo">MyJob</h1>
          </span>

          <p className="body_large mt-6">
            Call now:{" "}
            <a href="tel:3195550115" className="text-white body_large_500">
              {" "}
              (319) 555-0115
            </a>
          </p>

          <p className="body_small mt-3">
            6391 Elgin St. Celina, Delaware 10299, New York, United States of
            America
          </p>
        </div>

        {/* <ul className="grid grid-cols-[repeat(4,200px)] gap-10"> */}
        <ul className="grid grid-cols-1 min-[640px]:w-full min-[640px]:grid-cols-2 self-center min-[1440px]:grid-cols-[repeat(4,200px)] gap-10 w-full">
          <li className={footerNavStyles}>
            <p className="body_xl_500 text-white">Quick Link</p>
            <ul className="mt-4 flex flex-col gap-1 body_medium">
              <FooterNavigation title="About" />
              <FooterNavigation title="Contact" />
              <FooterNavigation title="Pricing" />
              <FooterNavigation title="Blog" />
            </ul>
          </li>
          <li className={footerNavStyles}>
            <p className="body_xl_500 text-white">Candidate</p>
            <ul className="mt-4 flex flex-col  gap-1 body_medium ">
              <FooterNavigation
                title="Browse Jobs"
                linkTo="/candidate/find-job"
              />
              <FooterNavigation
                title="Browse Employers"
                linkTo="/candidate/find-job"
              />
              <FooterNavigation
                title="Candidate Dashboard"
                linkTo="/candidate/dashboard"
              />
              <FooterNavigation title="Saved Jobs" />
            </ul>
          </li>
          <li className={footerNavStyles}>
            <p className="body_xl_500 text-white">Employers</p>
            <ul className="mt-4 flex flex-col  gap-1 body_medium">
              <FooterNavigation
                title="Post a Job"
                linkTo="/employer/dashboard/post-a-job"
              />
              <FooterNavigation
                title="Browse Candidates"
                linkTo="/employer/candidates"
              />
              <FooterNavigation
                title="Employers Dashboard"
                linkTo="/employer/dashboard"
              />
              <FooterNavigation
                title="Applications"
                linkTo="/employer/dashboard/my-jobs"
              />
            </ul>
          </li>
          <li className={footerNavStyles}>
            <p className="body_xl_500 text-white">Support</p>
            <ul className="mt-4 flex flex-col  gap-1 body_medium">
              <FooterNavigation title="FAQs" />
              <FooterNavigation title="Privacy Policy" />
              <FooterNavigation title="Terms & Conditions" />
            </ul>
          </li>
        </ul>
      </Section>
      <hr />
      <div className="px-3 min-[428px]:px-6 min-[1024px]:px-8 min-[1440px]:px-22 min-[1920px]:px-75 py-6 min-[768px]:flex items-center grid grid-cols-1 grid-rows-auto min-[1024px]:flex-row justify-between body_small  text-(--gray5)">
        <p className="text-center mt-6 min-[768px]:mt-0">
          @ 2024 MyJob - Job Portal. All rights Reserved
        </p>

        <ul className=" min-[1024px]:flex flex-row gap-5 items-center row-start-1 grid grid-cols-2 max-[1023px]:w-full">
          <li className="justify-self-center">
            <Link to="https://www.facebook.com/">
              <FaFacebookF className="w-2.5 h-5 fill-(--gray5) hover:fill-white transition-colors duration-150 " />
            </Link>
          </li>

          <li className="justify-self-center">
            <Link to="https://www.youtube.com/">
              <FaYoutube className="size-5 fill-(--gray5) hover:fill-white transition-colors duration-150 " />
            </Link>
          </li>

          <li className="justify-self-center">
            <Link to="https://www.instagram.com/" target="_blank">
              <FaInstagram className="size-5 fill-(--gray5) hover:fill-white transition-colors duration-150 " />
            </Link>
          </li>

          <li className="justify-self-center">
            <Link to="https://x.com/">
              <FaXTwitter className="size-5 fill-(--gray5) hover:fill-white transition-colors duration-150 " />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
