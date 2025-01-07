// import { useCallback, useState } from 'react';
// import { Animated, TouchableOpacity, View, Text } from 'react-native';
// import SkysoloText from './Text';
// import { ChevronDown, ChevronUp } from 'lucide-react-native';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/redux-stores/store';



// const SkysoloCollapsible = ({ title, description }: { title: string, description: string }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const currentTheme = useSelector((state: RootState) => state.ThemeState.currentTheme)


//   const handler = useCallback(() => {
//     setIsOpen(!isOpen)
//   }, [isOpen])

//   if (!currentTheme) return <></>
//   return (
//     <View style={{
//       width: "100%",
//       borderWidth: 1,
//       borderColor: currentTheme.border,
//       borderRadius: 20,
//       padding: 6,
//     }}>
//       <TouchableOpacity
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           gap: 6,
//         }}
//         onPress={handler}
//         activeOpacity={0.8}>
//         {
//           isOpen ? <ChevronUp style={{
//             //@ts-ignore
//             color: currentTheme.foreground
//           }} /> : <ChevronDown style={{
//             //@ts-ignore
//             color: currentTheme.foreground
//           }} />
//         }
//         {/* <ChevronUp /> */}
//         <SkysoloText variant="heading3">{title}</SkysoloText>
//       </TouchableOpacity>
//       <Animated.View
//         style={{
//           width: "100%",
//           height: "auto",
//           backgroundColor: currentTheme.background,
//           display: isOpen ? "flex" : "none",
//         }}>
//         <Text style={{
//           color: currentTheme.foreground,
//           padding: 5
//         }}>
//           {description}
//         </Text>
//       </Animated.View>
//     </View>
//   );
// }

// export default SkysoloCollapsible;

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