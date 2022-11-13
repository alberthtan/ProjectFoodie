import {Modal, Dimensions, Pressable, Stylesheet, View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import xicon from '../../../assets/icons/xicon.png';
import ReceiptButton from '../ReceiptButton';

const deviceHeight = Dimensions.get("window").height
class BottomUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }
    
    show = () => {
        this.setState({show: true})
    }

    close = () => {
        this.setState({show: false})
    }

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
                    style={{height: 30, backgroundColor: "#FFFFFF"}}
                    onPress={this.close}>
                        <Image source={xicon} resizeMode="contain" style={{
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
                height: '10%'
                }}>
                <Text style={{
                    color: '#182E44',
                    fontSize: 25,
                    fontWeight: 'bold',
                    marginTop: 15,
                    marginBottom: 30
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

    renderReceiptButton = () => {
        const {navigation} = this.props
        return (
            <View style={{
                flexDirection: 'row', 
                alignContent: 'center', 
                justfiyContent: 'center',
                height: '10%'}}>
                <ReceiptButton name="Add to Order"/>
                <ReceiptButton name="Cancel Order"/>
            </View>
        )
    }

    // renderSeparator = () => {
    //     return (
    //     <View
    //         style={{
    //             opacity: 0.1,
    //             backgroundColor: '#182E44',
    //             height: 1,
    //         }}
    //     />
    //     )
    // }

    render() {
        let {show} =this.state
        const {onTouchOutside} = this.props
        
        return (
            <Modal
                animationType={'slide'}
                transparent={true}
                visible={show}
                onRequestClose={this.close}
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
                                height: deviceHeight * 0.9,
                                paddingTop: 20,
                                // justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>
                                {this.renderXButton()}
                                {this.renderTitle()}
                                {this.renderContent()}
                                {this.renderReceiptButton()}
                            </View>
                    </View>

            </Modal>
        )
    }
}

export default BottomUp;