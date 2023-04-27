import { type orderStatus } from "@prisma/client";

export function orderProgress(status: orderStatus) {
  switch (status) {
    case "DRAFT":
      return 0;
    case "pendingQuote":
      return 20;
    case "pendingpayment":
      return 40;
    case "inProduction":
      return 60;
    case "completed":
      return 100;
    case "deliverd":
      return 80;
    case "inRepair":
      return 60;
  }
  return 0;
}
