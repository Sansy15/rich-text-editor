import { useEditorStore } from '../../store/editorStore';
import { persistenceService } from '../../services/persistence';
import { useState } from 'react';

export default function SaveButton() {
  const serializeEditorState = useEditorStore((state) => state.serializeEditorState);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    
    try {
      // Get current editor state
      const serialized = serializeEditorState();
      
      if (serialized) {
        await persistenceService.save(serialized);
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 2000);
      }
    } catch (error) {
      console.error('Save failed:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={isSaving}
      title="Save editor content"
      type="button"
    >
      {isSaving ? 'Saving...' : saveStatus === 'success' ? 'Saved!' : saveStatus === 'error' ? 'Error' : 'Save'}
    </button>
  );
}
