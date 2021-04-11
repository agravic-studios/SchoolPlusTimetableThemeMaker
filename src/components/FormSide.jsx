import React, { useState } from "react";
import ColorForm from "./ColorForm";
import styled from "styled-components";

import "../css/FormSide.css";
import TextForm from "./TextForm";
import { ThemeSet } from "../data/ThemeSet";

const formKeys = {
  id: "id",
  name: "name",
  name_ko: "name_ko",
  version: "version",

  lightDivider: "lightDivider",

  colorSurface: "surface",
  colorPrimary: "primary",
  colorSecondary: "secondary",

  colorHeaderSurface: "headerSurface",
  colorHeaderHighlight: "headerHighlight",
  colorIndexSurface: "indexSurface",
  colorIndexHighlight: "indexHighlight",

  themeTypes: {
    solid: "Solid",
    twotone: "TwoTone",
    checked: "Checked",
    subject: "Subject",
  },
};

const forms = [
  {
    section: "Manifest",
    items: [
      { label: "ID", type: "text", key: formKeys.id },
      { label: "Name (EN)", type: "text", key: formKeys.name },
      { label: "Name (KO)", type: "text", key: formKeys.name_ko },
      { label: "Version", type: "number", key: formKeys.version },
    ],
  },

  {
    section: "Theme Types",
    items: [
      { label: "Solid", type: "theme-types", key: formKeys.themeTypes.solid },
      {
        label: "Two Tone",
        type: "theme-types",
        key: formKeys.themeTypes.twotone,
      },
      {
        label: "Checked Pattern",
        type: "theme-types",
        key: formKeys.themeTypes.checked,
      },
      {
        label: "Various / Subjects",
        type: "theme-types",
        key: formKeys.themeTypes.subject,
      },
    ],
  },

  {
    section: "Basic Colors",
    items: [
      {
        label: "Light Divider Color",
        type: "toggle",
        key: formKeys.lightDivider,
      },
      { label: "Primary", type: "basic-color", key: formKeys.colorPrimary },
      { label: "Secondary", type: "basic-color", key: formKeys.colorSecondary },
      { label: "Surface", type: "basic-color", key: formKeys.colorSurface },

      {
        label: "Header",
        type: "basic-color",
        key: formKeys.colorHeaderSurface,
      },
      {
        label: "Header*",
        type: "basic-color",
        key: formKeys.colorHeaderHighlight,
      },
      {
        label: "Index",
        type: "basic-color",
        key: formKeys.colorIndexSurface,
      },
      {
        label: "Index*",
        type: "basic-color",
        key: formKeys.colorIndexHighlight,
      },
    ],
  },
];

/*var seriesColors = [
  { backgroundColor: "", textColor: "" },
  { backgroundColor: "", textColor: "" },
  { backgroundColor: "", textColor: "" },
  { backgroundColor: "", textColor: "" },
];*/

function getFormDiv(item, themeSet, onModifyThemeSet) {
  if (item.type == "basic-color") {
    return (
      <ColorForm
        label={item.label}
        onChangeBackgroundColor={(value) => {
          var bgColors = { ...themeSet.backgroundColors };
          bgColors[item.key] = value;
          onModifyThemeSet({
            backgroundColors: bgColors,
          });
        }}
        onChangeTextColor={(value) => {
          var txColors = { ...themeSet.textColors };
          txColors[item.key] = value;
          onModifyThemeSet({
            textColors: txColors,
          });
        }}
      />
    );
  } else if (item.type == "toggle") {
    return (
      <div>
        <label>{item.label}</label>
        <input
          type="checkbox"
          name={item.key}
          value="toggle"
          onChange={(e) => {
            const checked = e.target.checked;
            var modifier = {};
            modifier[item.key] = checked;
            onModifyThemeSet(modifier);
          }}
        />
      </div>
    );
  } else if (item.type == "theme-types") {
    return (
      <div>
        <label>{item.label}</label>
        <input
          type="checkbox"
          name={item.key}
          value="toggle"
          onChange={(e) => {
            const checked = e.target.checked;
            var types = new Set(themeSet.colorThemeTypes);
            if (checked) {
              types.add(item.key);
            } else {
              types.delete(item.key);
            }
            onModifyThemeSet({
              colorThemeTypes: [...types],
            });
          }}
        />
      </div>
    );
  } else {
    return (
      <div>
        <label>{item.label}</label>
        <input
          type={item.type}
          onChange={(e) => {
            var set = {};
            set[item.key] = e.target.value;
            onModifyThemeSet(set);
          }}
        />
      </div>
    );
  }
}

function FormSide({ themeSet, onModifyThemeSet }) {
  const [seriesBackgroundColors, setSeriesBackgroundColors] = useState([]);
  const [seriesTextColors, setSeriesTextColors] = useState([]);

  const [viewResult, setViewResult] = useState(false);
  const [json, setJson] = useState("");

  const onChangeInput = (key, value) => {
    if (key == formKeys.colorPrimary) {
    }
  };

  return (
    <FormSideContainer>
      <h1>Buddle Timetable Theme Maker</h1>
      <form autoComplete="off">
        {forms.map((section) => (
          <>
            <h4>{section.section}</h4>
            {section.items.map((i) =>
              getFormDiv(i, themeSet, onModifyThemeSet.bind(this))
            )}
          </>
        ))}

        {/*<h4>Manifest</h4>

        <div>
          <label>ID</label>
          <input type="text" />
        </div>
        <div>
          <label>Name (EN)</label>
          <input type="text" />
        </div>
        <div>
          <label>Name (KO)</label>
          <input type="text" />
        </div>
        <div>
          <label>Version</label>
          <input type="number" />
        </div>
        <div>
          <input type="checkbox" name="divider-light" value="light" />
          <label>Light Divider Color</label>
        </div>

        <h4>Basic Colors</h4>
        <ColorForm label="Surface" />
        <ColorForm label="Primary" />
        <ColorForm label="Secondary" />*/}

        <h4>Series Colors</h4>
        {seriesBackgroundColors.map((item, index) => (
          <ColorForm
            label={`Series #${index + 1}`}
            onChangeBackgroundColor={(value) => {
              var tmp = seriesBackgroundColors;
              tmp[index] = value;
              setSeriesBackgroundColors(tmp);
            }}
            onChangeTextColor={(value) => {
              var tmp = seriesTextColors;
              tmp[index] = value;
              setSeriesTextColors(tmp);
            }}
            deletable={index == seriesBackgroundColors.length - 1}
            onDelete={() => {
              setSeriesBackgroundColors(
                seriesBackgroundColors.filter(
                  (fValue, fIndex) => fIndex !== index
                )
              );
              setSeriesTextColors(
                seriesTextColors.filter((fValue, fIndex) => fIndex !== index)
              );
            }}
            defaultBackgroundColor={seriesBackgroundColors[index]}
            defaultTextColor={seriesTextColors[index]}
          />
        ))}
        <button
          type="button"
          style={{ padding: "8px" }}
          onClick={() => {
            setSeriesBackgroundColors(seriesBackgroundColors.concat(""));
            setSeriesTextColors(seriesTextColors.concat(""));
          }}
        >
          Add Series Color
        </button>
        <button
          type="button"
          style={{ padding: "8px" }}
          onClick={() => {
            onModifyThemeSet({
              backgroundColors: {
                ...themeSet.backgroundColors,
                series: seriesBackgroundColors,
              },
              textColors: {
                ...themeSet.textColors,
                series: seriesTextColors,
              },
            });
          }}
        >
          Apply Series Colors
        </button>
      </form>

      <hr />

      <h5>Load</h5>
      <input type="file" style={{ padding: "16px" }} />

      <h5>Save</h5>
      <button
        type="button"
        style={{ padding: "16px" }}
        onClick={() => {
          setViewResult(true);

          const jsonStr = JSON.stringify(themeSet);
          setJson(jsonStr);

          var link = document.createElement("a");
          link.download = "TimetableTheme_" + themeSet.id + ".json";
          var blob = new Blob([jsonStr], { type: "text/plain" });
          link.href = window.URL.createObjectURL(blob);
          link.click();
        }}
      >
        Save...
      </button>

      <hr />

      {viewResult && <div style={{ padding: 8 }}>{json}</div>}
    </FormSideContainer>
  );
}

const FormSideContainer = styled.div`
  flex: 1;
  max-height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 16px;
  justify-items: center;
  align-items: center;
`;

export default FormSide;
