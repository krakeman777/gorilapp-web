import { describe, it, expect } from 'vitest';
import { EVOLUTION_LEVELS } from './branding';

describe('Branding Configuration Data', () => {
  it('should have exactly 10 evolution levels per brand manual', () => {
    expect(EVOLUTION_LEVELS.length).toBe(10);
  });

  it('should have "El Monolito" as the final level', () => {
    const finalLevel = EVOLUTION_LEVELS[EVOLUTION_LEVELS.length - 1];
    expect(finalLevel.title).toBe('El Monolito');
  });

  it('should start with "Sujeto Base"', () => {
    expect(EVOLUTION_LEVELS[0].title).toBe('Sujeto Base');
  });
});
