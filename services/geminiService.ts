
import { GoogleGenAI, Type } from "@google/genai";
import { EventData, GenerationResult } from "../types";

export const generateEventContent = async (data: EventData): Promise<GenerationResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  // 根據選擇的模板調整設計風格描述，轉向醫學專業感
  let styleInstruction = "";
  let primaryColor = "#1d4ed8"; // Default medical blue

  switch (data.template) {
    case 'tech':
      styleInstruction = "數位醫療風 (Digital Health)：色調以科技藍、青綠色為主。使用精密網格線背景、細小的「+」字裝飾或數位脈搏線條。呈現數位轉型與尖端醫療技術的專業感。";
      primaryColor = "#0d9488";
      break;
    case 'elegant':
      styleInstruction = "醫學學術風 (Clinical Research)：使用純淨白與冷色調灰色。搭配細膩的實線邊框，字體清晰且層次分明，如同國際醫學期刊般嚴謹、高雅且具權威性。";
      primaryColor = "#334155";
      break;
    case 'creative':
      styleInstruction = "健康活力風 (Public Health)：使用溫暖的薄荷綠或淡藍色。運用柔和的圓角與流暢的曲線線條，展現公共衛生教育、身心健康的親和力與正面能量。";
      primaryColor = "#10b981";
      break;
    default:
      styleInstruction = "專業臨床風 (Medical Professional)：經典的醫療白與深藍配色。使用俐落的直線分割與精緻的框線包裹標題。強調邏輯性與專業信任感。";
      primaryColor = "#1d4ed8";
  }

  const prompt = `請為以下活動生成一個「具備醫學專業感 (Medical Professional Style)、嚴謹且高品質」的介紹網頁：
  
  【風格指導】
  ${styleInstruction}
  - **核心設計概念**：強調「信任 (Trust)」、「精確 (Precision)」與「潔淨 (Sanitary)」。
  - **色彩核心**：以醫學白 (#FFFFFF) 為基調，搭配專業藍、健康綠或科研灰。絕對禁止全黑背景。

  【活動基本資料】
  - 主題：${data.topic}
  - 時間：${data.date}
  - 地點：${data.location}
  - 講者：${data.speaker}
  - 費用：${data.fee}
  - 截止日期：${data.deadline}
  - 報名連結：${data.regUrl}
  
  【詳細內容】
  - 核心介紹：${data.content}
  - 補充資訊：${data.extraInfo || '無'}
  - 課程表/流程安排 (放置於最後)：${data.schedule || '無'}

  設計與排版規範 (醫學專業級)：
  1. **頂部活動主題區塊 (Hero Section)**：
     - 禁止單一顏色，禁止漸層。使用細線條、框線或極淡的心跳波形裝飾。
  2. **報名按鈕 (Call to Action)**：
     - **必須生成一個顯眼的報名按鈕**。
     - 按鈕文字應為「立即線上報名」或「Secure Your Spot Now」。
     - 樣式：使用 ${primaryColor} 背景、白色粗體字、圓角 (8px-12px)、較大的內邊距 (12px 30px)。
     - 按鈕應放置在內容核心介紹之後，或是網頁底部顯眼處（或兩者皆有）。
     - 使用 <a> 標籤，href 設定為 "${data.regUrl}"，並加上 target="_blank"。
  3. **框線與區隔美學**：
     - 使用 1px 的精緻邊框製作內容卡片，給人如同病歷般的精確感。
  4. **文字與圖示**：
     - 內文最小 16px。使用醫療相關 Emoji (🩺, 📋, 👨‍⚕️)。
  5. **CKEditor 複製相容性**：
     - 使用標準 HTML 標籤。所有 CSS 樣式必須以內聯 (inline-style) 方式撰寫，確保複製後在編輯器中呈現高品質的醫學專業視覺。

  請回傳純 JSON 格式。`;

  const textResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          previewHtml: { type: Type.STRING }
        },
        required: ["previewHtml"]
      }
    }
  });

  const result = JSON.parse(textResponse.text);

  return {
    previewHtml: result.previewHtml
  };
};
