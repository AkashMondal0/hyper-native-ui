import React from 'react';
import { TouchableOpacity, Vibration, View } from 'react-native';
import { useTheme, DraggableView, Text, Button } from 'hyper-native-ui';
import { useNavigation } from '@react-navigation/native';

export default function DraggableViewExample() {
	const { currentTheme } = useTheme();
	const navigation = useNavigation();

	return (
		<View style={{
			flex: 1,
			backgroundColor: currentTheme.background,
		}}>
			<DraggableView position="bottomRight">
				<TouchableOpacity
					activeOpacity={1}
					style={{
						width: "100%",
						height: "100%",
						borderWidth: 1,
						borderRadius: 20,
						justifyContent: "center",
						alignItems: "center",
						borderColor: currentTheme.accent_foreground,
						backgroundColor: currentTheme.muted
					}} onPressIn={() => Vibration.vibrate(1 * 50, false)}>
					<View>
						<Text>🎥 Video Player</Text>
					</View>
					<Button onPress={() => {
						navigation.goBack()
					}}>
						back
					</Button>
				</TouchableOpacity>
			</DraggableView>
		</View>
	);
}