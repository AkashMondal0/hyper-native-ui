// import { ActivityIndicator, Modal, View, type ActivityIndicatorProps } from 'react-native';
// import React from 'react';
// import { Text } from 'react-native';
// // import useTheme from '../hooks/useTheme';

// export type Props = ActivityIndicatorProps & {
//     variant?: any
//     lightColor?: string;
//     darkColor?: string;
// };

// const Loader = (Props: Props) => {
//     const { currentTheme } = useTheme();

//     if (!currentTheme) return <></>

//     return (
//         <ActivityIndicator {...Props} color={currentTheme.primary} />
//     )
// }

// export default Loader

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