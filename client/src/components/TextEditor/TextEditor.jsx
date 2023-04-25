import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import './TextEditor.css'

function MyEditor({ manga, setManga}) {

  function handleChange(value) {
    setManga((prev) => ({ ...prev, summary: value }));
  }

  const toolbarConfig = {
    toolbar: {
      container: [[{ header: 2 }], ["bold", "italic", "underline"]],
    },
  };

  return <ReactQuill value={manga.summary} onChange={handleChange} modules={toolbarConfig}/>;
}

export default MyEditor;