import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
  className?: string;
}

export const Spinner = ({ className }: Props) => {
  return (
    <AiOutlineLoading3Quarters
      className={cn("mr-2 h-4 w-4 animate-spin", className)}
    />
  );
};
