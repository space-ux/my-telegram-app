"use client";
import { useEffect, useState } from "react";

export default function BalanceButton() {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    async function fetchBalance() {
      try {
        const res = await fetch("http://localhost:4000/api/user/1");
        // Проверьте, что res.ok === true (статус 200)
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log("Received balance data:", data);  // Добавьте лог для отладки
        setBalance(data.balance);
      } catch (error) {
        console.error("Ошибка при получении баланса:", error);
      }
    }
    fetchBalance();
  }, []);

  const handleClick = () => {
    alert("Deposit/Withdraw interface");
  };

  return (
    <button 
      onClick={handleClick}
      className="fixed top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg"
    >
      {balance !== null ? `Баланс: ${balance.toFixed(2)} USDT` : "Загрузка баланса..."}
    </button>
  );
}
