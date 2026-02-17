import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

/**
 * Plugin to handle math-related functionality
 * This keeps math logic modular and separate from UI components
 */
export function MathPlugin(): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Any math-specific initialization or event handling can go here
    // For now, math insertion is handled via commands from toolbar buttons
  }, [editor]);

  return null;
}
