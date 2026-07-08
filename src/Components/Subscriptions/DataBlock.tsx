const DataBlock = ({
  children,
  position,
  customPaddings,
}: {
  children: React.ReactNode;
  position?: string;
  customPaddings?: string;
}) => {
  return (
    <div
      className={
        "border border-(--gray1) rounded-lg text-left " +
        (position ? position : "") +
        (customPaddings ? customPaddings : " p-6")
      }
    >
      {children}
    </div>
  );
};

export default DataBlock;
