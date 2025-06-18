import {describe, it, expect} from 'bun:test';
import {Card} from '../logic/Card';
import type { Rank, Suit } from '../type/CardType';
import { ca } from 'zod/v4/locales';


describe("Card value", () => {
    it("should return the correct card value for each rank", () => {
        const cardValues = new Map<Rank,number>([
            ['2', 2], ['3', 3], ['4', 4], ['5', 5],
            ['6', 6], ['7', 7], ['8', 8], ['9', 9],
            ['10', 0], ['Jack', 0], ['Queen', 0],
            ['King', 0], ['Ace', 1]
        ]);
        const suits : Suit[] = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

        cardValues.forEach((value, rank) => {
            cardValues.forEach((value, rank) => {
                suits.forEach((suit) => {
                    const card = new Card(rank, suit);
                    expect(card.getCardValue()).toBe(value);
                    expect(card.getCardName()).toBe(`${suit}-${rank}`);
                    console.log(`Card: ${card.getCardName()}, Value: ${card.getCardValue()}`);
                });
            });
        });
    });


});