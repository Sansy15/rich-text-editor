import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { insertMath } from '../../utils/mathUtils';

interface MathButtonProps {
  inline?: boolean;
}

export default function MathButton({ inline = true }: MathButtonProps) {
  const [editor] = useLexicalComposerContext();

  const handleInsertMath = () => {
    console.log('Math button clicked!', { editor, inline });
    try {
      insertMath(editor, '', inline);
      console.log('Math insertion completed');
    } catch (error) {
      console.error('Error inserting math:', error);
    }
  };

  return (
    <button
      onClick={handleInsertMath}
      title={inline ? 'Insert inline math' : 'Insert block math'}
      type="button"
    >
      {inline ? 'Math (Inline)' : 'Math (Block)'}
    </button>
  );
}
