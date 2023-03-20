import { saveTxt } from './helper/downloader';
import { topAssists, topCaps, topScorers } from './scrapper/topPlayer';

async function Scrapper() {
  await saveTxt('Top Scorers', await topScorers());
  await saveTxt('Top Assists', await topAssists());
  await saveTxt('Top Caps', await topCaps());
}

Scrapper();
