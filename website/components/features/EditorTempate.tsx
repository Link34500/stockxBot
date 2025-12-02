"use client";
import { type SetStateAction } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface EditorTemplateProps {
  fileContent: string;
  setFileContent: (value: SetStateAction<string>) => void;
}

export default function EditorTempate({
  fileContent,
  setFileContent,
}: EditorTemplateProps) {
  const handleEditorChange = (newContent: string, editor: any) => {
    setFileContent(newContent);
  };

  return (
    <Editor
      apiKey="qpzjl2oakvb983zuljpvvwxiql5zieldjrhozgqutej3bcza"
      value={fileContent}
      onEditorChange={handleEditorChange}
      init={{
        height: 500,
        plugins: "lists link image code fullscreen",
        toolbar: "undo redo | bold | fullscreen | removeformat",
        visualblocks_default_state: false,
      }}
    />
  );
}
