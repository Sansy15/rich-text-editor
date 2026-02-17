import './Toolbar.css';

interface ToolbarProps {
  children?: React.ReactNode;
}

export default function Toolbar({ children }: ToolbarProps) {
  return (
    <div className="toolbar">
      {children}
    </div>
  );
}
