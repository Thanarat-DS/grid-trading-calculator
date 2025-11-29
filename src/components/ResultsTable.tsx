import { ResultCard } from './ResultCard';
import type { CalculationResult } from '../types';

interface ResultsTableProps {
    result: CalculationResult;
    direction: 'Long' | 'Short';
}

export const ResultsTable = ({ result, direction }: ResultsTableProps) => {
    const formatCurrency = (num: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
    };

    return (
        <div className="lg:col-span-8 space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ResultCard
                    title="Total Required Capital"
                    value={formatCurrency(result.requiredCapital)}
                    subtext="Margin + Max Drawdown"
                    highlight
                />
                <ResultCard
                    title="Max Drawdown"
                    value={formatCurrency(result.maxDrawdown)}
                    subtext="Worst case floating loss"
                    color="text-red-400"
                />
                <ResultCard
                    title="Margin Used"
                    value={formatCurrency(result.maxMargin)}
                    subtext={`For ${result.totalLot.toFixed(2)} Lots`}
                    color="text-blue-400"
                />
            </div>

            {/* Table */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden flex flex-col h-[600px]">
                <div className="p-4 border-b border-slate-700 bg-slate-800/50 flex justify-between items-center backdrop-blur-sm">
                    <h3 className="font-semibold text-slate-200">Grid Levels Breakdown</h3>
                    <div className="text-xs text-slate-400 font-mono">
                        {result.totalTrades} Levels • {result.totalLot.toFixed(2)} Total Lots
                    </div>
                </div>

                <div className="overflow-auto flex-1 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800/50">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 font-semibold sticky top-0 z-10 backdrop-blur-md">
                            <tr>
                                <th className="px-6 py-3">Level</th>
                                <th className="px-6 py-3">Price</th>
                                <th className="px-6 py-3">Lot Size</th>
                                <th className="px-6 py-3">Margin</th>
                                <th className="px-6 py-3">Profit/Grid</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50 text-sm">
                            {result.rows.map((row) => (
                                <tr key={row.level} className="hover:bg-slate-700/30 transition-colors">
                                    <td className="px-6 py-3 font-mono text-slate-500">#{row.level}</td>
                                    <td className={`px-6 py-3 font-medium ${direction === 'Long' ? 'text-green-400' : 'text-red-400'}`}>
                                        {row.price.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-3 font-mono text-slate-200">{row.lot.toFixed(2)}</td>
                                    <td className="px-6 py-3 text-slate-400">${row.margin.toFixed(2)}</td>
                                    <td className="px-6 py-3 text-emerald-400 font-medium">+${row.profitPerGrid.toFixed(2)}</td>
                                </tr>
                            ))}
                            {result.rows.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        Configure inputs to see calculation results
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
