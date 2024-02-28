import Icon from "@mui/material/Icon";
import Combination from "./layouts/combination";

const routes = [
  {
    type: "collapse",
    name: "Combination",
    key: "combination",
    icon: <Icon fontSize="small">table_view </Icon>,
    ParamRoute: "/combination/:formName/:page",
    component: <Combination />,
  },
];

export default routes;
