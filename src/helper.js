function creationDate(milliseconds) {
  const time = Date.now() - milliseconds;
  const sec = Math.floor(time / 1000);
  const hour = Math.floor(sec / 3600);
  if (hour === 1) return 'Fyrir klukkutíma síðan';
  if (hour <= 24) return `Fyrir ${hour} kukkustundum síðan`;
  const day = Math.floor(hour / 24);
  if (day === 1) return 'Fyrir 1 degi síðan';
  if (day <= 7) return `Fyrir ${day} dögum síðan`;
  const week = Math.floor(day / 7);
  if (week === 1) return 'Fyrir 1 viku síðan';
  if (week <= 4) return `Fyrir ${week} vikum síðan`;
  const month = Math.floor(day / 30);
  if (month === 1) return 'Fyrir 1 mánuði síðan';
  if (month <= 11) return `Fyrir ${month} mánuðum siðan`;
  const year = Math.floor(month / 12);
  if (year === 1) return 'Fyrir 1 ári síðan';
  return `Fyrir ${year} árum síðan`;
}

function timestamp(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  if (sec < 10) return `${min}:0${sec}`;
  return `${min}:${sec}`;
}

module.exports = {
  creationDate,
  timestamp,
};
