import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { EditorState } from 'lexical';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeNode, CodeHighlightNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';
import { TableNode, TableCellNode, TableRowNode } from '@lexical/table';
import { editorTheme } from './EditorTheme';
import { useEditorStore } from '../../store/editorStore';
import { TablePlugin } from '../../plugins/TablePlugin';
import { MathPlugin } from '../../plugins/MathPlugin';
import { MathNode } from '../../nodes/MathNode';
import EditorToolbar from './EditorToolbar';
import { EditorErrorBoundary } from './ErrorBoundary';
import './Editor.css';

// Initial editor configuration
const initialConfig = {
  namespace: 'RichTextEditor',
  theme: editorTheme,
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    LinkNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    MathNode,
  ] as any,
  onError: (error: Error) => {
    console.error('Lexical Editor Error:', error);
  },
};

// Plugin to handle editor state changes
function EditorOnChangePlugin() {
  const setEditorState = useEditorStore((state) => state.setEditorState);

  return (
    <OnChangePlugin
      onChange={(editorState: EditorState) => {
        editorState.read(() => {
          const serialized = editorState.toJSON();
          setEditorState(serialized);
        });
      }}
    />
  );
}

export default function LexicalEditor() {
  return (
    <EditorErrorBoundary>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="editor-container">
          <EditorToolbar />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="editor-input" />
              }
              placeholder={
                <div className="editor-placeholder">
                  Start typing...
                </div>
              }
              ErrorBoundary={({ children }) => (
                <EditorErrorBoundary>{children}</EditorErrorBoundary>
              )}
            />
            <HistoryPlugin />
            <TablePlugin />
            <MathPlugin />
            <EditorOnChangePlugin />
          </div>
        </div>
      </LexicalComposer>
    </EditorErrorBoundary>
  );
}
