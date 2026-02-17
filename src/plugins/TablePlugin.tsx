import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INSERT_TABLE_COMMAND, InsertTableCommandPayload } from '@lexical/table';
import { $createTableNodeWithDimensions } from '@lexical/table';
import { COMMAND_PRIORITY_EDITOR } from 'lexical';
import { $getSelection, $getRoot, $isRangeSelection } from 'lexical';

/**
 * Plugin to handle table-related functionality
 * This keeps table logic modular and separate from UI components
 */
export function TablePlugin(): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    console.log('TablePlugin: Registering INSERT_TABLE_COMMAND listener');
    return editor.registerCommand<InsertTableCommandPayload>(
      INSERT_TABLE_COMMAND,
      (payload) => {
        console.log('TablePlugin: INSERT_TABLE_COMMAND received!', payload);
        const { columns, rows } = payload;
        const numRows = parseInt(rows);
        const numCols = parseInt(columns);
        console.log('TablePlugin: Creating table', { numRows, numCols });
        
        editor.update(() => {
          const selection = $getSelection();
          console.log('TablePlugin: Selection:', selection);
          const tableNode = $createTableNodeWithDimensions(
            numRows,
            numCols,
            false // includeHeaders
          );
          console.log('TablePlugin: Table node created', tableNode);
          
          if ($isRangeSelection(selection)) {
            console.log('TablePlugin: Inserting via selection');
            selection.insertNodes([tableNode]);
          } else {
            console.log('TablePlugin: No selection, creating insertion point');
            const root = $getRoot();
            const lastChild = root.getLastChild();
            
            if (lastChild) {
              console.log('TablePlugin: Inserting after last child');
              lastChild.insertAfter(tableNode);
            } else {
              console.log('TablePlugin: Root is empty, appending table');
              root.append(tableNode);
            }
            console.log('TablePlugin: Table inserted');
          }
          console.log('TablePlugin: Table insertion completed');
        });
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  return null;
}
