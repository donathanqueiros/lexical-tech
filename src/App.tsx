import { LexicalComposer } from "@lexical/react/LexicalComposer";
import {
  $getRoot,
  $getSelection,
  $createParagraphNode,
  $createTextNode,
} from "lexical";
import { RootNode } from "lexical";

import { SharedAutocompleteContext } from "./context/SharedAutocompleteContext";
import { SharedHistoryContext } from "./context/SharedHistoryContext";

import PlaygroundNodes from "./nodes/PlaygroundNodes";
import { TableContext } from "./plugins/TablePlugin";
import PlaygroundEditorTheme from "./themes/PlaygroundEditorTheme";
import "./App.css";
import EditorComponent from "./EditorComponent";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import type { EditorState, LexicalEditor } from "lexical";
import { useRef, useEffect } from "react";
import { SettingsContext } from "./context/SettingsContext";

export interface EditorProps {
  onChange?: (value: string) => void;
  value?: string;
  readOnly?: boolean;
}

function Editor({ onChange, value, readOnly }: EditorProps): JSX.Element {
  const initialConfig = {
    namespace: "tech-quiz-editor",
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      console.error(error);
      // throw error;
    },
    theme: PlaygroundEditorTheme,
    editorState: value || undefined,
  };

  const editorRef = useRef<LexicalEditor>();

  useEffect(() => {
    const editor = editorRef.current;
    if (value && editor) {
      const editorState = editor.parseEditorState(value);
      editor.setEditorState(editorState);
    }
  }, [value, editorRef.current]);

  useEffect(() => {
    console.log("readOnly");
    const editor = editorRef.current;
    if (readOnly && editor) {
      editor.setEditable(!readOnly);
    }
  }, [readOnly, editorRef.current]);

  function onChangeIntern(editorState: EditorState, editor: LexicalEditor) {
    editorRef.current = editor;
    onChange?.(JSON.stringify(editorState));
  }
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <TableContext>
          <SettingsContext>
            <SharedAutocompleteContext>
              <div className="editor-shell">
                <EditorComponent />
                <OnChangePlugin onChange={onChangeIntern} />
              </div>
            </SharedAutocompleteContext>
          </SettingsContext>
        </TableContext>
      </SharedHistoryContext>
    </LexicalComposer>
  );
}
export default Editor;
