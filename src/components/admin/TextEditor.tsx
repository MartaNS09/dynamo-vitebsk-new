'use client';

import { useState } from 'react';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function TextEditor({ value, onChange, placeholder }: TextEditorProps) {
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="text-editor">
      <div className="editor-toolbar">
        <button 
          type="button"
          onClick={() => setIsPreview(false)}
          className={!isPreview ? 'active' : ''}
        >
          Редактор
        </button>
        <button 
          type="button"
          onClick={() => setIsPreview(true)}
          className={isPreview ? 'active' : ''}
        >
          Предпросмотр
        </button>
      </div>
      
      {!isPreview ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={20}
          style={{
            width: '100%',
            padding: '15px',
            fontFamily: 'monospace',
            fontSize: '14px',
            lineHeight: '1.6',
            border: '1px solid #ddd',
            borderRadius: '4px',
          }}
        />
      ) : (
        <div 
          className="preview-content"
          style={{
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            minHeight: '400px',
            backgroundColor: '#f9f9f9',
          }}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      )}
      
      <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        <p>💡 Можно использовать HTML теги: &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;div&gt;, &lt;strong&gt;, &lt;em&gt;</p>
      </div>
    </div>
  );
}
