import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name = "Login" options = {{headerShown: false}}/>
      <Stack.Screen name = "Transactions" options = {{ headerBackVisible: false }}/>
    </Stack>
  );
}
