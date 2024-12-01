// import { useMemo } from "react";
// import { curveBasis, line } from "d3-shape";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { parse } from "react-native-redash";
// import { SCREEN_WIDTH } from "../constants/screen";
// import { useState } from "react";
// const NUM_TABS = 4;
// const SCALE = 0.7;
// const TAB_BAR_HEIGHT = 64;
// const [position, setPostion] = useState(null);
// const [adjustedHeight, setHeight] = useState(null);

// const generateTabShapePath = () => {
//   const adjustedWith = SCREEN_WIDTH / NUM_TABS;
//   const tabX = adjustedWith * position;
//   const lineGenerator = line().curve(curveBasis);
//   const tab = lineGenerator([
//     [tabX - 100 * SCALE, 0],
//     [tabX, (65 + 35) * SCALE, 0],
//     [tabX - (50 - 10) * SCALE, -6 * SCALE],
//     [tabX, -(50 - 15) * SCALE, (adjustedHeight - 14) * SCALE],
//     [tabX + (50 - 15) * SCALE, (adjustedHeight - 14) * SCALE],
//     [tabX + (50 - 10) * SCALE, -6 * SCALE],
//     [tabX + (50 - 10) * SCALE, 0],
//   ]);
//   return tab;
// };
// const usePath = () => {
//   const insets = useSafeAreaInsets();
//   const tHeight = TAB_BAR_HEIGHT + insets.bottom;
//   const adjustedHeight = tHeight - insets.bottom;
//   const containerPath = useMemo(() => {
//     return `M0,0L${SCREEN_WIDTH},0L${SCREEN_WIDTH},0L${SCREEN_WIDTH},${tHeight}L0,${tHeight}L0`;
//   }, [tHeight]);
//   const curvedPaths = useMemo(() => {
//     return Array.from({ length: NUM_TABS }, (_, index) => {
//       const tabShapePath = generateTabShapePath(index + 0.5, adjustedHeight);
//       return parse(`${tabShapePath}`);
//     });
//   }, [adjustedHeight]);
//   return [containerPath, curvedPaths, tHeight];
// };
// export default usePath;
