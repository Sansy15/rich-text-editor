import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { insertTable } from '../../utils/tableUtils';

interface TableButtonProps {
  rows?: number;
  columns?: number;
}

export default function TableButton({ rows = 3, columns = 3 }: TableButtonProps) {
  const [editor] = useLexicalComposerContext();

  const handleInsertTable = () => {
    console.log('Table button clicked!', { editor, rows, columns });
    try {
      insertTable(editor, rows, columns);
      console.log('Table insertion command dispatched');
    } catch (error) {
      console.error('Error inserting table:', error);
    }
  };

  return (
    <button
      onClick={handleInsertTable}
      title={`Insert ${rows}x${columns} table`}
      type="button"
    >
      Insert Table
    </button>
  );
}
