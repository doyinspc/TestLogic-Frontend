// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Register from "@material-ui/icons/GroupAdd";
import Login from "@material-ui/icons/LockOpen";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";

//SESSION
import SubjectList from "views/Subject/SubjectList";
import ContentList from "views/Content/ContentList";
import ThemeList from "views/Theme/ThemeList";
import TopicList from "views/Topic/TopicList";
import InstructionList from "views/Instruction/InstructionList";
import QuestionList from "views/Question/QuestionList";
// core components/views for Auth layout
import LoginPage from "views/Pages/LoginPage.jsx";
import RegisterPage from "views/Pages/RegisterPage.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {path: "/Subject", name: "Subject", icon: Person, component: SubjectList, layout: "/admin"},
  {path: "/Theme/:id", name: "Theme", icon: Person, component: ThemeList, layout: "/admin"},
  {path: "/Topic/:id", name: "Topic", icon: Person, component: TopicList, layout: "/admin"},
  {path: "/Instruction/:id", name: "Instruction", icon: Person, component: InstructionList, layout: "/admin"},
  {path: "/Content/:id", name: "Content", icon: Person, component: ContentList, layout: "/admin"},
  {path: "/Question/:id", name: "Question", icon: Person, component: QuestionList, layout: "/admin"},
  
  {
    path: "/login-page",
    name: "Login Page",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Login,
    component: LoginPage,
    layout: "/auth"
  },
  {
    path: "/register-page",
    name: "Register Page",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Register,
    component: RegisterPage,
    layout: "/auth"
  }
];

export default dashboardRoutes;
