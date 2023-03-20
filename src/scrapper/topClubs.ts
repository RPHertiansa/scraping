import axios from 'axios';
import cheerio from 'Cheerio';
const baseUrl = 'https://www.premierleague.com/stats/top/clubs';

interface ClubData {
  rank: number;
  name: string;
}

interface MostWins extends ClubData {
  wins: number;
}

interface MostLoses extends ClubData {
  loses: number;
}

interface MostGoals extends ClubData {
  goals: number;
}

interface MostCleanSheet extends ClubData {
  cleanSheets: number;
}

async function mostWins() {
  try {
    const { data } = await axios.get(`${baseUrl}/wins`);
    const $ = cheerio.load(data);
    const statsTable = $('.statsTableContainer > tr');
    const mostWins: MostWins[] = [];
    statsTable.each((i, e) => {
      const rank = parseInt($(e).find('td:first-child').text());
      const name = $(e).find('a.playerName').text().trim();
      const wins = parseInt($(e).find('.mainStat').text());
      mostWins.push({
        rank,
        name,
        wins,
      });
    });
    return JSON.stringify(mostWins);
  } catch (err) {
    console.error(err);
  }
}

async function mostLoses() {
  try {
    const { data } = await axios.get(`${baseUrl}/losses`);
    const $ = cheerio.load(data);
    const statsTable = $('.statsTableContainer > tr');
    const mostLoses: MostLoses[] = [];
    statsTable.each((i, e) => {
      const rank = parseInt($(e).find('td:first-child').text());
      const name = $(e).find('a.playerName').text().trim();
      const loses = parseInt($(e).find('.mainStat').text());
      mostLoses.push({
        rank,
        name,
        loses,
      });
    });
    return JSON.stringify(mostLoses);
  } catch (err) {
    console.error(err);
  }
}

async function mostGoals() {
  try {
    const { data } = await axios.get(`${baseUrl}/goals`);
    const $ = cheerio.load(data);
    const statsTable = $('.statsTableContainer > tr');
    const mostGoals: MostGoals[] = [];
    statsTable.each((i, e) => {
      const rank = parseInt($(e).find('td:first-child').text());
      const name = $(e).find('a.playerName').text().trim();
      const goals = parseInt($(e).find('.mainStat').text());
      mostGoals.push({
        rank,
        name,
        goals,
      });
    });
    return JSON.stringify(mostGoals);
  } catch (err) {
    console.error(err);
  }
}

async function mostCleanSheets() {
  try {
    const { data } = await axios.get(`${baseUrl}/clean_sheet`);
    const $ = cheerio.load(data);
    const statsTable = $('.statsTableContainer > tr');
    const mostCleanSheet: MostCleanSheet[] = [];
    statsTable.each((i, e) => {
      const rank = parseInt($(e).find('td:first-child').text());
      const name = $(e).find('a.playerName').text().trim();
      const cleanSheets = parseInt($(e).find('.mainStat').text());
      mostCleanSheet.push({
        rank,
        name,
        cleanSheets,
      });
    });
    return JSON.stringify(mostCleanSheet);
  } catch (err) {
    console.error(err);
  }
}

export { mostWins, mostLoses, mostGoals, mostCleanSheets };
