import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';

interface Transactions {
    title: string;
    date: string;
    amount: string;
  }

function TransactionItem({ title, date, amount }: Transactions) {
const isPositive = amount.startsWith("+");
return (
    <View style={styles.transactionItem}>
    <View>
        <Text style={styles.transactionTitle}>{title}</Text>
        <Text style={styles.transactionDate}>{date}</Text>
    </View>
    <View style={styles.transactionContainer}>
        <Text style={[styles.transactionAmount, isPositive ? styles.positive : styles.negative]}>
        {amount}
        </Text>
    </View>
    </View>
);
}

const styles = StyleSheet.create({
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