import { Toolbar, TableButton, MathButton, SaveButton, LoadButton } from '../Toolbar';

export default function EditorToolbar() {
  console.log('EditorToolbar rendered');
  return (
    <Toolbar>
      <TableButton rows={3} columns={3} />
      <MathButton inline={true} />
      <MathButton inline={false} />
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
        <SaveButton />
        <LoadButton />
      </div>
    </Toolbar>
  );
}
