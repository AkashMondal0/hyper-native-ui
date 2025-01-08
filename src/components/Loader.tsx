// import { RootState } from '@/redux-stores/store';
// import { ActivityIndicator, Modal, StatusBar, View, type ActivityIndicatorProps } from 'react-native';
// import { useSelector } from "react-redux"
// import React from 'react';
// import { Text } from 'react-native';

// export type Props = ActivityIndicatorProps & {
//     variant?: any
//     lightColor?: string;
//     darkColor?: string;
// };


// const SkysoloLoader = (Props: Props) => {
//     const currentTheme = useSelector((state: RootState) => state.ThemeState.currentTheme?.primary)

//     if (!currentTheme) return <></>
//     return (
//         <ActivityIndicator {...Props} color={currentTheme} />
//     )
// }

// export default SkysoloLoader

// export const PageLoader = ({ loading = false, text }: { loading: boolean, text?: string }) => {
//     return (
//         <>
//             <Modal
//                 style={{ flex: 1 }}
//                 animationType="fade"
//                 transparent={true}
//                 visible={loading}>
//                 <View
//                     style={{
//                         flex: 1,
//                         width: "100%",
//                         height: "100%",
//                         alignItems: 'center',
//                         backgroundColor: "rgba(0,0,0,0.9)",
//                         justifyContent: "center"
//                     }}>
//                     {/* <StatusBar
//                         animated={true}
//                         barStyle={"light-content"}
//                         backgroundColor={"rgba(0,0,0,0.9)"}
//                         translucent={true} /> */}
//                     <ActivityIndicator size={"large"} color={"#ffffff"} />
//                     {text ? <Text style={{
//                         color: "white",
//                         fontSize: 20,
//                         textAlign: "center",
//                         marginTop: 10,
//                         fontWeight: "400"
//                     }}>{text}</Text> : <></>}
//                 </View>
//             </Modal>
//         </>
//     )
// }

import React, { memo } from 'react';
import useTheme from '../hooks/useTheme';
import { ThemeName } from '../constants/Colors';

export type Props = {
    themeScheme?: "light" | "dark";
    variantColor?: "default" | ThemeName;
    variant?: "H1" | "H2" | "H3" | "H4" | "H5" | "H6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "button" | "caption" | "overline";
};

const Component = memo(function Component() {
    const { currentTheme } = useTheme();

    if (!currentTheme) return <></>;

    return (
        <></>
    )
})

export default Component;