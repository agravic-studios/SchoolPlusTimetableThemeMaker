import logo from "./logo.svg";
import FormSide from "./components/FormSide";
import PreviewSide from "./components/PreviewSide";
import styled from "styled-components";
import { useState } from "react";
import { ThemeSet, ColorSet } from "./data/ThemeSet";

function App() {
  const [themeSet, setThemeSet] = useState(new ThemeSet());

  const onModifyThemeSet = (modifiedParts) => {
    setThemeSet({
      ...themeSet,
      ...modifiedParts,
    });
  };

  return (
    <AppContainer>
      <PreviewSide themeSet={themeSet} onModifyThemeSet={onModifyThemeSet} />
      <FormSide themeSet={themeSet} onModifyThemeSet={onModifyThemeSet} />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default App;
