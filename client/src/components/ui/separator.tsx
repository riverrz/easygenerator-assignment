import React from "react";

interface Props {
  content?: React.ReactNode;
}

export const Seperator = ({ content }: Props) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t"></span>
      </div>
      {content && (
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {content}
          </span>
        </div>
      )}
    </div>
  );
};
