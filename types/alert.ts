import { AlertCondition } from "@prisma/client";

export interface CreateAlertDTO {
  symbol: string;
  targetPrice: number;
  condition: AlertCondition;
}

export interface UpdateAlertDTO {
  targetPrice?: number;
  condition?: AlertCondition;
  enabled?: boolean;
}

export interface AlertResponse {
  id: string;
  symbol: string;
  targetPrice: number;
  condition: AlertCondition;
  enabled: boolean;
}
