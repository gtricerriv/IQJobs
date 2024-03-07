import * as functions from 'firebase-functions';
import OpenAI from 'openai';
import { Request, Response } from 'express';

const openai = new OpenAI({
  apiKey: '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'
});

const handleResponse = (response: Response, statusCode: number, data: any) => {
  response.status(statusCode).json(data);
};

export const getJobTips = functions.https.onRequest(async (request: Request, response: Response) => {
  try {
    const { jobDescription, profile } = request.body;

    const prompt = `Job description: ${jobDescription}\nProfile: ${profile}\nAsk for tips or recommendations based on this job description and profile:`;

    const openaiResponse = await openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt: prompt,
      temperature: 1,
      //@ts-ignore
      maxTokens: 2508,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0
    });

    //@ts-ignore
    const tips = openaiResponse.data.choices[0].text.trim();
    handleResponse(response, 200, { tips });
  } catch (error: any) {
    handleResponse(response, 500, { error: error.message });
  }
});

export const getResumeRecommendations = functions.https.onRequest(async (request: Request, response: Response) => {
  try {
    const { resumeContent } = request.body;

    const prompt = `Current Resume: ${resumeContent}\nAsk for recommendations or feedback on this resume:`;

    const openaiResponse = await openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt: prompt,
      temperature: 1,
      //@ts-ignore
      maxTokens: 2508,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0
    });

    //@ts-ignore
    const recommendations = openaiResponse.data.choices[0].text.trim();
    handleResponse(response, 200, { recommendations });
  } catch (error: any) {
    handleResponse(response, 500, { error: error.message });
  }
});
