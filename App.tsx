
import React, { useState } from 'react';
import EventForm from './components/EventForm';
import GeneratedPreview from './components/GeneratedPreview';
import { generateEventContent } from './services/geminiService';
import { EventData, GenerationResult } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (data: EventData) => {
    setLoading(true);
    setError(null);
    try {
      const output = await generateEventContent(data);
      setResult(output);
    } catch (err) {
      console.error(err);
      setError("生成過程中發生錯誤，請稍後再試。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">
              M
            </div>
            <h1 className="text-xl font-bold tracking-tight text-blue-900">MedEventGen</h1>
          </div>
          <p className="text-xs text-gray-400 hidden sm:block">Professional Medical Content Generator</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pt-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">醫學活動網頁生成器</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            專為醫療研討會、臨床講座與學術會議設計。生成具備信任感、嚴謹度與結構化的專業介紹網頁。
          </p>
        </div>

        <EventForm onSubmit={handleGenerate} isLoading={loading} />

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {result && <GeneratedPreview result={result} />}

        {!result && !loading && (
          <div className="mt-12 text-center text-gray-300">
            <div className="mb-4 flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.183.394l-1.15.904a2 2 0 00-.547 2.247l.588 1.47a2 2 0 001.856 1.258h12.766a2 2 0 001.856-1.258l.588-1.47a2 2 0 00-.546-2.248l-1.15-.904zM12 13V4M7 4h10" />
              </svg>
            </div>
            <p>請填寫活動詳情，系統將依據醫學專業標準進行排版</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} MedEventGen. 為醫療學術交流提供高效內容解決方案。
        </div>
      </footer>
    </div>
  );
};

export default App;
