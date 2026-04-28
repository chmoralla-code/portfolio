import { generateReply, type ChatMessage } from "@/lib/chat";

type ChatRequestBody = {
  messages?: ChatMessage[];
};

export async function POST(request: Request) {
  const body = (await request.json()) as ChatRequestBody;
  const messages = Array.isArray(body.messages) ? body.messages : [];

  return Response.json({
    message: generateReply(messages),
  });
}