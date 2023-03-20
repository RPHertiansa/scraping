import axios from 'axios';
import cheerio from 'Cheerio';
const baseUrl = 'https://www.premierleague.com/stats/top/players';

interface PlayerData {
  rank: number;
  name: string;
  nationality: string;
}

interface TopScorers extends PlayerData {
  goals: number;
}

interface TopAssists extends PlayerData {
  assists: number;
}

interface TopCaps extends PlayerData {
  appearances: number;
}

async function topScorers() {
  try {
    const { data } = await axios.get(`${baseUrl}/goals`);
    const $ = cheerio.load(data);
    const statsTable = $('.statsTableContainer > tr');
    const topScorers: TopScorers[] = [];
    statsTable.each((i, e) => {
      const rank = parseInt($(e).find('.rank > strong').text());
      const name = $(e).find('.playerName > strong').text();
      const nationality = $(e).find('.playerCountry').text();
      const goals = parseInt($(e).find('.mainStat').text());
      topScorers.push({
        rank,
        name,
        nationality,
        goals,
      });
    });
    return JSON.stringify(topScorers);
  } catch (err) {
    console.error(err);
  }
}
async function topAssists() {
  try {
    const { data } = await axios.get(`${baseUrl}/goal_assist`);
    const $ = cheerio.load(data);
    const statsTable = $('.statsTableContainer > tr');
    const topAssists: TopAssists[] = [];
    statsTable.each((i, e) => {
      const rank = parseInt($(e).find('.rank > strong').text());
      const name = $(e).find('.playerName > strong').text();
      const nationality = $(e).find('.playerCountry').text();
      const assists = parseInt($(e).find('.mainStat').text());
      topAssists.push({
        rank,
        name,
        nationality,
        assists,
      });
    });
    return JSON.stringify(topAssists);
  } catch (err) {
    console.error(err);
  }
}

async function topCaps() {
  try {
    const { data } = await axios.get(`${baseUrl}/appearances`);
    const $ = cheerio.load(data);
    const statsTable = $('.statsTableContainer > tr');
    const topCaps: TopCaps[] = [];
    statsTable.each((i, e) => {
      const rank = parseInt($(e).find('.rank > strong').text());
      const name = $(e).find('.playerName > strong').text();
      const nationality = $(e).find('.playerCountry').text();
      const appearances = parseInt($(e).find('.mainStat').text());
      topCaps.push({
        rank,
        name,
        nationality,
        appearances,
      });
    });
    return JSON.stringify(topCaps);
  } catch (err) {
    console.error(err);
  }
}

export { topScorers, topAssists, topCaps };
