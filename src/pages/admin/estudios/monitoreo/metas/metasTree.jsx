import {
  TreeView,
  Select,
  Input,
  Button,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useMemo } from "react";

const valueOptions = [
  { label: "Artículo", value: "Artículo" },
  { label: "Capítulo", value: "Capítulo" },
  { label: "Libro", value: "Libro" },
  { label: "Tesis propia", value: "Tesis propia" },
  { label: "Tesis asesoria", value: "Tesis asesoria" },
  { label: "Evento", value: "Evento" },
  { label: "Ensayo", value: "Ensayo" },
];

const logicalOptions = [
  { label: "Y", value: "AND" },
  { label: "O", value: "OR" },
];

const newCondition = () => ({
  id: crypto.randomUUID(),
  type: "condition",
  key: "Artículo",
  number: 0,
});

const newGroup = (children = [newCondition()]) => ({
  id: crypto.randomUUID(),
  type: "group",
  operator: "AND",
  children,
});

const updateNode = (tree, updated) => {
  if (tree.id === updated.id) return updated;
  if (!tree.children) return tree;

  return {
    ...tree,
    children: tree.children.map((child) => updateNode(child, updated)),
  };
};

const removeNode = (tree, id) => {
  if (!tree.children) return tree;

  const cleanedChildren = tree.children
    .filter((child) => child.id !== id)
    .map((child) => removeNode(child, id))
    .filter((child) => child.type !== "group" || child.children.length > 0);

  return {
    ...tree,
    children: cleanedChildren,
  };
};

const wrapConditionInGroup = (tree, conditionId) => {
  if (!tree.children) return tree;

  return {
    ...tree,
    children: tree.children.map((child) => {
      if (child.id === conditionId) {
        return newGroup([child]);
      }

      return wrapConditionInGroup(child, conditionId);
    }),
  };
};

const treeToQuery = (node, isRoot = false) => {
  if (node.type === "condition") {
    return `${node.key} = ${node.number}`;
  }

  const parts = node.children
    .map((child) => treeToQuery(child))
    .filter(Boolean);

  if (parts.length === 0) return "";

  const joined = parts.join(` ${node.operator} `);

  return isRoot ? `(${joined})` : `(${joined})`;
};

const getAllIds = (items) => {
  let ids = [];

  items.forEach((item) => {
    ids.push(item.id);
    if (item.children && item.children.length > 0) {
      ids = ids.concat(getAllIds(item.children));
    }
  });

  return ids;
};

export default function RuleTree({ value, onChange }) {
  const tree = value;

  const updateTree = (updater) => {
    onChange((prev) => updater(prev));
  };

  const items = [tree];

  const expandedItems = useMemo(() => getAllIds(items), [tree]);

  return (
    <SpaceBetween size="xs">
      <TreeView
        items={[tree]}
        expandedItems={expandedItems}
        getItemId={(item) => item.id}
        getItemChildren={(item) => item.children}
        connectorLines="vertical"
        renderItem={(item) => ({
          content:
            item.type === "group" ? (
              <SpaceBetween direction="horizontal" size="xs">
                <Select
                  selectedOption={{
                    label: item.operator == "AND" ? "Y" : "O",
                    value: item.operator,
                  }}
                  options={logicalOptions}
                  onChange={({ detail }) =>
                    updateTree((prev) =>
                      updateNode(prev, {
                        ...item,
                        operator: detail.selectedOption.value,
                      }),
                    )
                  }
                />

                <Button
                  variant="icon"
                  iconName="add-plus"
                  title="Agregar condición"
                  onClick={() =>
                    updateTree((prev) =>
                      updateNode(prev, {
                        ...item,
                        children: [...item.children, newCondition()],
                      }),
                    )
                  }
                />

                <Button
                  variant="icon"
                  iconName="add-plus-circle"
                  title="Agregar grupo"
                  onClick={() =>
                    updateTree((prev) =>
                      updateNode(prev, {
                        ...item,
                        children: [...item.children, newGroup()],
                      }),
                    )
                  }
                />
              </SpaceBetween>
            ) : (
              <SpaceBetween direction="horizontal" size="xs" x>
                <Select
                  selectedOption={{
                    label: item.key,
                    value: item.key,
                  }}
                  options={valueOptions}
                  onChange={({ detail }) =>
                    updateTree((prev) =>
                      updateNode(prev, {
                        ...item,
                        key: detail.selectedOption.value,
                      }),
                    )
                  }
                />

                <Input
                  type="number"
                  value={String(item.number)}
                  style={{ width: 80 }}
                  onChange={({ detail }) =>
                    updateTree((prev) =>
                      updateNode(prev, {
                        ...item,
                        number: Number(detail.value),
                      }),
                    )
                  }
                />

                <Button
                  variant="icon"
                  iconName="arrow-right"
                  title="Convertir en grupo"
                  onClick={() =>
                    updateTree((prev) => wrapConditionInGroup(prev, item.id))
                  }
                />

                <Button
                  variant="icon"
                  iconName="close"
                  title="Eliminar"
                  onClick={() =>
                    updateTree((prev) => removeNode(prev, item.id))
                  }
                />
              </SpaceBetween>
            ),
        })}
      />

      <pre style={{ marginTop: 12 }}>{treeToQuery(tree, true)}</pre>
    </SpaceBetween>
  );
}
