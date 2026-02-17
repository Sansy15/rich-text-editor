import { $getSelection, $isRangeSelection, $getRoot } from 'lexical';
import { LexicalEditor } from 'lexical';
import { $createMathNode } from '../nodes/MathNode';

/**
 * Insert a math expression into the editor
 * @param editor - The Lexical editor instance
 * @param value - The LaTeX expression
 * @param inline - Whether the math should be inline (default: true)
 */
export const insertMath = (
  editor: LexicalEditor,
  value: string = '',
  inline: boolean = true
): void => {
  console.log('insertMath called', { value, inline });
  editor.update(() => {
    const selection = $getSelection();
    const mathNode = $createMathNode(value, inline);
    console.log('Math node created', { selection, mathNode });
    
    if ($isRangeSelection(selection)) {
      // If there's a selection, insert at the selection
      console.log('Inserting math at selection');
      selection.insertNodes([mathNode]);
    } else {
      // If no selection, insert at the root
      console.log('Inserting math at root');
      const root = $getRoot();
      root.append(mathNode);
    }
  });
  console.log('Math insertion update completed');
};
