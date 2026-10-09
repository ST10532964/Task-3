import{useState}from 'react';
import {Button,StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [count, setCount]=useState<number>(0);

 const handlePress =() => {};
 setCount(count + 1);
};

  return (
    <View style={styles.container}>
    <Text>Counter Example</Text>  
    <Text>Count:{count} </Text>
    <Button
    title="CLICK HERE"
    onPress={handlePress}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
