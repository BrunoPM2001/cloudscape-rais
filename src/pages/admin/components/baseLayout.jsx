import {
  AppLayout,
  BreadcrumbGroup,
  ContentLayout,
  Flashbar,
  Header,
  HelpPanel,
} from "@cloudscape-design/components";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { useContext } from "react";
import { NotificationContext } from "../../../routes/admin";

export default function BaseLayout({
  children,
  breadcrumbs,
  header,
  helpInfo,
  disableOverlap = false,
}) {
  //  Context
  const { notifications } = useContext(NotificationContext);

  return (
    <>
      <Navbar />
      <AppLayout
        breadcrumbs={<BreadcrumbGroup items={breadcrumbs} />}
        navigation={<Sidebar />}
        notifications={<Flashbar items={notifications} stackItems />}
        tools={
          <HelpPanel header={<h2>Panel de ayuda</h2>}>{helpInfo}</HelpPanel>
        }
        content={
          <ContentLayout
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
