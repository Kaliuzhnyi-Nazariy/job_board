import ChangePasswordForm from "./ChangePasswordForm";
import ContactForm from "./ContactForm";
import DeleteAccount from "./DeleteAccount";

const Account = () => {
  return (
    <>
      <h6 className="body_large_500">Contact Info</h6>
      <ContactForm />
      <div className="h-px w-full bg-(--gray1) my-8"></div>
      <h6 className="body_large_500">Change password</h6>
      <ChangePasswordForm />
      <div className="h-px w-full bg-(--gray1) my-8"></div>
      <DeleteAccount />
    </>
  );
};

export default Account;
