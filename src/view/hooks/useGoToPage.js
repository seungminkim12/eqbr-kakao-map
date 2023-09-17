import React from "react";
import { useNavigate } from "react-router-dom";

export default function useGoToPage(url) {
  useNavigate(url);
  return;
}
