import React, {Component} from 'react';
import { StyleSheet,Text,TextInput, View,Image ,Alert,FlatList,Dimensions ,TouchableOpacity,ActivityIndicator,SafeAreaView} from 'react-native';
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import stringsoflanguages from './Local';
import axios from 'react-native-axios';
const GLOBAL = require('./Global');
import DateTimePicker from "react-native-modal-datetime-picker";
import { Dropdown } from 'react-native-material-dropdown';
var moment = require('moment');
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Dialog, {DialogContent} from "react-native-popup-dialog";
import MaterialTabs from 'react-native-material-tabs';
var type = 0;
var tomorrow;
export default class Approvals extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        selectedTab:0,
        data:[],pdata:[],fdata:[],
        visible:false,
        pop:'',
        done:false,

    };

    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }

    loadHome(selectes)
    {


        this.showLoading()
        var self=this;

        var url ;
        if (selectes == 1){
            url = GLOBAL.BASE_URL + 'approved_attendance_details';
        }else {
            url = GLOBAL.BASE_URL + 'pending_attendance_details';
        }
        axios.post(url, {
            user_id: GLOBAL.userID,
            service_contract_number: GLOBAL.serviceContract


        })
            .then(function (response) {

                self.myCallbackFunctions(response.data)

            })
            .catch(function (error) {
                alert(error)
                //  self.myCallbackFunction()

            });
    }

    hideLoading() {
        this.setState({loading: false})
    }


    showLoading() {
        this.setState({loading: true})
    }


    myCallbackFunctions = (res) => {



        this.hideLoading()
        if (res.status == 200){

            this.setState({data:res.data})
            this.setState({pdata: res.userdata})




            var s = res.data
            const interestS = [...s, ...res.data2];



          //  = [...interestS, ...res.userdata];


            const interest   = interestS.concat(...res.userdata);
            alert(JSON.stringify(interest))

            this.setState({data:interestS})



            //  let finaldata = [...res.data, ...res.userdata]
            //  this.setState({fdata: res.finaldata})
//            alert(JSON.stringify(interest))
        }
        else{
            alert(stringsoflanguages.unable)
        }

    }

    componentDidMount(){
//      alert(GLOBAL.userID)
        this.loadHome(0)
    }


    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    categorySelect = (index) =>{
        this.setState({selectedTab:index})
        this.loadHome(index)

    }
    passData =(item) =>{
        if (item.type == "1") {

            if (this.state.selectedTab == 1) {
                GLOBAL.whichApproval = "1"


            } else {
                GLOBAL.whichApproval = ""
            }
            GLOBAL.approvalArray = item
//        alert(this.state.selectedTab)
            GLOBAL.appMarkApp = this.state.selectedTab
            this.props.navigation.navigate('ApprovalDetail')
        }else{
            if (this.state.selectedTab == 1) {
                GLOBAL.whichApproval = "1"


            } else {
                GLOBAL.whichApproval = ""
            }
            GLOBAL.approvalArray = item
//        alert(this.state.selectedTab)
            GLOBAL.appMarkApp = this.state.selectedTab
            this.props.navigation.navigate('DprDetail')
        }
    }
    _renderItems = ({item,index}) => {
//alert(item.name)
        return (


            <TouchableOpacity onPress={() => this.passData(item)
            }>


                <View style = {{margin:10,borderRadius:16,backgroundColor:'white'}}>

                    <View style = {{backgroundColor:"#f7fbfc",borderRadius:4,height:52,margin:10}}>

                        <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:8}}>



                            <Text style = {{alignSelf: 'center',fontSize : 12,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',marginLeft:4}}>
                                {stringsoflanguages.date} : {item.request_date}

                            </Text>

                            <Text style = {{alignSelf: 'flex-end',fontSize : 12,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',marginRight:4}}>
                                {stringsoflanguages.time} : {item.request_time}

                            </Text>

                        </View>
                        <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:8}}>



                            <Text style = {{alignSelf: 'center',fontSize : 12,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',marginLeft:4}}>
                                {stringsoflanguages.requestno} : {item.request_id}

                            </Text>

                            <Text style = {{alignSelf: 'flex-end',fontSize : 12,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',marginRight:4}}>
                                {stringsoflanguages.bid} : {item.booking_id}

                            </Text>

                        </View>

                    </View>




                    <View style = {{flexDirection:'row',marginLeft:14,marginTop:12}}>
                        <Text style = {{alignSelf: 'center',fontSize : 17,color :'#042C5C', height:'auto',fontFamily:'AvenirLTStd-Medium',marginLeft:4}}>
                            {item.dlr}

                        </Text>
                    </View>

                    <View style = {{flexDirection:'row',marginLeft:14,marginTop:12}}>
                        <Image style = {{width :13 ,height: 13,marginLeft:4,resizeMode: 'contain'}}
                               source={require('./ic-outline-date-range.png')}/>

                        <Text style = {{alignSelf: 'center',fontSize : 14,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',marginLeft:4,marginBottom :8}}>
                            {item.from} -  {item.to}

                        </Text>

                    </View>
                    {this.state.selectedTab == 1 && (

                        <View style = {{backgroundColor:"#f7fbfc",borderRadius:4,height:35,margin:10}}>

                            <Text style = {{fontSize : 18,color :'green', marginTop:10,fontFamily:'AvenirLTStd-Medium',marginLeft:14,marginBottom :8,textAlign: 'center'}}>
                                APPROVED
                            </Text>

                        </View>
                    )}


                </View>



            </TouchableOpacity>

        )
    }

    _renderItemsp = ({item,index}) => {
//alert(item.name)
        return (

            <View style = {{margin:10,borderRadius:16,backgroundColor:'white'}}>

                <View style = {{backgroundColor:"#f7fbfc",borderRadius:4,height:'auto',margin:10}}>

                    <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:8}}>



                        <Text style = {{alignSelf: 'center',fontSize : 16,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',marginLeft:4}}>
                            {stringsoflanguages.name} : {item.name}

                        </Text>




                    </View>
                    <Text style = {{alignSelf: 'flex-start',fontSize : 16,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',marginRight:4, marginLeft:4}}>
                        {stringsoflanguages.role} : {item.role_name}

                    </Text>
                    <Text style = {{alignSelf: 'flex-start', fontSize : 16,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',marginRight:4, marginLeft:4}}>
                        {stringsoflanguages.mobile} : {item.mobile}

                    </Text>
                    <Text style = {{alignSelf: 'flex-start', fontSize : 16,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',marginRight:4, marginLeft:4}}>
                        {stringsoflanguages.status} : {item.status}

                    </Text>


                    <Button
                        style={{padding:10,marginTop:14,fontSize: 18, color: 'white',backgroundColor:'#006FA5',marginLeft:'5%',width:'90%',height:45,fontFamily:'AvenirLTStd-Heavy',borderRadius:4}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this._handlePressapprove(item)}>
                        {stringsoflanguages.approved}
                    </Button>

                </View>



            </View>

        )
    }


    myCallbackFunctionsapprove=(res)=>{
//  alert(JSON.stringify(res))
        this.hideLoading()
        if (res.status == 200){
            alert('Approved successfully!')
            this.loadHome()
        }
        else{
            alert(stringsoflanguages.unable)
        }

    }

    _handlePressapprove=(item)=>{
//  alert(JSON.stringify(item.id))
        this.showLoading()
        var self=this;

        var url ;
        url = GLOBAL.BASE_URL + 'get_new_user_approval';
        axios.post(url, {
            id: item.id

        })
            .then(function (response) {

                self.myCallbackFunctionsapprove(response.data)

            })
            .catch(function (error) {
                alert(error)
                //  self.myCallbackFunction()

            });
    }


    render() {
        let datas= [];
        let { name } = this.state;

        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}

                                       size="large" color='#006FA5' />
                </View>
            )
        }
        return (
            <SafeAreaView>

            <View style={styles.container}>



                <View style = {{flexDirection:  'row',marginTop:20}}>

                    <TouchableOpacity onPress={() => this.props.navigation.goBack()
                    }>

                        <Image style = {{width :30 ,height: 30,marginLeft:20,resizeMode: 'contain'}}
                               source={require('./back.png')}/>

                    </TouchableOpacity>


                    <Text style = {{marginLeft: 12,width:200,color:'#042C5C',fontSize: 22,fontFamily:'AvenirLTStd-Heavy',}}>
                        {stringsoflanguages.approval}

                    </Text>



                </View>


                <MaterialTabs
                    items={['Pending', 'Already Aproved']}
                    scrollable = {false}
                    tabWidth = {20}

                    barColor = 'white'
                    selectedIndex={this.state.selectedTab}
                    indicatorColor = '#006FA5'
                    activeTextColor = '#042C5C'
                    inactiveTextColor = '#042C5C'
                    allowFontScaling ={true}
                    textStyle ={ {fontSize:15}}


                    onChange={index =>

                        this.categorySelect(index)
                    }




                />

                <KeyboardAwareScrollView style = {{marginBottom:20}} keyboardShouldPersistTaps='always'>

                    <View style = {{backgroundColor:'#F6F8F9'}}>



                        <FlatList style= {{marginTop:5}}
                                  data={this.state.data}
                                  numColumns={1}
                                  keyExtractor = { (item, index) => index.toString() }
                                  renderItem={this._renderItems}
                                  extraData={this.state}
                        />
                        {this.state.selectedTab==0 && (
                            <FlatList style= {{marginTop:5}}
                                      data={this.state.pdata}
                                      numColumns={1}
                                      keyExtractor = { (item, index) => index.toString() }
                                      renderItem={this._renderItemsp}
                                      extraData={this.state}
                            />

                        )}

                    </View>
                </KeyboardAwareScrollView>
            </View>
            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'white',
    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    slide1: {

        marginLeft : 50,

        width: window.width - 50,
        height:300,
        resizeMode:'contain',
        marginTop : window.height/2 - 200


    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
})
