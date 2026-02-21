const TermsItem = ({
  id,
  number,
  title,
  article,
  listOfData,
  extraArticle,
}: {
  id: string;
  number: number;
  title: string;
  article: string;
  listOfData?: string[];
  extraArticle?: string;
}) => {
  return (
    <li className="body_medium flex flex-col gap-6">
      <h3 id={id} className="flex items-center ">
        <span className="text-[40px] font-medium hidden min-[768px]:block">
          0{number.toString()}.
        </span>{" "}
        {title}
      </h3>

      <article className="text-(--gray6)">{article}</article>
      {listOfData && (
        <ul className="list-disc w-19/20 ml-auto text-(--gray6) flex flex-col gap-3 min-[768px]:w-[97%] min-[1440px]:w-[98.5%] ">
          {listOfData.map((lod, index) => {
            return <li key={index}>{lod}</li>;
          })}
        </ul>
      )}
      {extraArticle && <article>{extraArticle}</article>}
    </li>
  );
};

export default TermsItem;
