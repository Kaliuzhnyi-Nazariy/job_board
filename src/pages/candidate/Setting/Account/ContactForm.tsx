import { TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { userId } from "../../../../../features/user/userSelector";
import {
  getCandidate,
  updateContact,
} from "../../../../../features/candidate/candidatesRequsts";
import type { IDefaultContactForm } from "../../../../../features/candidate/interfaces";
import SettingsButton from "../../../../Components/SettingsButton";

const ContactForm = () => {
  const labelStyles = "body_small mb-2";

  const DefaultContact: IDefaultContactForm = {
    location: "",
    phone: "",
    email: "",
  };

  const {
    register: contactRegister,
    handleSubmit: handleContactSubmit,
    formState: {
      errors: contactErrors,
      //   isValid: contactIsValid
    },
    reset,
  } = useForm({
    defaultValues: DefaultContact,
    mode: "onChange",
  });

  const userIdValue = useSelector(userId);

  const { data, isLoading } = useQuery({
    queryKey: ["candidate", userIdValue],
    queryFn: () => getCandidate(userIdValue!),
  });

  useEffect(() => {
    if (data) {
      reset({
        location: data.location,
        phone: data.phone,
        email: data.email,
      });
    }
  }, [data]);

  const handleSubmit: SubmitHandler<IDefaultContactForm> = async (data) => {
    await updateContact(data);
    //   make popup messages
  };

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <form onSubmit={handleContactSubmit(handleSubmit)} className="mt-4.5">
          <ul className="flex flex-col gap-4.5">
            <li className="flex flex-col">
              <label className={labelStyles}>Map Location</label>
              <TextField
                id="outlined"
                {...contactRegister("location")}
                sx={{
                  "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
                    padding: "12px 18px",
                  },
                  "& .css-18p5xg2-MuiNotchedOutlined-root-MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#e4e5e8",
                    },
                }}
              />
              {contactErrors && <p>{contactErrors.location?.message}</p>}
            </li>
            <li className="flex flex-col">
              <label className={labelStyles}>Phone</label>
              <TextField
                id="outlined"
                {...contactRegister("phone")}
                sx={{
                  "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
                    padding: "12px 18px",
                  },
                  "& .css-18p5xg2-MuiNotchedOutlined-root-MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#e4e5e8",
                    },
                }}
              />
              {contactErrors && <p>{contactErrors.phone?.message}</p>}
            </li>
            <li className="flex flex-col">
              <label className={labelStyles}>Email</label>
              <TextField
                id="outlined"
                type="email"
                {...contactRegister("email")}
                sx={{
                  "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
                    padding: "12px 18px",
                  },
                  "& .css-18p5xg2-MuiNotchedOutlined-root-MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#e4e5e8",
                    },
                }}
              />
              {contactErrors && <p>{contactErrors.email?.message}</p>}
            </li>
          </ul>
          {/* <button className="px-6 py-3 text-white bg-(--primary5) rounded-sm button mt-8">
            Save Changes
          </button> */}
          <SettingsButton></SettingsButton>
        </form>
      )}
    </>
  );
};

export default ContactForm;
