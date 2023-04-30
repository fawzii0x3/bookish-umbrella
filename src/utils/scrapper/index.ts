import axios from "axios"
import { load } from "cheerio"
export const BaseURLs = ["https://tunisia-jobs.com/"]
export async function getWebsite(url:string):Promise<string | null> {
    try {
        const res = await axios.get(url)
        return res.data
    } catch (error) {
        return null
    }
}

export async function getData(html:string) {
    const $ = load(html);
    const postItems = $('.post-item');
  
    const results = postItems.toArray().map((el) => {
        const postLink = $(el).find('a').attr('href');
        const imageUrl = $(el).find('img').attr('src');
        const jobDescription = $(el).find('h2.post-title a').text();
        return { postLink, imageUrl, jobDescription };
    });
    console.log(results)
    return results;
    
}