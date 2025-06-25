import { createApp } from "vue";
import ChatApp from "../components/ChatApp.vue";
import '../styles/application.css'

document.addEventListener("DOMContentLoaded", () => {
  const app = createApp(ChatApp);
  app.mount("#chat-root");
});
