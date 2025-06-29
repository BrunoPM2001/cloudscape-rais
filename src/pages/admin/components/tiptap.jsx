import { useCallback } from "react";
import classNames from "classnames";
import { useEditor, EditorContent } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import HardBreak from "@tiptap/extension-hard-break";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import History from "@tiptap/extension-history";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import CharacterCount from "@tiptap/extension-character-count";
import WordCount from "../../../hooks/WordCount";
import { Box, Icon } from "@cloudscape-design/components";
import {
  BoldIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  UnderlineIcon,
} from "lucide-react";
import "./app.css";

export default ({ value, name, handleChange, limitWords }) => {
  const editor = useEditor(
    {
      extensions: [
        Document,
        History.configure({
          newGroupDelay: 1,
        }),
        Paragraph,
        Text,
        TextStyle,
        Bold,
        Underline,
        Italic,
        Blockquote,
        BulletList,
        OrderedList,
        ListItem,
        HardBreak,
        CharacterCount.configure({}),
        WordCount.configure(
          limitWords && {
            limit: limitWords,
          }
        ),
        Color,
      ],
      content: value,
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        handleChange(name, html);
      },
    },
    []
  );

  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleUnderline = useCallback(() => {
    editor.chain().focus().toggleUnderline().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run();
  }, [editor]);

  const toggleBlockquote = useCallback(() => {
    editor.chain().focus().toggleBlockquote().run();
  }, [editor]);

  const toggleBulletList = useCallback(() => {
    editor.chain().focus().toggleBulletList().run();
  }, [editor]);

  const toggleOrderedList = useCallback(() => {
    editor.chain().focus().toggleOrderedList().run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="editor">
      <div className="menu">
        <button
          className="menu-button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Icon name="undo" />
        </button>
        <button
          className="menu-button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Icon name="redo" />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("bold"),
          })}
          onClick={toggleBold}
        >
          <BoldIcon size={16} />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("underline"),
          })}
          onClick={toggleUnderline}
        >
          <UnderlineIcon size={16} />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("italic"),
          })}
          onClick={toggleItalic}
        >
          <ItalicIcon size={16} />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("bulletList"),
          })}
          onClick={toggleBulletList}
        >
          <ListIcon size={16} />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("orderedList"),
          })}
          onClick={toggleOrderedList}
        >
          <ListOrderedIcon size={16} />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("blockquote"),
          })}
          onClick={toggleBlockquote}
        >
          <QuoteIcon size={16} />
        </button>
        <input
          type="color"
          onInput={(event) =>
            editor.chain().focus().setColor(event.target.value).run()
          }
          value={editor.getAttributes("textStyle").color}
          data-testid="setColor"
        />
      </div>
      <EditorContent editor={editor} />
      {limitWords && (
        <Box
          float="right"
          color="text-status-inactive"
          fontSize="body-s"
          margin={{ top: "xxs" }}
        >
          Máximo {limitWords} palabras ({editor.storage.characterCount.words()}
          {""}/{limitWords})
        </Box>
      )}
    </div>
  );
};
