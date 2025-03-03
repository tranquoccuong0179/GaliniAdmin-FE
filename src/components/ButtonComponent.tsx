import React, { useState } from 'react'
import { Button } from "antd";

interface ButtonProps {
    text: string,
    onClick: () => void;
    icon?: React.ReactNode;
    loading?: boolean;
}

export const ButtonComponent : React.FC<ButtonProps> = ({text, onClick, icon, loading}) => {
    const [isLoading, setIsLoading] = useState<boolean>(loading || false);
    // const handleClick = async () => {
    //   if (onClick) {
    //       setIsLoading(true);
    //       onClick();
    //       setTimeout(() => setIsLoading(false), 3000);
    //     }
    //   };
    const handleClick = async () => {
      if (onClick) {
          setIsLoading(true);
          try {
              await onClick();
          } finally {
              setIsLoading(false);
          }
      }
  };
  return (
    <Button
      type="text"
      icon={icon}
      loading={isLoading}
      onClick={handleClick}
      style={{
        backgroundColor: "#F7DCFF",
        color: "#9255BE", 
        borderRadius: "999px",
        fontSize: "18px",
        fontWeight: "bold",
        padding: "12px 40px", 
        width: "220px",
        height: "40px",
        textAlign: "center",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "background 0.3s ease",
      }}
      className="hover:bg-pink-300"
    >
      {text}
    </Button>
  )
}
