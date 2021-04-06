import React, { useState } from "react";
import styled from "styled-components";
import PreviewTable from "./Preview";

function PreviewSide({ themeSet }) {
  const [colorThemeType, setColorThemeType] = useState("solid");

  return (
    <PreviewSideContainer>
      <PreviewSideInner>
        <select
          name="colorThemeType"
          onChange={(e) => {
            const select = e.target;
            const value = select.options[select.selectedIndex].value;
            setColorThemeType(value);
          }}
        >
          <option value="solid">Solid</option>
          <option value="twotone">Two Tone</option>
          <option value="checked">Checked Pattern</option>
          <option value="subject">Various Colors (Subject)</option>
        </select>
        <PreviewTable themeSet={themeSet} colorThemeType={colorThemeType} />
      </PreviewSideInner>
    </PreviewSideContainer>
  );
}

const PreviewSideContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  align-items: center;
  justify-items: center;
`;

const PreviewSideInner = styled.div`
  text-align: center;
  margin: 0 auto;
`;

export default PreviewSide;
