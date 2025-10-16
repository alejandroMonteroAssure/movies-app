import { BaseToast, ErrorToast } from "react-native-toast-message";
import { colors } from "../components/constants/colors";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: colors.success,
        backgroundColor: colors.toastBg,
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
        borderLeftColor: colors.error,
        backgroundColor: colors.toastBg,
        borderRadius: 10,
      }}
      text1Style={{
        color: colors.white,
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
        backgroundColor: colors.toastBg,
        borderRadius: 10,
      }}
      text1Style={{
        color: colors.white,
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