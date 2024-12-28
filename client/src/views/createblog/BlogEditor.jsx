import { useCallback } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["clean"],
];

export default function BlogEditor({ onContentChange }) {
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
  }, [onContentChange]);

  return <div className="blog-container" ref={wrapperRef}></div>;
}
