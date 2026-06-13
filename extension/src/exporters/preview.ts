export function previewHtml(
  html: string
) {
  const blob = new Blob(
    [html],
    {
      type: "text/html"
    }
  );

  const url =
    URL.createObjectURL(blob);

  window.open(url, "_blank");
}