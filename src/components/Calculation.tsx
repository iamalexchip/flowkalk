import { CalcChangeEvent, ICalculation } from "../types";

type Props = {
  data: ICalculation,
  positions: number[],
  onChange: CalcChangeEvent,
  deleteCalc: () => void,
}

export function Calculation({ data, positions, onChange, deleteCalc }: Props) {
  const handleChange = (calculation: Partial<ICalculation>) => {
    onChange({ ...data, ...calculation });
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body p-2">
        <div className="flex justify-between w-full">
          <div className="flex space-x-2">
            <select
              className="select select-bordered w-20 max-w-xs"
              value={data.pos}
              onChange={e => handleChange({ pos: Number(e.target.value) })}
            >
              {positions.map(pos =>
                <option key={pos} value={pos}>{pos}</option>
              )}
            </select>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={data.name}
              onChange={e => handleChange({ name: e.target.value })}
            />
          </div>
          <button className="btn btn-circle btn-outline" onClick={deleteCalc}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <input
          type="text"
          placeholder="Bio"
          className="input input-bordered w-full"
          value={data.content}
          onChange={e => handleChange({ content: e.target.value })}
        />
        <div className="text-right font-bold mr-4">{data.result || 'NULL'}</div>
      </div>
    </div>
  );
}
