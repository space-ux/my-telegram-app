"use client";
import { useState, useEffect } from "react";
import { Wallet } from "lucide-react";

export default function WalletPopup() {
  const [balance, setBalance] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchBalance() {
      try {
        const res = await fetch("http://localhost:4000/api/user/1");
        const data = await res.json();
        setBalance(data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
    fetchBalance();
  }, []);

  const handleDeposit = () => {
    alert("Deposit interface");
  };

  const handleWithdraw = () => {
    alert("Withdraw interface");
  };

  return (
    <div className="fixed top-4 right-4 text-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg"
      >
        <Wallet className="w-6 h-6 mr-2" />
        Wallet
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 p-4 bg-blue-800 text-white rounded shadow-lg z-10">
          {balance !== null ? (
            <div className="mb-4">Balance: {balance.toFixed(2)} USDT</div>
          ) : (
            <div className="mb-4">Loading balance...</div>
          )}
          <div className="flex justify-between">
            <button
              onClick={handleDeposit}
              className="bg-green-500 hover:bg-green-600 py-1 px-3 rounded"
            >
              Deposit
            </button>
            <button
              onClick={handleWithdraw}
              className="bg-red-500 hover:bg-red-600 py-1 px-3 rounded"
            >
              Withdraw
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
