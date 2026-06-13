(() => {
  const originalFetch = window.fetch;

  window.fetch = async (...args) => {
    const response = await originalFetch(...args);

    try {
      const url =
        args[0] instanceof Request
          ? args[0].url
          : String(args[0]);

      if (
        !url.includes("/backend-api/conversation/")
      ) {
        return response;
      }

      const clone = response.clone();

      clone.json().then((data) => {
        const currentConversationId =
          window.location.pathname
            .split("/")
            .pop();

        if (
          data?.conversation_id !==
          currentConversationId
        ) {
          return;
        }

        window.postMessage({
          source: "chatgpt-exporter",
          type: "CONVERSATION_DATA",
          payload: data
        });
      });
    } catch (err) {
      console.error(
        "Interceptor error",
        err
      );
    }

    return response;
  };
})();