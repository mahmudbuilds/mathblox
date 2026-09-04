import React, { useState } from 'react';
import { TABLE_METADATA } from '../services/multiplicationData';
import { soundService } from '../services/sound';
import { Lightbulb, Grid, Layers } from 'lucide-react';

export const StudyGrid: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<number>(6);
  const [selectedCol, setSelectedCol] = useState<number>(7);
  const [filterTable, setFilterTable] = useState<number | null>(null);

  const product = selectedRow * selectedCol;
  const tableInfo = TABLE_METADATA[selectedRow];

  const handleCellClick = (r: number, c: number) => {
    setSelectedRow(r);
    setSelectedCol(c);
    soundService.playClick();
  };

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900/60 via-purple-900/60 to-slate-900/60 border-4 border-indigo-500/40 p-4 sm:p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📐</span>
            <h2 className="font-blox text-2xl sm:text-3xl text-yellow-300">
              Interactive 12x12 Matrix
            </h2>
          </div>
          <p className="text-slate-300 text-sm mt-1 max-w-xl">
            Tap any block in the grid to see how multiplication works with real Roblox blocks,
            repeated addition, and secret memory rhymes!
          </p>
        </div>

        {/* Quick Table Filter Chips */}
        <div className="flex flex-wrap gap-1.5 justify-center">
          <button
            onClick={() => {
              setFilterTable(null);
              soundService.playClick();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-blox border-2 transition-all ${
              filterTable === null
                ? 'bg-amber-400 text-zinc-950 border-amber-300 shadow'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            Show All
          </button>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
            <button
              key={num}
              onClick={() => {
                setFilterTable(filterTable === num ? null : num);
                setSelectedRow(num);
                soundService.playClick();
              }}
              className={`w-8 h-8 rounded-lg text-xs font-blox border-2 transition-all flex items-center justify-center ${
                filterTable === num
                  ? 'bg-amber-400 text-zinc-950 border-amber-300 scale-110 shadow'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* The 12x12 Grid Table */}
        <div className="lg:col-span-8 bg-slate-900/90 border-4 border-slate-800 p-3 sm:p-5 rounded-2xl shadow-xl overflow-x-auto">
          <div className="min-w-[480px]">
            {/* Header Row (Columns 1-12) */}
            <div className="grid grid-cols-13 gap-1 mb-1">
              <div className="h-8 sm:h-9 flex items-center justify-center font-blox text-xs text-slate-500 bg-slate-950/60 rounded-md">
                ✖
              </div>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((col) => (
                <div
                  key={col}
                  className={`h-8 sm:h-9 flex items-center justify-center font-blox text-xs sm:text-sm rounded-md border-b-2 transition-colors ${
                    selectedCol === col
                      ? 'bg-yellow-400 text-zinc-950 font-black border-yellow-600 shadow'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {col}
                </div>
              ))}
            </div>

            {/* Grid Rows */}
            {Array.from({ length: 12 }, (_, rIndex) => {
              const row = rIndex + 1;
              const isFiltered = filterTable === null || filterTable === row;

              return (
                <div key={row} className="grid grid-cols-13 gap-1 mb-1">
                  {/* Row Header */}
                  <div
                    className={`h-8 sm:h-9 flex items-center justify-center font-blox text-xs sm:text-sm rounded-md border-r-2 transition-colors ${
                      selectedRow === row
                        ? 'bg-yellow-400 text-zinc-950 font-black border-yellow-600 shadow'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {row}
                  </div>

                  {/* 12 Cells in this row */}
                  {Array.from({ length: 12 }, (_, cIndex) => {
                    const col = cIndex + 1;
                    const cellVal = row * col;
                    const isSelected = selectedRow === row && selectedCol === col;
                    const isInRowOrCol = selectedRow === row || selectedCol === col;
                    const isDiagonal = row === col;

                    return (
                      <button
                        key={col}
                        onClick={() => handleCellClick(row, col)}
                        className={`h-8 sm:h-9 rounded-md font-bold text-[11px] sm:text-xs transition-all relative group flex items-center justify-center border ${
                          isSelected
                            ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 text-zinc-950 font-black border-yellow-100 scale-110 z-20 shadow-lg ring-2 ring-yellow-400'
                            : isInRowOrCol && isFiltered
                            ? 'bg-indigo-900/70 text-yellow-200 border-indigo-700 font-extrabold'
                            : isDiagonal && isFiltered
                            ? 'bg-purple-900/60 text-purple-200 border-purple-700/60'
                            : isFiltered
                            ? 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-700 hover:text-white'
                            : 'bg-slate-900/40 text-slate-600 border-slate-800/40'
                        }`}
                      >
                        {cellVal}
                        {isDiagonal && !isSelected && (
                          <span className="absolute bottom-0.5 right-0.5 w-1 h-1 bg-purple-400 rounded-full"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-4 px-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-purple-600"></span>
              Diagonal = Square numbers (e.g. 5×5, 8×8)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-yellow-400"></span>
              Selected fact
            </span>
          </div>
        </div>

        {/* Visualizer & Memory Tricks Panel */}
        <div className="lg:col-span-4 space-y-4">
          {/* Active Problem Display Box */}
          <div className="bg-slate-900/90 border-4 border-amber-500/50 p-5 rounded-2xl shadow-xl">
            <div className="text-center pb-3 border-b-2 border-slate-800">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Active Fact
              </span>
              <div className="font-blox text-3xl sm:text-4xl text-white mt-1 flex items-center justify-center gap-3">
                <span className="bg-indigo-600/60 px-3 py-1 rounded-xl border border-indigo-400/50">
                  {selectedRow}
                </span>
                <span className="text-amber-400">✖</span>
                <span className="bg-purple-600/60 px-3 py-1 rounded-xl border border-purple-400/50">
                  {selectedCol}
                </span>
                <span className="text-slate-400">=</span>
                <span className="bg-yellow-400 text-zinc-950 px-4 py-1 rounded-xl border-b-3 border-yellow-600 font-black shadow">
                  {product}
                </span>
              </div>
            </div>

            {/* Visual Roblox Blocks Array */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                <span className="flex items-center gap-1">
                  <Grid className="w-3.5 h-3.5 text-cyan-400" />
                  Visual Block Array ({selectedRow} rows × {selectedCol} columns)
                </span>
                <span className="text-yellow-400">{product} Blox Total</span>
              </div>

              {/* Render Block Array */}
              <div className="bg-slate-950/80 p-3 rounded-xl border-2 border-slate-800 flex items-center justify-center overflow-auto max-h-56">
                <div
                  className="grid gap-1"
                  style={{
                    gridTemplateColumns: `repeat(${selectedCol}, minmax(0, 1fr))`,
                  }}
                >
                  {Array.from({ length: selectedRow * selectedCol }).map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm bg-gradient-to-tr from-cyan-500 to-blue-500 border border-cyan-300/60 shadow-[inset_0_-2px_0_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-125 transition-transform"
                      title={`Block #${i + 1}`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Repeated Addition */}
              <div className="mt-3 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700 text-center">
                <span className="text-[11px] font-bold text-slate-400">Repeated Addition:</span>
                <p className="text-xs sm:text-sm font-black text-cyan-300 mt-0.5">
                  {Array.from({ length: selectedRow }, () => selectedCol).join(' + ')} = {product}
                </p>
              </div>

              <p className="text-[11px] text-slate-400 text-center mt-2 italic">
                Turn it around! {selectedCol} × {selectedRow} = {product} too!
              </p>
            </div>
          </div>

          {/* Table Trick & Rhyme */}
          {tableInfo && (
            <div className="bg-gradient-to-br from-purple-950/70 to-indigo-950/70 border-4 border-purple-500/40 p-4 rounded-2xl shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-300">
                <Lightbulb className="w-5 h-5 text-yellow-400 animate-pulse" />
                <h4 className="font-blox text-base text-yellow-300">
                  {tableInfo.name} Secret Trick
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium bg-purple-900/30 p-2.5 rounded-xl border border-purple-700/40">
                {tableInfo.trick}
              </p>

              {tableInfo.rhyme && (
                <div className="bg-pink-950/40 border border-pink-500/40 p-2.5 rounded-xl text-center">
                  <span className="text-[10px] uppercase font-black tracking-wider text-pink-400">
                    Catchy Rhyme
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-pink-200 mt-0.5 italic">
                    "{tableInfo.rhyme}"
                  </p>
                </div>
              )}

              {/* Skip Counting Track */}
              <div>
                <span className="text-[11px] font-bold text-purple-300 flex items-center gap-1 mb-1">
                  <Layers className="w-3.5 h-3.5" /> Skip Count by {selectedRow}s:
                </span>
                <div className="flex flex-wrap gap-1">
                  {tableInfo.skipCount.map((num, idx) => (
                    <span
                      key={idx}
                      className={`text-[11px] font-black px-1.5 py-0.5 rounded ${
                        num === product
                          ? 'bg-yellow-400 text-zinc-950 shadow ring-2 ring-yellow-200'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
