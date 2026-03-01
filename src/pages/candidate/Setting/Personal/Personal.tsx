import CVSection from "./CVSection";
import PersonalDataForm from "./PersonalDataForm";

const Personal = () => {
  return (
    <>
      <h6 className="body_large_500">Basic Information</h6>
      <PersonalDataForm />
      <CVSection />
    </>
  );
};

export default Personal;
