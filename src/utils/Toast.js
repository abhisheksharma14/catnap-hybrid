import {ToastAndroid} from "react-native";

export default function ShowToast (msg, duration="SHORT") {
  ToastAndroid.show(msg, ToastAndroid[duration]);
};
