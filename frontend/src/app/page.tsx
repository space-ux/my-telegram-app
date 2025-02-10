"use client";
import { useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "./components/ui/button";

// Импортируем готовые компоненты
import DynamicRate from "./components/DynamicRate";
import BetBar from "./components/BetBar";
import BetModal from "./components/BetModal";
import BalanceButton from "./components/BalanceButton"; 
import WalletPopup from "./components/WalletPopup"; 

export default function Page() {
  const [balance, setBalance] = useState(100);
  const [isBetModalOpen, setIsBetModalOpen] = useState(false);
  const [betDirection, setBetDirection] = useState<"up" | "down" | null>(null);
  const [upAmount, setUpAmount] = useState(0);
  const [downAmount, setDownAmount] = useState(0);
  const [currentRate, setCurrentRate] = useState(70);

  const handleOpenBetModal = (direction: "up" | "down") => {
    setBetDirection(direction);
    setIsBetModalOpen(true);
  };

  const handleBet = (amount: number) => {
    if (amount > balance) {
      alert("Insufficient balance");
      return;
    }
    // Списываем сумму ставки
    setBalance(balance - amount);
    if (betDirection === "up") {
      setUpAmount(upAmount + amount);
    } else {
      setDownAmount(downAmount + amount);
    }
    setIsBetModalOpen(false);
  };

  return (
    <div className="relative">
      {/* Кнопка баланса в правом верхнем углу */}
      <WalletPopup />

      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        {/* Заголовок */}
        <h1 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-blue-200 to-purple-300 animate-pulse">
          RateBattle
        </h1>

        {/* Основной блок: курс, полоса ставок, кнопки UP/DOWN */}
        <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-8 w-full max-w-md">
          <DynamicRate onRateChange={setCurrentRate} />
          <BetBar upAmount={upAmount} downAmount={downAmount} />
          <div className="flex justify-center gap-4 sm:gap-6 w-full">
            <Button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 sm:py-6 px-6 sm:px-8 rounded-lg text-2xl sm:text-3xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg flex-1"
              onClick={() => handleOpenBetModal("up")}
            >
              ▲
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 sm:py-6 px-6 sm:px-8 rounded-lg text-2xl sm:text-3xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg flex-1"
              onClick={() => handleOpenBetModal("down")}
            >
              ▼
            </Button>
          </div>
        </div>

        <BetModal
          isOpen={isBetModalOpen}
          onClose={() => setIsBetModalOpen(false)}
          onBet={handleBet}
          direction={betDirection}
          currentRate={currentRate}
        />
      </div>
    </div>
  );
}
