import React from 'react';
import { ThemedView, Skeleton, Text } from 'hyper-native-ui';
import { ScrollView, View } from 'react-native';

const SkeletonExample = () => {

    return (
        <ThemedView style={{
            flex: 1,
            width: '100%',
            height: '100%',
        }}>
            <ScrollView style={{
                flex: 1,
                width: '100%',
            }}>
                <>
                    <Text variant="H5" center style={{ marginVertical: 20 }}>
                        Example
                    </Text>
                    <View style={{
                        gap: 8,
                        flexDirection: "row",
                        alignItems: "center",
                        marginHorizontal: "auto",
                        width: "90%"
                    }} >
                        <Skeleton width={"20%"} square borderRadius={150} />
                        <View style={{
                            gap: 4,
                            width: "80%"
                        }}>
                            <Skeleton width={"80%"} height={10} borderRadius={20} />
                            <Skeleton width={"60%"} height={10} borderRadius={20} />
                            <Skeleton width={60} height={10} borderRadius={20} />
                            <Skeleton width={150} height={10} borderRadius={20} />
                        </View>
                    </View>
                </>
                <>
                    <Text variant="H5" center style={{ marginVertical: 20 }}>
                        Square
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: "wrap",
                        rowGap: 10,
                        flexBasis: 2,
                        justifyContent: "space-around"
                    }} >
                        <Skeleton width={"40%"} height={200} square borderRadius={20} />
                        <Skeleton width={"40%"} square borderRadius={150} />
                    </View>
                </>
                <>
                    <Text variant="H5" center style={{ marginVertical: 20 }}>
                        Feed
                    </Text>
                    <View style={{
                        marginHorizontal: "auto",
                        width: "95%"
                    }}>
                        <View style={{
                            gap: 8,
                            flexDirection: "row",
                            alignItems: "center",
                            marginVertical: 10
                        }} >
                            <Skeleton width={"16%"} square borderRadius={150} />
                            <View style={{
                                gap: 4,
                                width: "80%"
                            }}>
                                <Skeleton width={"80%"} height={10} borderRadius={20} />
                                <Skeleton width={"60%"} height={10} borderRadius={20} />
                                <Skeleton width={60} height={10} borderRadius={20} />
                                <Skeleton width={150} height={10} borderRadius={20} />
                            </View>
                        </View>
                        <Skeleton width={"100%"} height={400} borderRadius={20} />
                        <View style={{
                            gap: 4,
                            width: "100%",
                            margin: 10
                        }}>
                            <Skeleton width={"80%"} height={16} borderRadius={20} />
                            <Skeleton width={"60%"} height={12} borderRadius={20} />
                        </View>
                    </View>
                </>
                <>
                    <Text variant="H5" center style={{ marginVertical: 20 }}>
                        List
                    </Text>
                    <View style={{
                        gap: 14
                    }}>
                        {Array(10).fill(0).map((_, i) => {
                            return <>
                                <View key={i}
                                    style={{
                                        gap: 8,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginHorizontal: "auto",
                                        width: "90%"
                                    }} >
                                    <Skeleton width={"20%"} square borderRadius={150} />
                                    <View style={{
                                        gap: 4,
                                        width: "80%"
                                    }}>
                                        <Skeleton width={"80%"} height={18} borderRadius={20} />
                                        <Skeleton width={150} height={16} borderRadius={20} />
                                    </View>
                                </View>
                            </>
                        })}
                    </View>
                </>
                <View style={{
                    height: 50
                }} />
            </ScrollView>
        </ThemedView>
    );
};
export default SkeletonExample;