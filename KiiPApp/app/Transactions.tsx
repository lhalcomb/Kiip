// app/Transactions.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

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

function HomeScreen() {
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
        <TransactionItem title="Paycheck" date="10/22/25 (11:23 AM)" amount="+$481.23" />
        <TransactionItem title="Taco Bell" date="10/22/25 (4:15 PM)" amount="-$15.18" />
      </ScrollView>
    </View>
  );
}

function MetricsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Metrics Screen</Text>
    </View>
  );
}

function SubscriptionsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Subscriptions Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function Transactions() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color}) => {
            let iconName;
            let iconSize = 50;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Subscriptions') {
              iconName = focused ? 'repeat' : 'repeat-outline';
            } else if (route.name === 'Metrics') {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            }

            return <Ionicons name={iconName} size={iconSize} color={color} />;
          },
          tabBarActiveTintColor: '#27C12D',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { 
            position: 'absolute',
            backgroundColor: '#D3D3D3',
            paddingBottom: 20,
           },
        })}
      >
        <Tab.Screen name="Subscriptions" component={SubscriptionsScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Metrics" component={MetricsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
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
