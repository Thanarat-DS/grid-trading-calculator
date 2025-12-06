import { useState } from 'react';
import { Header } from './components/Header';
import { ConfigurationPanel } from './components/ConfigurationPanel';
import { ResultsTable } from './components/ResultsTable';
import { useGridCalculation } from './hooks/useGridCalculation';

const App = () => {
  // --- State ---
  const [upperPrice, setUpperPrice] = useState<string>('4400');
  const [lowerPrice, setLowerPrice] = useState<string>('4000');
  const [gridStep, setGridStep] = useState<string>('50'); // Points ($)
  const [initialLot, setInitialLot] = useState<string>('0.01');
  const [leverage, setLeverage] = useState<string>('500');
  const [direction, setDirection] = useState<'Long' | 'Short'>('Long');

  // Optional / Martingale
  const [useMartingale, setUseMartingale] = useState<boolean>(false);
  const [multiplier, setMultiplier] = useState<string>('2.0');
  const [isPortCent, setIsPortCent] = useState<boolean>(false);

  // --- Calculation Logic ---
  const result = useGridCalculation({
    upperPrice,
    lowerPrice,
    gridStep,
    initialLot,
    leverage,
    direction,
    useMartingale,
    multiplier,
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-amber-500 selection:text-white pb-12">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <ConfigurationPanel
            direction={direction}
            setDirection={setDirection}
            upperPrice={upperPrice}
            setUpperPrice={setUpperPrice}
            lowerPrice={lowerPrice}
            setLowerPrice={setLowerPrice}
            gridStep={gridStep}
            setGridStep={setGridStep}
            initialLot={initialLot}
            setInitialLot={setInitialLot}
            leverage={leverage}
            setLeverage={setLeverage}
            useMartingale={useMartingale}
            setUseMartingale={setUseMartingale}
            multiplier={multiplier}
            setMultiplier={setMultiplier}
            isPortCent={isPortCent}
            setIsPortCent={setIsPortCent}
          />

          <ResultsTable result={result} direction={direction} isPortCent={isPortCent} />
        </div>
      </main>
    </div>
  );
};

export default App;
