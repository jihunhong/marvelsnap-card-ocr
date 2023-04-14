import axios from "axios";
import { CARD_API_END_POINT } from "../config";

export const fetchCards = async (): Promise<[null | Array<Card>]> => {
  try {
    const response = await axios.get(CARD_API_END_POINT);
    if (response?.data?.items) {
      const arranged: [Card] = response.data.items.map((v: Card) => {
        return {
          name: v.en.toLowerCase(),
          cardDefId: v.cardDefId,
        };
      });
      return [arranged];
    }
    return [null];
  } catch (err: any) {
    console.error(err.message);
    return [null];
  }
};
