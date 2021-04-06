import React from "react";
import styled from "styled-components";

function Cell({ value, themeSet, backgroundColor, textColor }) {
  var cellStyle = themeSet.lightDivider
    ? { ...style.cellLightDivider }
    : { ...style.cell };

  cellStyle = {
    ...cellStyle,
    backgroundColor: backgroundColor,
    color: textColor,
  };
  return <td style={cellStyle}>{value}</td>;
}

const daysOfWeek = ["월", "화", "수", "목", "금"];
const cellData = [
  ["A", "B", "C", "A", "B"],
  ["C", "E", "A", "D", "A"],
  ["E", "A", "A", "E", "C"],
  ["F", "B", "B", "D", "G"],
  ["G", "F", "E", "A", "F"],
  ["G", "H", "H", "F", null],
];

function getSubjectIndex(value: String) {
  if (value == null) return -1;

  const charCode = value.charCodeAt(0);
  const aCode = "A".charCodeAt(0);

  const index = charCode - aCode;

  return index;
}

function getSubjectBackgroundColor(themeSet, value: String) {
  const index = getSubjectIndex(value);
  if (index < 0) return themeSet.backgroundColors.surface;
  const seriesLength = themeSet.backgroundColors.series.length;

  return themeSet.backgroundColors.series[index % seriesLength];
}

function getSubjectTextColor(themeSet, value: String) {
  const index = getSubjectIndex(value);
  if (index < 0) return themeSet.textColors.surface;
  const seriesLength = themeSet.textColors.series.length;

  return themeSet.textColors.series[index % seriesLength];
}

function getCellBackgroundTableData(themeSet, colorThemeType, cells) {
  if (colorThemeType == "solid") {
    return cells.map((row) =>
      row.map((item) => themeSet.backgroundColors.primary)
    );
  } else if (colorThemeType == "twotone") {
    return cells.map((row, rowIndex) =>
      row.map((item, colIndex) =>
        colIndex % 2 == 0
          ? themeSet.backgroundColors.primary
          : themeSet.backgroundColors.secondary
      )
    );
  } else if (colorThemeType == "checked") {
    return cells.map((row, rowIndex) =>
      row.map((item, colIndex) =>
        (rowIndex + colIndex) % 2 == 0
          ? themeSet.backgroundColors.primary
          : themeSet.backgroundColors.secondary
      )
    );
  } else if (colorThemeType == "subject") {
    return cells.map((row, rowIndex) =>
      row.map((item, colIndex) => getSubjectBackgroundColor(themeSet, item))
    );
  }
}
function getCellTextTableData(themeSet, colorThemeType, cells) {
  console.log(`Type: ${colorThemeType}`);
  if (colorThemeType == "solid") {
    return cells.map((row) => row.map((item) => themeSet.textColors.primary));
  } else if (colorThemeType == "twotone") {
    return cells.map((row, rowIndex) =>
      row.map((item, colIndex) =>
        colIndex % 2 == 0
          ? themeSet.textColors.primary
          : themeSet.textColors.secondary
      )
    );
  } else if (colorThemeType == "checked") {
    return cells.map((row, rowIndex) =>
      row.map((item, colIndex) =>
        (rowIndex + colIndex) % 2 == 0
          ? themeSet.textColors.primary
          : themeSet.textColors.secondary
      )
    );
  } else if (colorThemeType == "subject") {
    return cells.map((row, rowIndex) =>
      row.map((item, colIndex) => getSubjectTextColor(themeSet, item))
    );
  }
}

function PreviewTable({ themeSet, colorThemeType }) {
  const cellBackgroundColors = getCellBackgroundTableData(
    themeSet,
    colorThemeType,
    cellData
  );
  const cellTextColors = getCellTextTableData(
    themeSet,
    colorThemeType,
    cellData
  );

  console.log("BG: " + cellBackgroundColors);
  console.log("TX: " + cellTextColors);

  return (
    <table style={style.table}>
      <th></th>
      {daysOfWeek.map((value) => (
        <th>{value}</th>
      ))}

      {cellData.map((row, rowIndex) => (
        <tr>
          <td>{rowIndex + 1}</td>
          {row.map((data, colIndex) => (
            <Cell
              value={data}
              themeSet={themeSet}
              backgroundColor={cellBackgroundColors[rowIndex][colIndex]}
              textColor={cellTextColors[rowIndex][colIndex]}
            />
          ))}
        </tr>
      ))}
    </table>
  );
}

const style = {
  cell: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0, .2)",
    width: "48px",
    height: "48px",
    textAlign: "center",
  },
  cellLightDivider: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, .5)",
    width: "48px",
    height: "48px",
    textAlign: "center",
  },
  table: {
    marginLeft: "auto",
    marginRight: "auto",
    borderSpacing: 0,
  },
};

export default PreviewTable;
