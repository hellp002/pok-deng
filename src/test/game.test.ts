import {describe, it, expect} from 'bun:test';
import { Game } from '../logic/Game';
import { Card } from '../logic/Card';
import type { Rank, Suit } from '../type/CardType';

describe("Game", () => {
    it("should initialize with 0 chips and 0 bet amount", () => {
        const game = new Game();
        expect(game.getPlayerChips()).toBe(0);
        expect(game.getBetAmount()).toBe(0);
    });

    it("should allow placing a bet and deduct chips", () => {
        const game = new Game();
        game.placeBet(100);
        expect(game.getBetAmount()).toBe(100);
        expect(game.getPlayerChips()).toBe(-100); // Chips can be negative
    });

    it("should not allow placing a bet of 0 or negative amount", () => {
        const game = new Game();
        game.placeBet(0);
        expect(game.getBetAmount()).toBe(0);
        expect(game.getPlayerChips()).toBe(0);

        game.placeBet(-50);
        expect(game.getBetAmount()).toBe(0);
        expect(game.getPlayerChips()).toBe(0);
    });

    it("should check the winner correctly", () => {
        const game = new Game();
        const playerCards = [new Card("10", "Hearts"), new Card("Ace", "Diamonds")];
        // Player's score is 1 (Ace) + 0 (10) = 1
        const dealerCards = [new Card("9", "Clubs"), new Card("Queen", "Spades")];
        // Dealer's score is 0 (Queen) + 9 = 9

        const result = game.checkWinner(playerCards, dealerCards);
        expect(result).toBe("DEALER_WIN");

        playerCards[0] = new Card("8", "Hearts");
        // Player's score is 8 + 1 = 9
        const result2 = game.checkWinner(playerCards, dealerCards);
        expect(result2).toBe("TIE");

        dealerCards[0] = new Card("7", "Clubs");
        // Dealer's score is 7 + 0 = 7
        const result3 = game.checkWinner(playerCards, dealerCards);
        expect(result3).toBe("PLAYER_WIN");
    });
});