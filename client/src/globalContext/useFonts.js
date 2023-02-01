import * as Font from "expo-font";
 
const useFonts = async () =>
  await Font.loadAsync({
    'Jost': require('../../assets/fonts/Jost-Regular.ttf'),
  });

export { useFonts }