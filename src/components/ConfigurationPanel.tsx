import { TrendingUp, TrendingDown, Settings, AlertCircle } from 'lucide-react';
import { InputGroup } from './InputGroup';

interface ConfigurationPanelProps {
    direction: 'Long' | 'Short';
    setDirection: (direction: 'Long' | 'Short') => void;
    upperPrice: string;
    setUpperPrice: (value: string) => void;
    lowerPrice: string;
    setLowerPrice: (value: string) => void;
    gridStep: string;
    setGridStep: (value: string) => void;
    initialLot: string;
    setInitialLot: (value: string) => void;
    leverage: string;
    setLeverage: (value: string) => void;
    useMartingale: boolean;
    setUseMartingale: (value: boolean) => void;
    multiplier: string;
    setMultiplier: (value: string) => void;
}

export const ConfigurationPanel = ({
    direction,
    setDirection,
    upperPrice,
    setUpperPrice,
    lowerPrice,
    setLowerPrice,
    gridStep,
    setGridStep,
    initialLot,
    setInitialLot,
    leverage,
    setLeverage,
    useMartingale,
    setUseMartingale,
    multiplier,
    setMultiplier,
}: ConfigurationPanelProps) => {
    return (
        <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-200">
                    <Settings size={20} className="text-amber-400" /> Configuration
                </h2>

                <div className="space-y-4">
                    {/* Direction Switch */}
                    <div className="p-1 bg-slate-900 rounded-lg flex relative mb-6">
                        <div
                            className={`absolute top-1 bottom-1 w-[48%] bg-slate-700 rounded-md transition-all duration-300 ${direction === 'Short' ? 'translate-x-[104%]' : 'translate-x-1'}`}
                        ></div>
                        <button
                            onClick={() => setDirection('Long')}
                            className={`flex-1 py-2 text-sm font-medium z-10 transition-colors flex items-center justify-center gap-2 ${direction === 'Long' ? 'text-green-400' : 'text-slate-400'}`}
                        >
                            <TrendingUp size={16} /> Long (Buy)
                        </button>
                        <button
                            onClick={() => setDirection('Short')}
                            className={`flex-1 py-2 text-sm font-medium z-10 transition-colors flex items-center justify-center gap-2 ${direction === 'Short' ? 'text-red-400' : 'text-slate-400'}`}
                        >
                            <TrendingDown size={16} /> Short (Sell)
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <InputGroup
                            label={direction === 'Long' ? "Grid Top Price" : "Grid Top (Stop)"}
                            value={upperPrice}
                            onChange={setUpperPrice}
                            placeholder="2050"
                            icon={<TrendingUp size={14} />}
                        />
                        <InputGroup
                            label={direction === 'Long' ? "Grid Bottom (Stop)" : "Grid Bottom Price"}
                            value={lowerPrice}
                            onChange={setLowerPrice}
                            placeholder="2000"
                            icon={<TrendingDown size={14} />}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <InputGroup label="Grid Step ($)" value={gridStep} onChange={setGridStep} placeholder="5" />
                        <InputGroup label="Start Lot" value={initialLot} onChange={setInitialLot} placeholder="0.01" />
                    </div>

                    <InputGroup label="Leverage (1:X)" value={leverage} onChange={setLeverage} placeholder="500" />
                </div>

                {/* Martingale Section */}
                <div className="mt-6 pt-6 border-t border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                            Martingale Multiplier
                        </label>
                        <button
                            onClick={() => setUseMartingale(!useMartingale)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${useMartingale ? 'bg-amber-500' : 'bg-slate-600'}`}
                        >
                            <span className={`${useMartingale ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                        </button>
                    </div>

                    <div className={`transition-all duration-300 overflow-hidden ${useMartingale ? 'max-h-20 opacity-100' : 'max-h-0 opacity-50'}`}>
                        <InputGroup
                            label="Multiplier Factor"
                            value={multiplier}
                            onChange={setMultiplier}
                            placeholder="2.0"
                            hint="Next Lot = Previous Lot × Multiplier"
                        />
                    </div>
                </div>
            </div>

            {/* Warning Card */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3 items-start">
                <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={20} />
                <div className="text-sm text-amber-200/80">
                    <p className="font-semibold text-amber-500 mb-1">Risk Disclaimer</p>
                    Calculations based on XAUUSD standard contract size (100). "Required Capital" assumes the worst-case scenario where price moves through your entire grid range.
                </div>
            </div>
        </div>
    );
};
