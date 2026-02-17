import {
  DecoratorNode,
  NodeKey,
  EditorConfig,
  LexicalNode,
  SerializedLexicalNode,
  Spread,
} from 'lexical';
import { ReactNode } from 'react';
import { MathNodeComponent } from '../components/Math/MathNode';

export interface MathNodePayload {
  value: string;
  inline: boolean;
}

export type SerializedMathNode = Spread<
  {
    value: string;
    inline: boolean;
  },
  SerializedLexicalNode
>;

export class MathNode extends DecoratorNode<ReactNode> {
  __value: string;
  __inline: boolean;

  static getType(): string {
    return 'math';
  }

  static clone(node: MathNode): MathNode {
    return new MathNode(node.__value, node.__inline, node.__key);
  }

  constructor(value: string, inline: boolean, key?: NodeKey) {
    super(key);
    this.__value = value;
    this.__inline = inline;
  }

  // View
  createDOM(_config: EditorConfig): HTMLElement {
    return document.createElement(this.__inline ? 'span' : 'div');
  }

  updateDOM(): false {
    return false;
  }

  decorate(): ReactNode {
    return (
      <MathNodeComponent
        value={this.__value}
        inline={this.__inline}
        nodeKey={this.__key}
      />
    );
  }

  // Serialization
  static importJSON(serializedNode: SerializedMathNode): MathNode {
    const { value, inline } = serializedNode;
    return new MathNode(value, inline);
  }

  exportJSON(): SerializedMathNode {
    return {
      value: this.__value,
      inline: this.__inline,
      type: 'math',
      version: 1,
    };
  }

  // Mutators
  setValue(value: string): void {
    const writable = this.getWritable();
    writable.__value = value;
  }

  setInline(inline: boolean): void {
    const writable = this.getWritable();
    writable.__inline = inline;
  }

  getValue(): string {
    return this.__value;
  }

  getInline(): boolean {
    return this.__inline;
  }
}

export function $createMathNode(value: string, inline: boolean): MathNode {
  return new MathNode(value, inline);
}

export function $isMathNode(node: LexicalNode | null | undefined): node is MathNode {
  return node instanceof MathNode;
}
