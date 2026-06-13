console.log("ChatGPT Exporter Loaded");

if (!document.getElementById("cgpt-exporter-interceptor")) {
  const script = document.createElement("script");

  script.id = "cgpt-exporter-interceptor";

  script.src = chrome.runtime.getURL(
    "page-interceptor.js"
  );

  document.documentElement.appendChild(
    script
  );

  script.onload = () => {
    script.remove();
  };
}

window.addEventListener(
  "message",
  async (event) => {
    if (event.source !== window) {
      return;
    }

    if (
      event.data?.source !==
      "chatgpt-exporter"
    ) {
      return;
    }

    if (
      event.data?.type !==
      "CONVERSATION_DATA"
    ) {
      return;
    }

    console.log(
      "Conversation captured:",
      event.data.payload.title
    );

    await chrome.storage.local.set({
      [event.data.payload.conversation_id]:
        event.data.payload
    });

    console.log(
      "Conversation saved:",
      event.data.payload.conversation_id
    );
  }
);