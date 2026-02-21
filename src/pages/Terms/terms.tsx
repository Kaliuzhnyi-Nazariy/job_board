import Footer from "../../Components/Home/Footer/Footer";
import Section from "../../Components/Section";
import TermsItem from "../Terms/TermsItem";

const Terms = () => {
  const termsDataList = [
    {
      id: "terms_and_conditions",
      title: "Terms & Condition",
      article: `Praesent placerat dictum elementum. Nam pulvinar urna vel lectus
              maximus, eget faucibus turpis hendrerit. Sed iaculis molestie
              arcu, et accumsan nisi. Quisque molestie velit vitae ligula luctus
              bibendum. Duis sit amet eros mollis, viverra ipsum sed, convallis
              sapien. Donec justo erat, pulvinar vitae dui ut, finibus euismod
              enim. Donec velit tortor, mollis eu tortor euismod, gravida
              lacinia arcu.`,
      listData: [
        `In ac turpis mi. Donec quis semper neque. Nulla cursus gravida interdum.`,
        `Curabitur luctus sapien augue, mattis faucibus nisl vehicula nec. Mauris at scelerisque lorem. Nullam tempus felis ipsum, sagittis malesuada nulla vulputate et.`,
        `Aenean vel metus leo. Vivamus nec neque a libero sodales aliquama et dolor.`,
        `Vestibulum rhoncus sagittis dolor vel finibus.`,
        `Integer feugiat lacus ut efficitur mattis. Sed quis molestie velit.`,
      ],
    },
    {
      id: "limitations",
      title: "Limitations",
      article: `In pretium est sit amet diam feugiat eleifend. Curabitur consectetur fringilla metus. Morbi hendrerit facilisis tincidunt. Sed condimentum lacinia arcu. Ut ut iaculis metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel erat elit. In vitae turpis tempor, accumsan sapien vitae, rutrum eros. Integer pulvinar mattis turpis, ac fermentum leo ullamcorper a. Nam finibus eros libero, sit amet mattis lacus tristique eu. Donec nec ex convallis, ultricies eros ut, mollis libero. Ut scelerisque lacus interdum consectetur sodales.`,
      listData: [
        `In ac turpis mi. Donec quis semper neque. Nulla cursus gravida interdum.`,
        `Curabitur luctus sapien augue.`,
        `mattis faucibus nisl vehicula nec. Mauris at scelerisque lorem.`,
        `Nullam tempus felis ipsum, sagittis malesuada nulla vulputate et. Aenean vel metus leo.`,
        `Vivamus nec neque a libero sodales aliquam a et dolor.`,
      ],
    },
    {
      id: "security",
      title: "Security",
      article: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ex neque, elementum eu blandit in, ornare eu purus. Fusce eu rhoncus mi, quis ultrices lacus. Phasellus id pellentesque nulla. Cras erat nisi, mattis et efficitur et, iaculis a lacus. Fusce gravida augue quis leo facilisis.`,
    },
    {
      id: "privacy_policy",
      title: "Privacy Policy",
      article: `Praesent non sem facilisis, hendrerit nisi vitae, volutpat quam. Aliquam metus mauris, semper eu eros vitae, blandit tristique metus. Vestibulum maximus nec justo sed maximus. Vivamus sit amet turpis sem. Integer vitae tortor ac ex scelerisque facilisis ac vitae urna. In hac habitasse platea dictumst. Maecenas imperdiet tortor arcu, nec tincidunt neque malesuada volutpat.`,
      listData: [
        `In ac turpis mi. Donec quis semper neque. Nulla cursus gravida interdum.`,
        `Mauris at scelerisque lorem. Nullam tempus felis ipsum, sagittis malesuada nulla vulputate et.`,
        `Aenean vel metus leo.`,
        `Vestibulum rhoncus sagittis dolor vel finibus.`,
        `Integer feugiat lacus ut efficitur mattis. Sed quis molestie velit.`,
      ],
      extraArticle: `Fusce rutrum mauris sit amet justo rutrum, ut sodales lorem ullamcorper. Aliquam vitae iaculis urna. Nulla vitae mi vel nisl viverra ullamcorper vel elementum est. Mauris vitae elit nec enim tincidunt aliquet. Donec ultrices nulla a enim pulvinar, quis pulvinar lacus consectetur. Donec dignissim, risus nec mollis efficitur, turpis erat blandit urna, eget elementum lacus lectus eget lorem.`,
    },
  ];

  return (
    <>
      <Section extraStyles="py-10 min-[1440px]:py-25 min-[1024px]:grid min-[1024px]:grid-cols-auto min-[1024px]:grid-rows-auto  min-[1024px]:gap-20 min-[1440px]:gap-28">
        <div className="min-[1024px]:border-l min-[1024px]:border-l-(--gray5) min-[1024px]:pl-6 min-[1024px]:col-start-2 min-[1024px]:row-start-1 min-[1024px]:row-end-2 ">
          <p className="text-(--gray5) text-[14px]">Table of Contents</p>
          <ul className="body_small flex flex-col gap-2 mt-3">
            <li>
              <span>1. </span>
              <a href={"#terms_and_conditions"}>Terms & Condition</a>
            </li>
            <li>
              <span>2. </span>
              <a href={"#limitations"}>Limitations</a>
            </li>
            <li>
              <span>3. </span>
              <a href={"#security"}>Security</a>
            </li>
            <li>
              <span>4. </span>
              <a href={"#privacy_policy"}>Privacy Policy</a>
            </li>
          </ul>
        </div>
        <ul className="  text-justify mt-10 min-[1024px]:mt-0 flex flex-col gap-12.5  min-[1024px]:col-start-1 min-[1024px]:row-start-1 min-[1024px]:row-end-3">
          {termsDataList.map((tdl, index) => {
            return (
              <TermsItem
                id={tdl.id}
                number={index + 1}
                title={tdl.title}
                article={tdl.article}
                listOfData={tdl.listData}
                key={tdl.id + index}
              />
            );
          })}
        </ul>
      </Section>
      <Footer />
    </>
  );
};

export default Terms;
