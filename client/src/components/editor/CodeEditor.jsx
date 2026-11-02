import React from 'react';
import Editor from '@monaco-editor/react';

const NEURAL_NIGHT = 'neural-night';

function defineNeuralNight(monaco) {
  monaco.editor.defineTheme(NEURAL_NIGHT, {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#02060f',
      'editor.foreground': '#EDEFF5',
      'editorLineNumber.foreground': '#5B6B84',
      'editorLineNumber.activeForeground': '#EDEFF5',
      'editorCursor.foreground': '#E9E9E9',
      'editor.selectionBackground': '#9FE0FF40',
      'editor.lineHighlightBackground': '#FFFFFF08',
      'editorWidget.background': '#0B0E1A',
      'editorWidget.border': '#FFFFFF1A',
      'editorGutter.background': '#02060f',
      'minimap.background': '#02060f',
    },
  });
}

const languageMap = {
  // Canonical (backend) names
  'Python': 'python',
  'JavaScript': 'javascript',
  'TypeScript': 'typescript',
  'Java': 'java',
  'C++': 'cpp',
  'C#': 'csharp',
  'Go': 'go',
  'Rust': 'rust',
  'PHP': 'php',
  'Ruby': 'ruby',
  'SQL': 'sql',
  'HTML': 'html',
  'CSS': 'css',
  // Backward-compatible/aliases
  python: 'python',
  javascript: 'javascript',
  typescript: 'typescript',
  java: 'java',
  cpp: 'cpp',
  csharp: 'csharp',
  go: 'go',
  rust: 'rust',
};

export default function CodeEditor({ value, onChange, language = 'python', height = 320, readOnly = false }) {
  const lang = languageMap[language] || 'plaintext';
  return (
    <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--card-border)', height: '100%' }}>
      <Editor
        height={height}
        theme={NEURAL_NIGHT}
        beforeMount={defineNeuralNight}
        language={lang}
        value={value}
        onChange={(v) => onChange ? onChange(v || '') : null}
        options={{
          readOnly: readOnly,
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          automaticLayout: true,
          // Spacing for line numbers instead of having them squished into the code
          lineNumbersMinChars: 3,
          glyphMargin: false,
          folding: true,
          lineDecorationsWidth: 15,
          overviewRulerLanes: 0,
          overviewRulerBorder: false,
          padding: { top: 8, bottom: 8 },
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
        }}
      />
    </div>
  );
}

