import { Header, SpaceBetween } from "@cloudscape-design/components";
import Constancia from "./constancia";

export default ({ data }) => {
  return (
    <SpaceBetween size="xs">
      <Header variant="h3">Constancia CDI</Header>
      <Constancia data={data.constancia} />
    </SpaceBetween>
  );
};
