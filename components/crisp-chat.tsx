"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("61ee5721-8495-4043-83fd-c18cba258f6f");
  }, []);

  return null;
};
