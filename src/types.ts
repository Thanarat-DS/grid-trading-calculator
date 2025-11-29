export interface TradeRow {
    level: number;
    price: number;
    lot: number;
    margin: number;
    accumulatedLot: number;
    distance: number;
    profitPerGrid: number;
    drawdownAtBottom: number;
}

export interface CalculationResult {
    totalTrades: number;
    totalLot: number;
    maxMargin: number;
    maxDrawdown: number;
    requiredCapital: number;
    rows: TradeRow[];
}
