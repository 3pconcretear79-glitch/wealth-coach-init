/**
 * Tests for the Founder's Deal pricing update on the Pro plan.
 */
import { readFileSync } from 'fs';
import { join } from 'path';

const PRICING_FILES = [
  join(__dirname, '..', 'components', 'Pricing.tsx'),
  join(__dirname, '..', 'app', 'components', 'Pricing.tsx'),
];

describe("Founder's Deal — Pro plan pricing update", () => {
  PRICING_FILES.forEach((filePath) => {
    const label = filePath.includes('app/components') ? 'app/components/Pricing.tsx' : 'components/Pricing.tsx';

    describe(label, () => {
      let content: string;

      beforeAll(() => {
        content = readFileSync(filePath, 'utf-8');
      });

      it('shows $19 as the displayed price for Pro plan', () => {
        expect(content).toContain('price: "$19"');
      });

      it('does NOT still show $29 as the displayed price', () => {
        expect(content).not.toContain('price: "$29"');
      });

      it('has priceValue of 19 (so PayPal charges $19)', () => {
        expect(content).toContain('priceValue: 19,');
      });

      it('does NOT have priceValue of 29 (old charge amount)', () => {
        expect(content).not.toContain('priceValue: 29,');
      });

      it("includes 'Limited Time Founder's Price' badge text", () => {
        expect(content).toContain("Limited Time Founder's Price");
      });

      it('keeps Enterprise priceValue at 99 (unchanged)', () => {
        expect(content).toContain('priceValue: 99,');
      });

      it('keeps Enterprise price at $99 (unchanged)', () => {
        expect(content).toContain('price: "$99"');
      });
    });
  });
});
