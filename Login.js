import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    AsyncStorage
} from 'react-native';
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};
const GLOBAL = require('./Global');
import axios from 'react-native-axios';
import { Dropdown } from 'react-native-material-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import stringsoflanguages from './Local';
import Dialog, {DialogContent} from "react-native-popup-dialog";
export default class Login extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,

        selected:false,
        data:[],

    };
    myCallbackFunction = (res) => {
       this.hideLoading()
      this.setState({data:res.role})
        this.setState({loading: false})
    }
    myCallbackFunctions = (res) => {
        this.hideLoading()
        GLOBAL.mobile =  this.state.phone
      if (res.status == 200){
          alert(res.service_contract_number)
          GLOBAL.which = "2"
          AsyncStorage.setItem('mobile', res.user_mobile);
          AsyncStorage.setItem('userID', res.user_id.toString());
          AsyncStorage.setItem('username', res.user_name);
          AsyncStorage.setItem('roleid', res.role_id.toString());
          AsyncStorage.setItem('service', res.service_contract_number.toString());
          GLOBAL.userID = res.user_id;
          GLOBAL.name = res.user_name;
          GLOBAL.mobile =  res.user_mobile;
          GLOBAL.roleid = res.role_id;
          GLOBAL.serviceContract = res.service_contract_number;
          this.props.navigation.navigate('Otp')
      }
      else if (res.status == 201){
          this.setState({visible:true})
      }
      else{
          alert(stringsoflanguages.unable)
          }

    }
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
           _handlePressLogin() {
            this.showLoading()
            var self=this;
            var url = GLOBAL.BASE_URL + 'getrole';
               axios.get(url)
                .then(function (response) {
                    self.myCallbackFunction(response.data)
                })
                .catch(function (error) {
                    console.log(error);

                });

    }


    showLoading() {
        this.setState({loading: true})
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


    componentDidMount(){
        this._handlePressLogin()
    }
    _handlePress() {
        console.log('Pressed!');

        if (this.state.name == ""){
            alert(stringsoflanguages.service + stringsoflanguages.please)
        }else if (this.state.email == ""){
            alert(stringsoflanguages.select + stringsoflanguages.please)
        }

        else if (this.state.mobile == ""){
            alert(stringsoflanguages.mobile + stringsoflanguages.please)
        }else if (this.state.company == ""){
            alert(stringsoflanguages.password + stringsoflanguages.please)
        }else{
            this.showLoading()
            var self=this;

            var url = GLOBAL.BASE_URL + 'login';


            alert(url)

            axios.post(url, {
                mobile: this.state.phone,
                password: this.state.company,
                contract_no: this.state.name,
                role_id: this.state.email,
                divice_token:"11111"
            })
                .then(function (response) {

                    self.myCallbackFunctions(response.data)


                    //    self.myCallbackFunction.bind()

                    //   this.myCallbackFunction()


                })
                .catch(function (error) {
                    console.log(error);
                    //  self.myCallbackFunction()

                });

        }

       // this.props.navigation.navigate('Otp')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = () => {
        alert('dd')
        this.setState({selected:true})
    }
    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }
    render() {


        let { phone } = this.state;
        let { email } = this.state;
        let { name } = this.state;
        let { company } = this.state;
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

                        <Image style = {{width :200 ,height: 140,alignSelf:'center',marginTop:'10%',resizeMode: 'contain'}}
                               source={require('./logo-login.png')}/>


                        <Text style = {{marginLeft: '5%',width:'90%',color:'#006FA5',fontSize: 30,marginTop: '4%',fontFamily:'AvenirLTStd-Heavy'}}>
                            {stringsoflanguages.welcome}

                        </Text>





                        <View style = {{marginLeft:'5%',width:'90%',marginTop:'2%'}}>


                            <TextField
                                label={stringsoflanguages.service}
                                value={name}
                                onChangeText={ (name) => this.setState({ name }) }
                            />

                            <Dropdown containerStyle={{width:'100%', height:50, marginTop:-10}}
                                      fontSize={14}
                                      labelFontSize={13}
                                      dropdownPosition = {-4.2}
                                      onChangeText ={ (value,index) => this.getIndex(index) }

                                      label={stringsoflanguages.select}
                                      data={this.state.data
                                      }
                            />





                            <TextField
                                label={stringsoflanguages.mobile}
                                value={phone}
                                onChangeText={ (phone) => this.setState({ phone }) }
                            />
                            <TextField
                                label={stringsoflanguages.password}
                                value={company}
                                secureTextEntry={true}
                                onChangeText={ (company) => this.setState({ company }) }
                            />

                        </View>









                        <Button
                            style={{padding:10,marginTop:14,fontSize: 20, color: 'white',backgroundColor:'#006FA5',marginLeft:'5%',width:'90%',height:40,fontFamily:'AvenirLTStd-Heavy',borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this._handlePress()}>
                            {stringsoflanguages.login}
                        </Button>




                        <Text style={{color :'#77869E',textAlign:'center',fontFamily:'AvenirLTStd-Heavy',fontSize: 15,marginTop:40}} >
                            {stringsoflanguages.dont}
                        </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()
                        }>
                        <Text style={{textAlign:'center',width:'100%',color :'#006FA5',fontFamily:'AvenirLTStd-Heavy',fontSize: 15}} >

                            {stringsoflanguages.associate}
                        </Text>
                            </TouchableOpacity>
                        <Dialog
                            visible={this.state.visible}
                            onTouchOutside={() => {
                                this.setState({ visible: false });
                            }}
                        >
                            <DialogContent>

                                <View>

                                    <Image style = {{width :80 ,height :80,alignSelf:'center',resizeMode:'contain',marginTop:30}}
                                           source={require('./check.png')}/>

                                    <Text style = {{margin:10,textAlign: 'center',color:'#006FA5',fontSize: 18,marginTop: 12,fontFamily:'AvenirLTStd-Heavy'}}>
                                        {stringsoflanguages.admin}

                                    </Text>





                                </View>
                            </DialogContent>
                        </Dialog>

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