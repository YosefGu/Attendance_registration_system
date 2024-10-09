import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export const CustomButton = ({title, onPress, disabled=false}) => {
  return (
    <TouchableOpacity 
        style={[styles.button, disabled && styles.disabledButton]} 
        onPress={onPress} 
        disabled={disabled}
    >
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2196F3',  
        paddingVertical: 10,        
        paddingHorizontal: 20,       
        borderRadius: 5,             
        marginVertical: 10,
    
      },
      buttonText: {
        color: 'white',              
        fontSize: 16,                
        fontWeight: 'bold',          
        textAlign: 'center',         
      },
      disabledButton: {
        backgroundColor: '#A9A9A9',  
        opacity: 0.7,               
      },
})