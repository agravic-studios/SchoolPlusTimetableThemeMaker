export class ColorSet {
  primary: String = "";
  secondary: String = "";
  surface: String = "";
  headerSurface: String = "";
  headerHighlight: String = "";
  indexSurface: String = "";
  indexHighlight: String = "";
  series = [];
}
export class ThemeSet {
  id: String = "";
  name: String = "";
  version: Int = 0;
  lightDivider: Boolean = false;
  colorThemeTypes = [];
  backgroundColors: ColorSet = new ColorSet();
  textColors: ColorSet = new ColorSet();
}
