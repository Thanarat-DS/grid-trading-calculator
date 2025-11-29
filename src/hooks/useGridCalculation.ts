import { useMemo } from 'react';
import type { TradeRow, CalculationResult } from '../types';

interface UseGridCalculationProps {
    upperPrice: string;
    lowerPrice: string;
    gridStep: string;
    initialLot: string;
    leverage: string;
    direction: 'Long' | 'Short';
    useMartingale: boolean;
    multiplier: string;
}

export const useGridCalculation = ({
    upperPrice,
    lowerPrice,
    gridStep,
    initialLot,
    leverage,
    direction,
    useMartingale,
    multiplier,
}: UseGridCalculationProps): CalculationResult => {
    const contractSize = 100; // Standard Lot for Gold

    return useMemo(() => {
        const high = parseFloat(upperPrice) || 0;
        const low = parseFloat(lowerPrice) || 0;
        const step = parseFloat(gridStep) || 1;
        const startLot = parseFloat(initialLot) || 0;
        const lev = parseFloat(leverage) || 500;
        const mult = parseFloat(multiplier) || 1;

        if (high <= low || step <= 0 || startLot <= 0) {
            return { totalTrades: 0, totalLot: 0, maxMargin: 0, maxDrawdown: 0, requiredCapital: 0, rows: [] };
        }

        const rows: TradeRow[] = [];
        let currentLot = startLot;
        let accumulatedLot = 0;
        let totalMargin = 0;

        const range = high - low;
        const count = Math.floor(range / step) + 1;

        for (let i = 0; i < count; i++) {
            let price = 0;

            if (direction === 'Long') {
                price = high - (i * step);
                if (price < low) break;
            } else {
                price = low + (i * step);
                if (price > high) break;
            }

            if (useMartingale && i > 0) {
                currentLot = parseFloat((currentLot * mult).toFixed(2));
            }

            accumulatedLot += currentLot;

            const margin = (price * currentLot * contractSize) / lev;
            totalMargin += margin;

            let lossDistance = 0;
            if (direction === 'Long') {
                lossDistance = price - low;
            } else {
                lossDistance = high - price;
            }

            const drawdown = lossDistance * currentLot * contractSize;
            const profit = step * currentLot * contractSize;

            rows.push({
                level: i + 1,
                price: price,
                lot: currentLot,
                margin: margin,
                accumulatedLot: parseFloat(accumulatedLot.toFixed(2)),
                distance: i * step,
                profitPerGrid: profit,
                drawdownAtBottom: drawdown
            });
        }

        const totalDrawdown = rows.reduce((sum, row) => sum + row.drawdownAtBottom, 0);
        const requiredCapital = totalMargin + totalDrawdown;

        return {
            totalTrades: rows.length,
            totalLot: parseFloat(accumulatedLot.toFixed(2)),
            maxMargin: totalMargin,
            maxDrawdown: totalDrawdown,
            requiredCapital: requiredCapital,
            rows: rows
        };

    }, [upperPrice, lowerPrice, gridStep, initialLot, leverage, direction, useMartingale, multiplier]);
};
