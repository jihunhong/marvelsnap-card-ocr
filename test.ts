import { calculateScores } from "./src/lib/compare";
import { fetchCards } from "./src/lib/fetch";
import { singleDetect } from "./src/lib/vision";

(async () => {
  const [cards] = await fetchCards();
  const [annotations] = await singleDetect({
    url: "https://pbs.twimg.com/media/FtmP-WbagAIaGR1?format=jpg&name=medium",
  });
  if (annotations && cards) {
    const deck = annotations.map((v) => {
      return {
        target: v.description,
        scores: calculateScores(v.description, cards),
      };
    });
    console.log(deck);
  }
})();
