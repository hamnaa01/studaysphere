import { GoogleGenAI, Type } from "@google/genai";
import { Quiz, Flashcard, StudyNote } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateQuizFromDocument(base64Data: string, mimeType: string): Promise<Quiz> {
  const model = "gemini-2.0-flash";
  
  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: "Generate a comprehensive quiz based on this document. The quiz should have a title and a set of 5-10 multiple-choice questions. For each question, provide 4 options, the index of the correct answer (0-3), and a brief explanation of why it is correct. Return the result in a structured JSON format.",
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          questions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                question: { type: Type.STRING },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                correctAnswer: { type: Type.INTEGER },
                explanation: { type: Type.STRING },
              },
              required: ["id", "question", "options", "correctAnswer", "explanation"],
            },
          },
        },
        required: ["title", "questions"],
      },
    },
  });

  try {
    const quiz = JSON.parse(response.text || "{}") as Quiz;
    return quiz;
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("Could not generate a valid quiz from this document.");
  }
}

export async function generateFlashcardsFromDocument(base64Data: string, mimeType: string): Promise<Flashcard[]> {
  const model = "gemini-2.0-flash";
  
  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: "Generate a set of 8-15 active recall flashcards from this document. Each flashcard should have a clear 'front' (question/term), a concise 'back' (answer/definition), and an optional helpful 'hint'. Focus on key concepts and definitions.",
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            front: { type: Type.STRING },
            back: { type: Type.STRING },
            hint: { type: Type.STRING },
          },
          required: ["id", "front", "back"],
        },
      },
    },
  });

  try {
    const result = JSON.parse(response.text || "[]") as Flashcard[];
    return result;
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("Could not generate valid flashcards from this document.");
  }
}

export async function generateNotesFromDocument(base64Data: string, mimeType: string): Promise<StudyNote> {
  const model = "gemini-2.0-flash";
  
  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: "Generate structured, high-yield study notes from this document. Include a title, several core sections with headings, detailed content, and bullet points for quick review. Also provide a meta-summary and a list of key terms (keywords).",
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          sections: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                heading: { type: Type.STRING },
                content: { type: Type.STRING },
                bulletPoints: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: ["heading", "content"],
            },
          },
          summary: { type: Type.STRING },
          keywords: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ["title", "sections", "summary", "keywords"],
      },
    },
  });

  try {
    const result = JSON.parse(response.text || "{}") as StudyNote;
    return result;
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("Could not generate valid study notes from this document.");
  }
}
