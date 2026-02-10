
export interface EventData {
  topic: string;
  date: string;
  location: string;
  content: string;
  speaker: string;
  fee: string;
  deadline: string;
  schedule?: string; // 課程表，詳答內容
  extraInfo?: string; // 補充資訊，詳答內容
  template: string; // 設計模板選擇
  regUrl: string; // 報名連結
}

export interface GenerationResult {
  previewHtml: string;
}
