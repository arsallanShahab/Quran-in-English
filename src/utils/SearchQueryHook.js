import { useLocation } from "react-router-dom";

export const searchQuery = () => new URLSearchParams(useLocation().search);
