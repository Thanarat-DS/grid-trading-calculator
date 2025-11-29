import React from 'react';

interface InputGroupProps {
    label: string;
    value: string;
    onChange: (val: string) => void;
    placeholder: string;
    icon?: React.ReactNode;
    hint?: string;
}

export const InputGroup: React.FC<InputGroupProps> = ({
    label,
    value,
    onChange,
    placeholder,
    icon,
    hint
}) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            {label}
            {icon && <span className="text-slate-500">{icon}</span>}
        </label>
        <div className="relative group">
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-mono placeholder-slate-600"
            />
        </div>
        {hint && <span className="text-[10px] text-slate-500">{hint}</span>}
    </div>
);
