"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import DynamicRate from "../components/DynamicRate";
import BetBar from "../components/BetBar";

export default function Page() {
  const [upAmount, setUpAmount] = useState(1000);
  const [downAmount, setDownAmount] = useState(800);

  const handleVote = (direction: "up" | "down") => {
    console.log(`Voted ${direction}`);
    // Добавляем случайную сумму от 10 до 100
    const betAmount = Math.floor(Math.random() * 91) + 10;
    if (direction === "up") {
      setUpAmount(upAmount + betAmount);
    } else {
      setDownAmount(downAmount + betAmount);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-blue-900 text-white p-4 relative">
      <Link href="/" passHref>
        <Button className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full">
          <ArrowLeft size={24} />
        </Button>
      </Link>

      <div className="mt-16 mb-8 flex items-center">
        <CalendarDays className="w-10 h-10 mr-4 text-blue-300" />
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
          1 Day Market
        </h1>
      </div>

      {/* Курс доллара */}
      <DynamicRate />

      {/* Полоса (Up vs. Down) */}
      <div className="mt-8 mb-4 w-full max-w-md">
        <BetBar upAmount={upAmount} downAmount={downAmount} />
      </div>

      {/* Кнопки для голосования */}
      <div className="flex justify-center gap-6 mt-8">
        <Button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-8 rounded-lg text-3xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          onClick={() => handleVote("up")}
        >
          ▲
        </Button>
        <Button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-6 px-8 rounded-lg text-3xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          onClick={() => handleVote("down")}
        >
          ▼
        </Button>
      </div>
    </div>
  );
}
