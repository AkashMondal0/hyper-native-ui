import React from 'react';
import { TouchableOpacity, Vibration, View } from 'react-native';
import { useTheme, DraggableView, Text } from 'hyper-native-ui';

export default function DraggableViewExample() {
	const { currentTheme } = useTheme();


	return (
		<View style={{
			flex: 1,
			backgroundColor: currentTheme.background,
		}}>
			<DraggableView>
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
				</TouchableOpacity>
			</DraggableView>
		</View>
	);
}