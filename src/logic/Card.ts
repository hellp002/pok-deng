// This is a class for Card
import type { ICard, Rank, Suit } from "../type/CardType";


export class Card implements ICard {
    private rank: Rank;
    private suit: Suit;
    private static readonly cardValue: Map<Rank, number> = new Map<Rank, number>([
        ['2', 2], ['3', 3], ['4', 4], ['5', 5],
        ['6', 6], ['7', 7], ['8', 8], ['9', 9],
        ['10', 0], ['Jack', 0], ['Queen', 0],
        ['King', 0], ['Ace', 1]
    ]);
    

    constructor(rank: Rank, suit: Suit) {
        this.rank = rank;
        this.suit = suit;
    }

    getCardName(): string {
        return `${this.suit}-${this.rank}`;
    }

    getCardValue(): number {
        return Card.cardValue.get(this.rank) || 0;
    }

    getCardRank(): Rank {
        return this.rank;
    }

    getCardSuit(): Suit {
        return this.suit;
    }
}