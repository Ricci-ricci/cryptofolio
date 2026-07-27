import { Network } from "@prisma/client";

export interface CreateWalletDTO {
  address: string;
  network: Network;
  name?: string;
  userid: string;
}

export interface UpdateWalletDTO {
  name?: string;
}

export interface WalletResponse {
  id: string;
  address: string;
  network: Network;
  name: string | null;
  createdAt: Date;
}
