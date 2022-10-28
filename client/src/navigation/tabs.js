import { TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarIconStyle: { display: "none"} }}
                        initialRouteName="Home">
            <Tab.Screen name="Home" component={HomeScreen} />
            {/* <Tab.Screen name="Camera" component={CameraScreen} /> */}
            <Tab.Screen name="Camera Screen"
                component={CameraScreen}
                options={({navigation})=> ({
                    tabBarButton: (props) => <TouchableOpacity {...props} onPress={()=>navigation.navigate('Camera')}/>
                })}/>
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

export default Tabs;