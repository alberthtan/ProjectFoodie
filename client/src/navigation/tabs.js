import { TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import ProfileScreen from '../screens/ProfileScreens/ProfileScreen';

import TestScreen from '../screens/TestScreen';

import { StatusBar } from 'react-native-web';
import homeIcon from '../../assets/icons/home.png';
import accountIcon from '../../assets/icons/account.png';
import profile from '../../assets/icons/profile.png';
import qrIcon from '../../assets/icons/qr.png';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    // const { count } = route.params
    return(
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false}}
                        initialRouteName="Home">
            <Tab.Screen 
                name="Home" 
                component={HomeScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style = {{alignItems:'center', justifyContent: 'center', top: 10}}>
                            <Image
                                source={homeIcon}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? 'black' : '#808080',
                                }}
                            />
                            {/* <Text style={{color: focused ? '#24891A': '#808080', fontSize: 12}}>
                                Home
                            </Text> */}
                        </View>
                    )
                }}
                initialParams={{ordered: false}}
                screenOptions={{gestureEnabled: false}}
            />
            
            <Tab.Screen 
                name="Camera Screen"
                component={CameraScreen}
                options={({navigation})=> ({
                    tabBarButton: (props) => 
                    <View style={styles.rectangle}>
                        <TouchableOpacity 
                        style = {{
                            alignItems:'center', 
                            justifyContent: 'center', 
                            top: 10
                        }}
                        {...props} onPress={()=>navigation.navigate('Camera')}>
                        <Image
                            source={qrIcon}
                            resizeMode="contain"
                            style={{
                                width: 35,
                                height: 35,
                                alignSelf:'center',
                                justifyContent: 'center',
                                flex: 1,
                                // marginBottom: 8,
                                tintColor: '#000000',
                            }}
                        />
                        {/* <Text style={{color: '#000000', fontSize: 12}}>
                            
                        </Text> */}
                    </TouchableOpacity>
                    </View>
                })}
            />
            <Tab.Screen
                name="Account"
                component={TestScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style = {{alignItems:'center', justifyContent: 'center', top: 10}}>
                            <Image
                                source={profile}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? 'black' : '#808080',
                                }}
                            />
                            {/* <Text style={{color: focused ? '#24891A': '#808080', fontSize: 12}}>
                                Account
                            </Text> */}
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    rectangle: {
        width: 48,
        marginTop: 8,
        height: 48,
        borderRadius: 15,
        backgroundColor: '#24891A',
        shadowOpacity: 0.25,
        shadowOffset: {
          width: 0,
          height: 2,
        },
    },
})

export default Tabs;