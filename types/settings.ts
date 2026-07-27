import { Currency, Theme } from "@prisma/client";

export interface UpdateSettingsDTO {
  currency?: Currency;
  theme?: Theme;
}

export interface SettingsResponse {
  currency: Currency;
  theme: Theme;
}
