const LinkItem = ({
  value,
  handleRedirect,
}: {
  value: string;
  handleRedirect: (value: string) => void;
}) => {
  return (
    <li className="justify-self-center">
      <button
        onClick={() => handleRedirect(value)}
        className="cursor-pointer hover:font-medium hover:text-(--primary5)"
      >
        {value}
      </button>
    </li>
  );
};
export default LinkItem;
