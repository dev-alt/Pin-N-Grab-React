import React, { useState } from 'react';
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextField, Button } from '@mui/material';
import { FaBold, FaItalic, FaLink } from "react-icons/fa";
import Link from "@tiptap/extension-link";

export function TextEditor({ onChange }) {
  const [editorContent, setEditorContent] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: true }), // Configure the Link extension
    ],
    content: editorContent,
  });
  const handleEditorContentChange = (content) => {
    setEditorContent(content);
    onChange(content); // Call the parent component's onChange function
    console.log(content)
  };

  return (
    <div className="editor">
      <div className="menuBar">
        <Button onClick={() => editor.chain().focus().toggleBold().run()}>
          <FaBold />
        </Button>
        <Button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <FaItalic />
        </Button>
        <Button
  onClick={() => {
    const url = window.prompt("Enter the URL:");
    if (url) {
      editor.chain().focus().toggleLink({ href: url }).run();
    }
  }}
>
  <FaLink />
</Button>

      </div>
      <TextField>
        <EditorContent editor={editor} onChange={handleEditorContentChange} />
      </TextField>
    </div>
  );
}