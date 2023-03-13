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
import { useRef } from "react";

export interface EditorProps {
  onChange?: (value: string) => void;
  initialValue?: string | object;
}

function Editor({ onChange, initialValue }: EditorProps): JSX.Element {
  const initialConfig = {
    namespace: "tech-quiz-editor",
    nodes: [...PlaygroundNodes],

    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
    editorState: JSON.stringify(initialValue),
  };

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
