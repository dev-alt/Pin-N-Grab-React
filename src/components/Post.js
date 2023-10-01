import React from 'react';
import { Button, Container, Grid, Input, Card, CardHeader, CardContent, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Bold from "@tiptap/extension-bold"; // Import Bold
import Italic from "@tiptap/extension-italic"; // Import Italic
import TextStyle from "@tiptap/extension-text-style"; // Import TextStyle
import {
  FaBold,
  FaHeading,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaRedo,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
} from "react-icons/fa";




const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const handleButtonClick = (markType, value) => {
    editor.chain().focus().toggleMark(markType, value).run();
  };

  const isButtonActive = (markType, value) => {
    return editor.isActive(markType, value);
  };

  return (
    <div className="menuBar">
      <div>
        <Button
          onClick={() => handleButtonClick(Bold, {})}
          variant={isButtonActive(Bold) ? 'contained' : 'outlined'}
          color="primary"
        >
          <FaBold />
        </Button>
        <Button
          onClick={() => handleButtonClick(Italic, {})}
          variant={isButtonActive(Italic) ? 'contained' : 'outlined'}
          color="primary"
        >
          <FaItalic />
        </Button>
        <Button
          onClick={() => handleButtonClick(Underline, {})}
          variant={isButtonActive(Underline) ? 'contained' : 'outlined'}
          color="primary"
        >
          <FaUnderline />
        </Button>
        <Button
          onClick={() => handleButtonClick(TextStyle, { color: '#958DF1' })}
          variant={isButtonActive(TextStyle, { color: '#958DF1' }) ? 'contained' : 'outlined'}
          color="primary"
        >
          <FaStrikethrough />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          variant={isButtonActive("heading", { level: 2 }) ? 'contained' : 'outlined'}
          color="primary"
        >
          <FaHeading />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          variant={isButtonActive("heading", { level: 3 }) ? 'contained' : 'outlined'}
          color="primary"
        >
          <FaHeading className="heading3" />
        </Button>
        <Button
          onClick={() => handleButtonClick("bulletList")}
          variant={isButtonActive("bulletList") ? 'contained' : 'outlined'}
          color="primary"
        >
          <FaListUl />
        </Button>
        <Button
          onClick={() => handleButtonClick("orderedList")}
          variant={isButtonActive("orderedList") ? 'contained' : 'outlined'}
          color="primary"
        >
          <FaListOl />
        </Button>
        <Button
          onClick={() => handleButtonClick("blockquote")}
          variant={isButtonActive("blockquote") ? 'contained' : 'outlined'}
          color="primary"
        >
          <FaQuoteLeft />
        </Button>
      </div>
      <div>
        <Button onClick={() => editor.chain().focus().undo().run()}>
          <FaUndo />
        </Button>
        <Button onClick={() => editor.chain().focus().redo().run()}>
          <FaRedo />
        </Button>
      </div>
    </div>
  );
};

export const Post = ({ setDescription }) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Bold, Italic, TextStyle], 
    content: ``,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setDescription(html);
    },
  });

  return (
    <Container style={{ marginTop: '16px' }}>
      <Grid container spacing={3}>
        <Grid item xl={8} md={12}>
          <Card>
            <CardHeader title="Add New Post" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Post Title"
                    defaultValue="Typing....."
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl style={{ minWidth: '100%' }}>
                    <InputLabel>Categories</InputLabel>
                    <Select
                      name="country"
                      defaultValue="br"
                    >
                      <MenuItem value="br">Technology</MenuItem>
                      <MenuItem value="cz">Travel</MenuItem>
                      <MenuItem value="de">Food</MenuItem>
                      <MenuItem value="pl">Fashion</MenuItem>
                    </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>File Upload</InputLabel>
                  <Input type="file" id="demo" name="files" accept=".jpg, .png, image/jpeg, image/png" multiple />
                </Grid>
                <Grid item xs={12}>
                  <EditorContent editor={editor} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}