import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#34C759',
        backgroundColor: '#2C2C2E',
        borderRadius: 10,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
      }}
      text2Style={{
        color: '#ccc',
        fontSize: 14,
      }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: '#FF3B30',
        backgroundColor: '#2C2C2E',
        borderRadius: 10,
      }}
      text1Style={{
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
      }}
      text2Style={{
        color: '#ccc',
        fontSize: 14,
      }}
    />
  ),

  info: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#007AFF',
        backgroundColor: '#2C2C2E',
        borderRadius: 10,
      }}
      text1Style={{
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
      }}
      text2Style={{
        color: '#ccc',
        fontSize: 14,
      }}
    />
  ),
};