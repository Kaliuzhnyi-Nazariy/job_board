import Section from "../../Section";
import { theMostPopularVacancies } from "../../../extras/vacancies";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { userRole } from "../../../../features/user/userSelector";

const MostPopularVacancies = () => {
  const role = useSelector(userRole);

  const handleRedirect = (request: string) => {
    if (role === "employer") {
      return "/employer/candidates?search=" + request;
    } else {
      return "candidate/find-job?title=" + request;
    }
  };

  return (
    <Section extraStyles="py-25">
      <h1>Most Popular Vacancies</h1>
      <ul className="mt-12.5 grid grid-cols-4 grid-rows-3 gap-x-6 gap-y-8">
        {theMostPopularVacancies.map(({ title, amount }) => {
          return (
            <li key={title} className="w-78">
              <Link to={handleRedirect(title)} className="group">
                <p className="body_large_500 group-hover:underline group-hover:text-(--primary5)">
                  {title}
                </p>
                <p className="body_small text-(--gray5) mt-2">
                  {amount} Open Positions
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
};

export default MostPopularVacancies;
