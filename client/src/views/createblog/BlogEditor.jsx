import { useCallback } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./BlogEditor.css";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  ["blockquote", "code-block"],
  ["clean"],
];

export default function TextEditor() {
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const quill = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });

    // Lắng nghe sự thay đổi nội dung và cập nhật chiều cao
    quill.on("text-change", () => {
      const editorElement = wrapper.querySelector(".ql-editor");
      const contentHeight = editorElement.scrollHeight;
      editorElement.style.height = contentHeight < 100 ? "100px" : Math.min(contentHeight, 1200) + "px";
    });
  }, []);

  return <div className="blog-container" ref={wrapperRef}></div>;
}
