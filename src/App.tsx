import { useMemo, useState } from "react";
import "./App.css";
import { Calculation } from "./components/Calculation";
import { CalcChangeEvent, ICalculation, Variable } from "./types";
import { calculate } from "./utils";

const initalData = [
  {
    id: 1,
    name: 'Some calc',
    content: '{Rate} + 50',

    pos: 2,
  },
  {
    id: 2,
    name: 'Rate',
    content: '5*50',
    pos: 1,
  }
]

function App() {
  const [calculations, setCalculations] = useState<ICalculation[]>(initalData);
  const { sortedCalculations, positions } = useMemo(() => {
    const positions = Array.from({ length: calculations.length }, (_, i) => i + 1);
    const tempCalculations = calculations.sort((a, b) => a.pos - b.pos);
    let sortedCalculations = [];
    let variables: Variable[] = [];

    for (const calculation of tempCalculations) {
      const result = calculate(calculation.content, variables)
      sortedCalculations.push({ ...calculation, result })
      if (calculation.name) {
        variables.push({ name: calculation.name.toLowerCase(), value: result });
      }
    }

    return {
      sortedCalculations: sortedCalculations,
      positions,
    };
  }, [calculations]);

  const onDeleteCalc = (id: number) => setCalculations(
    sortedCalculations
      .filter(calc => calc.id !== id)
      .map((calc, index) => ({ ...calc, pos: index + 1 }))
  );
  const editCalc = (calculation: ICalculation, calculationData: Partial<ICalculation>) => {
    if (calculation.id === calculationData.id) {

      return {
        ...calculation,
        ...calculationData,
      };
    }

    if (calculation.pos === calculationData.pos) {
      const swappedCalculation = calculations.find(calc => calc.id === calculationData.id);
      if (swappedCalculation) {
        return {
          ...calculation,
          pos: swappedCalculation.pos
        };
      } else {
        console.error('Errors swapping position');
      }
    }

    return calculation;
  }

  const onEditCalc: CalcChangeEvent = (calculationData) => {
    let updatedCalculations = [];
    for (const calculation of calculations) {
      const updatedCalculation = editCalc(calculation, calculationData);
      updatedCalculations.push(updatedCalculation);
    }
    setCalculations(updatedCalculations);
  }

  const onAddCalc = () =>
    setCalculations(currentCalculations => {
      const updatedCalculations = currentCalculations.map((calc, index) =>
        ({ ...calc, id: index + 1 })
      );
      return [
        ...updatedCalculations,
        {
          id: updatedCalculations.length + 1,
          name: "",
          content: "",
          pos: updatedCalculations.length + 1,
        }
      ]
    });

  return (
    <div className="bg-slate-400 min-h-screen text-slate-200">
      <div className="w-full bg-base-100 text-3xl pl-10 py-3">Flow Kalk</div>
      <div className="px-10 pt-10 space-y-4">
        {sortedCalculations.map(calculation =>
          <Calculation
            key={calculation.pos}
            data={calculation}
            positions={positions}
            onChange={onEditCalc}
            deleteCalc={() => onDeleteCalc(calculation.id)}
          />
        )}
        <div className="flex justify-center">
          <button className="btn mx-auto" onClick={onAddCalc}>Add calculation</button>
        </div>
      </div>
    </div>
  );
}

export default App;
