
import React from 'react';
import { GenerationResult } from '../types';

interface GeneratedPreviewProps { result: GenerationResult; }

const GeneratedPreview: React.FC<GeneratedPreviewProps> = ({ result }) => {
  const copyForCKEditor = async () => {
    try {
      const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement;
      if (!iframe || !iframe.contentDocument) return;
      const bodyHtml = iframe.contentDocument.body.innerHTML;
      const blob = new Blob([bodyHtml], { type: 'text/html' });
      const plainBlob = new Blob([bodyHtml], { type: 'text/plain' });
      const data = [new ClipboardItem({ 'text/html': blob, 'text/plain': plainBlob })];
      await navigator.clipboard.write(data);
      alert('內容已成功複製！可直接貼至編輯器中。');
    } catch (err) {
      console.error('複製失敗:', err);
      alert('複製失敗，請手動複製。');
    }
  };

  const downloadFile = (content: string, fileName: string) => {
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-8">
      <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
        <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
          📋 醫學網頁內容預覽
        </h3>
        <div className="flex gap-3">
          <button
            onClick={copyForCKEditor}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-700 text-white text-sm font-bold rounded-lg hover:bg-blue-800 shadow-sm transition-all active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            <span className="leading-none inline-flex items-center">複製富文本內容</span>
          </button>

          <button
            onClick={() => downloadFile(result.previewHtml, "medical-event.html")}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 shadow-sm transition-all active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="leading-none inline-flex items-center">下載 HTML</span>
          </button>
        </div>
      </div>

      <div className="p-8">
        <div className="mb-6 p-4 bg-blue-50 rounded-xl text-xs text-blue-900 leading-relaxed border border-blue-100 flex items-start gap-3">
          <span className="text-xl">🩺</span>
          <div>
            <strong>已優化為醫學專業佈局：</strong> 
            包含嚴謹的框線美學、專業醫療色調與結構化排版。點擊「複製」按鈕後，直接貼上至編輯器即可保留完整視覺細節。
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-2xl overflow-hidden h-[850px] bg-white shadow-inner relative">
          <iframe
            id="preview-iframe"
            srcDoc={result.previewHtml}
            title="Medical Content Preview"
            className="w-full h-full border-none"
          />
        </div>
      </div>
    </div>
  );
};

export default GeneratedPreview;
