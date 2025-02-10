"use client";

interface BetBarProps {
  upAmount: number;
  downAmount: number;
}

export default function BetBar({ upAmount, downAmount }: BetBarProps) {
  const total = upAmount + downAmount;
  const upPercentage = total > 0 ? (upAmount / total) * 100 : 50;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2 text-sm sm:text-base">
        <span className="text-green-500">↑ {upAmount.toFixed(2)} USDT</span>
        <span className="text-red-500">{downAmount.toFixed(2)} USDT ↓</span>
      </div>
      <div className="h-3 sm:h-4 w-full bg-gray-700 rounded-full overflow-hidden flex">
        <div
          className="h-full bg-green-500"
          style={{ width: `${upPercentage}%` }}
        />
        <div
          className="h-full bg-red-500"
          style={{ width: `${100 - upPercentage}%` }}
        />
      </div>
    </div>
  );
}
