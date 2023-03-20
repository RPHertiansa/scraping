import axios from 'axios';
import cheerio from 'Cheerio';

const url = 'https://www.premierleague.com/stats/top/players/goals?se=489';

const AxiosInstance = axios.create();
interface PlayerData {
  rank: number;
  name: string;
  nationality: string;
  goals: number;
}
AxiosInstance.get(url)
  .then((res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    const statsTable = $('.statsTableContainer > tr');
    const topPlayer: PlayerData[] = [];
    statsTable.each((i, e) => {
      const rank = parseInt($(e).find('.rank > strong').text());
      const name = $(e).find('.playerName > strong').text();
      const nationality = $(e).find('.playerCountry').text();
      const goals = parseInt($(e).find('.mainStat').text());
      topPlayer.push({
        rank,
        name,
        nationality,
        goals,
      });
    });
    console.log(topPlayer);
  })
  .catch(console.error);
