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
import { RNCamera } from 'react-native-camera';
var type = 0;
var count:'';
var tomorrow;
export default class DprAttendanceVideo extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        selectedTab:0,
        data:[],
        recording:false,
        isDateTimePickerVisible: false,
        startDate:'',
        processing:false,
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

        this.showLoading()
        var self=this;
        var url = GLOBAL.BASE_URL + 'assign_contractor';
        axios.post(url, {
            id: GLOBAL.bookingArray.id,


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



        this.hideLoading()
        if (res.status == 200){
            this.setState({data:res.data})

        }
        else{
            alert(stringsoflanguages.unable)
        }

    }

    componentDidMount(){





        //  tomorrow = new Date();
        //  tomorrow = moment(tomorrow).add(1, 'day').format('yyyy-MM-dd\'T\'HH:mm:ss.SSSz')
        // const myDate = moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss").toDate();
        //  alert(myDate)
        //   this.setState({date:myDate})
    }


    async startRecording() {
        alert( GLOBAL.approvalArray.from)
        alert( GLOBAL.approvalArray.to)
        this.setState({ recording: true });
        // default to mp4 for android as codec is not set
        const { uri, codec = "mp4" } = await this.camera.recordAsync();
        this.setState({ recording: false, processing: true });
        const type = `video/${codec}`;

        alert(uri)
        var url = GLOBAL.BASE_URL + 'dpr_approve_attendence';

        this.showLoading()

        const data = new FormData();
        data.append('user_id', GLOBAL.userID);
        data.append('service_contract', GLOBAL.serviceContract );
        data.append('order_id', GLOBAL.approvalArray.order_id );
        data.append('from', GLOBAL.approvalArray.from );
        data.append('to', GLOBAL.approvalArray.to);

        // you can append anyone.
        data.append('file', {
            uri: uri,
            type: type, // or photo.type
            name: 'video'
        });
        fetch(url, {
            method: 'post',
            body: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            }

        }).then((response) => response.json())
            .then((responseJson) => {
                this.hideLoading()
                this.props.navigation.goBack()
                alert(JSON.stringify(responseJson))



            });



        // const data = new FormData();
        // data.append("file", {
        //     name: "mobile-video-upload",
        //     type,
        //     uri
        // });
        //
        // data.append("user_id",GLOBAL.userID)
        // data.append("invoice_id",GLOBAL.invoiceArray.invoice_no)
        // try {
        //     await fetch(url, {
        //         method: "post",
        //         body: data
        //     });
        // } catch (e) {
        //     console.error(e);
        // }

        this.setState({ processing: false });
    }

    stopRecording() {

        this.camera.stopRecording();
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
        const { recording, processing } = this.state;

        let button = (
            <TouchableOpacity
                onPress={this.startRecording.bind(this)}

            >
                <Text style={{ fontSize: 25,marginTop:20 ,position:'absolute',bottom:100,alignSelf:'center',height:100,width:100,borderRadius:50,backgroundColor:'white'}}> RECORD </Text>
            </TouchableOpacity>
        );

        if (recording) {
            button = (
                <TouchableOpacity
                    onPress={this.stopRecording.bind(this)}

                >
                    <Text style={{ padding:16,fontSize: 25,marginTop:10,position:'absolute',bottom:100 ,alignSelf:'center',height:100,width:100,borderRadius: 50,backgroundColor:'white'}}> STOP </Text>
                </TouchableOpacity>
            );
        }

        if (processing) {
            button = (
                <View style={{width:'100%',height:'100%'}}>
                    <ActivityIndicator animating size={18} />
                </View>
            );
        }
        return (

            <SafeAreaView>
                <View style={styles.container}>


                    <View style = {{width:'100%',height:70,borderRadius:12,marginTop:20}}>
                        <Text style = {{fontSize : 14,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',marginLeft:4,marginBottom:3}}>
                            {stringsoflanguages.message}

                        </Text>

                        <Text style = {{fontSize : 20,color :'#042C5C', height:'auto',fontFamily:'AvenirLTStd-Medium',marginLeft:4,marginBottom:3}}>
                            I am  {GLOBAL.name}   approving your DPR request on screen.

                        </Text>

                    </View>




                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={{width:'100%',height:window.height - 70}}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.on}

                    />
                    <View
                        style={{ flex: 0, flexDirection: "row",marginLeft:window.width/2  }}
                    >
                        {button}
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