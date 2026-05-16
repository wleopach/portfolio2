import OpenAI from "openai";
//how to set the key secure in github
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
