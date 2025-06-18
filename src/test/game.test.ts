import {describe, it, expect} from 'bun:test';
import { Game } from '../logic/Game';

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
});