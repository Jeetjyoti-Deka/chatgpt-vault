import { parseConversation } from "../parsers/conversation";

const btn =
  document.getElementById(
    "extractBtn"
  ) as HTMLButtonElement;

btn.addEventListener("click", async () => {
  const [tab] =
    await chrome.tabs.query({
      active: true,
      currentWindow: true
    });

  if (!tab.url) {
    return;
  }

  const conversationId =
    tab.url.split("/").pop();

  if (!conversationId) {
    console.log("conversation id not found");
    return 
  }

  const result =
    await chrome.storage.local.get(
      conversationId
    );

  console.log(
    "raw conversation data: ", result[conversationId]
  );

  const messages =
  parseConversation(result[conversationId]);

  console.log("parsed messages: ", messages);
  console.log("parsed messages length: ", messages.length);
});