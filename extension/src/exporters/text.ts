import { type Message } from "../shared/types";

export function exportText(
  title: string,
  messages: Message[]
): string {
  let txt = `${title}\n\n`;

  for (const message of messages) {
    const role =
      message.role === "user"
        ? "User"
        : "ChatGPT";

    txt += `${role}:\n`;
    txt += `${message.content}\n\n`;
  }

  return txt;
}