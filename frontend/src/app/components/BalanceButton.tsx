"use client";
import { useEffect, useState } from "react";

export default function BalanceButton() {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    async function fetchBalance() {
      try {
        const res = await fetch("http://localhost:4000/api/user/1");
        const data = await res.json();
        setBalance(data.balance);
      } catch (error) {
        console.error("Ошибка при получении баланса:", error);
      }
    }
    fetchBalance();
  }, []);

  const handleClick = () => {
    // Здесь можно добавить логику пополнения и вывода средств
    alert("Открытие интерфейса пополнения/вывода средств");
  };

  return (
    <button 
      onClick={handleClick}
      className="fixed top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg"
    >
      {balance !== null ? `: ${balance.toFixed(2)} USDT` : "Loading..."}
    </button>
  );
}
