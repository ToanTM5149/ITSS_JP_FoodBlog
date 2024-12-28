import { useCallback } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const TOOLBAR_OPTIONS = [
<<<<<<< HEAD
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  ["blockquote", "code-block"],
  ["clean"],
];

export default function TextEditor() {
=======
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["clean"],
];

export default function BlogEditor({ onContentChange }) {
>>>>>>> front-end-TANH
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const quill = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });

    quill.on("text-change", () => {
      const content = quill.root.innerHTML; // Lấy nội dung HTML
      onContentChange(content); // Gửi nội dung về component cha
    });
<<<<<<< HEAD
  }, []);
=======
  }, [onContentChange]);
>>>>>>> front-end-TANH

  return <div className="blog-editor" ref={wrapperRef}></div>;
}
