
import React, { useState } from 'react';
import { EventData } from '../types';

interface EventFormProps {
  onSubmit: (data: EventData) => void;
  isLoading: boolean;
}

const templates = [
  { id: 'modern', name: '專業臨床', icon: '🩺', desc: '嚴謹、信任、標準藍白' },
  { id: 'tech', name: '數位醫療', icon: '💻', desc: '精密、科技、青綠調' },
  { id: 'elegant', name: '學術研究', icon: '🔬', desc: '純粹、權威、期刊感' },
  { id: 'creative', name: '健康教育', icon: '🏥', desc: '親和、明亮、正向感' },
];

const EventForm: React.FC<EventFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<EventData>({
    topic: '',
    date: '',
    location: '',
    content: '',
    speaker: '',
    fee: '',
    deadline: '',
    schedule: '',
    extraInfo: '',
    template: 'modern',
    regUrl: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const selectTemplate = (id: string) => {
    setFormData(prev => ({ ...prev, template: id }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClasses = "w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white text-base";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div>
        <label className={labelClasses}>選擇設計風格 (醫學專業系列)</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
          {templates.map((t) => (
            <div
              key={t.id}
              onClick={() => selectTemplate(t.id)}
              className={`cursor-pointer border-2 rounded-xl p-3 text-center transition-all duration-200 ${
                formData.template === t.id 
                  ? "border-blue-600 bg-blue-50" 
                  : "border-gray-100 bg-gray-50 hover:border-gray-200"
              }`}
            >
              <div className="text-2xl mb-1">{t.icon}</div>
              <div className="text-sm font-bold text-gray-800">{t.name}</div>
              <div className="text-[10px] text-gray-500">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClasses}>醫學活動主題</label>
        <input
          required
          name="topic"
          placeholder="例如：2024 國際心血管醫學研討會"
          className={inputClasses}
          value={formData.topic}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClasses}>活動日期</label>
          <input
            required
            name="date"
            placeholder="2024-12-15 09:00 - 17:00"
            className={inputClasses}
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className={labelClasses}>活動地點</label>
          <input
            required
            name="location"
            placeholder="台北榮民總醫院 致德樓..."
            className={inputClasses}
            value={formData.location}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label className={labelClasses}>主要講者 / 特邀專家</label>
        <input
          required
          name="speaker"
          placeholder="講者姓名與學位、所屬機構"
          className={inputClasses}
          value={formData.speaker}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className={labelClasses}>活動核心介紹 (醫學背景與摘要)</label>
        <textarea
          required
          name="content"
          rows={3}
          placeholder="請描述研討會的核心議題、研究價值或临床應用預期..."
          className={inputClasses}
          value={formData.content}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClasses}>報名費用與學分資訊</label>
          <input
            required
            name="fee"
            placeholder="例如：醫師 1,000 元 (含學分證明)"
            className={inputClasses}
            value={formData.fee}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className={labelClasses}>報名截止日期</label>
          <input
            required
            name="deadline"
            placeholder="請輸入截止日期"
            className={inputClasses}
            value={formData.deadline}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label className={labelClasses}>報名連結 (URL)</label>
        <input
          required
          name="regUrl"
          type="url"
          placeholder="https://example.com/register"
          className={inputClasses}
          value={formData.regUrl}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className={labelClasses}>補充資訊 (交通指引、CME 學分等)</label>
        <input
          name="extraInfo"
          placeholder="如：提供繼續教育學分、交通接駁車時間等"
          className={inputClasses}
          value={formData.extraInfo}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className={labelClasses}>課程表 / 流程安排 (醫學議程)</label>
        <textarea
          name="schedule"
          rows={4}
          placeholder="請列出各時段的議程題目與主持人，AI 將以嚴謹樣式排版..."
          className={inputClasses}
          value={formData.schedule}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 px-6 text-white font-bold rounded-xl transition-all duration-300 transform active:scale-95 shadow-lg flex items-center justify-center gap-2 ${
          isLoading 
            ? "bg-gray-400 cursor-not-allowed" 
            : "bg-blue-700 hover:bg-blue-800 hover:shadow-blue-200"
        }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="leading-none flex items-center h-full">正在生成醫學專業內容...</span>
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21.48V11.5" />
            </svg>
            <span className="leading-none flex items-center h-full">生成醫學專業網頁</span>
          </>
        )}
      </button>
    </form>
  );
};

export default EventForm;
