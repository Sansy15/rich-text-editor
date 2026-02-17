import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { persistenceService } from '../../services/persistence';
import { useState } from 'react';

export default function LoadButton() {
  const [editor] = useLexicalComposerContext();
  const [isLoading, setIsLoading] = useState(false);
  const [loadStatus, setLoadStatus] = useState<'idle' | 'success' | 'error' | 'empty'>('idle');

  const handleLoad = async () => {
    setIsLoading(true);
    setLoadStatus('idle');
    
    try {
      const content = await persistenceService.load();
      
      if (content) {
        const editorState = editor.parseEditorState(content);
        editor.setEditorState(editorState);
        setLoadStatus('success');
        setTimeout(() => setLoadStatus('idle'), 2000);
      } else {
        setLoadStatus('empty');
        setTimeout(() => setLoadStatus('idle'), 2000);
      }
    } catch (error) {
      console.error('Load failed:', error);
      setLoadStatus('error');
      setTimeout(() => setLoadStatus('idle'), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLoad}
      disabled={isLoading}
      title="Load saved editor content"
      type="button"
    >
      {isLoading ? 'Loading...' : loadStatus === 'success' ? 'Loaded!' : loadStatus === 'error' ? 'Error' : loadStatus === 'empty' ? 'No data' : 'Load'}
    </button>
  );
}
