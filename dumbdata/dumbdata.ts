const data = {
  "portfolio": {
    "totalBalanceUsd": 12547.32,
    "totalProfitLoss": 1437.81,
    "profitLossPercentage": 12.94,
    "dayChange": -2.13,
    "wallets": 3,
    "assets": 8
  },
  "wallets": [
    {
      "id": 1,
      "name": "Main Wallet",
      "address": "0x8D97689C9818892B700e27F316cc3E41e17fBeb9",
      "network": "Ethereum",
      "balanceUsd": 8453.62
    },
    {
      "id": 2,
      "name": "Trading Wallet",
      "address": "0x6Fa73E0F937B6F0e84F33dA8A0A2F7d64dDa55A2",
      "network": "Base",
      "balanceUsd": 2915.27
    },
    {
      "id": 3,
      "name": "Cold Wallet",
      "address": "bc1q3fj9xxxxxxxxxxxxxxxxxxxxx",
      "network": "Bitcoin",
      "balanceUsd": 1178.43
    }
  ],
  "assets": [
    {
      "symbol": "BTC",
      "name": "Bitcoin",
      "balance": 0.15,
      "price": 118245.75,
      "value": 17736.86,
      "change24h": 2.14,
      "allocation": 41
    },
    {
      "symbol": "ETH",
      "name": "Ethereum",
      "balance": 2.85,
      "price": 3814.42,
      "value": 10871.09,
      "change24h": -1.34,
      "allocation": 29
    },
    {
      "symbol": "SOL",
      "name": "Solana",
      "balance": 42.5,
      "price": 178.22,
      "value": 7574.35,
      "change24h": 5.87,
      "allocation": 16
    },
    {
      "symbol": "LINK",
      "name": "Chainlink",
      "balance": 120,
      "price": 21.46,
      "value": 2575.2,
      "change24h": -3.12,
      "allocation": 7
    },
    {
      "symbol": "USDC",
      "name": "USD Coin",
      "balance": 850,
      "price": 1,
      "value": 850,
      "change24h": 0,
      "allocation": 7
    }
  ],
  "transactions": [
    {
      "id": "TX001",
      "type": "Buy",
      "asset": "ETH",
      "amount": 1.5,
      "price": 3620,
      "value": 5430,
      "date": "2026-07-28T14:35:00Z",
      "status": "Completed"
    },
    {
      "id": "TX002",
      "type": "Swap",
      "asset": "SOL",
      "amount": 15,
      "price": 174.12,
      "value": 2611.8,
      "date": "2026-07-29T09:10:00Z",
      "status": "Completed"
    },
    {
      "id": "TX003",
      "type": "Transfer",
      "asset": "BTC",
      "amount": 0.03,
      "price": 117300,
      "value": 3519,
      "date": "2026-07-29T18:22:00Z",
      "status": "Pending"
    }
  ],
  "market": {
    "btcDominance": 58.4,
    "fearGreedIndex": 73,
    "gasPrice": 9,
    "trending": [
      "BTC",
      "ETH",
      "SOL",
      "SUI",
      "LINK"
    ]
  },
  "chart": [
    {
      "date": "2026-07-24",
      "value": 10840
    },
    {
      "date": "2026-07-25",
      "value": 11120
    },
    {
      "date": "2026-07-26",
      "value": 10950
    },
    {
      "date": "2026-07-27",
      "value": 11640
    },
    {
      "date": "2026-07-28",
      "value": 11870
    },
    {
      "date": "2026-07-29",
      "value": 12130
    },
    {
      "date": "2026-07-30",
      "value": 12547
    }
  ]
}
export { data }
