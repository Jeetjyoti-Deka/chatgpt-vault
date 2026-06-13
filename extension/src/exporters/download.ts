export function downloadFile(
  filename: string,
  content: string,
  mimeType: string
) {
  const blob = new Blob(
    [content],
    {
      type: mimeType
    }
  );

  const url =
    URL.createObjectURL(blob);

  chrome.downloads.download({
    url,
    filename,
    saveAs: true
  });
}