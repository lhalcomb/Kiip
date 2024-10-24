import {View, Text, StyleSheet} from "react-native";

function Transactions()
{
    return (
        <View style={styles.container}> 
            <Text style={styles.text} > This is the transactions page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
    },
    text: {
      fontSize: 24,
      fontWeight: "bold",
    },
  });

export default Transactions;