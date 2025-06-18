import { Card } from "./Card";
import { ask } from "./readio";
import type { GameResult, GameState } from "../type/GameState";
import { Deck } from "./Deck";

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

    checkWinner(playerCards: Card[], dealerCards: Card[]): GameResult {
        const playerScore = this.calculateScore(playerCards);
        const dealerScore = this.calculateScore(dealerCards);
        console.log(`Player score: ${playerScore}, Dealer score: ${dealerScore}`);

        if (playerScore > dealerScore) {
            return "PLAYER_WIN";
        } else if (playerScore < dealerScore) {
            return "DEALER_WIN";
        } else {
            return "TIE";
        }
    }

    async gameLoop(): Promise<void> {
        // This method would contain the main game logic, such as dealing cards, checking scores,
        //
        let gameIsRunning = true;
        let gameState: GameState = 'PUT_BET';
        let currentDeck : Deck | null = null;
        while (gameIsRunning) {
            if (gameState === 'PUT_BET') {
                const bet = await ask("Please put your bet: \n");
                if (isNaN(Number(bet)) || Number(bet) <= 0) {
                    console.log("Invalid bet amount. Please enter a positive number.");
                    continue;
                }
                this.placeBet(Number(bet));
                console.log(`You have bet ${this.betAmount} chips. Your remaining chips: ${this.playerChips}`);
                gameState = 'DEAL_CARDS';
            } else if (gameState === 'DEAL_CARDS') {
                // Deal cards to player and dealer
                currentDeck = new Deck();
                this.playerCards = [currentDeck.drawCard(), currentDeck.drawCard()];
                this.dealerCards = [currentDeck.drawCard(), currentDeck.drawCard()];
                gameState = 'PLAYER_TURN';
            } else if (gameState === 'PLAYER_TURN') {
                console.log(`You got: ${this.playerCards.map(card => card.getCardName()).join(', ')}`);
                gameState = 'DEALER_TURN';
            } else if (gameState === 'DEALER_TURN') {
                console.log(`The dealer got: ${this.dealerCards.map(card => card.getCardName()).join(', ')}`);
                gameState = 'CHECK_WINNER';
            } else if (gameState === 'CHECK_WINNER') {
                const gameResult = this.checkWinner(this.playerCards, this.dealerCards);
                if (gameResult === 'PLAYER_WIN') {
                    console.log(`You win! Receive more ${this.betAmount} chips.`);
                    this.playerChips += this.betAmount * 2; // Player wins, double the bet
                } else if (gameResult === 'DEALER_WIN') {
                    console.log(`Dealer wins! You lose your bet of ${this.betAmount} chips.`);
                } else {
                    // user gain bet amount back
                    console.log(`It's a tie! You get your bet of ${this.betAmount} chips back.`);
                    this.playerChips += this.betAmount; // Player gets back the bet amount
                }
                gameState = 'RESTARTABLE';
            } else if (gameState === 'RESTARTABLE') {
                const restart = await ask("Do you want to play again? (yes/no): \n");
                if (restart.toLowerCase() === 'yes') {
                    this.betAmount = 0; // Reset bet amount
                    this.playerCards = []; // Clear player cards
                    this.dealerCards = []; // Clear dealer cards
                    gameState = 'PUT_BET'; // Restart the game
                } else if (restart.toLowerCase() === 'no') {
                    if (this.playerChips < 0) {
                        console.log(`You lose total ${(this.playerChips)} chips.`);
                    }
                    else if (this.playerChips > 0) {
                        console.log(`You gain total ${(this.playerChips)} chips.`);
                    } else {
                        console.log(`You neither gain nor lose chips. You have ${this.playerChips} chips.`);
                    }
                    gameIsRunning = false; // Exit the game loop
                } else {
                    console.log("Invalid input. Please enter 'yes' or 'no'.");
                    continue; // Ask again
                }
            }
            
            else{
                console.log("Game state not implemented yet.");
                break;
            }

        }
        process.exit(0); // Exit the game loop
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