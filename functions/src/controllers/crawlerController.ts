import * as functions from 'firebase-functions';
import { closeDatabaseConnection, connectToDatabase } from '../config';
import puppeteer from 'puppeteer';

const handleResponse = (response: functions.Response<any>, statusCode: number, data: any) => {
    response.status(statusCode).json(data);
};
const opts = {memory: "512MB", timeoutSeconds: 60};
//@ts-ignore
export const getJobDetails = functions.runWith(opts).https.onRequest(async (req, res) => {
    const { url, site } = req.query as { url: string, site: string };

    if (!url || !site) {
        return handleResponse(res, 400, { error: 'URL and site parameters are required' });
    }

    try {
        await connectToDatabase();
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        const page = await browser.newPage();

        // Configurar la página para bloquear la carga de imágenes y otros recursos
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            if (request.resourceType() === 'image' || request.resourceType() === 'media' || request.resourceType() === 'font') {
                request.abort();
            } else {
                request.continue();
            }
        });

        await page.goto(url, { waitUntil: 'networkidle2' });

        let jobDetails: string;
        if (site === 'glassdoor') {
            jobDetails = await page.evaluate(() => {
                // @ts-ignore
                const headers = Array.from(document.querySelectorAll("[class*='JobDetails_jobDetailsHeader']"))
                // @ts-ignore    
                .map(header => header.innerText);
                // @ts-ignore
                const descriptions = Array.from(document.querySelectorAll("[class*='JobDetails_jobDetailsSection']"))
                // @ts-ignore
                .map(description => description.innerText);
                return `${headers.join('\n\n')}\n\n${descriptions.join('\n\n')}`;
            });
        } else if (site === 'linkedin') {
            jobDetails = await page.evaluate(() => {
                // @ts-ignore
                const headers = Array.from(document.querySelectorAll("[class*='decorated-job-posting__details']"))
                // @ts-ignore
                .map(header => header.innerText);
                // @ts-ignore
                const descriptions = Array.from(document.querySelectorAll("[class*='top-card-layout__card']"))
                // @ts-ignore
                .map(description => description.innerText);
                return `${headers.join('\n\n')}\n\n${descriptions.join('\n\n')}`;
            });
        } else {
            return handleResponse(res, 400, { error: 'Invalid site parameter. Choose between "glassdoor" and "linkedin"' });
        }

        await browser.close();
        handleResponse(res, 200, { jobDetails });
    } catch (error: any) {
        console.error(error);
        handleResponse(res, 500, { error: 'Failed to retrieve job details' });
    } finally {
        await closeDatabaseConnection();
    }
});
