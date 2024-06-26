import React, { useState } from "react";
import 'quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'

const TextEditor = (onChange) => {
  const [des, setDes] = useState("");

  // Custom handler for image insertion
  const insertImage = (quill) => {
    const url = prompt("Enter the image URL");
    if (url) {
      const range = quill.getSelection();
      quill.insertEmbed(range.index, 'image', url);
    }
  };

  var modules = {
    toolbar: {
      container:
        [
          // [{ size: [false,] }],
          ["image"],
        ],
      handlers: {
        image: function () {
          insertImage(this.quill);
        }
      }
    }
  };

  var formats = [
    "image",
  ];

  const handleProcedureContentChange = (content, delta, source, editor) => {

    //content = `<p>asd azcx</p><p>asd</p><p>asd</p><p><img src="https://static.vecteezy.com/system/resources/thumbnails/004/899/680/small/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg">adxzczxc saxczvc bxfc</p><p>hfg</p><p>hm<img src="https://static.vecteezy.com/system/resources/thumbnails/004/899/680/small/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg">asdc f</p><p>vh</p>`;
    const arr = parseDescription(content)
    //console.log('content :>> ', content);
    console.log(arr);
    console.log('text :>> ', arr.join(" ").replace(/>/g, ''));
  };

  const parseDescription = (description) => {
    // Regex to match image URLs
    const urlRegex = /(https?:\/\/[^ ]*\.(?:gif|png|jpg|jpeg))/g;
    const pRegex = /((>)?[^]*(<))/g;
    const parts = description.split(urlRegex);
    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return part;
      }
      const els = part.split(pRegex)[1];
      const el = els.split(pRegex)[1];
      const preResult = el.split(pRegex)[1];
      const result = preResult.substring(2, preResult.length - 1);
      return result.replace(/<\/?p>/g, '');
    });
  };

  return (
    <div >
      <h1 style={{ textAlign: "center" }}>Mô tả</h1>
      <div style={{ display: "grid", justifyContent: "center" }}>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="write your content ...."
          onChange={handleProcedureContentChange}
          style={{ height: "400px", width: "500px" }}
        >
        </ReactQuill>
      </div>
    </div>
  );

}

export default TextEditor;