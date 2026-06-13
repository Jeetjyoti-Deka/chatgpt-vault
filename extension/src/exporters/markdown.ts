import { type Message } from "../shared/types";

export function exportMarkdown(
  title: string,
  messages: Message[]
): string {
  let md = `# ${title}\n\n`;

  for (const message of messages) {
    const role =
      message.role === "user"
        ? "User"
        : "ChatGPT";

    md += `## ${role}\n\n`;
    md += `${message.content}\n\n`;
  }

  return md;
}