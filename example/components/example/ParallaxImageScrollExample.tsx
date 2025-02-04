import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useTheme, Button, ParallaxScrollView } from 'hyper-native-ui'
const ParallaxScrollViewExample = () => {
	const { toggleTheme, themeScheme, currentTheme } = useTheme();
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ParallaxScrollView
				imageStyle={{
					borderRadius: 20,
				}}
				imageUrl="https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/08/ciri-the-witcher-season-3.jpg">
				<Text style={{
					color: currentTheme.foreground,
					fontSize: 28,
					marginBottom: 10,
					fontWeight: 'bold',
				}}>
					ParallaxScroll View
				</Text>
				<Text style={{
					color: currentTheme.foreground
				}}>
					os, ad beatae sapiente facilis deserunt illum maiores,
					magnam impedit excepturi quisquam. Vero eius repellat obcaecati assumenda!
					Aperiam quisquam reiciendis placeat ipsa dicta vitae rerum nulla iure
					officia mollitia minus neque aspernatur ad cum suscipit praesentium
					esse excepturi in corrupti facere, fugit consequuntur! Adipisci delectus
					corrupti facilis minus, excepturi, sed culpa fugit dignissimos est ad
					nobis. Rerum earum, quisquam nulla quod corporis neque iste tempore enim
					praesentium! Qui facilis magnam consequuntur veritatis omnis ipsam?
				</Text>
				<Button onPress={() => toggleTheme()}>
					{`Switch to ${themeScheme === 'light' ? 'Dark' : 'Light'} mode`}
				</Button>
				<UserItemLoader size={100} />
			</ParallaxScrollView>
		</SafeAreaView>
	);
};

export default ParallaxScrollViewExample;

const UserItemLoader = ({ size }: { size?: number }) => {
	const { currentTheme } = useTheme();
	const background = currentTheme.input
	return <>
		{Array(size ?? 12).fill(0).map((_, i) => <View
			key={i}
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				width: '100%',
				gap: 10,
				marginVertical: 2,
				justifyContent: 'space-between',
			}}>
			<View style={{
				display: 'flex',
				flexDirection: 'row',
				gap: 10,
				alignItems: 'center',
			}}>
				<View
					style={{
						width: 60,
						height: 60,
						borderRadius: 120,
						backgroundColor: background
					}} />
				<View style={{
					gap: 8,
				}}>
					<View style={{
						width: 120,
						height: 12,
						borderRadius: 120,
						backgroundColor: background
					}} />
					<View style={{
						width: 70,
						height: 10,
						borderRadius: 120,
						backgroundColor: background
					}} />
				</View>
			</View>
			<View style={{
				width: 80,
				height: 40,
				borderRadius: 10,
				backgroundColor: background
			}} />
		</View>)}
	</>
}
