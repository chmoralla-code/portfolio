export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function lastUserMessage(messages: ChatMessage[]) {
  return [...messages].reverse().find((message) => message.role === "user");
}

function asSentence(text: string) {
  const trimmed = text.trim().replace(/\s+/g, " ");
  return trimmed.length > 220 ? `${trimmed.slice(0, 217)}...` : trimmed;
}

function buildPlanReply(prompt: string) {
  return [
    "Here’s a clean starting plan:",
    "1. Define the outcome and the one thing the user must be able to do.",
    "2. Break the work into a thin first version with one obvious path.",
    "3. Add polish only after the core loop feels solid.",
    "4. Measure what matters so the next iteration has a signal.",
    `Prompt focus: ${asSentence(prompt)}`,
  ].join("\n");
}

function buildRewriteReply(prompt: string) {
  return [
    "Try this sharper version:",
    `"${asSentence(prompt)}"`,
    "If you want, I can also make it warmer, more formal, or more concise.",
  ].join("\n");
}

function buildReviewReply(prompt: string) {
  return [
    "Quick review:",
    "- The request is understandable.",
    "- Tighten the wording so the action is obvious.",
    "- Remove anything that repeats the same idea twice.",
    `Target text: ${asSentence(prompt)}`,
  ].join("\n");
}

export function generateReply(messages: ChatMessage[]) {
  const userMessage = lastUserMessage(messages);

  if (!userMessage) {
    return "Send me a prompt and I’ll turn it into a clear response.";
  }

  const prompt = userMessage.content;
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes("plan") || lowerPrompt.includes("roadmap")) {
    return buildPlanReply(prompt);
  }

  if (
    lowerPrompt.includes("rewrite") ||
    lowerPrompt.includes("rephrase") ||
    lowerPrompt.includes("copy")
  ) {
    return buildRewriteReply(prompt);
  }

  if (lowerPrompt.includes("review") || lowerPrompt.includes("critique")) {
    return buildReviewReply(prompt);
  }

  if (lowerPrompt.includes("explain") || lowerPrompt.includes("how does")) {
    return [
      "Here’s the short version:",
      `- Core idea: ${asSentence(prompt)}`,
      "- First, identify the noun and the verb in the request.",
      "- Then explain it in plain language, one step at a time.",
      "- If you want, I can expand this into a beginner-friendly walkthrough.",
    ].join("\n");
  }

  return [
    "Understood.",
    `You said: ${asSentence(prompt)}`,
    "I can turn that into a plan, rewrite it, explain it, or critique it next.",
  ].join("\n");
}