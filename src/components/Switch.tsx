// import { RootState } from '@/redux-stores/store';
// import React, { useState } from 'react';
// import { View, Switch, SwitchProps } from 'react-native';
// import { useSelector } from 'react-redux';

// export type Props = SwitchProps & {
//     variant?: "heading1" | "heading2" | "heading3" | "heading4";
//     lightColor?: string;
//     darkColor?: string;
// };

// const SkySoloSwitch = ({ ...props }: Props) => {
//     const currentTheme = useSelector((state: RootState) => state.ThemeState.currentTheme)
//     const [isEnabled, setIsEnabled] = useState(false);
//     const toggleSwitch = () => setIsEnabled(previousState => !previousState);

//     return (
//         <View
//             style={[{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 height: 30,
//                 width: "auto",
//                 borderRadius: 100,
//                 backgroundColor: isEnabled ? currentTheme?.primary : currentTheme?.muted,
//                 borderWidth: 0.6,
//                 borderColor: currentTheme?.border,
//                 opacity: props.disabled ? 0.5 : 1,
//             }]}>
//             <Switch
//                 {...props}
//                 value={isEnabled}
//                 onValueChange={toggleSwitch}
//                 ios_backgroundColor={isEnabled ? currentTheme?.primary : currentTheme?.muted}
//                 thumbColor={currentTheme?.background}
//                 trackColor={{ false: "transparent", true: "transparent" }}
//                 style={{
//                     transform: [{ scaleX: 1 }, { scaleY: 1 }],
//                     elevation: 5,
//                     opacity: props.disabled ? 0.5 : 1,
//                 }} />
//         </View>
//     )
// }
// export default SkySoloSwitch

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