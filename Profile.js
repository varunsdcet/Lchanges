import React, {Component} from 'react';
import { StyleSheet,Text,TextInput, View,Image ,Alert,FlatList,Dimensions ,Linking,TouchableOpacity,ActivityIndicator,SafeAreaView} from 'react-native';
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
import { WebView } from 'react-native-webview';
var moment = require('moment');
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Dialog, {DialogContent} from "react-native-popup-dialog";
import MaterialTabs from 'react-native-material-tabs';
var type = 0;
var tomorrow;
export default class Profile extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        selectedTab:0,
        data:'',
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
     //   alert(GLOBAL.serviceContract)
        this.showLoading()
        var self=this;
        var url = GLOBAL.BASE_URL + 'profile';
        axios.post(url, {
            user_id:GLOBAL.userID,
            service_contract_number:GLOBAL.serviceContract,


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
    myCallbackFunctions = (res) => {

        alert(JSON.stringify(res))


        this.hideLoading()
        if (res.status == 200){

            this.setState({data:res.data[0]})

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



        if (this.state.done == true){

            var cid = '';
            var nol = '';

            for(let i = 0; i < GLOBAL.categoryArray.length; i++) {
                cid = cid + GLOBAL.categoryArray[i].id + ','
                nol = nol + GLOBAL.categoryArray[i].no_of_labour + ','
            }
            cid = cid.slice(0, -1);
            nol = nol.slice(0, -1);

            var self=this;
            var url = GLOBAL.BASE_URL + 'company_request';
            axios.post(url, {
                user_id: GLOBAL.userID,
                service_contract:this.state.name,
                start_date :this.state.startDate,
                end_date:this.state.endDate,
                accomodation_provided : this.state.value - 1,
                transport_provided :this.state.values - 1,
                request_type :GLOBAL.type,
                category_id :cid,
                no_of_labour:nol







            })
                .then(function (response) {

                    self.myCallbackFunctionss(response.data)

                })
                .catch(function (error) {
                    alert(error)
                    //  self.myCallbackFunction()

                });


        }else {
            this.setState({visible:true})
            if (this.state.value == 2 && this.state.values == 2) {
                this.setState({pop: stringsoflanguages.twotwo})

            } else if (this.state.value == 2 && this.state.values == 1) {
                this.setState({pop: stringsoflanguages.twoone})
            } else if (this.state.value == 1 && this.state.values == 2) {
                this.setState({pop: stringsoflanguages.onetwo})
            }
        }


        // this.props.navigation.navigate('Otp')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    categorySelect = (index) =>{
        this.setState({selectedTab:index})
        this.loadHome(index)

    }
    passData =(item) =>{
        Linking.openURL(item.invoice_pdf)
    }
    _renderItems = ({item,index}) => {


        return (


            <TouchableOpacity onPress={() => this.passData(item)
            }>


                <View style = {{margin:10,borderRadius:16,backgroundColor:'white'}}>



                    <View style = {{flexDirection:'row',width:'100%',marginTop:8,height:50}}>



                        <Text style = {{fontSize : 16,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',marginLeft:12,marginTop:12,width:'70%'}}>
                            {index + 1} . PRN # {item.invoice}

                        </Text>

                        <View style = {{marginRight:10,flexDirection:'row',width:'30%',marginTop:8}}>

                            <Text style = {{fontSize : 16,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium'}}>
                                ₹ {item.amount}

                            </Text>

                            <Image style = {{marginLeft:20,width :20 ,height : 20}}
                                   source={require('./file-download.png')}/>
                        </View>




                    </View>










                </View>

            </TouchableOpacity>

        )
    }
    render() {



        var radio_props_one = [
            {label: 'Yes', value: 1 },
            {label: 'No', value: 2 },

        ];

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


                    <View style = {{flexDirection:  'row',marginTop:20,backgroundColor:'#006FA5'}}>

                        <TouchableOpacity onPress={() => this.props.navigation.goBack()
                        }>

                            <Image style = {{width :30 ,height: 30,marginLeft:20,resizeMode: 'contain'}}
                                   source={require('./back1.png')}/>

                        </TouchableOpacity>


                        <Text style = {{marginLeft: 12,width:300,color:'white',fontSize: 22,fontFamily:'AvenirLTStd-Heavy',marginTop:5}}>
                            {stringsoflanguages.profile}

                        </Text>



                    </View>

                    <View style ={{ height:150, backgroundColor:'#006FA5',alignItems:'center' }}>

                        <Image style={{width:130, height:130, borderRadius:65, marginTop:10, borderColor:'white', borderWidth:1.5}} source={require('./Oval.png')}/>


                    </View>




                    <View style = {{margin:0,marginTop:8,backgroundColor:'white',width:window.width ,height:window.height}}>

                        <Text style = {{width:window.width,color:'#042C5C',fontSize: 22,fontFamily:'AvenirLTStd-Heavy',marginTop:20,textAlign: 'center'}}>
                            {this.state.data.name}

                        </Text>


                        <Text style = {{width:window.width,color:'#77869E',fontSize: 14,fontFamily:'AvenirLTStd-Heavy',marginLeft: 20,marginTop:30}}>
                            {stringsoflanguages.mobile}

                        </Text>

                        <Text style = {{width:window.width,color:'#042C5C',fontSize: 16,fontFamily:'AvenirLTStd-Heavy',marginLeft: 20,marginTop:3}}>
                            {this.state.data.mobile}

                        </Text>


                        <Text style = {{width:window.width,color:'#77869E',fontSize: 14,fontFamily:'AvenirLTStd-Heavy',marginLeft: 20,marginTop:10}}>
                            {stringsoflanguages.emailid}

                        </Text>

                        <Text style = {{width:window.width,color:'#042C5C',fontSize: 16,fontFamily:'AvenirLTStd-Heavy',marginLeft: 20,marginTop:3}}>
                            {this.state.data.email}

                        </Text>

                        <Text style = {{width:window.width,color:'#77869E',fontSize: 14,fontFamily:'AvenirLTStd-Heavy',marginLeft: 20,marginTop:10}}>
                            {stringsoflanguages.service}

                        </Text>

                        <Text style = {{width:window.width,color:'#042C5C',fontSize: 16,fontFamily:'AvenirLTStd-Heavy',marginLeft: 20,marginTop:3}}>
                            {this.state.data.service_contract_number}

                        </Text>

                        <Text style = {{width:window.width,color:'#77869E',fontSize: 14,fontFamily:'AvenirLTStd-Heavy',marginLeft: 20,marginTop:10}}>
                            {stringsoflanguages.compnayname}

                        </Text>

                        <Text style = {{width:window.width,color:'#042C5C',fontSize: 16,fontFamily:'AvenirLTStd-Heavy',marginLeft: 20,marginTop:3}}>
                            {this.state.data.project_name}

                        </Text>

                    </View>







                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'#006FA5',
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