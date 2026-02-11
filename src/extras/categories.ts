import type { ElementType } from "react";

import DrawOutlinedIcon from "@mui/icons-material/DrawOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";

export const popularCategories: {
  title: string;
  amount: string;
  icon: ElementType;
}[] = [
  { title: "Graphics & Design", amount: "357", icon: DrawOutlinedIcon },
  { title: "Code & Programing", amount: "312", icon: CodeOutlinedIcon },
  { title: "Digital Marketing", amount: "297", icon: CampaignOutlinedIcon },
  {
    title: "Video & Animation",
    amount: "247",
    icon: OndemandVideoOutlinedIcon,
  },
  { title: "Music & Audio", amount: "204", icon: MusicNoteOutlinedIcon },
  { title: "Account & Finance", amount: "167", icon: BarChartOutlinedIcon },
  {
    title: "Health & Care",
    amount: "125",
    icon: HealthAndSafetyOutlinedIcon,
  },
  { title: "Data & Science", amount: "57", icon: StorageOutlinedIcon },
];
