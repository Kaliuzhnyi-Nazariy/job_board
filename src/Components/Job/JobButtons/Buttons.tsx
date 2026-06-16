import React from "react";

const Buttons = ({
  updateMode,
  setUpdateMode,
  deleteJobMutation,
}: {
  updateMode: boolean;
  setUpdateMode: (value: React.SetStateAction<boolean>) => void;
  deleteJobMutation: () => void;
}) => {
  const buttonStyle =
    "cursor-pointer  transition-colors duration-200 w-full py-2 border rounded-md";

  return (
    <ul
      className={
        "grid grid-cols-2 w-full justify-around mt-4 gap-2 " +
        (updateMode && "grid-rows-2")
      }
    >
      <li>
        {!updateMode && (
          <button
            type="button"
            className={
              buttonStyle +
              " bg-(--primary5) text-white hover:border-(--primary5) hover:text-(--primary5) hover:bg-white focus:border-(--primary5) focus:text-(--primary5) focus:bg-white"
            }
            onClick={() => setUpdateMode(true)}
          >
            Update
          </button>
        )}

        {updateMode && (
          <button
            type="submit"
            className={
              buttonStyle +
              " border-transparent bg-(--primary5) text-white hover:border-(--primary5) hover:text-(--primary5) hover:bg-white focus:border-(--primary5) focus:text-(--primary5) focus:bg-white  "
            }
          >
            Save
          </button>
        )}
      </li>

      <li className="col-start-2 row-start-1 justify-self-center w-full">
        <button
          className={
            buttonStyle +
            " bg-(--danger5) text-white border-transparent hover:border-(--danger5) hover:text-(--danger5) hover:bg-white focus:border-(--danger5) focus:text-(--danger5) focus:bg-white"
          }
          onClick={() => deleteJobMutation()}
          type="button"
        >
          Delete
        </button>
      </li>
      {updateMode && (
        <li className="col-start-1 col-end-3 row-start-2 justify-self-center w-full">
          <button
            type="button"
            className={
              buttonStyle +
              " bg-white text-(--primary5) border-(--primary5) hover:border-transparent hover:text-white hover:bg-(--primary5) focus:border-transparent focus:text-white focus:bg-(--primary5)"
            }
            onClick={() => setUpdateMode(false)}
          >
            Cancel
          </button>
        </li>
      )}
    </ul>
  );
};

export default Buttons;
