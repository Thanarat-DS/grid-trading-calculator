import React from 'react';

interface ResultCardProps {
    title: string;
    value: string;
    subtext: string;
    highlight?: boolean;
    color?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({
    title,
    value,
    subtext,
    highlight = false,
    color = "text-white"
}) => (
    <div className={`rounded-2xl p-6 flex flex-col justify-between h-full border transition-all ${highlight ? 'bg-gradient-to-br from-amber-500 to-amber-600 border-amber-400 text-white shadow-lg shadow-amber-500/20' : 'bg-slate-800 border-slate-700 text-slate-100'}`}>
        <div className={`text-sm font-medium mb-1 ${highlight ? 'text-amber-100' : 'text-slate-400'}`}>{title}</div>
        <div className={`text-3xl font-bold tracking-tight ${highlight ? 'text-white' : color}`}>{value}</div>
        <div className={`text-xs mt-2 ${highlight ? 'text-amber-100/80' : 'text-slate-500'}`}>{subtext}</div>
    </div>
);
