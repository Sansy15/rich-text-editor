import { LexicalEditor } from './components/Editor';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="app-container">
        <h1 className="app-title">Rich Text Editor</h1>
        <div className="editor-wrapper">
          <LexicalEditor />
        </div>
      </div>
    </div>
  );
}

export default App;
