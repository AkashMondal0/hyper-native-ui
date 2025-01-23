import React, { ReactNode } from 'react';
import { View, Button, TouchableWithoutFeedback, GestureResponderEvent } from 'react-native';

interface AppProps {
    next: (event: GestureResponderEvent) => void;
    children: ReactNode;
}

const TriggerComponent: React.FC<AppProps> = ({ next, children }) => {
    return (
        <TouchableWithoutFeedback onPress={next}>
            <View>
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child) && child.type === View) {
                        return React.cloneElement(child, {
                            // @ts-ignore
                            children: React.Children.map(child.props.children, (grandchild) => {
                                if (React.isValidElement(grandchild) && grandchild.type === Button) {
                                    return React.cloneElement(grandchild as React.ReactElement<any>, { onPress: next });
                                }
                                return grandchild;
                            }) as any,
                        });
                    }
                    return child;
                })}
            </View>
        </TouchableWithoutFeedback>
    );
};

const Example: React.FC = () => {
    const handleNext = (event: GestureResponderEvent) => {
        console.log('Next button pressed');
    };

    return (
        <TriggerComponent next={handleNext}>
            <View style={{ flexDirection: 'row', marginTop: 60, position: 'absolute' }}>
                <Button title="Next" />
            </View>
        </TriggerComponent>
    );
};

export default Example;