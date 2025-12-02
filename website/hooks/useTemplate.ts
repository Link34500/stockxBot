import { useState } from "react";

export function useTemplate() {
  const [_, setFile] = useState<null | File>(null);
  const [fileContent, setFileContent] = useState("");
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
    if (selectedFile) {
      setFileContent(await selectedFile.text());
    }
  };

  return { fileContent, setFileContent, handleFileChange };
}
