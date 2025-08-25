import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface VoucherCodeProps {
  onApply: (code: string) => void;
}

export const VoucherCode = ({ onApply }: VoucherCodeProps) => {
  const [code, setCode] = useState("");

  const handleRedeem = () => {
    if (code.trim()) {
      onApply(code.trim());
      setCode("");
    }
  };

  return (
    <div className="flex items-center py-6  max-w-[500px] w-full ">
      <Input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Voucher code"
        className="py-6 rounded-none"
      />
      <Button
        onClick={handleRedeem}
        className="bg-blue-600 py-6 rounded-none text-primary-foreground hover:bg-blue-600"
      >
        Redeem
      </Button>
    </div>
  );
};
