import { createContext, useContext } from "react";

const ThemeContext = createContext(null);

export default function MyApp() {
  const theme = "Sample";
  const setTheme = () => console.log("sample");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Form />
    </ThemeContext.Provider>
  );
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button>Registrarse</Button>
      <Button>Iniciar sesión</Button>
    </Panel>
  );
}

function Panel({ title, children }) {
  const { theme, setTheme } = useContext(ThemeContext);
  const className = "panel-" + theme;
  setTheme();
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  );
}

function Button({ children }) {
  const theme = useContext(ThemeContext);
  const className = "button-" + theme;
  return <button className={className}>{children}</button>;
}
