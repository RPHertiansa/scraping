import { saveTxt } from './helper/downloader';
import { topAssists, topCaps, topScorers } from './scrapper/topPlayer';
import { mostCleanSheets, mostGoals, mostLoses, mostWins } from './scrapper/topClubs';

async function Scrapper() {
  await saveTxt('Top Scorers', await topScorers());
  await saveTxt('Top Assists', await topAssists());
  await saveTxt('Top Caps', await topCaps());
  await saveTxt('Most Wins', await mostWins());
  await saveTxt('Most Loses', await mostLoses());
  await saveTxt('Most Goals', await mostGoals());
  await saveTxt('Most Clean Sheets', await mostCleanSheets());
}

Scrapper();
