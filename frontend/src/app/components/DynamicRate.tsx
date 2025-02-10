"use client";

import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

// Пропсы, если нужны callback
interface DynamicRateProps {
  onRateChange?: (rate: number) => void;
}

export default function DynamicRate({ onRateChange }: DynamicRateProps) {
  const [rate, setRate] = useState<number | null>(null);
  const [prevRate, setPrevRate] = useState<number | null>(null);

  useEffect(() => {
    async function fetchRate() {
      try {
        const res = await fetch("http://localhost:4000/api/rate");
        const data = await res.json();
        // Запоминаем старое значение курса, если оно уже установлено
        setPrevRate(rate);
        setRate(data.rate);
        if (onRateChange) onRateChange(data.rate);
      } catch (error) {
        console.error("Ошибка при запросе курса:", error);
      }
    }

    // Сразу при загрузке компонента
    fetchRate();

    // Затем каждые 30 сек (пример)
    const interval = setInterval(fetchRate, 30000);
    return () => clearInterval(interval);
  }, []);  // пустой массив зависимостей

  if (rate === null) {
    return <div className="text-white">Loading rate...</div>;
  }

  const isUp = prevRate !== null && rate > prevRate;

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="flex items-center justify-center">
        {prevRate !== null && (
          isUp ? (
            <ArrowUp className="text-green-500 w-8 h-8 sm:w-12 sm:h-12 mr-2" />
          ) : (
            <ArrowDown className="text-red-500 w-8 h-8 sm:w-12 sm:h-12 mr-2" />
          )
        )}
        <span className="text-4xl sm:text-6xl font-bold text-white">
          {rate.toFixed(2)}
        </span>
      </div>
      <span className="text-xl sm:text-2xl text-blue-300">RUB/USD</span>
    </div>
  );
}
