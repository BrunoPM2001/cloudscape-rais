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
  withoutContentLayout,
  actions,
  contentType = "default",
  convocatorias,
  loading,
}) {
  //  Context
  const { notifications } = useContext(NotificationContext);

  return (
    <>
      <HeaderPortal>
        <Navbar />
      </HeaderPortal>
      <AppLayout
        headerVariant="high-contrast"
        navigation={<Sidebar data={convocatorias} loading={loading} />}
        notifications={<Flashbar items={notifications} stackItems />}
        tools={<Helpbar>{helpInfo}</Helpbar>}
        contentType={contentType}
        headerSelector="#header"
        content={
          withoutContentLayout ? (
            <>{children}</>
          ) : (
            <ContentLayout
              headerVariant="high-contrast"
              breadcrumbs={<BreadcrumbGroup items={breadcrumbs} />}
              disableOverlap={disableOverlap}
              header={
                <Header variant="h1" actions={actions}>
                  {header}
                </Header>
              }
            >
              {children}
            </ContentLayout>
          )
        }
      />
    </>
  );
}
