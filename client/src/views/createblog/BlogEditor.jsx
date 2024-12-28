import { useCallback } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./BlogEditor.css"

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
];

export default function BlogEditor({ onContentChange }) {
    const wrapperRef = useCallback((wrapper) => {
        if (!wrapper) return;
        wrapper.innerHTML = "";
        const editor = document.createElement("div");
        wrapper.append(editor);
        const quill = new Quill(editor, {
            theme: "snow",
            modules: { toolbar: TOOLBAR_OPTIONS },
        });

        quill.on("text-change", () => {
            onContentChange(quill.root.innerHTML);
        });
    }, [onContentChange]);

    return <div className="editor" ref={wrapperRef}></div>;
}
