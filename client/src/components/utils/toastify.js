import { toast } from "react-toastify";

function notify(type, message) {
  return toast[type](message);
}
export default notify;
