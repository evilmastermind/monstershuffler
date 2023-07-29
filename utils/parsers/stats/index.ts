export const challengeStats = {
  "0": { xp: 10, proficiency: 2 },
  "1/8": { xp: 25, proficiency: 2 },
  "1/4": { xp: 50, proficiency: 2 },
  "1/2": { xp: 100, proficiency: 2 },
  "1": { xp: 200, proficiency: 2 },
  "2": { xp: 450, proficiency: 2 },
  "3": { xp: 700, proficiency: 2 },
  "4": { xp: 1100, proficiency: 2 },
  "5": { xp: 1800, proficiency: 3 },
  "6": { xp: 2300, proficiency: 3 },
  "7": { xp: 2900, proficiency: 3 },
  "8": { xp: 3900, proficiency: 3 },
  "9": { xp: 5000, proficiency: 4 },
  "10": { xp: 5900, proficiency: 4 },
  "11": { xp: 7200, proficiency: 4 },
  "12": { xp: 8400, proficiency: 4 },
  "13": { xp: 10000, proficiency: 5 },
  "14": { xp: 11500, proficiency: 5 },
  "15": { xp: 13000, proficiency: 5 },
  "16": { xp: 15000, proficiency: 5 },
  "17": { xp: 18000, proficiency: 6 },
  "18": { xp: 20000, proficiency: 6 },
  "19": { xp: 22000, proficiency: 6 },
  "20": { xp: 25000, proficiency: 6 },
  "21": { xp: 33000, proficiency: 7 },
  "22": { xp: 41000, proficiency: 7 },
  "23": { xp: 50000, proficiency: 7 },
  "24": { xp: 62000, proficiency: 7 },
  "25": { xp: 75000, proficiency: 8 },
  "26": { xp: 90000, proficiency: 8 },
  "27": { xp: 105000, proficiency: 8 },
  "28": { xp: 120000, proficiency: 8 },
  "29": { xp: 135000, proficiency: 9 },
  "30": { xp: 155000, proficiency: 9 },
};

export function getChallengeString(CR: number) {
  if (CR <= -2.5) return "0";
  if (CR <= -1.5) return "1/8";
  if (CR <= -0.5) return "1/4";
  if (CR <= 0.5) return "1/2";
  else return Math.round(CR).toString();
}

export function getChallengeNumber(CR: string) {
  if (CR === "0") return -3;
  if (CR === "1/8") return -2;
  if (CR === "1/4") return -1;
  if (CR === "1/2") return 0;
  else return parseInt(CR);
}
