/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef } from "react";
import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import Paragraph from "@yoopta/paragraph";
import Blockquote from "@yoopta/blockquote";
import Divider from "@yoopta/divider";
import Code from "@yoopta/code";
import Image from "@yoopta/image";
import Link from "@yoopta/link";
import Callout from "@yoopta/callout";
import { HeadingOne, HeadingThree, HeadingTwo } from "@yoopta/headings";
import { NumberedList, BulletedList } from "@yoopta/lists";
import Toolbar, { DefaultToolbarRender } from "@yoopta/toolbar";
import ActionMenu, { DefaultActionMenuRender } from "@yoopta/action-menu-list";
import LinkTool, { DefaultLinkToolRender } from "@yoopta/link-tool";
import {
  Bold,
  Italic,
  CodeMark,
  Underline,
  Strike,
  Highlight,
} from "@yoopta/marks";
import { calcContentChars } from "../../utils/calcContentChars";

// Editor marks configuration
const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];
// Editor plugins configuration
const plugins = [
  Paragraph,
  Blockquote,
  Divider,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  NumberedList,
  BulletedList,
  Code,
  Image.extend({
    options: {
      onUpload(file) {
        return new Promise((resolve, reject) => {
          if (file.size > 1000000) {
            reject(new Error("File size must be less than 1MB"));
            alert("File size must be less than 1MB");
            return;
          }
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              src: reader.result,
              alt: file.name,
              sizes: {
                width: file.width,
                height: file.height,
              },
            });
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsDataURL(file);
        });
      },
    },
  }),
  Callout,
  Link,
];

// Editor tools configuration
const TOOLS = {
  Toolbar: {
    tool: Toolbar,
    render: DefaultToolbarRender,
  },
  ActionMenu: {
    tool: ActionMenu,
    render: DefaultActionMenuRender,
  },
  LinkTool: {
    render: DefaultLinkToolRender,
    tool: LinkTool,
  },
};

export default function YooptaTextEditor({
  defaultValue,
  onChange,
  readOnly = false,
  handleCharCount,
}) {
  const editor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef(null);

  /**
   * Editor component style
   */
  const editorStyle = {
    height: "auto",
    width: "100%",
    paddingBottom: 0,
  };

  /**
   * Handles the editor change
   */
  const handleChange = (value) => {
    onChange(value);
  };

  useEffect(() => {
    editor.on("change", handleChange);
    /**
     * Handle the character count
     * @param {string} content - result of calcContentChars function which is the content length
     * @returns {void}
     * Sets the character count state to the length of the content in Form.jsx
     */
    if (handleCharCount) {
      const charLength = calcContentChars(defaultValue).length;
      handleCharCount(charLength);
    }

    return () => {
      editor.off("change", handleChange);
    };
  }, [editor, defaultValue]);

  return (
    <div className="pb-[40px] flex justify-center" ref={selectionRef}>
      <YooptaEditor
        style={editorStyle}
        editor={editor}
        plugins={plugins}
        tools={TOOLS}
        marks={MARKS}
        autofocus={false}
        value={defaultValue}
        readOnly={readOnly}
        selectionBoxRoot={selectionRef}
      />
    </div>
  );
}
