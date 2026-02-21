import { StyleSheet, Text, View } from 'react-native';
export default function HomeScreen() {
  return(
    <View style = {styles.container}>
      <Text style={styles.title}>My first expo app</Text>
      <Text style={styles.subtitle}>Helllooo guyyzzz</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
  },
  title:{
    fontSize:28,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle:{
    fontSize: 16,
    color: '#cbd5f5',
  },
});