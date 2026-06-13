export function parseConversation(
  conversation: any
) {
  const mapping = conversation.mapping;
  const messages = [];

  let current =
    mapping["client-created-root"];

  while (
    current &&
    current.children.length > 0
  ) {
    const nextId =
      current.children[0];

    current = mapping[nextId];

    const message =
      current?.message;

    if (!message) {
      continue;
    }

    const role =
      message.author?.role;

    if (
      role !== "user" &&
      role !== "assistant"
    ) {
      continue;
    }

    const content =
      message.content?.parts?.join(
        "\n"
      ) ?? "";
    
    if (!content || content === "") continue

    messages.push({
      id: message.id,
      role,
      content
    });
  }

  return messages;
}