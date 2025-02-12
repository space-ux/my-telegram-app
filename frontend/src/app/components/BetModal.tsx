"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface BetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBet: (amount: number) => void;
  direction: "up" | "down" | null;
  currentRate: number;
}

export default function BetModal({
  isOpen,
  onClose,
  onBet,
  direction,
}: BetModalProps) {
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userAmount = parseFloat(amount);
    if (isNaN(userAmount) || userAmount <= 0) {
      alert("Invalid bet amount");
      return;
    }
    try {
      const resp = await fetch("https://my-telegram-app-pnaw.onrender.com/api/createBetInvoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ direction, userAmount }),
      });
      const data = await resp.json();
      if (data.invoice_url) {
        window.open(data.invoice_url, "_blank");
        alert("Please follow the link to complete your bet payment.");
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Error creating invoice.");
    }
    setAmount("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-blue-800 text-white text-center">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Place Bet {direction === "up" ? "" : ""}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder=""
            className="bg-blue-700 text-white border-blue-600 rounded-md mx-auto block text-center appearance-none"
          />
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
            Confirm Bet
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
