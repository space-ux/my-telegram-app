"use client";
import { useEffect, useState } from "react";

export default function BalanceDisplay() {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("http://localhost:4000/api/user/1");
        const user = await res.json(); 
        // user.balance
        setBalance(user.balance);
      } catch (err) {
        console.error("Ошибка при получении пользователя:", err);
      }
    }

    fetchUser();
  }, []);

  if (balance === null) {
    return <div>Loading balance...</div>;
  }

  return <div>Текущий баланс: {balance.toFixed(2)} USDT.</div>;
}
