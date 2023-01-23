import { Modal, Dimensions, Pressable, StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import xIcon from '../../../assets/icons/xicon.png';
import checkIcon from '../../../assets/icons/checkmark.png';
import dollarIcon from '../../../assets/icons/dollar.png';
import ReceiptButton from '../ReceiptButton';
import PriceFilterButton from '../PriceFilterButton';

const deviceHeight = Dimensions.get("window").height
// const [isPressed, setPressed] = useState(false)

class BottomUpFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
        // this.isPressed = {
        //     pressed: false
        // }
    }
    
    filterShow = () => {
        this.setState({show: true})
    }

    filterClose = () => {
        this.setState({show: false})
    }

    // change = () => {
    //     this.setState({pressed: true})
    // }

    renderOutsideTouchable(onTouch) {
        const view = <View style={{flex: 1, width: '100%'}}/>
        if(!onTouch) return view
    
        return (
            <Pressable onPress={onTouch} style={{flex: 1, width: '100%'}}>
                {view}
            </Pressable>
        )
    }

    renderXButton = () => {
        return (
            <View style={{flexDirection: 'row', height: '5%'}}>
                <View style={{flex: 1}}></View>
                <TouchableOpacity
                    style={{height: 30, marginRight: 5, backgroundColor: "#FFFFFF"}}
                    onPress={this.filterClose}>
                        <Image source={xIcon} resizeMode="contain" style={{
                            width: 30,
                            height: 30,
                            alignSelf:'center',
                            justifyContent: 'center',
                            flex: 1,
                            tintColor: '#000000',
                        }}/>
                </TouchableOpacity>
            </View>
        )
    }

    renderTitle = () => {
        const {title} = this.props
        return (
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '10%',
                }}>
                <Text style={{
                    color: '#182E44',
                    fontSize: 22,
                    fontWeight: 'bold',
                    // marginTop: 15,
                }}>
                    {title}
                </Text>
            </View>
        )
    }

    renderContent = () => {
        const {data} = this.props
        return (
            <View style={{
                height: '65%',
                width: '90%',
                backgroundColor: '#3C6F37',
                justifyContent: 'center',
                alignContent: 'center',
                borderRadius: 30,
            }}>
                <FlatList
                    style={{marginBottom: 20}}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={this.renderItem}
                    extraData={data}
                    keyExtractor={(item, index) => index.toString()}
                    // ItemSeparatorComponent={this.renderSeparator}
                    contentContainerStyle={{
                        paddingBottom: 40
                    }}
                    />
            </View>
        )
    }

    renderItem = ({item}) => {
        var itemHeight = 20
        return (
            <View style={{height: itemHeight, flex: 1, flexDirection: "row",  alignItems: 'flex-start', justifyContent: 'center', marginLeft: 20, marginTop: 30, marginRight: 20}}>
                <Text style={{fontSize: itemHeight * 0.75, flex: 1, fontWeight: 'normal', color:'#FFFFFF'}}>{item.name}</Text>
                <Text style={{fontSize: itemHeight * 0.75, fontWeight: 'normal', color:'#FFFFFF'}}>{item.price}</Text>
            </View>
        )
    }

    renderPriceRange = () => {
        const {navigation} = this.props

        return (
            <>
                <View style={{
                    // alignItems: 'start',
                    justifyContent: 'flex-start',
                    height: '12%',
                    }}>
                    <Text style={{
                        color: '#182E44',
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginTop: 15,
                        marginLeft: 10,
                    }}>
                        Price Range
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignSelf: 'center', 
                    justfiyContent: 'center',
                    height: '10%'}}>
                        <PriceFilterButton name='$'/>
                        <PriceFilterButton name='$$'/>
                        <PriceFilterButton name='$$$'/>
                        <PriceFilterButton name='$$$$'/>
                </View>        
            </>
            
        )
    }

    render() {
        let {show} =this.state
        const {onTouchOutside} = this.props
        
        return (
            <Modal
                animationType={'slide'}
                transparent={true}
                visible={show}
                onRequestClose={this.filterClose}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: '#000000AA',
                        justifyContent: 'flex-end'}}>
                            {this.renderOutsideTouchable(onTouchOutside)}
                            <View style={{
                                backgroundColor: "#FFFFFF",
                                width: '100%',
                                borderTopRightRadius: 30,
                                borderTopLeftRadius: 30,
                                paddingHorizontal: 10,
                                height: deviceHeight * 0.6,
                                paddingTop: 20,
                                // justifyContent: 'flex-start',
                            }}>
                                {this.renderXButton()}
                                {this.renderTitle()}
                                {/* {this.renderFilters()} */}
                                {this.renderPriceRange()}
                            </View>
                    </View>

            </Modal>
        )
    }
}



export default BottomUpFilter;