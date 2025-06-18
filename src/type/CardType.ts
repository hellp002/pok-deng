import zod from 'zod';

export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'Jack' | 'Queen' | 'King' | 'Ace';
export type Suit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';

export interface ICard {
    getCardName(): string;
    getCardValue(): number;

    getCardRank(): Rank;
    getCardSuit(): Suit;
}

