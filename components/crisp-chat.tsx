"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("774fc550-a88e-4792-afe9-21e0c7d6cc7b");
  }, []);

  return null;
};