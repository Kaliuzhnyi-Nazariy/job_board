const CustomButton = ({
  buttonText,
  extraStyles,
  type = "accent",
  children,
  onClick,
  disabled = false,
  buttonType = "submit",
  loading,
}: {
  buttonText?: string;
  extraStyles?: string;
  type?: "accent" | "outlined" | "delete" | "pale";
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  buttonType?: "button" | "submit";
  loading?: boolean;
}) => {
  const basicButtonStyles =
    "button px-6 py-3 rounded-sm border transition-colors duration-150 enabled:cursor-pointer disabled:opacity-50 ";

  const buttonStyles = () => {
    switch (type) {
      case "accent": {
        return (
          basicButtonStyles +
          " border-transparent text-white bg-(--primary5) enabled:hover:border-(--primary6) enabled:hover:bg-(--primary6) "
        );
      }
      case "outlined": {
        return (
          basicButtonStyles +
          " border-(--primary1) text-(--primary5) enabled:hover:border-(--primary6) enabled:hover:text-(--primary6) enabled:hover:bg-(--primary50) "
        );
      }
      case "delete": {
        return (
          basicButtonStyles +
          " bg-(--danger5) border-transparent text-white enabled:hover:bg-white enabled:hover:text-(--danger5) enabled:hover:border-(--danger5) "
        );
      }
      case "pale": {
        return (
          basicButtonStyles +
          " border-transparent text-(--primary5) bg-(--primary50) enabled:hover:text-(--primary6) enabled:hover:bg-(--primary1) "
        );
      }
      default: {
        return (
          basicButtonStyles +
          " border-transparent text-white bg-(--primary5) enabled:hover:border-(--primary6) enabled:hover:bg-(--primary6) "
        );
      }
    }
  };

  return (
    <button
      className={buttonStyles() + (extraStyles ? extraStyles : "")}
      onClick={onClick}
      disabled={disabled || loading}
      type={buttonType}
    >
      {loading ? "Loading..." : <>{children ? children : buttonText}</>}
    </button>
  );
};

export default CustomButton;
