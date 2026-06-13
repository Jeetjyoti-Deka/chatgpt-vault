import { parseConversation } from "../parsers/conversation";

// import { exportMarkdown } from "../exporters/markdown";
// import { downloadFile } from "../exporters/download";
import type { RawConversation } from "../shared/types";


import {
  renderConversationHtml
} from "../renderers/html";

import {
  previewHtml
} from "../exporters/preview";

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

  const result: RawConversation =
    await chrome.storage.local.get(
      conversationId
    );

  console.log(
    "raw conversation data: ", result[conversationId]
  );

  const conversation = result[conversationId];

  if (!conversation) {
    alert(
      "Conversation not found."
    );

    return;
  }

  const messages =
  parseConversation(conversation);

  console.log("parsed messages: ", messages);
  console.log("parsed messages length: ", messages.length);

  // const markdown =
  //     exportMarkdown(
  //       conversation.title,
  //       messages
  //     );

  // downloadFile(
  //   `${conversation.title}.md`,
  //   markdown,
  //   "text/markdown"
  // );

  const html =
  renderConversationHtml(
    conversation.title,
    messages
  );

  previewHtml(html);
});