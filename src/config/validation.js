const validation = (text, type) => {
  switch (type) {
    case "text":
      String(text);
      break;
  }
};

export { validation };
