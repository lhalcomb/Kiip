// app/Transactions.tsx
import { View, Text, StyleSheet, ScrollView, Pressable, Modal, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { TransactionItem } from '../../components/transactionItem';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import {useRouter} from "expo-router";
import {getUrl} from '../index';
import {ITransactions} from "../../api/ITransactions";
import calculateBalance from "@/components/balanceCalculator";


function Transactions() {
  const [transactions, setTransactions] = useState<ITransactions[]>([]);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isViewModalVisible, setViewModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<ITransactions | null>(null);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");


  const getTransactions = async () => {
    const token = await SecureStore.getItemAsync("token");
    const address = await getUrl();
    const res = await fetch(`${address}/transactions`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setTransactions(data);
    } else {
      console.error(res.status);
    }
    
  };

  const toggleAddModal = () => {
    if (isAddModalVisible) {
      setTitle("");
      setAmount("");
      setDescription("");
    }
    setAddModalVisible(!isAddModalVisible);
  };

  const openViewModal = (transaction: ITransactions) => {
    setSelectedTransaction(transaction);
    setViewModalVisible(true);
  };

  const closeViewModal = () => {
    setViewModalVisible(false);
    setSelectedTransaction(null);
  };

  const handleAddTransaction = async () => {
    const token = await SecureStore.getItemAsync("token");
    const address = await getUrl();
    const res = await fetch(`${address}/transaction`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        memo: description, 
        title,
        amount: Math.abs(Number(amount)), 
        isPayment: Number(amount) < 0,
        isRecurring: false
      }),
      
    });

    if (res.ok) {
      toggleAddModal();
      await getTransactions();
    } else {
      console.error("Error adding transaction");
    }
  }

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Transactions</Text>
        <Text style={styles.menuIcon}>•••</Text>
      </View>

      {/* Balance Section */}
      <View style={styles.balanceSection}>
        <View style={styles.balanceTextContainer}>
          <Text style={styles.balanceLabel}>Balance:</Text>
          <Text style={styles.balanceAmount}>$ {calculateBalance(transactions)}</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={toggleAddModal}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      {/* Transactions List */}
      <ScrollView contentContainerStyle={styles.transactions}>
        {transactions.map((transaction, index) => (
          <Pressable key={index} onPress={() => openViewModal(transaction)}>
            <TransactionItem
              title={transaction.title}
              date={transaction.date}
              amount={transaction.amount}
              description={transaction.description}
              isPayment={transaction.isPayment}
            />
          </Pressable>
        ))}
      </ScrollView>

      {/* Modal for Adding Transactions */}
      <Modal
        visible={isAddModalVisible}
        transparent={true}
        onRequestClose={toggleAddModal}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              {/* Cancel Button */}
              <TouchableOpacity style={styles.cancelButton} onPress={toggleAddModal}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TextInput
                style={[styles.input, styles.titleBox]}
                placeholder="Transaction Title"
                placeholderTextColor="#D9D9D9"
                value={title}
                onChangeText={setTitle}
              />
              <TextInput
                style={[styles.input, styles.amountBox]}
                placeholder="(+,-) $0.00"
                placeholderTextColor="#D9D9D9"
                value={amount}
                onChangeText={setAmount}
              />
              <TextInput
                style={[styles.input, styles.descriptionBox]}
                placeholder="Description"
                placeholderTextColor="#D9D9D9"
                value={description}
                onChangeText={setDescription}
                multiline={true}
                textAlignVertical="top"
                numberOfLines={4}
              />

              {/* Submit Button */}
              <TouchableOpacity style={styles.submitButton} onPress={handleAddTransaction}>
                <Text style={styles.submitButtonText}>Add Transaction</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal for Viewing Transactions */}
      <Modal
        visible={isViewModalVisible}
        transparent={true}
        onRequestClose={closeViewModal}
      >
      <TouchableWithoutFeedback>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Close Button */}
            <TouchableOpacity style={styles.cancelButton} onPress={closeViewModal}>
              <Text style={styles.cancelButtonText}>Close</Text>
            </TouchableOpacity>

            {/* Transaction Details */}
            {selectedTransaction && (
              <View>
                <Text style={[styles.input, styles.titleBox2]}>{selectedTransaction.title}</Text>
                <Text style={[styles.input, styles.amountBox2]}>${selectedTransaction.amount}</Text>
                <Text style={[styles.input, styles.descriptionBox2]}>{selectedTransaction.description}</Text>
              </View>
            )}

            {/* Delete Button */}
            <TouchableOpacity style={styles.deleteButton} onPress={closeViewModal}>
              <Text style={styles.submitButtonText}>Delete Transaction</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
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
    color: "black",
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
  },
  modalContainer: {
    width: '90%', 
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 15, 
    alignItems: "center", 
  },
  cancelButton: {
    position: "absolute",
    top: -45, 
    right: 15,
    backgroundColor: "black", 
    borderRadius: 20,
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    zIndex: 10,
  },
  cancelButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold", 
    textTransform: "uppercase",
  },
  input: {
    width: "100%", 
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "white", 
  },
  submitButton: {
    width: "90%", 
    backgroundColor: "#27C12D", 
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
    top: 70,
  },
  deleteButton: {
    width: "90%", 
    backgroundColor: '#FF0000', 
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
    top: 70,
  },
  submitButtonText: {
    color: "white", 
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase", 
  },
  titleBox: { 
    marginBottom: 10 
  },
  amountBox: {
    marginBottom: 10,
    width: 125,
    alignSelf: "flex-start", 
  },  
  descriptionBox: {
    height: 100,
    textAlignVertical: "top",
    marginBottom: -60, 
  },
  titleBox2: { 
    marginBottom: 10,
    marginLeft: -5, 
    width: 300,
  },
  amountBox2: {
    marginBottom: 10,
    width: 125,
    marginLeft: -5, 
  },  
  descriptionBox2: {
    height: 100,
    width: 300,  
    textAlignVertical: "top",
    marginBottom: -60,
    marginLeft: -5, 
  },
});

export default Transactions;
