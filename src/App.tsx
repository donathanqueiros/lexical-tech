import { LexicalComposer } from "@lexical/react/LexicalComposer";

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

export interface EditorProps {
  onChange?: (value: string) => void;
  value?: string;
}

function Editor({ onChange, value }: EditorProps): JSX.Element {
  const initialConfig = {
    namespace: "tech-quiz-editor",
    nodes: [...PlaygroundNodes],

    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
    editorState: value,
  };

  useEffect(() => {
    const editor = editorRef.current;
    if (value && editor) {
      const editorState = editor.parseEditorState(value);
      editor.setEditorState(editorState);
    }
  }, [value]);

  const editorRef = useRef<LexicalEditor>();

  function onChangeIntern(editorState: EditorState, editor: LexicalEditor) {
    onChange?.(JSON.stringify(editorState));
  }
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <TableContext>
          <SharedAutocompleteContext>
            <div className="editor-shell">
              <EditorComponent />
              <OnChangePlugin onChange={onChangeIntern} />
              <OnChangePlugin
                onChange={(_, editor) => (editorRef.current = editor)}
              />
            </div>
          </SharedAutocompleteContext>
        </TableContext>
      </SharedHistoryContext>
    </LexicalComposer>
  );
}
export default Editor;
