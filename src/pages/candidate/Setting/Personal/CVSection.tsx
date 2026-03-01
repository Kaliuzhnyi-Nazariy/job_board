import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import MoreOptionsMenu from "./MoreOptionsMenu";
import { useState } from "react";
import AddCV from "../../../../Components/modals/Applications/Settings/AddCV";
import UpdateCV from "../../../../Components/modals/Applications/Settings/UpdateCV";
import { useQuery } from "@tanstack/react-query";
import { getCVs } from "../../../../../features/cv/requests";
import type { ICV } from "../../../../../features/cv/interfaces";

const CVSection = () => {
  const [isAddCVOpen, setAddCVOpen] = useState(false);

  const handleAddOpen = () => {
    setAddCVOpen(true);
  };

  const handleAddClose = () => {
    setAddCVOpen(false);
  };

  const [isUpdateCVOpen, setUpdateCVOpen] = useState(false);
  const [selectedCV, setSelectedCV] = useState<ICV | null>(null);

  const handleUpdateOpen = (cvData: ICV) => {
    setSelectedCV(cvData);
    setUpdateCVOpen(true);
  };

  const handleUpdateClose = () => {
    setSelectedCV(null);
    setUpdateCVOpen(false);
  };

  // const CVS_MOCK: { id: string; title: string; size: number }[] = [
  //   { id: "1", title: "Professional", size: 3.5 },
  //   { id: "2", title: "Product design", size: 4.7 },
  //   { id: "13", title: "Visual design", size: 1.3 },
  //   // { id: "15", title: "Professional", size: 3.5 },
  //   // { id: "62", title: "Product design", size: 4.7 },
  //   // { id: "163", title: "Visual design", size: 1.3 },
  // ];

  const { data: cvs, isPending: cvsLoading } = useQuery({
    queryKey: ["getCVs"],
    queryFn: () => getCVs(),
  });

  // console.log({ cvs });

  const turnSizeIntoMB = (size: number) => {
    return (size / 1024).toFixed(1).toString();
  };

  return (
    <>
      <div className="mt-6">
        <p className="body_large_500">Your Cv/Resume</p>
        {cvsLoading ? (
          "Loading..."
        ) : (
          <ul className="mt-3 grid gap-3 min-[640px]:grid-cols-2 min-[1024px]:grid-cols-3 ">
            {cvs &&
              cvs.length > 0 &&
              cvs.map((cv: ICV) => {
                return (
                  <li
                    key={cv.id}
                    className="flex items-center p-5 rounded-md bg--(--gray50) justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <DescriptionOutlinedIcon
                        sx={{ fontSize: "32px", color: "var(--primary5)" }}
                      />
                      <div className="flex flex-col gap-0.5">
                        <p className="body_small_500">{cv.filename}</p>
                        <p className="body_small text-(--gray6)">
                          {turnSizeIntoMB(cv.file_size)} MB
                        </p>
                      </div>
                    </div>
                    <MoreOptionsMenu
                      handleOpenEdit={() => handleUpdateOpen(cv)}
                      cvId={cv.id}
                    />
                  </li>
                );
              })}
            {cvs.length < 6 && (
              <li
                className="flex items-center gap-3 p-5 border-2 border-dashed border-(--gray1) rounded-md"
                onClick={handleAddOpen}
              >
                <AddCircleOutlineOutlinedIcon
                  sx={{ fontSize: "32px", color: "var(--primary5)" }}
                />
                <div className="flex flex-col gap-0.5">
                  <p className="body_small_500">Add Cv/Resume</p>
                  <p className="body_small text-(--gray6)">
                    Browse file or drop here. only pdf
                  </p>
                </div>
              </li>
            )}
          </ul>
        )}
      </div>
      <UpdateCV
        open={isUpdateCVOpen}
        handleClose={handleUpdateClose}
        selectedCV={selectedCV!}
      />
      <AddCV open={isAddCVOpen} handleClose={handleAddClose} />
    </>
  );
};

export default CVSection;
