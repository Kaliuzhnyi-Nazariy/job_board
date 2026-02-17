import { useSelector } from "react-redux";
import {
  userError,
  userInitialized,
  userLoading,
  userRole,
} from "../../../features/user/userSelector";
import Section from "../../Components/Section";
import LinkButton from "../../Components/LinkButton";

const Forbidden = () => {
  const role = useSelector(userRole);

  const userErrorMessage = useSelector(userError);
  const userInitializedValue = useSelector(userInitialized);
  const isAuthLoading = useSelector(userLoading);

  const link = () => {
    if (userErrorMessage || (!role && userInitializedValue && !isAuthLoading)) {
      return "/auth/signin";
    } else {
      return "/";
    }
  };

  return (
    <Section extraStyles="w-full h-screen flex items-center justify-center flex-col">
      <h1>Forbidden</h1>
      <p className="text-center my-8">
        Unfortunately you don't have access to that page!
      </p>
      <LinkButton link={link()}>Go home</LinkButton>
    </Section>
  );
};

export default Forbidden;
