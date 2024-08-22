import {
  GoogleGenerativeAI,
 
} from "@google/generative-ai";

const apiKey = "AIzaSyBbKfjy45d-d28e-nN6vjaDwyUxUKYLKL0";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

export const run = async (input) => {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(input);
  return result.response.text();
 
};
