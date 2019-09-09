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
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
export default class SelectCategory extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        isDateTimePickerVisible: false,
        data:[],
        moviesList :[
            {
                id :"",
                no_of_labour :"",
                name:'',
            }


        ]

    };
    showDateTimePicker = () => {

        this.setState({ isDateTimePickerVisible: true });
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
    getIndex = (indexd,index) => {

        GLOBAL.categoryid = this.state.data[indexd].id

        this.state.moviesList[index].id = this.state.data[indexd].id
        this.state.moviesList[index].name = this.state.data[indexd].value

        this.setState({moviesList :this.state.moviesList})

        // this.props.navigation.push('NewCate')
    }
    _renderItems = ({item,index}) => {

        let { phone } = this.state;
        return (



                   <View style = {{flexDirection:'row',width:window.width,justifyContent:'space-between'}}>


                    <Dropdown containerStyle={{width:'40%', height:70, marginTop:3,marginLeft :'5%'}}
                              fontSize={14}
                              labelFontSize={15}
                              dropdownPosition = {-4.2}

                              onChangeText ={ (value,indexd) => this.getIndex(indexd,index) }
                              label={stringsoflanguages.selectContract}
                              data={this.state.data}
                    />
<View style = {{marginTop : - 50,marginRight: '5%',width:'40%',height:40,borderBottomWidth:1,borderBottomColor:'#D3D3D3',alignSelf:'flex-end',flexDirection:'column'}}>

    <TextInput

               placeholder={stringsoflanguages.nooflabour}
               placeholderTextColor= '#D3D3D'
               keyboardType = "number-pad"
               value = {item.no_of_labour.toString()}

               onChangeText={text => {
                   let { moviesList } = this.state;
                   moviesList[index].no_of_labour = text;
                   this.setState({
                       moviesList,
                   });
               }}
    />
</View>



                   </View>



        )
    }

    showLoading() {
        this.setState({loading: true})
    }
    myCallbackFunctions = (res) => {
        GLOBAL.mobile =  this.state.phone
        this.hideLoading()
        if (res.status == 200){
            this.props.navigation.navigate('Otp')
        }
        else{
            alert(stringsoflanguages.unable)
        }

    }

    componentDidMount(){
        this.loadHome()
    }
    _handlePress() {

        //no_of_labour
        GLOBAL.categoryArray = this.state.moviesList
        for (let i = 0; i < GLOBAL.categoryArray.length; i++) {
             let c = GLOBAL.categoryArray[i].no_of_labour
             let d = parseInt(c)

             if (d < 25){
                 alert('Minimum Labour would be 25')
                 return
             }
        }



        this.props.navigation.goBack()

    }
    _handlePresss =()=> {
        var dict =
        [{
            id :"",
            no_of_labour :"",
            name:'',
        }]


        var s = this.state.moviesList

        const interest = [...s, ...dict];

        this.setState({moviesList:interest})


        alert(JSON.stringify(this.state.moviesList))





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
    loadHome()
    {
        var self=this;
        var url = GLOBAL.BASE_URL + 'getcategory';
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

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    render() {
        let data = [{
            value: 'Banana',
        }, {
            value: 'Mango',
        }, {
            value: 'Pear',
        }];


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


                        <Text style = {{marginLeft: '5%',width:'90%',color:'#042C5C',fontSize: 30,marginTop: '4%',fontFamily:'AvenirLTStd-Heavy'}}>
                            {stringsoflanguages.noof}

                        </Text>

                        <View style = {{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>


                            <Text style = {{marginLeft: '5%',width:'60%',color:'#042C5C',fontSize: 16,marginTop: '4%',fontFamily:'AvenirLTStd-Heavy'}}>
                                {stringsoflanguages.labourCategory}

                            </Text>

                            <Text style = {{marginRight: '5%',width:'40%',color:'#042C5C',fontSize: 16,marginTop: '4%',fontFamily:'AvenirLTStd-Heavy'}}>
                                {stringsoflanguages.nooflabour}

                            </Text>

                        </View>

                        <FlatList style= {{flexGrow:0,marginTop:5}}
                                  data={this.state.moviesList}
                                  numColumns={1}
                                  keyExtractor = { (item, index) => index.toString() }
                                  renderItem={this._renderItems}
                                  extraData={this.state}
                        />

                        <Button
                            style={{marginTop:40,marginLeft:window.width - 160,padding:6,fontSize: 16, color: '#77869E',backgroundColor:'white',borderWidth:1,borderColor:'#77869E',alignSelf:'center',width:'30%',height:30,fontFamily:'AvenirLTStd-Heavy',borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this._handlePresss()}>
                            {stringsoflanguages.add}
                        </Button>








                        <Button
                            style={{padding:10,marginTop:20,fontSize: 20, color: 'white',backgroundColor:'#006FA5',marginLeft:'5%',width:'90%',height:40,fontFamily:'AvenirLTStd-Heavy',borderRadius:4}}
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