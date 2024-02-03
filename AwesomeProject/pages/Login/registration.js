import {SafeAreaView, View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputField from '../../components/input-field';
export default  function RegistrationPage({ navigation }){
    const [name, setName]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [confirmPassword, setConfirmPassword]=useState('');
    return (
                <SafeAreaView style={{flex:1, justifyContent:'center'}}>
            <View style={{paddingHorizontal:25}}>
            <Text 
                style={{
                    fontSize:28,
                    fontWeight: '500', 
                    color:"#333", 
                    marginBottom:30
                }}>
                Register
            </Text>
            <InputField label={'Email address'} icon={<MaterialIcons name='alternate-email' size={20} color='#666'style={{marginRight:5}}/>} keyboardType={'email-address'} onChangeFunc={(text)=>setEmail(text)} value={email}/>
            <InputField label ={'Full name'} icon={<Ionicons name='person-outline' size={20} color='#666' style={{marginRight:5}}/>} value={name} onChangeFunc={(text)=>setName(text)}/>

            <InputField label={'Password'} icon={<Ionicons name='lock-closed-outline' size={20} color='#666'style={{marginRight:5}}/>} inputType={'password'} value={password} onChangeFunc={(text)=>setPassword(text)}/>
            <InputField label={'Confirm password'} icon={<Ionicons name='lock-closed-outline' size={20} color='#666'style={{marginRight:5}}/>} inputType={'password'} value={confirmPassword} onChangeFunc={(text)=>setConfirmPassword(text)}/>


            <TouchableOpacity style={{backgroundColor:'#7455f6', padding:20, borderRadius:10, marginBottom:30}} /*onPress={onRegisterPress}*/>
                <Text style={{textAlign:'center', fontWeight:700, color:'#FFF'}}>Create account</Text>
            </TouchableOpacity>



            </View>

        </SafeAreaView>
    )
}