import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

const API_TOKEN = "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"
dotenv.config();
console.log(process.env.OPENAI_API_KEY);
const apiKey = process.env.OPENAI_API_KEY.replace(/\s/g, "");
const organization = process.env.OPENAI_Organization.replace(/\s/g, "");
const configuration = new Configuration({
  apiKey,
  organization,
});
const openai = new OpenAIApi(configuration);
async function query(data:any) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/nomic-ai/gpt4all-j",
		{
			headers: { Authorization: `Bearer ${API_TOKEN}` },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
} 
export default async () => {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Hello world",
    });
    console.log(completion.data.choices[0].text);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
  try {
   
  } catch (error) {
    
  }
};
query({"inputs": "Can you please let us know more details about your "}).then((response) => {
	console.log(JSON.stringify(response));
});