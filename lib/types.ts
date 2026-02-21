export interface Bot {
  id: string;
  name: string;
  description: string;
  token: string;
  systemPrompt: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BotFormData {
  name: string;
  description: string;
  token: string;
  systemPrompt: string;
  active: boolean;
}
