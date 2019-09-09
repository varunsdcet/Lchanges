import React, {Component} from 'react';
import { StyleSheet,Text,TextInput, View,Image ,Alert,FlatList,Dimensions ,TouchableOpacity,ActivityIndicator,SafeAreaView} from 'react-native';
const window = Dimensions.get('window');
import Button from 'react-native-button';

type Props = {};
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import stringsoflanguages from './Local';
import axios from 'react-native-axios';
const GLOBAL = require('./Global');
var limit ;

export default class NewCate extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        isDateTimePickerVisible: false,
        moviesList :[],

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


    getNewsUpdate(){
        const url = GLOBAL.BASE_URL +  'getsubcategory'
        this.showLoading()

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category_id: GLOBAL.categoryid,
                user_id:GLOBAL.userID,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.status == 200) {


                    limit = parseInt(responseJson.limit )
                    var s = responseJson.category

                    const interest = [...s, ...responseJson.subcategory];

                    this.setState({moviesList:interest})


                    this.hideLoading()

                }else {
                    alert('No Data Found')
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }


    myCallbackFunctions = (response) => {
        alert(JSON.stringify(response.data))

        this.hideLoading()
        if (response.status == 200){


            const interest = [...response.data.category, ...response.data.subcategory];
            this.setState({moviesList:interest})

            //this.setState({moviesList:category})


        }
        else{
            alert(stringsoflanguages.unable)
        }

    }

    loadHome() {
        this.showLoading()
        var self=this;
        var url = GLOBAL.BASE_URL + 'getsubcategory';
        axios.post(url, {
            category_id: GLOBAL.categoryid,

        })
            .then(function (response) {

                self.myCallbackFunctions(response)

            })
            .catch(function (error) {
                alert(error)
                //  self.myCallbackFunction()

            });
    }

    _handlePress = () => {



        GLOBAL.categoryArray = this.state.moviesList
        for (let i = 0; i < GLOBAL.categoryArray.length; i++) {
            let c = GLOBAL.categoryArray[i].no_of_labour
            let d = parseInt(c)

            if (d < limit){
                alert('Minimum Labour would be 25')
                return
            }
        }



        this.props.navigation.goBack()
    }
    _renderItems = ({item,index}) => {


        let { phone } = this.state;
        return (



            <View style = {{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>


                <Text style = {{height:35,color:'grey',borderBottomWidth:1,borderBottomColor:'grey',marginLeft:'5%',width:'60%',}}>
                    {item.category_name}
                </Text>




                    <TextInput style = {{width:'40%',marginRight: 10,marginTop:-20}}

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



        )
    }

    showLoading() {
        this.setState({loading: true})
    }


    componentWillMount(){
        this.getNewsUpdate()
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
                        />










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