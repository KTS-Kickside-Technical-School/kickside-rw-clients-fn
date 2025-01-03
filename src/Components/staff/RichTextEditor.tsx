import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({
    value,
    onChange,
    placeholder = "Enter text here",
}: any) => {
    const quillRef = React.useRef(null); 

    const modules = {
        toolbar: {
            container: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                ["bold", "italic", "underline"],
                ["link", "image"],
                [{ color: [] }, { background: [] }],
            ],
        },
    };

    return (
        <div className={`relative`}>
            <ReactQuill
                ref={quillRef}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                theme="snow"
                className="h-full rounded-lg border border-gray-300"
                modules={modules}
                style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            />
        </div>
    );
};

export default RichTextEditor;
