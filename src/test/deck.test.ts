import {describe, it, expect} from 'bun:test';
import {Deck} from '../logic/Deck';
import type { Rank, Suit } from '../type/CardType';

describe("Deck", () => {
    it("should create a deck with 52 unique cards", () => {
        
        const deck = new Deck();
        const cards = deck.createDeck();
        expect(cards.length).toBe(52);
        const uniqueCards = new Set(cards.map(card => card.getCardName()));
        expect(uniqueCards.size).toBe(52);
    });
    it("Each card rank should have a unique 4 suits", () => {
        const deck = new Deck();
        const cards = deck.createDeck();
        const rankSuitMap = new Map<Rank, Set<Suit>>();

        cards.forEach(card => {
            const rank = card.getCardRank();
            const suit = card.getCardSuit();
            if (!rankSuitMap.has(rank)) {
                rankSuitMap.set(rank, new Set());
            }
            rankSuitMap.get(rank)?.add(suit);
        });

        rankSuitMap.forEach(suits => {
            expect(suits.size).toBe(4); // Each rank should have 4 unique suits
        });
    });

    it("each suit should have 13 unique ranks", () => {
        const deck = new Deck();
        const cards = deck.createDeck();
        const suitRankMap = new Map<Suit, Set<Rank>>();

        cards.forEach(card => {
            const suit = card.getCardSuit();
            const rank = card.getCardRank();
            if (!suitRankMap.has(suit)) {
                suitRankMap.set(suit, new Set());
            }
            suitRankMap.get(suit)?.add(rank);
        });

        suitRankMap.forEach(ranks => {
            expect(ranks.size).toBe(13); // Each suit should have 13 unique ranks
        });
    });

    it("should shuffle the deck", () => {
        const deck = new Deck();
        let sameOrderCount = 0;
        for (let i = 0; i < 100; i++) {
            const shuffledDeck = deck.shuffleDeck(deck.createDeck());
            if (shuffledDeck.every((card, index) => card.getCardName() === deck.createDeck()[index].getCardName())) {
                sameOrderCount++;
            }
        }
        // expect the deck to not be in the same order after shuffling but there might be a small chance it is in the same order
        expect(sameOrderCount).toBeLessThan(5); // The deck should not be in the same order after shuffling
    })
})