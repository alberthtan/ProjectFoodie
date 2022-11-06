import { TouchableOpacity, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { StatusBar } from 'react-native-web';

const Tab = createBottomTabNavigator();

const Tabs = ({route}) => {
    // const { count } = route.params
    return(
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarIconStyle: { display: "none"} }}
                        initialRouteName="Home">
            <Tab.Screen 
                name="Home" 
                component={HomeScreen}
                initialParams={{ordered: false}}
            />
            <Tab.Screen 
                name="Camera Screen"
                component={CameraScreen}
                options={({navigation})=> ({
                    tabBarButton: (props) => <TouchableOpacity {...props} onPress={()=>navigation.navigate('Camera')}/>
                })}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
            />
        </Tab.Navigator>
    );
}

export default Tabs;