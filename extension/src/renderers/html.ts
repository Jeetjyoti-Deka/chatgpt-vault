import { marked } from "marked";
import { type Message } from "../shared/types";
import { cleanContent } from "../parsers/conversation";

export function renderConversationHtml(
  title: string,
  messages: Message[]
) {
  const content = messages
    .map((message) => {
      const roleClass =
        message.role === "user"
          ? "user-message"
          : "assistant-message";

      const roleLabel =
        message.role === "user"
          ? "You"
          : "ChatGPT";

      const htmlContent = marked.parse(
        cleanContent(
            message.content
        )
      );

      return `
        <div class="${roleClass}">
          <div class="role">
            ${roleLabel}
          </div>

          <div class="content markdown-body">
            ${htmlContent}
          </div>
        </div>
      `;
    })
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>

<meta charset="utf-8" />

<title>${title}</title>

<style>

* {
  box-sizing: border-box;
}

body {
  font-family:
    Inter,
    system-ui,
    sans-serif;

  background: #212121;
  color: #ececec;

  margin: 0;
  padding: 40px;

  line-height: 1.7;
}

.container {
  max-width: 900px;
  margin: auto;
}

.title {
  font-size: 32px;
  font-weight: 700;

  margin-bottom: 40px;
}

.user-message {
  background: #303030;

  border-radius: 12px;

  padding: 20px;

  margin-bottom: 20px;
}

.assistant-message {
  background: #212121;
  padding: 20px;
  margin-bottom: 20px;
}

.role {
  font-size: 12px;

  font-weight: 700;

  text-transform: uppercase;

  color: #b4b4b4;

  margin-bottom: 12px;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4 {
  margin-top: 24px;
  margin-bottom: 12px;
}

.markdown-body p {
  margin: 12px 0;
}

.markdown-body ul,
.markdown-body ol {
  padding-left: 24px;
}

.markdown-body pre {
  background: #171717;

  color: #ececec;

  padding: 16px;

  border: 1px solid #404040;
  border-radius: 8px;

  overflow-x: auto;
}

.markdown-body code {
  font-family:
    Consolas,
    Monaco,
    monospace;
}

.markdown-body table {
  border-collapse: collapse;

  width: 100%;
}

.markdown-body table,
.markdown-body th,
.markdown-body td {
  border: 1px solid #404040;
}

.markdown-body th,
.markdown-body td {
  padding: 8px;
}

.markdown-body blockquote {
  border-left: 4px solid #666;
  color: #b4b4b4;

  margin: 16px 0;

  padding-left: 16px;
}

.markdown-body hr {
  display: none;
}

</style>

</head>

<body>

<div class="container">

<div class="title">
${title}
</div>

${content}

</div>

</body>
</html>
`;
}