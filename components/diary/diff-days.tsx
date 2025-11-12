"use client";

import { differenceInDays } from "date-fns";

export default function DiffDays({ day }: { day: Date }) {
  return <strong>{differenceInDays(day, "2023-07-27")}</strong>;
}
