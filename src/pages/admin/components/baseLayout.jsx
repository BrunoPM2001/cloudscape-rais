import {
  AppLayout,
  BreadcrumbGroup,
  ContentLayout,
  Flashbar,
  Header,
} from "@cloudscape-design/components";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import NotificationContext from "../../../providers/notificationProvider";
import Helpbar from "./helpbar";

const HeaderPortal = ({ children }) => {
  const domNode = document.querySelector("#header");
  return domNode ? createPortal(children, domNode) : null;
};

export default function BaseLayout({
  children,
  breadcrumbs,
  header,
  helpInfo,
  disableOverlap = false,
  contentType = "default",
  openHelpBar = false,
}) {
  //  Context
  const { notifications } = useContext(NotificationContext);

  //  State
  const [openHelp, setOpenHelp] = useState(openHelpBar);

  return (
    <>
      <HeaderPortal>
        <Navbar />
      </HeaderPortal>
      <AppLayout
        headerVariant="high-contrast"
        navigation={<Sidebar />}
        notifications={<Flashbar items={notifications} stackItems />}
        tools={<Helpbar>{helpInfo}</Helpbar>}
        toolsOpen={openHelp}
        onToolsChange={({ detail }) => setOpenHelp((prev) => !prev)}
        headerSelector="#header"
        contentType={contentType}
        content={
          <ContentLayout
            headerVariant="high-contrast"
            breadcrumbs={<BreadcrumbGroup items={breadcrumbs} />}
            disableOverlap={disableOverlap}
            header={<Header variant="h1">{header}</Header>}
          >
            {children}
          </ContentLayout>
        }
      />
    </>
  );
}
