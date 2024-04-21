export default async function readFile(file: Blob) {
  return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.onabort = () => {
      reject(new Error('File reading was aborted'));
    };
  });
}
