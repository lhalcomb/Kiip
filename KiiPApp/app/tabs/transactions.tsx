// app/Transactions.tsx
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { TransactionItem } from './transactionItem';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import {getUrl} from '../index';
import {ITransactions} from "../../api/ITransactions";



export const formatDate = (date:  Date ) => 
  {

   
    const options: Intl.DateTimeFormatOptions = { /*weekday: 'long', */  year: 'numeric', month: 'long', day: 'numeric' };

    return date.toLocaleDateString(undefined, options);

  }

function Transactions() {
  const [transactions, setTransactions] = useState<ITransactions[]>([]);

  const getTransactions = async () => {
    const token = await SecureStore.getItemAsync("token");
    const address = await getUrl();
    const res = await fetch(`${address}/transactions`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "token": token
        })
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setTransactions(data);
    } else {
        console.log(res.status);
    }   

  }

  useEffect( () => {
    getTransactions();
  },[]);

  return (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Home</Text>
        <Text style={styles.menuIcon}>•••</Text>
      </View>

      {/* Balance Section */}
      <View style={styles.balanceSection}>
        <View style={styles.balanceTextContainer}>
          <Text style={styles.balanceLabel}>Balance:</Text>
          <Text style={styles.balanceAmount}>$2,120.09</Text>
        </View>
        <View style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </View>
      </View>

      {/* Transactions List */}
      <ScrollView contentContainerStyle={styles.transactions}>
        <Pressable onPress={() => {console.log("Clicked!")}}>
          <TransactionItem title="Paycheck" date= "10/22/25 (11:23 AM)" amount = {481.23} />
        </Pressable>
        <Pressable onPress={() => {console.log("Clicked!")}}>
          <TransactionItem title="Taco Bell" date= {transactions.date}amount = {-15.18}  />
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end", 
    paddingHorizontal: 16,
    paddingTop: 80, 
    paddingBottom: 10, 
    backgroundColor: "#D3D3D3",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  menuIcon: {
    fontSize: 24,
    color: "white",
    alignSelf: "center", 
  },
  balanceSection: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
  },
  balanceTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginBottom: 15,
  },
  balanceLabel: {
    fontSize: 32,
    color: "#888",
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#27C12D",
  },
  addButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#27C12D",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 70,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 70,
  },
  transactions: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  transactionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#858585",
  },
  transactionDate: {
    fontSize: 14,
    color: "#858585",
  },
  transactionContainer: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  positive: {
    color: "#27C12D",
  },
  negative: {
    color: "red",
  },
});

export default Transactions;
