interface Prompt {
  id: string;
  name: string;
  data: string;
  text_data: string;
  tone_of_voice: string;
  role: string;
  product: string;
  index: number;
}

export type CreatePrompt = Pick<Prompt, "name" | "text_data">;

export type GetPrompt = Prompt;

export type UpdatePromptParams = {
  id: string;
  data: CreatePrompt;
};
