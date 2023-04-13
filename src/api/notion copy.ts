import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.REACT_APP_NOTION_API_KEY, // Integration 토큰
});

export async function getPageData(pageId: string) {
  const pageData = await notion.pages.retrieve({
    page_id: pageId,
  });
  return pageData;
}

export async function fetchData() {
  const databaseId = process.env.REACT_APP_COMPANY_DATABASE_ID;

  if (databaseId) {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    console.log('response', response);
    // const results = response.results;
    return response.results;
  }
}
