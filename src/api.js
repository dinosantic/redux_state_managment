//Base URL
const base_url = "https://api.rawg.io/api/";

//Getting the date
const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1;
  if (month < 10) {
    return `0${month}`;
  } else {
    return month;
  }
};
//Getting the day
const getCurrentDay = () => {
  const day = new Date().getDate();
  if (day < 10) {
    return `0${day}`;
  } else {
    return day;
  }
};

//Current day/month/year
const currentDay = getCurrentDay();
const currentMonth = getCurrentMonth();
const currentYear = new Date().getFullYear();
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;

//Popular games
const popular_games = `games?key=${process.env.REACT_APP_RAWG_API_KEY}&dates=${lastYear},${currentDate}&ordering=-rating&page_size=10`;
//Upcoming games
const upcoming_games = `games?key=${process.env.REACT_APP_RAWG_API_KEY}&dates=${currentDate},${nextYear}&ordering=-added&page_size=10`;
//New games
const newGames = `games?key=${process.env.REACT_APP_RAWG_API_KEY}&dates=${lastYear},${currentDate}&ordering=-release&page_size=10`;
//
export const popularGamesURL = () => `${base_url}${popular_games}`;
export const upcomingGamesURL = () => `${base_url}${upcoming_games}`;
export const newGamesURL = () => `${base_url}${newGames}`;
