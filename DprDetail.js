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
import { WebView } from 'react-native-webview';
var type = 0;
var count:'';
var tomorrow;
export default class DprDetail extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        selectedTab:0,
        data:[],
        isDateTimePickerVisible: false,
        startDate:'',
        endDate:'',
        date :new Date(),
        mystart :'',
        value:1,
        values:1,
        visible:false,
        pop:'',
        done:false,
        my :'',

    };
    showDateTimePicker = (types) => {
        type =  types

        if (type == 0){
            var d = new Date();
            d.setDate(d.getDate() + 10);
            this.setState({date:d})
        }else{
            this.setState({date:this.state.mystart})

        }

        this.setState({ isDateTimePickerVisible: true });
    };
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        if (type == 0){
            this.setState({mystart:date})
            this.setState({ startDate: date.toString() });
        }else{
            this.setState({ endDate: date.toString() });
        }

        this.hideDateTimePicker();
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

    getIndex = (index) => {

        GLOBAL.categoryid = this.state.data[index].id
        this.props.navigation.push('NewCate')
    }
    loadHome(selectes)
    {


       // this.showLoading()
        var self=this;

        var url = GLOBAL.BASE_URL + 'dpr_attendance_details';
        axios.post(url, {
            user_id: GLOBAL.userID,
            service_contract: GLOBAL.serviceContract,
            order_id: GLOBAL.approvalArray.order_id


        })
            .then(function (response) {

                self.myCallbackFunctions(response.data)

            })
            .catch(function (error) {
                alert(error)
                //  self.myCallbackFunction()

            });

                // var url = GLOBAL.BASE_URL + 'dpr_attendance_details';
                // axios.post(url, {
                //     user_id: GLOBAL.userID,
                //     service_contract: GLOBAL.serviceContract,
                //     order_id: GLOBAL.approvalArray.order_id
                //
                //
                // })
                //     .then(function (response) {
                //
                //         self.myCallbackFunctions(response.data)
                //
                //     })
                //     .catch(function (error) {
                //         alert(error)
                //         //  self.myCallbackFunction()
                //
                //     });

    }


    hideLoading() {
        this.setState({loading: false})
    }

    getSelection = (index) => {



        for(let i = 0; i < 2; i++){

            this.state.moviesList[i].selected = "";

        }

        this.setState({moviesList:this.state.moviesList})

        let indexs = this.state.moviesList;
        let targetPost = this.state.moviesList[index];
        if (targetPost.selected == ''){
            targetPost.selected = 'Y'
        }else{
            targetPost.selected = ''
        }
        indexs[index] = targetPost
        this.setState({moviesList:indexs})


    }

    _handlePresss =()=> {
        this.setState({visible:false})
        this.setState({done:true})



    }


    showLoading() {
        this.setState({loading: true})
    }


    myCallbackFunctionss = (res) => {

        this.hideLoading()
        if (res.status == 200){

            GLOBAL.requestid = res.request_id
            this.props.navigation.navigate('SucessBooking')

        }
        else{
            alert(stringsoflanguages.unable)
        }

    }

    myCallbackFunctionss = (res) => {


        this.hideLoading()
        if (res.status == 200){
            this.props.navigation.goBack()

        }
        else{
            alert(stringsoflanguages.unable)
        }

    }

    myCallbackFunctions = (res) => {
        alert(JSON.stringify(res))


        this.hideLoading()
        if (res.status == 200){
            this.setState({data:res.data})
            this.setState({my:res.billing_engineer_status})

        }
        else{
            alert(stringsoflanguages.unable)
        }

    }

    componentDidMount(){
        this.loadHome(0)





        //  tomorrow = new Date();
        //  tomorrow = moment(tomorrow).add(1, 'day').format('yyyy-MM-dd\'T\'HH:mm:ss.SSSz')
        // const myDate = moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss").toDate();
        //  alert(myDate)
        //   this.setState({date:myDate})
    }
    _handlePress() {
        // let ac = "";
        // for (let i = 0;i <this.state.data.length;i++){
        //
        //     ac = ac + this.state.data[i].id + ','
        // }
        // ac =   ac.slice(0, -1);
        // GLOBAL.aid = ac
        this.props.navigation.replace('DprAttendanceVideo')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    categorySelect = (index) =>{
        this.setState({selectedTab:index})
        this.loadHome(index)

    }
    _renderItems = ({item,index}) => {
//         let nos = '';
//         if (item.category != ""){
//             let cate = item.category.split(',')
//             let no = item.no_labour.split(',')
//
//
//             for (let i = 0;i <cate.length;i++){
//
//                 let acronym = cate[i].split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')
// //            alert(acronym)
//
//                 let acronyms = no[i].split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')
//                 nos = nos +  acronym  + ":" +  acronyms + ' , '
//             }
//         }







        return (

<View>

            <View style = {{marginLeft:'5%',marginTop:0,borderRadius:16,flexDirection:'row',height:40,width:'90%',alignItems:'center'}}>

                <Text style = {{color:'black',fontFamily:'AvenirLTStd-Medium',fontSize : 17,width:'25%',textAlign:'center'}}>
                    {item.item}

                </Text>
                <Text style = {{color:'black',fontFamily:'AvenirLTStd-Medium',fontSize : 17,width:'45%',textAlign:'center'}}>
                    {item.work}

                </Text>
                <Text style = {{color:'black',fontFamily:'AvenirLTStd-Medium',fontSize : 17,width:'20%',textAlign:'center'}}>
                    {item.unit}

                </Text>
                <Text style = {{color:'black',fontFamily:'AvenirLTStd-Medium',fontSize : 17,width:'10%',textAlign:'center',}}>
                    {item.qty}

                </Text>





            </View>

            <View style = {{marginLeft:'5%',backgroundColor:'black',height:1,width:'90%'}}>

    </View>
</View>

        )
    }
    cancel (){
        this.showLoading()
        var self=this;
        var url = GLOBAL.BASE_URL + 'cancelorder';
        axios.post(url, {
            id: GLOBAL.approvalArray.id,


        })
            .then(function (response) {

                self.myCallbackFunctionss(response.data)

            })
            .catch(function (error) {
                alert(error)
                //  self.myCallbackFunction()

            });
    }
    render() {



        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}

                                       size="large" color='#006FA5' />
                </View>
            )
        }



        let added_buttons_goes_here = this.state.data.map( (data, indexs) => {

            return (
                <View>

                <View style = {{margin:'5%',marginTop:1,borderRadius:16,backgroundColor:'#77869E',flexDirection:'row',height:40,width:'90%',alignItems:'center'}}>

                    <Text style = {{color:'black',fontFamily:'AvenirLTStd-Medium',fontSize : 17,width:'90%',marginLeft:10,marginTop:1}}>
                        {data.date_of_attendance}

                    </Text>

                </View>

                <View style = {{margin:'5%',marginTop:2,borderRadius:16,backgroundColor:'#006FA5',flexDirection:'row',height:50,width:'90%',alignItems:'center'}}>

                    <Text style = {{color:'white',fontFamily:'AvenirLTStd-Medium',fontSize : 17,width:'25%',textAlign:'center'}}>
                        Code

                    </Text>
                    <Text style = {{color:'white',fontFamily:'AvenirLTStd-Medium',fontSize : 17,width:'45%',textAlign:'center'}}>
                        Description

                    </Text>
                    <Text style = {{color:'white',fontFamily:'AvenirLTStd-Medium',fontSize : 17,width:'20%',textAlign:'center'}}>
                        Unit

                    </Text>
                    <Text style = {{color:'white',fontFamily:'AvenirLTStd-Medium',fontSize : 17,width:'10%',textAlign:'center',}}>
                        Qty

                    </Text>





                </View>

                    <View>

                        <FlatList style= {{marginTop:0}}
                                  data={data.dpr}
                                  numColumns={1}
                                  keyExtractor = { (item, index) => index.toString() }
                                  renderItem={this._renderItems}
                                  extraData={this.state}
                        />

                    </View>

                </View>
            )
        }
        )


        return (
            <SafeAreaView>

                <View style={styles.container}>

                    <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>

                        <View style = {{backgroundColor:'#F6F8F9'}}>


                            <View style = {{flexDirection:  'row',marginTop:20,width:'100%'}}>

                                <View style = {{width:'90%',flexDirection:'row'}}>

                                    <TouchableOpacity onPress={() => this.props.navigation.goBack()
                                    }>




                                        <Image style = {{width :30 ,height: 30,marginLeft:20,resizeMode: 'contain'}}
                                               source={require('./back.png')}/>

                                    </TouchableOpacity>


                                    <Text style = {{marginLeft: 12,width:200,color:'#042C5C',fontSize: 22,fontFamily:'AvenirLTStd-Heavy',}}>
                                        {stringsoflanguages.dprDetail}

                                    </Text>

                                </View>


                            </View>


                            <View style = {{margin:10,borderRadius:16,backgroundColor:'white'}}>

                                <View style = {{backgroundColor:"#f7fbfc",borderRadius:4,height:52,margin:10}}>

                                    <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:8}}>



                                        <Text style = {{alignSelf: 'center',fontSize : 12,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',marginLeft:4}}>
                                            {stringsoflanguages.date} : {GLOBAL.approvalArray.request_date}

                                        </Text>

                                        <Text style = {{alignSelf: 'flex-end',fontSize : 12,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',marginRight:4}}>
                                            {stringsoflanguages.time} : {GLOBAL.approvalArray.request_time}

                                        </Text>

                                    </View>
                                    <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:8}}>



                                        <Text style = {{alignSelf: 'center',fontSize : 12,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',marginLeft:4}}>
                                            {stringsoflanguages.requestno} : {GLOBAL.approvalArray.request_id}

                                        </Text>

                                        <Text style = {{alignSelf: 'flex-end',fontSize : 12,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',marginRight:4}}>
                                            {stringsoflanguages.bid} : {GLOBAL.approvalArray.booking_id}

                                        </Text>



                                    </View>

                                </View>




                                <View style = {{flexDirection:'row',marginLeft:14,marginTop:12}}>
                                    <Text style = {{alignSelf: 'center',fontSize : 17,color :'#042C5C', height:'auto',fontFamily:'AvenirLTStd-Medium',marginLeft:4}}>
                                        {stringsoflanguages.dprAttendance}

                                    </Text>

                                </View>

                                <View style = {{flexDirection:'row',marginLeft:14,marginTop:12}}>
                                    <Image style = {{width :13 ,height: 13,marginLeft:4,resizeMode: 'contain'}}
                                           source={require('./ic-outline-date-range.png')}/>

                                    <Text style = {{alignSelf: 'center',fontSize : 14,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',marginLeft:4,marginBottom :8}}>
                                        {GLOBAL.approvalArray.from} -  {GLOBAL.approvalArray.to}

                                    </Text>

                                </View>


                            </View>
                            <Text style = {{alignSelf: 'center',fontSize : 16,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',marginRight:4}}>
                                Status : {this.state.my}

                            </Text>


{added_buttons_goes_here}



                            {GLOBAL.appMarkApp == '0' &&(
                                <Button
                                    style={{padding:10,marginTop:14,fontSize: 18, color: 'white',backgroundColor:'#006FA5',marginLeft:'5%',width:'90%',height:45,fontFamily:'AvenirLTStd-Heavy',borderRadius:4}}
                                    styleDisabled={{color: 'red'}}
                                    onPress={() => this._handlePress()}>
                                    {stringsoflanguages.approved}
                                </Button>

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