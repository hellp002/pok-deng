import { Card } from "./Card";



export class Game{

    private playerChips: number; // Player's chips can be negative
    private playerCards: Card[];
    private dealerCards: Card[];

    private betAmount: number; // Amount bet by the player

    constructor() {
        this.playerChips = 0; // Initialize player chips to 0
        this.betAmount = 0; // Initialize bet amount to 0
        this.playerCards = [];
        this.dealerCards = [];
    }

    getPlayerChips(): number {
        return this.playerChips;
    }

    getBetAmount(): number {
        return this.betAmount;
    }

    placeBet(amount: number): void {
        if (amount <= 0) {
            console.error("Bet amount must be greater than 0.");
            return;
        }
        // allowing negative chips for betting
        this.betAmount = amount;
        this.playerChips -= amount; // Deduct bet amount from player's chips

    }



    getPlayerCards(): Card[] {
        return this.playerCards;
    }

    getDealerCards(): Card[] {
        return this.dealerCards;
    }

    calculateScore(cards: Card[]): number {
        let score = 0;
        cards.forEach(card => {
            score += card.getCardValue();
        });
        return score;
    }
}