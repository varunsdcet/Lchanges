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
var type = 0;
var tomorrow;
export default class DailyLabourReport extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        catid:'',
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
        datas:[],

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


            this.setState({ startDate: date.toString() });


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

        GLOBAL.bid = this.state.data[index].id

        this.timeoutCheck = setTimeout(() => {
            this.loadHomes();
        }, 400)

        //delay(() => this.loadHomes(GLOBAL.bid), 1000);
        //this.props.navigation.push('NewCate')
    }


    getIndexs = (index) => {

        GLOBAL.cid = this.state.data[index].id
     //   loadHomes(GLOBAL.bid)
        //this.props.navigation.push('NewCate')
    }
    loadHomes=()=>
    {
        var self=this;
        var url = GLOBAL.BASE_URL + 'getcontractor';
        axios.post(url, {
            order_id: GLOBAL.bid,

        })
            .then(function (response) {

                self.myCallbackFunctionss(response.data)

            })
            .catch(function (error) {
                alert(error)
                //  self.myCallbackFunction()

            });
    }



    loadHome()
    {
        var self=this;
        var url = GLOBAL.BASE_URL + 'getbookinid';
        axios.post(url, {
            user_id: GLOBAL.userID,

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
    _renderItems = ({item,index}) => {

        return (

            <TouchableOpacity onPress={() => this.getSelection(index)
            }>
                <View style={{flexDirection :'row', flex: 1 ,marginLeft: '5%',marginTop:12,width : '90%', backgroundColor: 'white',height:38,borderBottomColor:'#77869E',borderBottomWidth:1
                    ,justifyContent:'space-between'}}>

                    <Text style={{marginLeft : 5,marginTop:10,fontSize : 20,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium'}}>

                        {item.title}
                    </Text>
                    {item.selected != '' &&(

                        <Image style = {{width :30 ,height :30,alignSelf:'flex-end',marginRight:4,marginBottom: 6}}
                               source={require('./check.png')}/>
                    )}
                </View>
            </TouchableOpacity>
        )
    }

    showLoading() {
        this.setState({loading: true})
    }


    myCallbackFunctionss1 = (res) => {

        this.hideLoading()
        if (res.status == 200){
            alert(JSON.stringify(res))
            GLOBAL.which = "1"
            this.props.navigation.push('Otp')

         //   GLOBAL.requestid = res.request_id
          //  this.props.navigation.navigate('SucessBooking')

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

        }
        else{
            alert(stringsoflanguages.unable)
        }

    }

    myCallbackFunctionss = (res) => {
        alert(JSON.stringify(res))
        this.hideLoading()
        if (res.status == 200){
            this.setState({datas:res.data})

        }
        else{
            alert(stringsoflanguages.unable)
        }

    }


    componentDidMount(){
        this.loadHome()
        //  tomorrow = new Date();
        //  tomorrow = moment(tomorrow).add(1, 'day').format('yyyy-MM-dd\'T\'HH:mm:ss.SSSz')
        // const myDate = moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss").toDate();
        //  alert(myDate)
        //   this.setState({date:myDate})
    }
    hi = () => {
    alert('dd')
}
    _handlePress() {





            var cid = '';
            var nol = '';

            for(let i = 0; i < GLOBAL.categoryArrays.length; i++) {
                cid = cid + GLOBAL.categoryArrays[i].id + ','
                nol = nol + GLOBAL.categoryArrays[i].no_of_labour + ','
            }
            cid = cid.slice(0, -1);
            nol = nol.slice(0, -1);

            var self=this;
            var url = GLOBAL.BASE_URL + 'dlr';



            axios.post(url, {
                user_id: GLOBAL.userID,
                order_id:GLOBAL.bid,
                contractor_id :GLOBAL.cid,
                category_id :cid,
                no_of_labour:nol,
                date_of_attendance :this.state.startDate,
                service_contract:GLOBAL.serviceContract,



            })
                .then(function (response) {

                    self.myCallbackFunctionss1(response.data)

                })
                .catch(function (error) {
                    alert(error)
                    //  self.myCallbackFunction()

                });





        // this.props.navigation.navigate('Otp')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
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
                    <KeyboardAwareScrollView>

                        <TouchableOpacity onPress={() => this.props.navigation.goBack()
                        }>

                            <Image style = {{width :30 ,height: 30,marginTop:'4%',marginLeft:20,resizeMode: 'contain'}}
                                   source={require('./back.png')}/>

                        </TouchableOpacity>


                        <Text style = {{marginLeft: '5%',width:'90%',color:'#006FA5',fontSize: 30,marginTop: '4%',fontFamily:'AvenirLTStd-Heavy'}}>
                            {stringsoflanguages.dlrs}

                        </Text>


                        <View style = {{marginLeft:'5%',width:'90%',marginTop:'3%'}}>


                            <Dropdown containerStyle={{width:'100%', height:50, marginTop:-10}}
                                      fontSize={14}
                                      labelFontSize={13}
                                      dropdownPosition = {-4.2}
                                      onChangeText ={ (value,index) => this.getIndex(index) }

                                      label={stringsoflanguages.bookingIds}
                                      data={this.state.data}

                            />

                            <View style = {{marginTop:16}}>

                            <Dropdown containerStyle={{width:'100%', height:50, marginTop:-10}}
                                      fontSize={14}
                                      labelFontSize={13}
                                      dropdownPosition = {-2.2}
                                      onChangeText ={ (value,index) => this.getIndexs(index) }

                                      label={stringsoflanguages.cid}
                                      data={this.state.datas}
                            />
                            </View>



                                <TextField
                                    label={stringsoflanguages.selectCategory}
                                    value={''}
                                    editable = {false}
                                    onChangeText={ (name) => this.setState({ name }) }
                                />


                                <TouchableOpacity  style = {{width :16 ,height: 16,marginLeft:window.width - 60,marginTop:-30}}


                                                   onPress={() => this.props.navigation.navigate('DLRA')
                                                   }>

                                    <Image style = {{resizeMode: 'contain'}}
                                           source={require('./arrow-down.png')}/>



                                </TouchableOpacity>



                            <DateTimePicker
                                isVisible={this.state.isDateTimePickerVisible}
                                mode = 'date'
                                onConfirm={this.handleDatePicked}
                                onCancel={this.hideDateTimePicker}
                                format="DD/MM/YYYY"
                                minimumDate = {new Date()}

                            />
                            <View style = {{marginTop:4}}>

                            <TextField
                                label={stringsoflanguages.doa}
                                value={moment(this.state.startDate).format('DD/MM/YYYY')}
                                editable = {false}
                                onChangeText={ (startDate) => this.setState({ startDate }) }
                            />
                            </View>
                            <TouchableOpacity  style = {{width :16 ,height: 16,marginLeft:window.width - 60,marginTop:-30}}


                                               onPress={() => this.showDateTimePicker(0)
                                               }>

                                <Image style = {{resizeMode: 'contain'}}
                                       source={require('./arrow-down.png')}/>

                            </TouchableOpacity>





                        </View>




                        <Dialog
                            visible={this.state.visible}
                            onTouchOutside={() => {
                                this.setState({ visible: false });
                            }}
                        >
                            <DialogContent>

                                <View>

                                    <Image style = {{width :80 ,height :80,alignSelf:'center',resizeMode:'contain',marginTop:30}}
                                           source={require('./info-with-circle.png')}/>

                                    <Text style = {{margin:10,textAlign: 'center',color:'#006FA5',fontSize: 18,marginTop: 12,fontFamily:'AvenirLTStd-Heavy'}}>
                                        {this.state.pop}

                                    </Text>

                                    <Button
                                        style={{padding:6,fontSize: 16, color: '#77869E',backgroundColor:'white',borderWidth:1,borderColor:'#77869E',alignSelf:'center',width:'30%',height:30,fontFamily:'AvenirLTStd-Heavy',borderRadius:4}}
                                        styleDisabled={{color: 'red'}}
                                        onPress={() => this._handlePresss()}>
                                        {stringsoflanguages.ok}
                                    </Button>



                                </View>
                            </DialogContent>
                        </Dialog>




                        <Button
                            style={{padding:14,marginTop:40,fontSize: 20, color: 'white',backgroundColor:'#006FA5',marginLeft:'5%',width:'90%',height:50,fontFamily:'AvenirLTStd-Heavy',borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this._handlePress()}>
                            {stringsoflanguages.submit}
                        </Button>




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

        backgroundColor :'white'
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