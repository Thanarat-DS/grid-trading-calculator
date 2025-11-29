import { Calculator } from 'lucide-react';

export const Header = () => {
    return (
        <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2 rounded-lg text-slate-900 shadow-amber-500/20 shadow-lg">
                        <Calculator size={24} strokeWidth={2.5} />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-white">
                        Grid<span className="text-amber-400">Trade</span> Calc <span className="text-slate-500 text-sm font-normal ml-2 hidden sm:inline-block">XAUUSD Calculator</span>
                    </h1>
                </div>
                <div className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">
                    v1.0.0
                </div>
            </div>
        </header>
    );
};
