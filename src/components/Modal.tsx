import React, { useCallback } from 'react';
import { Modal as RNModal, View, type ModalProps, TouchableOpacity, ViewStyle } from 'react-native';
import useTheme from '../hooks/useTheme';
import { ThemeName } from '../constants/Colors';
import Text from './Text';

export type Props = ModalProps & {
    variant?: ThemeName;
    lightColor?: string;
    darkColor?: string;
    trigger?: React.ReactNode;
    children?: React.ReactNode;
    modalVisible: boolean;
    setModalVisible: (value: boolean) => void;
    headerTitle?: string;
    showHeader?: boolean;
    containerStyle?: ViewStyle;
    modalVisibleBackgroundOpcity?: number;
};

const Modal = ({
    children,
    showHeader = false,
    trigger,
    headerTitle = "Container",
    modalVisible,
    setModalVisible,
    containerStyle,
    modalVisibleBackgroundOpcity = 0.7,
    ...otherProps
}: Props) => {
    const { currentTheme } = useTheme();

    const clickHandler = useCallback(() => {
        setModalVisible(!modalVisible)
    }, [])

    if (!currentTheme) return <></>

    return (
        <View>
            {trigger ? <TouchableOpacity onPress={clickHandler}>
                {trigger}
            </TouchableOpacity> : <></>}
            <RNModal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                statusBarTranslucent={true}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }} {...otherProps}>
                <View style={{
                    flex: 1,
                    width: "100%",
                    height: "auto",
                    backgroundColor: `rgba(0,0,0,${modalVisibleBackgroundOpcity})`,
                    paddingHorizontal: 10,
                    justifyContent: 'center',
                }}>
                    {/* container */}
                    <View style={[{
                        backgroundColor: currentTheme.accent,
                        borderRadius: 20,
                        alignItems: 'center',
                        marginHorizontal: "auto",
                        shadowColor: currentTheme.accent_foreground,
                        shadowOffset: {
                            width: 0,
                            height: 0.5,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 0.5,
                        borderColor: currentTheme.border,
                        borderWidth: 0.5,
                        minHeight: "50%",
                        maxHeight: "86%",
                        width: "100%",
                    }, containerStyle]}>
                        {showHeader ? <View style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingVertical: 5
                        }}>
                            <View style={{
                                borderRadius: 50,
                                opacity: 0.8,
                                width: 30,
                                height: 30,
                                justifyContent: "center",
                                alignItems: "center",
                                margin: 5
                            }} />
                            <Text variant="H5" bold="500">{headerTitle}</Text>
                            {/* cancel */}
                            <TouchableOpacity onPress={clickHandler} style={{
                                borderRadius: 50,
                                opacity: 0.8,
                                width: 30,
                                height: 30,
                                justifyContent: "center",
                                alignItems: "center",
                                margin: 5,
                            }}>
                                <Text size={30}>X</Text>
                            </TouchableOpacity>
                        </View> : <></>}
                        {children}
                    </View>
                </View>
            </RNModal>
        </View>
    );
};

export default Modal;