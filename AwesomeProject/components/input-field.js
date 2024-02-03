import {View, Text, TextInput, TouchableOpacity} from 'react-native';

export default function InputField({label, icon, inputType, keyboardType,onChangeFunc, value,fieldButtonLabel, fieldButtonFunction}){
    return(
        <View style={{flexDirection:'row', borderBottomColor:'#CCC', borderBottomWidth:1, paddingBottom:8, marginBottom:25}}>
        {icon}
        {inputType=='password' ?(
            <TextInput placeholder={label} keyboardType={keyboardType} style={{flex:1, paddingVertical:0}} value={value}  onChangeText={onChangeFunc} secureTextEntry={true} />
        ):(
            <TextInput placeholder={label} keyboardType={keyboardType} style={{flex:1, paddingVertical:0}} onChangeText={onChangeFunc}/>
        )}
        <TouchableOpacity onPress={fieldButtonFunction}>
            <Text style={{color:'#7455f6', fontWeight:700}}> {fieldButtonLabel}</Text>
        </TouchableOpacity>
    </View> 
    )
}