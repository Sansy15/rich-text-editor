import { useEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isMathNode } from '../../nodes/MathNode';
import { $getNodeByKey } from 'lexical';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import './MathNode.css';

interface MathNodeComponentProps {
  value: string;
  inline: boolean;
  nodeKey: string;
}

export function MathNodeComponent({
  value,
  inline,
  nodeKey,
}: MathNodeComponentProps) {
  const [editor] = useLexicalComposerContext();
  const containerRef = useRef<HTMLSpanElement>(null);
  // Auto-open input if value is empty (newly inserted math)
  const [isEditing, setIsEditing] = useState(value === '');
  const [editValue, setEditValue] = useState(value);

  useEffect(() => {
    if (containerRef.current && !isEditing && value) {
      try {
        katex.render(value, containerRef.current, {
          throwOnError: false,
          displayMode: !inline,
        });
      } catch (e) {
        if (containerRef.current) {
          containerRef.current.textContent = value;
        }
      }
    } else if (containerRef.current && !isEditing && !value) {
      // Show placeholder when empty
      containerRef.current.textContent = inline ? '[Math]' : '[Math Block]';
      containerRef.current.style.opacity = '0.5';
      containerRef.current.style.cursor = 'pointer';
    }
  }, [value, inline, isEditing]);

  const handleClick = () => {
    setIsEditing(true);
    setEditValue(value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isMathNode(node)) {
        node.setValue(editValue);
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleBlur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(value);
    }
  };

  if (isEditing) {
    return (
      <span className={`math-node math-node-editing ${inline ? 'math-inline' : 'math-block'}`}>
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="math-input"
          autoFocus
        />
      </span>
    );
  }

  return (
    <span
      ref={containerRef}
      className={`math-node ${inline ? 'math-inline' : 'math-block'}`}
      onClick={handleClick}
      title="Click to edit"
    />
  );
}
