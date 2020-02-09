// @flow

import React, {
  Component,
  Fragment,
  useState,
  type ComponentType,
  type Node
} from "react";
import Avatar from "@atlaskit/avatar";
import {
  DropdownItem,
  DropdownItemGroup,
  DropdownMenuStateless
} from "@atlaskit/dropdown-menu";
import { AkCodeBlock } from "@atlaskit/code";

import { colors } from "@atlaskit/theme";

import {
  GlobalItem,
  GlobalNavigationSkeleton,
  GlobalNav,
  ThemeProvider,
  modeGenerator
} from "@atlaskit/navigation-next";
import { Checkbox } from "@atlaskit/checkbox";
import Drawer from "@atlaskit/drawer";

import ReactKanban from "react-kanban-dnd";

import { BreadcrumbsStateless, BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import Button, { ButtonGroup } from "@atlaskit/button";
import TextField from "@atlaskit/textfield";
import Select from "@atlaskit/select";
import Page from "@atlaskit/page";
import AvatarGroup from "@atlaskit/avatar-group";
import { AtlassianIcon } from "@atlaskit/logo";
import Form, {
  CheckboxField,
  Field,
  FormFooter,
  HelperMessage,
  ErrorMessage,
  ValidMessage
} from "@atlaskit/form";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  Redirect
} from "react-router-dom";
import axios from "axios";

import UsecaseViewSwitcher from "./modules/components/view_switcher_uc";
// icons
import SignOutIcon from "./icons/signout";
import AddIcon from "./icons/plus_icon";

import Blocks from "./modules/blocks";

import PageHeader from "@atlaskit/page-header";
import UseCases from "./modules/usecases";
import SingInPage from "./modules/views/auth/signin";
import InvitationPage from "./modules/views/auth/invitation_link";
import UserMgmtIcon from "./icons/user_management";
import UserMgmt from "./modules/views/account/user_mgmt";
import SwitcherIcon from "./icons/switcher_icon";
import RecurringJobs from "./icons/rjobs";

import SideBar from "./modules/sidebar";
import NewUseCase from "./modules/views/usecases/new";
import NewTeam from "./modules/views/user_mgmt/newTeam";
import UpdateTeam from "./modules/views/user_mgmt/updateTeam";

import ListUseCases from "./modules/views/usecases/list";
import SingleUseCase from "./modules/views/usecases/use_case";
import KanbanBoard from "./modules/views/overview/kanban";
import { PrivateRoute } from "./modules/views/auth/privateroute";
import Kanban from "./modules/views/overview/kanban";
function getAdorableAvatar(id: string, size: number = 80) {
  return `https://api.adorable.io/avatars/${size}/${id}.png`;
}

function GaugeIcon() {
  return (
    <svg
      width={28}
      height={25}
      viewBox="0 0 30 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.25119 26.3959C5.62546 26.7192 6.08806 26.923 6.57928 26.981C7.0705 27.0389 7.56781 26.9483 8.00703 26.7208C10.1622 25.5838 12.563 24.9917 14.9997 24.9961C17.5244 24.9961 19.9053 25.621 21.9924 26.7208C22.8861 27.1957 23.9859 27.0458 24.7545 26.3896C26.5398 24.8646 27.9412 22.9409 28.8455 20.7741C29.7497 18.6073 30.1315 16.2581 29.96 13.9165C29.6858 10.3058 28.1199 6.91482 25.5491 4.3647C22.9784 1.81458 19.5748 0.276076 15.9621 0.0310435C12.8196 -0.171432 9.69307 0.620379 7.02576 2.29423C4.35844 3.96808 2.28567 6.43905 1.10126 9.35684C-0.08314 12.2746 -0.319077 15.4912 0.4269 18.5506C1.17288 21.61 2.86292 24.357 5.25744 26.4021L5.25119 26.3959ZM6.80096 23.5213L6.54475 23.2651C5.31844 22.0107 4.38149 20.5031 3.79962 18.8482C3.21775 17.1933 3.00507 15.4311 3.1765 13.6853C3.25149 13.1728 3.28898 12.6229 3.42646 12.123L3.61394 11.3544L3.88265 10.6045C3.95763 10.342 4.07012 10.092 4.1826 9.85458C4.30133 9.60461 4.40757 9.35465 4.53255 9.11719C4.80751 8.64851 5.05747 8.16108 5.39492 7.72989C6.63906 5.95852 8.33216 4.55012 10.3004 3.64925C10.7754 3.43054 11.2565 3.25556 11.7252 3.09309C12.2064 2.97435 12.6688 2.79938 13.1438 2.73689C13.6124 2.6619 14.0686 2.56816 14.5186 2.54942C14.956 2.52442 15.4122 2.48693 15.8059 2.50567C17.6791 2.54656 19.5195 3.0056 21.1926 3.84922C21.3189 3.91077 21.432 3.99661 21.5252 4.10184C21.6184 4.20706 21.6899 4.32961 21.7358 4.4625C21.7816 4.59538 21.8008 4.73599 21.7923 4.87631C21.7838 5.01662 21.7478 5.15388 21.6862 5.28026C21.6247 5.40664 21.5389 5.51966 21.4336 5.61286C21.3284 5.70607 21.2058 5.77763 21.073 5.82348C20.9401 5.86932 20.7995 5.88854 20.6592 5.88004C20.5188 5.87154 20.3816 5.83548 20.2552 5.77394L20.2302 5.75519L20.1927 5.73644L19.899 5.58022C19.1775 5.21835 18.4191 4.9355 17.6368 4.73659C17.0175 4.58644 16.3859 4.49232 15.7496 4.45538C15.3747 4.42414 15.0247 4.44289 14.6373 4.45538C14.2623 4.45538 13.8687 4.51787 13.4687 4.56787C13.0625 4.60536 12.6626 4.74284 12.2439 4.82408C10.9419 5.19813 9.71974 5.80816 8.63819 6.62381C7.90704 7.21122 7.2009 7.86737 6.63848 8.64226C6.31978 9.0047 6.09482 9.42964 5.82611 9.82958C5.70737 10.0358 5.60739 10.2545 5.50115 10.467C5.38867 10.6732 5.28244 10.8919 5.20745 11.1106L4.95124 11.773L4.76376 12.4479C4.61379 12.8979 4.57629 13.3353 4.48881 13.7727C4.25527 15.436 4.41363 17.1308 4.95124 18.722C5.43476 20.1613 6.2114 21.4848 7.23215 22.6089L7.48211 22.8839C7.56441 22.9747 7.60783 23.0942 7.60307 23.2167C7.59832 23.3392 7.54575 23.455 7.45665 23.5392C7.36754 23.6234 7.249 23.6693 7.12643 23.6671C7.00386 23.665 6.88702 23.6148 6.80096 23.5275V23.5213Z"
        fill="#FFC6EF"
        style={{ fill: "white" }}
      />
      <path
        d="M24.2795 24.2772C24.1625 24.3936 24.0041 24.459 23.839 24.459C23.6739 24.459 23.5155 24.3936 23.3984 24.2772L22.0674 22.9524C21.9497 22.8348 21.8836 22.6752 21.8836 22.5087C21.8836 22.3423 21.9497 22.1827 22.0674 22.0651C22.1851 21.9474 22.3446 21.8813 22.5111 21.8813C22.6775 21.8813 22.8371 21.9474 22.9547 22.0651L24.2795 23.3961C24.394 23.5129 24.4582 23.67 24.4582 23.8335C24.4582 23.9971 24.394 24.1542 24.2795 24.271V24.2772ZM26.3667 21.5589C26.3259 21.6305 26.2713 21.6933 26.2061 21.7437C26.1409 21.7942 26.0664 21.8312 25.9868 21.8527C25.9072 21.8742 25.8242 21.8797 25.7425 21.869C25.6607 21.8582 25.5819 21.8314 25.5106 21.7901L23.8859 20.8527C23.7417 20.7699 23.6363 20.6331 23.5929 20.4726C23.5496 20.312 23.5718 20.1408 23.6546 19.9966C23.7375 19.8524 23.8743 19.7471 24.0348 19.7037C24.1954 19.6603 24.3666 19.6825 24.5108 19.7654L26.1355 20.7028C26.2071 20.7436 26.27 20.7982 26.3204 20.8634C26.3708 20.9286 26.4078 21.0031 26.4293 21.0827C26.4508 21.1623 26.4563 21.2453 26.4456 21.327C26.4349 21.4088 26.4081 21.4876 26.3667 21.5589V21.5589ZM27.679 18.3969C27.6573 18.4761 27.6202 18.5503 27.5699 18.6151C27.5195 18.68 27.4568 18.7343 27.3854 18.7749C27.314 18.8156 27.2353 18.8417 27.1538 18.8519C27.0723 18.8621 26.9896 18.8561 26.9104 18.8343L25.0982 18.3531C25.0186 18.3318 24.944 18.295 24.8786 18.2448C24.8132 18.1946 24.7583 18.1321 24.7171 18.0607C24.6759 17.9893 24.6492 17.9105 24.6385 17.8288C24.6277 17.7471 24.6332 17.6641 24.6545 17.5845C24.6758 17.5049 24.7126 17.4303 24.7628 17.3649C24.813 17.2995 24.8755 17.2446 24.9469 17.2034C25.0911 17.1202 25.2624 17.0977 25.4231 17.1408L27.2354 17.6282C27.3146 17.6499 27.3888 17.687 27.4536 17.7374C27.5185 17.7878 27.5728 17.8505 27.6134 17.9219C27.6541 17.9932 27.6802 18.0719 27.6904 18.1534C27.7006 18.235 27.6946 18.3177 27.6728 18.3969H27.679ZM28.1227 14.9974C28.1227 15.1631 28.0569 15.3221 27.9397 15.4392C27.8225 15.5564 27.6636 15.6223 27.4978 15.6223H25.6231C25.4574 15.6223 25.2984 15.5564 25.1812 15.4392C25.064 15.3221 24.9982 15.1631 24.9982 14.9974C24.9982 14.8316 25.064 14.6727 25.1812 14.5555C25.2984 14.4383 25.4574 14.3725 25.6231 14.3725H27.4978C27.6636 14.3725 27.8225 14.4383 27.9397 14.5555C28.0569 14.6727 28.1227 14.8316 28.1227 14.9974ZM27.6728 11.5979C27.6946 11.6771 27.7006 11.7598 27.6904 11.8413C27.6802 11.9228 27.6541 12.0015 27.6134 12.0729C27.5728 12.1443 27.5185 12.2069 27.4536 12.2573C27.3888 12.3077 27.3146 12.3448 27.2354 12.3665L25.4231 12.8539C25.3435 12.8753 25.2605 12.8807 25.1788 12.87C25.0971 12.8592 25.0183 12.8325 24.9469 12.7913C24.8028 12.7081 24.6976 12.571 24.6545 12.4103C24.6114 12.2495 24.6339 12.0782 24.7171 11.934C24.8004 11.7899 24.9374 11.6847 25.0982 11.6416L26.9104 11.1604C27.0695 11.1183 27.2388 11.1406 27.3815 11.2225C27.5242 11.3044 27.6289 11.4393 27.6728 11.5979V11.5979ZM26.3605 8.43585C26.4021 8.5068 26.4292 8.58525 26.4404 8.66672C26.4516 8.74819 26.4466 8.83107 26.4257 8.91061C26.4048 8.99014 26.3684 9.06477 26.3186 9.13021C26.2688 9.19565 26.2066 9.25062 26.1355 9.29197L24.5108 10.2293C24.3666 10.3122 24.1954 10.3344 24.0348 10.291C23.8743 10.2477 23.7375 10.1423 23.6546 9.99811C23.5718 9.85392 23.5496 9.68272 23.5929 9.52217C23.6363 9.36161 23.7417 9.22486 23.8859 9.14199L25.5106 8.20463C25.5819 8.16331 25.6607 8.13651 25.7425 8.12577C25.8242 8.11504 25.9072 8.12057 25.9868 8.14206C26.0664 8.16355 26.1409 8.20058 26.2061 8.251C26.2713 8.30142 26.3259 8.36424 26.3667 8.43585H26.3605ZM13.9623 13.96L23.8109 5.24882C23.9352 5.12452 24.1038 5.05469 24.2795 5.05469C24.4553 5.05469 24.6239 5.12452 24.7482 5.24882C24.8725 5.37312 24.9424 5.54171 24.9424 5.7175C24.9424 5.89329 24.8725 6.06188 24.7482 6.18618L16.037 16.0347C15.7579 16.2896 15.3913 16.4271 15.0134 16.4186C14.6356 16.41 14.2755 16.2561 14.0082 15.9888C13.741 15.7215 13.5871 15.3615 13.5785 14.9836C13.57 14.6057 13.7074 14.2391 13.9623 13.96V13.96Z"
        fill="#D87FDB"
        style={{ fill: "#152e6d" }}
      />
    </svg>
  );
}
function ProdIcon() {
  return (
    <svg
      width={34}
      height={37}
      viewBox="0 0 34 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginTop: "12px" }}
    >
      <path
        d="M2 18.447C2 18.447 8.74129 15.5737 10.9816 11.8399C13.1847 8.16799 12.6334 1 12.6334 1"
        stroke="#1A5FE5"
        strokeOpacity="0.94"
        strokeWidth={7}
      />
      <path
        d="M32 18.5486C32 18.5486 25.2587 15.6753 23.0184 11.9414C20.8153 8.26956 21.3666 1.10156 21.3666 1.10156"
        stroke="#1A5FE5"
        strokeOpacity="0.94"
        strokeWidth={7}
      />
      <path
        d="M7.2652 26.4699C7.2652 26.4699 13.1242 22.0684 17.478 21.9951C21.7594 21.9231 27.6914 25.9846 27.6914 25.9846"
        stroke="#1A5FE5"
        strokeOpacity="0.94"
        strokeWidth={7}
      />
    </svg>
  );
}

function BuildingBlockIcon() {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        y={10}
        width={10}
        height={10}
        fill="white"
        style={{ fill: "#42526d" }}
      />
      <rect
        x={10}
        y={10}
        width={10}
        height={10}
        fill="white"
        style={{ fill: "#42526d", y: 7, height: 16 }}
      />
      <rect
        width={10}
        height={10}
        fill="white"
        style={{ fill: "#42526d", height: 7, y: 4 }}
      />
    </svg>
  );
}

function Example() {
  const exampleCodeBlock = `// 20191106151233
  // https://jsonplaceholder.typicode.com/users
  
  [
    {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    },

      "phone": "024-648-3804",
      "website": "ambrose.net",
      "company": {
        "name": "Hoeger LLC",
        "catchPhrase": "Centralized empowering task-force",
        "bs": "target end-to-end models"
      }
    }
  ]
`;

  const breadcrumbs = (
    <div style={{ paddingLeft: "12px" }}>
      <BreadcrumbsStateless onExpand={() => {}}>
        <BreadcrumbsItem text="Codeanalyse" key="Some project" />
        <BreadcrumbsItem text="Example" key="Parent page" />
      </BreadcrumbsStateless>
    </div>
  );
  const actionsContent = (
    <div
      style={{
        width: "260px",
        height: "38px",
        background: "#FA4616",
        borderRadius: "5px",
        display: "flex",
        padding: "3px 12px",
        color: "white",
        lineHeight: "38px",
        fontWeight: 500
      }}
    >
      <svg
        width={89}
        height={30}
        viewBox="0 0 89 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: "28px", marginTop: "4px" }}
      >
        <path
          d="M0 0H30V30H0V0ZM26.8854 26.8854V3.1146H3.11459V26.8707H26.8854V26.8854ZM5.81783 7.74241V16.807C5.81783 20.95 8.09501 23.4035 11.9442 23.4035C15.9109 23.4035 18.1881 20.95 18.1881 16.807V7.74241H15.0735V16.807C15.0735 19.143 14.0598 20.4652 12.0176 20.4652C9.85799 20.4652 8.90304 19.0842 8.90304 16.807V7.74241H5.81783ZM22.1988 9.59354C23.286 9.59354 24.1234 8.81489 24.1234 7.72772C24.1234 6.58178 23.3448 5.80313 22.1988 5.80313C21.1117 5.80313 20.2742 6.58178 20.2742 7.72772C20.2889 8.81489 21.1264 9.59354 22.1988 9.59354ZM20.6415 11.0333V23.2272H23.7561V11.0333H20.6415ZM39.241 18.2468C42.6053 18.2468 44.8237 16.2635 44.8237 12.9726C44.8237 9.79922 42.6641 7.7571 39.241 7.7571H33.3644V23.3007H36.479V18.3203H39.241V18.2468ZM38.8884 15.7786H36.4349V10.2547H38.8884C40.6954 10.2547 41.6504 11.2684 41.6504 12.9579C41.6504 14.7649 40.6807 15.7786 38.8884 15.7786ZM45.8521 17.1596C45.8521 20.8178 48.1881 23.4035 51.4937 23.4035C53.477 23.4035 54.7405 22.6836 55.4604 21.5377V23.2713H58.5749V11.0333H55.4604V12.9579C54.6817 11.6944 53.4182 10.9158 51.4937 10.9158C48.1293 10.9158 45.8521 13.5602 45.8521 17.1596ZM55.4457 17.1596C55.4457 19.2605 54.1234 20.6415 52.1988 20.6415C50.098 20.6415 49.0255 19.143 49.0255 17.1596C49.0255 15 50.2302 13.619 52.1988 13.619C54.1675 13.619 55.4457 15.0588 55.4457 17.1596ZM66.3614 20.5828C65.1567 20.5828 64.8629 20.0392 64.8629 18.9667V13.6778H67.5661V11.0333H64.8629V7.66895H61.7483V11.0333H60.3085V13.6778H61.7483V18.9667C61.7483 21.8462 63.0118 23.2272 66.0088 23.2272H67.6249V20.5828H66.3614ZM72.429 12.7816V7.02253H69.3144V23.286H72.429V16.807C72.429 14.7062 73.5162 13.4427 75.3673 13.4427C77.1744 13.4427 78.1293 14.6474 78.1293 16.4985V23.2272H81.2439V16.2047C81.2439 13.0313 78.9667 10.9305 76.0872 10.9305C74.2948 10.9158 73.1489 11.5769 72.429 12.7816ZM81.0088 6.96376V7.44858H82.0226V10.5632H82.6249V7.44858H83.5799V6.96376H81.0088ZM87.4878 6.96376L86.2243 9.84329L85.0196 6.96376H84.2997V10.5632H84.8433V7.80118L86.048 10.5632H86.4741L87.62 7.80118V10.5632H88.1636V6.96376H87.4878Z"
          fill="white"
        />
      </svg>
      <span style={{ marginLeft: "8px" }}> Open in Ui Path Studio </span>
    </div>
  );
  const barContent = (
    <div style={{ display: "flex", paddingLeft: "12px" }}>
      <div style={{ flex: "0 0 200px" }} />
      <div style={{ flex: "0 0 200px", marginLeft: "auto" }}>
        <AvatarGroup
          appearance="stack"
          onAvatarClick={console.log}
          data={[
            { name: "Lars D", src: getAdorableAvatar("LarsD") },
            { name: "Konstantin R", src: getAdorableAvatar("KR") },
            { name: "Noah S", src: getAdorableAvatar("NoahS") },
            { name: "Tim T", src: getAdorableAvatar("TT") },
            { name: "Max Mustermann", src: getAdorableAvatar("M") },
            { name: "John Doe" }
          ]}
          size="large"
        />
      </div>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh"
      }}
    >
      <PageHeader
        breadcrumbs={breadcrumbs}
        actions={actionsContent}
        bottomBar={barContent}
        style={{ paddingLeft: "12px" }}
      >
        <div style={{ paddingLeft: "12px" }}> Testseite Codeanalyse</div>
      </PageHeader>
      <AkCodeBlock
        language="json"
        text={exampleCodeBlock}
        highlight="2,5-7,12-15, 50-80"
      />
    </div>
  );
}

function CodePage() {
  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      <div
        style={{
          backgroundColor: colors.N20,
          height: "100%",
          overflow: "hidden",
          padding: "8px 16px",
          position: "relative",
          width: `240px`
        }}
      />

      <div
        style={{
          paddingLeft: "12px",
          paddingTop: "12px",
          display: "grid",
          gridTemplateColumns: 5,
          gridRowGap: "12px"
        }}
      >
        <Link to="/ui/code/example">
          <div
            style={{
              width: "280px",
              height: "140px",
              border: "1px solid #dfe1e6"
            }}
          >
            <div style={{ width: "100%", height: "105px" }} />
            <div style={{ width: "100%", height: "35px" }}>
              <div
                style={{
                  display: "block",
                  margin: "0 auto",
                  width: "96%",
                  height: "1px",
                  background: "#e7f1f6"
                }}
              />
              <div>
                <AvatarGroup
                  appearance="stack"
                  height={30}
                  onAvatarClick={console.log}
                  data={[
                    { name: "Lars D", src: getAdorableAvatar("LarsD") },
                    { name: "Konstantin R", src: getAdorableAvatar("KR") },
                    { name: "noah s", src: getAdorableAvatar("NoahS") },
                    { name: "Tim T", src: getAdorableAvatar("TT") },
                    { name: "Max Mustermann", src: getAdorableAvatar("M") },
                    { name: "John Doe" }
                  ]}
                  size="large"
                />
              </div>
            </div>
          </div>
        </Link>
        <div
          style={{
            width: "280px",
            height: "140px",
            border: "1px solid #dfe1e6"
          }}
        />

        <div>
          <Link to="/ui/code/example">Link to Example Code</Link>
        </div>
      </div>
    </div>
  );
}
function UI() {
  const customMode = modeGenerator({
    product: {
      text: colors.N900,
      background: colors.N20
      // background: "#011720"
    }
  });
  let { path, url } = useRouteMatch();
  const [red, setredir] = useState(<div />);
  function onClose() {
    setDraweropen(false);
    seAddDrawerState(false);
  }
  function onCloseComplete() {
    setDraweropen(false);
    seAddDrawerState(false);
  }
  const [isDrawerOpen, setDraweropen] = useState(false);
  const [addDrawerState, seAddDrawerState] = useState(false);

  const [newUserEmail, setnewUserMail] = useState("");
  function openDrawer() {
    setDraweropen(true);
  }

  const board = {
    lanes: [
      {
        id: 1,
        title: "Backlog",
        cards: [
          {
            id: 1,
            title: "Card title 1",
            description: "Card content"
          },
          {
            id: 2,
            title: "Card title 2",
            description: "Card content"
          },
          {
            id: 3,
            title: "Card title 3",
            description: "Card content"
          }
        ]
      },
      {
        id: 2,
        title: "Doing",
        cards: [
          {
            id: 9,
            title: "Card title 9",
            description: "Card content"
          }
        ]
      },
      {
        id: 3,
        title: "Q&A",
        cards: [
          {
            id: 10,
            title: "Card title 10",
            description: "Card content"
          },
          {
            id: 11,
            title: "Card title 11",
            description: "Card content"
          }
        ]
      },
      {
        id: 4,
        title: "Production",
        cards: [
          {
            id: 12,
            title: "Card title 12",
            description: "Card content"
          },
          {
            id: 13,
            title: "Card title 13",
            description: "Card content"
          }
        ]
      }
    ]
  };

  const columns = [
    {
      id: "column1",
      title: "Column 1",
      rows: [
        {
          id: "children1",
          name: "John",
          age: "21"
        },
        {
          id: "children2",
          name: "Alex",
          age: "33"
        }
      ]
    },
    {
      id: "column2",
      title: "Column 2",
      rows: [
        {
          id: "children3",
          name: "Michael",
          age: "29"
        },
        {
          id: "children4",
          name: "Carl",
          age: "26"
        }
      ]
    }
  ];

  function inviteNewUser() {
    axios
      .get(
        `https://9001-f0b438fa-b62e-477b-a8bb-e37c54fcfe8a.ws-eu01.gitpod.io/invitation/` +
          newUserEmail
        // { user }
      )
      .then(res => {
        setanmloading(false);
        console.log(res);
        console.log(res.data);
      });
  }

  const renderCard = row => (
    <RowWrapper>
      <InfoWrapper>
        <Label>Name:</Label>
        <Value>{row.name}</Value>
      </InfoWrapper>
      <InfoWrapper>
        <Label>Age:</Label>
        <Value>{row.age}</Value>
      </InfoWrapper>
    </RowWrapper>
  );

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <ThemeProvider
        theme={theme => ({ ...theme, mode: customMode, context: "product" })}
      >
        {red}
        <SideBar />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100vh",
            overflowY: "scroll"
          }}
        >
          {red}
          <Switch>
            <PrivateRoute exact path={`${path}/old`}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  height: "100vh",
                  overflowY: "scroll",
                  overflowX: "hidden"
                }}
              >
                <div
                  style={{ display: "grid", gridTemplateColumns: "4fr 1fr" }}
                >
                  <div>
                    <div
                      style={{
                        width: "100%",
                        height: "20px",
                        flexShrink: 0,
                        padding: "12px"
                      }}
                    >
                      <UsecaseViewSwitcher />
                    </div>

                    <div
                      style={{
                        width: "100$",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                        marginTop: "75px",
                        paddingBottom: "8px",
                        height: "15px"
                      }}
                    >
                      <div
                        style={{
                          /* width: '320px', */ background:
                            "rgb(255, 255, 255)",
                          boxShadow: "rgba(157, 172, 202, 0.45) 0px 1px 19px",
                          borderRadius: "8px",
                          padding: "12px",
                          marginLeft: "22px",
                          marginTop: "22px",
                          textAlign: "center",
                          borderTop: "10px solid rgb(96, 125, 139)"
                        }}
                      >
                        Idea
                      </div>
                      <div
                        style={{
                          /* width: '320px', */ background:
                            "rgb(255, 255, 255)",
                          boxShadow: "rgba(157, 172, 202, 0.45) 0px 1px 19px",
                          borderRadius: "8px",
                          padding: "12px",
                          marginLeft: "22px",
                          marginTop: "22px",
                          textAlign: "center",
                          borderTop: "10px solid rgb(70, 235, 198)"
                        }}
                      >
                        Concept
                      </div>
                      <div
                        style={{
                          /* width: '320px', */ background:
                            "rgb(255, 255, 255)",
                          boxShadow: "rgba(157, 172, 202, 0.45) 0px 1px 19px",
                          borderRadius: "8px",
                          padding: "12px",
                          marginLeft: "22px",
                          marginTop: "22px",
                          textAlign: "center",
                          borderTop: "10px solid rgb(250, 70, 22)"
                        }}
                      >
                        Development
                      </div>
                      <div
                        style={{
                          /* width: '320px', */ background:
                            "rgb(255, 255, 255)",
                          boxShadow: "rgba(157, 172, 202, 0.45) 0px 1px 19px",
                          borderRadius: "8px",
                          padding: "12px",
                          marginLeft: "22px",
                          marginTop: "22px",
                          textAlign: "center",
                          borderTop: "10px solid rgb(26, 95, 229)"
                        }}
                      >
                        Testing
                      </div>
                      <div
                        style={{
                          /* width: '320px', */ background:
                            "rgb(255, 255, 255)",
                          boxShadow: "rgba(157, 172, 202, 0.45) 0px 1px 19px",
                          borderRadius: "8px",
                          padding: "12px",
                          marginLeft: "22px",
                          marginTop: "22px",
                          textAlign: "center",
                          borderTop: "10px solid rgb(28, 30, 59)"
                        }}
                      >
                        Operation
                      </div>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                        marginTop: "75px",
                        paddingBottom: "8px",
                        height: "75px"
                      }}
                    >
                      <Link
                        to={path + "/use-cases/1"}
                        style={{
                          /* width: '320px', */ background: "#2cafea",
                          boxShadow: "rgba(157, 172, 202, 0.45) 0px 1px 19px",
                          borderRadius: "8px",
                          padding: "12px",
                          marginLeft: "22px",
                          marginTop: "22px",
                          textAlign: "center",
                          height: "120px",
                          color: "white",
                          textAlign: "left"
                        }}
                      >
                        <div style={{ fontWeight: 600, fontSize: "18px" }}>
                          Beispielname{" "}
                        </div>
                        <div> Beispielbeschreibung </div>
                        <br />
                        Team
                        <AvatarGroup
                          appearance="stack"
                          height={10}
                          onAvatarClick={console.log}
                          data={[
                            { name: "Lars D", src: getAdorableAvatar("LarsD") },
                            {
                              name: "Konstantin R",
                              src: getAdorableAvatar("KR")
                            },
                            { name: "noah s", src: getAdorableAvatar("NoahS") },
                            { name: "Tim T", src: getAdorableAvatar("TT") },
                            {
                              name: "Max Mustermann",
                              src: getAdorableAvatar("M")
                            },
                            { name: "John Doe" }
                          ]}
                          size="small"
                        />
                      </Link>

                      <Link
                        to={path + "/use-cases/1"}
                        style={{
                          /* width: '320px', */ background: "#fa4615",
                          boxShadow: "rgba(157, 172, 202, 0.45) 0px 1px 19px",
                          borderRadius: "8px",
                          padding: "12px",
                          marginLeft: "22px",
                          marginTop: "22px",
                          textAlign: "center",
                          height: "120px",
                          color: "white",
                          textAlign: "left"
                        }}
                      >
                        <div style={{ fontWeight: 600, fontSize: "18px" }}>
                          Beispielname{" "}
                        </div>
                        <div> Beispielbeschreibung </div>
                        <br />
                        Team
                        <AvatarGroup
                          appearance="stack"
                          height={10}
                          onAvatarClick={console.log}
                          data={[
                            { name: "Lars D", src: getAdorableAvatar("LarsD") },
                            {
                              name: "Konstantin R",
                              src: getAdorableAvatar("KR")
                            },
                            { name: "noah s", src: getAdorableAvatar("NoahS") },
                            { name: "Tim T", src: getAdorableAvatar("TT") },
                            {
                              name: "Max Mustermann",
                              src: getAdorableAvatar("M")
                            },
                            { name: "John Doe" }
                          ]}
                          size="small"
                        />
                      </Link>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      background: "rgba(247, 247, 247, 0.12)",
                      height: "100vh",
                      marginLeft: "14px"
                    }}
                  >
                    <div
                      style={{
                        paddingLeft: "12px",
                        paddingTop: "12px",
                        paddingBottom: "12px",
                        fontWeight: 500,
                        fontSize: "16px"
                      }}
                    >
                      Legende
                    </div>
                    <div
                      style={{
                        paddingLeft: "12px",
                        display: "flex",
                        paddingBottom: "4px",
                        paddingTop: "4px"
                      }}
                    >
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          boxShadow: "rgba(157, 172, 202, 0.37) 0px 1px 4px",
                          background: "rgb(250, 70, 21)",
                          borderRadius: "4px"
                        }}
                      />
                      <div style={{ lineHeight: "30px", paddingLeft: "12px" }}>
                        {" "}
                        Abteilung A{" "}
                      </div>
                    </div>
                    <div
                      style={{
                        paddingLeft: "12px",
                        display: "flex",
                        paddingTop: "4px"
                      }}
                    >
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          boxShadow: "rgba(157, 172, 202, 0.37) 0px 1px 4px",
                          background: "rgb(44, 175, 234)",
                          borderRadius: "4px"
                        }}
                      />
                      <div style={{ lineHeight: "30px", paddingLeft: "12px" }}>
                        {" "}
                        Abteilung B{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </PrivateRoute>

            <PrivateRoute
              exact
              path={`${path}/`}
              component={() => <Kanban />}
            />

            <Route path={`${path}/users`}>
              <div>Users</div>
            </Route>
            <Route exact path={`${path}/projects`}>
              <Blocks />{" "}
            </Route>
            <Route exact path={`${path}/code`}>
              <CodePage />{" "}
            </Route>
            <Route exact path={`${path}/usecases`}>
              <UseCases />{" "}
            </Route>

            <Route exact path={`${path}/use-cases/`}>
              <ListUseCases />{" "}
            </Route>
            <PrivateRoute
              exact
              path={`${path}/use-cases/:id`}
              component={props => <SingleUseCase props={props} />}
            />
            <Route exact path={`${path}/usermanagement`}>
              <UserMgmt />
            </Route>

            <Route path={`${path}/team/new`}>
              <NewTeam />{" "}
            </Route>
            <PrivateRoute
              exact
              path={`${path}/teams/:id`}
              component={props => <UpdateTeam props={props} />}
            />

            <Route path={`${path}/code/example`}>
              <Example />{" "}
            </Route>
            <Route path={`${path}/usecase/new`}>
              <NewUseCase />{" "}
            </Route>
          </Switch>
        </div>
      </ThemeProvider>
    </div>
  );
}

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <SingInPage />
          </Route>
          <Route path="/users">
            <div>Users</div>
          </Route>

          <Route path="/signout">
            <InvitationPage />
          </Route>
          <Route path="/auth/reset">
            <InvitationPage />
          </Route>
          <PrivateRoute path="/ui">
            <UI />{" "}
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}
export default App;
