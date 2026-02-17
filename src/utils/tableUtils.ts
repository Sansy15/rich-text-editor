import { $getSelection, $isRangeSelection } from 'lexical';
import { INSERT_TABLE_COMMAND } from '@lexical/table';
import { $insertTableRow__EXPERIMENTAL, $insertTableColumn__EXPERIMENTAL } from '@lexical/table';
import { LexicalEditor } from 'lexical';

/**
 * Insert a table into the editor
 * @param editor - The Lexical editor instance
 * @param rows - Number of rows (default: 3)
 * @param columns - Number of columns (default: 3)
 */
export const insertTable = (
  editor: LexicalEditor,
  rows: number = 3,
  columns: number = 3
): void => {
  console.log('insertTable called', { rows, columns });
  editor.dispatchCommand(INSERT_TABLE_COMMAND, {
    columns: columns.toString(),
    rows: rows.toString(),
    includeHeaders: false,
  });
  console.log('INSERT_TABLE_COMMAND dispatched');
};

/**
 * Insert a new row in the table
 * @param editor - The Lexical editor instance
 * @param insertAfter - Whether to insert after the current row (default: true)
 */
export const insertTableRow = (
  editor: LexicalEditor,
  insertAfter: boolean = true
): void => {
  editor.update(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      $insertTableRow__EXPERIMENTAL(insertAfter);
    }
  });
};

/**
 * Insert a new column in the table
 * @param editor - The Lexical editor instance
 * @param insertAfter - Whether to insert after the current column (default: true)
 */
export const insertTableColumn = (
  editor: LexicalEditor,
  insertAfter: boolean = true
): void => {
  editor.update(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      $insertTableColumn__EXPERIMENTAL(insertAfter);
    }
  });
};
