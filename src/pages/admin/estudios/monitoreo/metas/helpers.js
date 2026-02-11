const stripOuterParens = (str) => {
  if (str.startsWith("(") && str.endsWith(")")) {
    return str.slice(1, -1).trim();
  }
  return str;
};

const isWrappedByParens = (str) => {
  let depth = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(") depth++;
    if (str[i] === ")") depth--;
    if (depth === 0 && i < str.length - 1) return false;
  }
  return true;
};

const findRootOperator = (str) => {
  let depth = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(") depth++;
    if (str[i] === ")") depth--;

    if (depth === 0) {
      if (str.slice(i, i + 5) === " AND ") {
        return { operator: "AND", index: i };
      }
      if (str.slice(i, i + 4) === " OR ") {
        return { operator: "OR", index: i };
      }
    }
  }

  return null;
};

const queryToTree = (query) => {
  if (!query || query.trim() === "") return null;

  let expr = query.trim();
  const wrapped = isWrappedByParens(expr);

  if (wrapped) {
    expr = stripOuterParens(expr);
  }

  const rootOp = findRootOperator(expr);

  // 👉 CONDICIÓN
  if (!rootOp) {
    const match = expr.match(/^(.+?)\s*=\s*(\d+)$/);
    if (!match) return null;

    const condition = {
      id: crypto.randomUUID(),
      type: "condition",
      key: match[1].trim(),
      number: Number(match[2]),
    };

    // 🔥 SI venía entre paréntesis → group con 1 hijo
    if (wrapped) {
      return {
        id: crypto.randomUUID(),
        type: "group",
        operator: "AND",
        children: [condition],
      };
    }

    return condition;
  }

  // 👉 GRUPO
  const { operator, index } = rootOp;

  const left = expr.slice(0, index).trim();
  const right = expr.slice(index + operator.length + 2).trim();

  return {
    id: crypto.randomUUID(),
    type: "group",
    operator,
    children: [queryToTree(left), queryToTree(right)].filter(Boolean),
  };
};

export { queryToTree };
