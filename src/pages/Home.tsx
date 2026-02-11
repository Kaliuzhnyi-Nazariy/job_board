import Hero from "../Components/Home/Hero/Hero";
import MostPopularVacancies from "../Components/Home/MostPopularVacancies/MostPopularVacancies";
import Instruction from "../Components/Home/Instruction/Instruction";
import PopularCategory from "../Components/Home/PopularCategory/PopularCategory";
import ClientsTestimonial from "../Components/Home/ClientsTestimonial/ClientsTestimonial";

// import Join from "../Components/Home/Join/Join";
// import Footer from "../Components/Home/Footer/Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <MostPopularVacancies />
      <Instruction />
      <PopularCategory />
      <ClientsTestimonial />
      {/*<Join />
      <Footer /> */}
    </>
  );
};

export default Home;
