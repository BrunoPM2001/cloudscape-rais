import {
  AppLayout,
  BreadcrumbGroup,
  ContentLayout,
  Flashbar,
  Header,
} from "@cloudscape-design/components";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { useContext } from "react";
import NotificationContext from "../../../providers/notificationProvider";
import Helpbar from "./helpbar";

export default function BaseLayout({
  children,
  breadcrumbs,
  header,
  helpInfo,
  disableOverlap = false,
  contentType = "default",
}) {
  //  Context
  const { notifications } = useContext(NotificationContext);

  return (
    <>
      <Navbar />
      <AppLayout
        headerVariant="high-contrast"
        navigation={<Sidebar />}
        notifications={<Flashbar items={notifications} stackItems />}
        tools={<Helpbar>{helpInfo}</Helpbar>}
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
