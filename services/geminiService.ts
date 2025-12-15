import { GoogleGenAI, Chat } from "@google/genai";

// Initialize Gemini Client
// IMPORTANT: In a real production app, ensure API keys are handled securely via backend proxy.
// For this frontend-only demo, we rely on the injected process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
你是一个名为“Lumina Assistant”的专业摄影创意顾问，为“流光摄影工作室”(Lumina Studio)工作。
你的任务是帮助潜在客户构思他们的拍摄主题、风格和服装搭配。

工作室的服务包括：
1. 婚礼摄影 (Wedding): 捕捉幸福瞬间，风格包括纪实、唯美、复古。
2. 人像摄影 (Portrait): 个人写真、职业照、艺术照。
3. 商业摄影 (Commercial): 产品拍摄、品牌形象、活动记录。

请遵循以下规则：
- 语气专业、热情、富有艺术感。
- 询问客户的需求（场合、喜好、人数）。
- 根据客户的想法提供具体的创意建议（例如：推荐拍摄地点、配色方案、光影风格）。
- 最后总是礼貌地建议他们预约我们的服务以获取更多细节。
- 回答尽量简洁有力，不要长篇大论，保持对话的互动性。
`;

let chatSession: Chat | null = null;

export const initChatSession = (): void => {
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      maxOutputTokens: 500,
    },
  });
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    initChatSession();
  }

  if (!chatSession) {
    return "系统初始化失败，请稍后再试。";
  }

  try {
    const result = await chatSession.sendMessage({ message });
    return result.text || "抱歉，我现在无法回答，请稍后再试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "连接出现问题，请检查网络或稍后重试。";
  }
};