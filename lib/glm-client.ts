const API_URL = process.env.DEEPSEEK_API_URL || "https://open.bigmodel.cn/api/paas/v4/chat/completions";
const API_KEY = process.env.DEEPSEEK_API_KEY || "";
const MODEL = process.env.DEEPSEEK_MODEL || "glm-4.7-flash";

interface Message {
  role: "system" | "user" | "assistant";
  content: string | Array<{ type: string; text?: string; image_url?: { url: string } }>;
}

interface GLMResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function chatCompletion(messages: Message[], temperature = 0.7): Promise<string> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ model: MODEL, messages, temperature }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GLM API error ${res.status}: ${text}`);
  }

  const data: GLMResponse = await res.json();
  return data.choices[0]?.message?.content || "";
}

export async function visionAnalysis(imageBase64: string, prompt: string): Promise<string> {
  const messages: Message[] = [
    {
      role: "user",
      content: [
        { type: "text", text: prompt },
        { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imageBase64}` } },
      ],
    },
  ];

  return chatCompletion(messages, 0.3);
}
