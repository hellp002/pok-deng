import type { Rank, Suit } from "../type/CardType";
import { Card } from "./Card";
import { Stack } from "./Stack";

export class Deck {
    private cardStack: Stack<Card>;

    constructor() {
        this.cardStack = new Stack<Card>();
    }

    initializeDeck(): void {
        const shuffledDeck = this.shuffleDeck(this.createDeck());
        for (const card of shuffledDeck) {
            this.cardStack.push(card);
        }
    }

    drawCard(): Card  {
        if (this.cardStack.isEmpty()) {
            throw new Error("Deck is empty, cannot draw a card.");
        }
        return this.cardStack.pop() as Card;
    }

    createDeck(): Card[]{ 
        const suits: Suit[] = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const ranks: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
        const deck: Card[] = [];

        for (const suit of suits) {
            for (const rank of ranks) {
                deck.push(new Card(rank, suit));
            }
        }

        return deck;
    }

    shuffleDeck(deck: Card[]): Card[] {
        if (deck.length === 0) {
            throw new Error("Deck is empty, cannot shuffle.");
        }
        const shuffledDeck: Card[] = [...deck];
        // Fisher-Yates shuffle algorithm
        for (let i = shuffledDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
        }
        return shuffledDeck;
    }
    
}