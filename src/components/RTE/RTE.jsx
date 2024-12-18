import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ label, name, control, defaultValue = "" }) {
  return (
    <div className="container">
      {label && <label className="form-label">{label}</label>}
      <Controller
        name={name || "description"}
        control={control}
        render={({ field: { onChange } }) => {
          return <Editor
            apiKey="8crluucbfpqgwtvhv7gl19tmkz594dcmoghw9qklgxvs4msb"
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange} // upar wala event onChange ka same name rakna ha
          />;
        }}
      />
    </div>
  );
}
