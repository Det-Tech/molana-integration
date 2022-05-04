export type Molana = {
  "version": "0.1.0",
  "name": "molana",
  "constants": [
    {
      "name": "MOLANA_TRADE_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-trade\""
    },
    {
      "name": "MOLANA_TREASURY_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-treasury\""
    },
    {
      "name": "MOLANA_TRADE_MINT_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-trade-mint\""
    },
    {
      "name": "MOLANA_TRADE_TREASURY_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-trade-treasury\""
    },
    {
      "name": "MOLANA_TRADE_VAULT_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-trade-vault\""
    },
    {
      "name": "MOLANA_TRADER_ACCOUNT_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-trader-account\""
    },
    {
      "name": "MOLANA_OFFER_TREASURY_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-offer-treasury\""
    },
    {
      "name": "MOLANA_OFFER_VAULT_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-offer-vault\""
    },
    {
      "name": "MOLANA_OFFER_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-offer\""
    },
    {
      "name": "MOLANA_DEPOSIT_ROUTER_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-deposit-router\""
    },
    {
      "name": "MOLANA_WITHDRAW_ROUTER_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-withdraw-router\""
    },
    {
      "name": "MOLANA_USER_TRADE_VAULT_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-user-trade-vault\""
    },
    {
      "name": "MOLANA_SOL_ETH_OFFER_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-sol-eth-offer\""
    },
    {
      "name": "MOLANA_SOL_ETH_TRADING_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-sol-eth-trading\""
    },
    {
      "name": "MOLANA_ETH_BSC_TRADING_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-eth-bsc-trading\""
    },
    {
      "name": "MOLANA_USER_TREASURY_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-user-treasury\""
    },
    {
      "name": "CURRENCY_DECIMALS",
      "type": "u8",
      "value": "2"
    },
    {
      "name": "MIN_LAMPORTS",
      "type": "u64",
      "value": "10000000"
    },
    {
      "name": "EMAIL_LEN",
      "type": {
        "defined": "usize"
      },
      "value": "50"
    },
    {
      "name": "CONSTRAINT_LEN",
      "type": {
        "defined": "usize"
      },
      "value": "250"
    },
    {
      "name": "ETH_ADDRESS_LEN",
      "type": {
        "defined": "usize"
      },
      "value": "42"
    },
    {
      "name": "ETH_TX_LEN",
      "type": {
        "defined": "usize"
      },
      "value": "66"
    },
    {
      "name": "CURRENCY_LEN",
      "type": {
        "defined": "usize"
      },
      "value": "5"
    },
    {
      "name": "MIN_DEPOSIT_AMOUNT",
      "type": "u64",
      "value": "10000"
    },
    {
      "name": "MAX_DEPOSIT_AMOUNT",
      "type": "u64",
      "value": "50000000"
    },
    {
      "name": "MIN_WITHDRAW_AMOUNT",
      "type": "u64",
      "value": "10000"
    },
    {
      "name": "MAX_WITHDRAW_AMOUNT",
      "type": "u64",
      "value": "10000000"
    }
  ],
  "instructions": [
    {
      "name": "setMolanaTrade",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositWithdrawChecker",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "newSuperOwner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "superOwner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tradeFee",
          "type": "u64"
        },
        {
          "name": "depositFee",
          "type": "u64"
        },
        {
          "name": "withdrawFee",
          "type": "u64"
        },
        {
          "name": "accountFee",
          "type": "u64"
        },
        {
          "name": "denominator",
          "type": "u64"
        },
        {
          "name": "minWaitingTime",
          "type": "u64"
        },
        {
          "name": "payoneerEmailUser",
          "type": "string"
        }
      ]
    },
    {
      "name": "createTradeTreasuryForPayoneer",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "currency",
          "type": "string"
        }
      ]
    },
    {
      "name": "createTradeTreasury",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setTraderAccount",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "traderAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setDepositRouter",
      "accounts": [
        {
          "name": "tradeTreasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "depositRouter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "paymentId",
          "type": "u64"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "currency",
          "type": "string"
        }
      ]
    },
    {
      "name": "setDepositState",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "depositRouter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositWithdrawChecker",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "state",
          "type": {
            "defined": "DepositTxState"
          }
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "supplyDepositTx",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "depositRouter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setWithdrawRouter",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "withdrawRouter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "destination",
          "type": "string"
        },
        {
          "name": "currency",
          "type": "string"
        }
      ]
    },
    {
      "name": "setWithdrawState",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "withdrawRouter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositWithdrawChecker",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "paymentId",
          "type": "u64"
        },
        {
          "name": "state",
          "type": {
            "defined": "WithdrawTxState"
          }
        }
      ]
    },
    {
      "name": "createUserTreasury",
      "accounts": [
        {
          "name": "traderAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "depositTradeToken",
      "accounts": [
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "traderAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawTradeToken",
      "accounts": [
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "traderAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setSolOffer",
      "accounts": [
        {
          "name": "traderAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasuryA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeTreasuryB",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTreasuryA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasuryB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "buyRatio",
          "type": "u64"
        },
        {
          "name": "sellRatio",
          "type": "u64"
        },
        {
          "name": "direction",
          "type": {
            "defined": "Direction"
          }
        }
      ]
    },
    {
      "name": "sellSolOffer",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasuryA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasuryB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasuryA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasuryB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTradeVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTradeVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "buySolOffer",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasuryA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasuryB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasuryA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasuryB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTradeVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTradeVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claimProfit",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setSolEthOffer",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "solEthOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solEthOfferSeed",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "traderAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "buyRatio",
          "type": "u64"
        },
        {
          "name": "sellRatio",
          "type": "u64"
        },
        {
          "name": "offerTimeLimitation",
          "type": "u64"
        },
        {
          "name": "providerType",
          "type": {
            "defined": "ProviderType"
          }
        },
        {
          "name": "direction",
          "type": {
            "defined": "Direction"
          }
        },
        {
          "name": "aNetwork",
          "type": {
            "defined": "Network"
          }
        },
        {
          "name": "aToken",
          "type": "string"
        },
        {
          "name": "aVault",
          "type": "string"
        }
      ]
    },
    {
      "name": "acceptSolEthOffer",
      "accounts": [
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solEthOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solEthTrading",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "traderAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "acceptState",
          "type": {
            "defined": "SolEthTradingState"
          }
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "lockPeriod",
          "type": "u64"
        },
        {
          "name": "aVault",
          "type": "string"
        }
      ]
    },
    {
      "name": "cancelSolEthTrading",
      "accounts": [
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solEthOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solEthTrading",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "traderAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setSolEthReceivedAmount",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "solEthOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solEthTrading",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "aAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setSolEthTradingState",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "solEthOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solEthTrading",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "state",
          "type": {
            "defined": "SolEthTradingState"
          }
        }
      ]
    },
    {
      "name": "setSolEthTx",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "solEthOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solEthTrading",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "transactionId",
          "type": "string"
        }
      ]
    },
    {
      "name": "claimSolEthTrading",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solEthOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solEthTrading",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setEthBscOffer",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ethBscOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ethBscOfferSeed",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "traderAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "buyRatio",
          "type": "u64"
        },
        {
          "name": "sellRatio",
          "type": "u64"
        },
        {
          "name": "offerTimeLimitation",
          "type": "u64"
        },
        {
          "name": "providerType",
          "type": {
            "defined": "ProviderType"
          }
        },
        {
          "name": "direction",
          "type": {
            "defined": "Direction"
          }
        },
        {
          "name": "aNetwork",
          "type": {
            "defined": "Network"
          }
        },
        {
          "name": "aToken",
          "type": "string"
        },
        {
          "name": "aVault",
          "type": "string"
        },
        {
          "name": "bNetwork",
          "type": {
            "defined": "Network"
          }
        },
        {
          "name": "bToken",
          "type": "string"
        },
        {
          "name": "bVault",
          "type": "string"
        }
      ]
    },
    {
      "name": "acceptEthBscOffer",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ethBscOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ethBscTrading",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "sendNetwork",
          "type": {
            "defined": "Network"
          }
        },
        {
          "name": "sendToken",
          "type": "string"
        },
        {
          "name": "sendVault",
          "type": "string"
        },
        {
          "name": "receiveNetwork",
          "type": {
            "defined": "Network"
          }
        },
        {
          "name": "receiveToken",
          "type": "string"
        },
        {
          "name": "receiveVault",
          "type": "string"
        },
        {
          "name": "splAmount",
          "type": "u64"
        },
        {
          "name": "lockPeriod",
          "type": "u64"
        }
      ]
    },
    {
      "name": "cancelEthBscTrading",
      "accounts": [
        {
          "name": "ethBscOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ethBscTrading",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "claimCancelEthBscTrading",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ethBscOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ethBscTrading",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setEthBscTradedAmount",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ethBscOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ethBscTrading",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "state",
          "type": {
            "defined": "EthBscTradingState"
          }
        }
      ]
    },
    {
      "name": "setEthBscTradingState",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ethBscOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ethBscTrading",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "state",
          "type": {
            "defined": "EthBscTradingState"
          }
        }
      ]
    },
    {
      "name": "setEthBscUserTx",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ethBscOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ethBscTrading",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "transactionId",
          "type": "string"
        }
      ]
    },
    {
      "name": "setEthBscTraderTx",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ethBscOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ethBscTrading",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "transactionId",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "molanaTrade",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "superOwner",
            "type": "publicKey"
          },
          {
            "name": "depositWithdrawChecker",
            "type": "publicKey"
          },
          {
            "name": "tradeFee",
            "type": "u64"
          },
          {
            "name": "depositFee",
            "type": "u64"
          },
          {
            "name": "withdrawFee",
            "type": "u64"
          },
          {
            "name": "accountFee",
            "type": "u64"
          },
          {
            "name": "minOfferLimitationTime",
            "type": "u64"
          },
          {
            "name": "denominator",
            "type": "u64"
          },
          {
            "name": "withdrawId",
            "type": "u64"
          },
          {
            "name": "payoneerEmailUser",
            "type": "string"
          },
          {
            "name": "reserved",
            "type": {
              "array": [
                "u128",
                15
              ]
            }
          }
        ]
      }
    },
    {
      "name": "tradeTreasury",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tradeMint",
            "type": "publicKey"
          },
          {
            "name": "tradeVault",
            "type": "publicKey"
          },
          {
            "name": "balance",
            "type": "u64"
          },
          {
            "name": "claimedAmount",
            "type": "u128"
          },
          {
            "name": "decimals",
            "type": "u32"
          },
          {
            "name": "reserved",
            "type": {
              "array": [
                "u128",
                5
              ]
            }
          }
        ]
      }
    },
    {
      "name": "traderAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "offerCount",
            "type": "u64"
          },
          {
            "name": "reserved",
            "type": {
              "array": [
                "u128",
                7
              ]
            }
          }
        ]
      }
    },
    {
      "name": "userTreasury",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "tradeTreasury",
            "type": "publicKey"
          },
          {
            "name": "tradeMint",
            "type": "publicKey"
          },
          {
            "name": "balance",
            "type": "u64"
          },
          {
            "name": "lockedBalance",
            "type": "u64"
          },
          {
            "name": "unlockTime",
            "type": "u64"
          },
          {
            "name": "reserved",
            "type": {
              "array": [
                "u128",
                3
              ]
            }
          }
        ]
      }
    },
    {
      "name": "depositRouter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "tradeTreasury",
            "type": "publicKey"
          },
          {
            "name": "paymentId",
            "type": "u64"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "requestedTime",
            "type": "u64"
          },
          {
            "name": "state",
            "type": {
              "defined": "DepositTxState"
            }
          },
          {
            "name": "currency",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "withdrawRouter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "tradeTreasury",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "state",
            "type": {
              "defined": "WithdrawTxState"
            }
          },
          {
            "name": "withdrawId",
            "type": "u64"
          },
          {
            "name": "paymentId",
            "type": "u64"
          },
          {
            "name": "requestedTime",
            "type": "u64"
          },
          {
            "name": "currency",
            "type": "string"
          },
          {
            "name": "destination",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "solOffer",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "tokenMintA",
            "type": "publicKey"
          },
          {
            "name": "tokenMintB",
            "type": "publicKey"
          },
          {
            "name": "traderAccount",
            "type": "publicKey"
          },
          {
            "name": "userTreasuryA",
            "type": "publicKey"
          },
          {
            "name": "userTreasuryB",
            "type": "publicKey"
          },
          {
            "name": "buyRatio",
            "type": "u64"
          },
          {
            "name": "sellRatio",
            "type": "u64"
          },
          {
            "name": "direction",
            "type": {
              "defined": "Direction"
            }
          },
          {
            "name": "reserved",
            "type": {
              "array": [
                "u128",
                5
              ]
            }
          },
          {
            "name": "tradingVolume",
            "type": "u128"
          },
          {
            "name": "tradingTime",
            "type": "u64"
          },
          {
            "name": "tradeCount",
            "type": "u64"
          },
          {
            "name": "lastAcceptedTime",
            "type": "u64"
          },
          {
            "name": "lastTradingTime",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "solEthOffer",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "splTokenMint",
            "type": "publicKey"
          },
          {
            "name": "aNetwork",
            "type": {
              "defined": "Network"
            }
          },
          {
            "name": "aToken",
            "type": "string"
          },
          {
            "name": "state",
            "type": {
              "defined": "SolEthOfferState"
            }
          },
          {
            "name": "providerType",
            "type": {
              "defined": "ProviderType"
            }
          },
          {
            "name": "direction",
            "type": {
              "defined": "Direction"
            }
          },
          {
            "name": "aVault",
            "type": "string"
          },
          {
            "name": "traderAccount",
            "type": "publicKey"
          },
          {
            "name": "solEthOfferSeed",
            "type": "publicKey"
          },
          {
            "name": "userTreasury",
            "type": "publicKey"
          },
          {
            "name": "buyRatio",
            "type": "u64"
          },
          {
            "name": "sellRatio",
            "type": "u64"
          },
          {
            "name": "offerTimeLimitation",
            "type": "u64"
          },
          {
            "name": "tradingVolume",
            "type": "u128"
          },
          {
            "name": "tradingTime",
            "type": "u64"
          },
          {
            "name": "tradeCount",
            "type": "u64"
          },
          {
            "name": "lastAcceptedTime",
            "type": "u64"
          },
          {
            "name": "lastTradingTime",
            "type": "u64"
          },
          {
            "name": "reserved",
            "type": {
              "array": [
                "u128",
                5
              ]
            }
          }
        ]
      }
    },
    {
      "name": "solEthTrading",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "offer",
            "type": "publicKey"
          },
          {
            "name": "state",
            "type": {
              "defined": "SolEthTradingState"
            }
          },
          {
            "name": "aAmount",
            "type": "u64"
          },
          {
            "name": "splAmount",
            "type": "u64"
          },
          {
            "name": "acceptedTime",
            "type": "u64"
          },
          {
            "name": "aVault",
            "type": "string"
          },
          {
            "name": "transactionId",
            "type": "string"
          },
          {
            "name": "reserved",
            "type": {
              "array": [
                "u128",
                3
              ]
            }
          }
        ]
      }
    },
    {
      "name": "ethBscOffer",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "splTokenMint",
            "type": "publicKey"
          },
          {
            "name": "aNetwork",
            "type": {
              "defined": "Network"
            }
          },
          {
            "name": "aToken",
            "type": "string"
          },
          {
            "name": "bNetwork",
            "type": {
              "defined": "Network"
            }
          },
          {
            "name": "bToken",
            "type": "string"
          },
          {
            "name": "state",
            "type": {
              "defined": "EthBscOfferState"
            }
          },
          {
            "name": "providerType",
            "type": {
              "defined": "ProviderType"
            }
          },
          {
            "name": "direction",
            "type": {
              "defined": "Direction"
            }
          },
          {
            "name": "traderAccount",
            "type": "publicKey"
          },
          {
            "name": "ethBscOfferSeed",
            "type": "publicKey"
          },
          {
            "name": "userTreasury",
            "type": "publicKey"
          },
          {
            "name": "buyRatio",
            "type": "u64"
          },
          {
            "name": "buyColRatio",
            "type": "u64"
          },
          {
            "name": "sellRatio",
            "type": "u64"
          },
          {
            "name": "sellColRatio",
            "type": "u64"
          },
          {
            "name": "offerTimeLimitation",
            "type": "u64"
          },
          {
            "name": "tradingVolume",
            "type": "u128"
          },
          {
            "name": "tradingTime",
            "type": "u64"
          },
          {
            "name": "tradeCount",
            "type": "u64"
          },
          {
            "name": "lastAcceptedTime",
            "type": "u64"
          },
          {
            "name": "lastTradingTime",
            "type": "u64"
          },
          {
            "name": "aVault",
            "type": "string"
          },
          {
            "name": "bVault",
            "type": "string"
          },
          {
            "name": "reserved",
            "type": {
              "array": [
                "u128",
                5
              ]
            }
          }
        ]
      }
    },
    {
      "name": "ethBscTrading",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "offer",
            "type": "publicKey"
          },
          {
            "name": "state",
            "type": {
              "defined": "EthBscTradingState"
            }
          },
          {
            "name": "sendNetwork",
            "type": {
              "defined": "Network"
            }
          },
          {
            "name": "sendAmount",
            "type": "u64"
          },
          {
            "name": "receiveNetwork",
            "type": {
              "defined": "Network"
            }
          },
          {
            "name": "receiveAmount",
            "type": "u64"
          },
          {
            "name": "splAmount",
            "type": "u64"
          },
          {
            "name": "claimedAmount",
            "type": "u64"
          },
          {
            "name": "acceptedTime",
            "type": "u64"
          },
          {
            "name": "sentABTime",
            "type": "u64"
          },
          {
            "name": "sendVault",
            "type": "string"
          },
          {
            "name": "sendToken",
            "type": "string"
          },
          {
            "name": "sendTransactionId",
            "type": "string"
          },
          {
            "name": "receiveVault",
            "type": "string"
          },
          {
            "name": "receiveToken",
            "type": "string"
          },
          {
            "name": "receiveTransactionId",
            "type": "string"
          },
          {
            "name": "reserved",
            "type": {
              "array": [
                "u128",
                3
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Direction",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "AToB"
          },
          {
            "name": "BToA"
          },
          {
            "name": "All"
          },
          {
            "name": "NotAll"
          }
        ]
      }
    },
    {
      "name": "DepositTxState",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Initialized"
          },
          {
            "name": "Sent"
          },
          {
            "name": "Pending"
          },
          {
            "name": "Arrived"
          },
          {
            "name": "Supplied"
          },
          {
            "name": "NotArrived"
          }
        ]
      }
    },
    {
      "name": "WithdrawTxState",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Initialized"
          },
          {
            "name": "RequestedAndBurned"
          },
          {
            "name": "Pending"
          },
          {
            "name": "Completed"
          },
          {
            "name": "Wrong"
          }
        ]
      }
    },
    {
      "name": "SolEthOfferState",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Initialized"
          },
          {
            "name": "Active"
          },
          {
            "name": "Trading"
          },
          {
            "name": "Locked"
          }
        ]
      }
    },
    {
      "name": "EthBscOfferState",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Initialized"
          },
          {
            "name": "Active"
          },
          {
            "name": "Trading"
          },
          {
            "name": "Locked"
          }
        ]
      }
    },
    {
      "name": "SolEthTradingState",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Initialized"
          },
          {
            "name": "AcceptedOfSolToEth"
          },
          {
            "name": "SentOfSolToEth"
          },
          {
            "name": "FailedOfSolToEth"
          },
          {
            "name": "CompletedOfSolToEth"
          },
          {
            "name": "AcceptedOfEthToSol"
          },
          {
            "name": "SentOfEthToSol"
          },
          {
            "name": "FailedOfEthToSol"
          },
          {
            "name": "CompletedOfEthToSol"
          },
          {
            "name": "ClaimedOfEthToSol"
          }
        ]
      }
    },
    {
      "name": "EthBscTradingState",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Initialized"
          },
          {
            "name": "Accepted"
          },
          {
            "name": "SentAB"
          },
          {
            "name": "FailedAB"
          },
          {
            "name": "SentBA"
          },
          {
            "name": "FailedBA"
          },
          {
            "name": "FailedAll"
          },
          {
            "name": "Completed"
          }
        ]
      }
    },
    {
      "name": "Network",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Eth"
          },
          {
            "name": "Bsc"
          }
        ]
      }
    },
    {
      "name": "ProviderType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Human"
          },
          {
            "name": "Bot"
          },
          {
            "name": "Platform"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "MolanaTradeSet",
      "fields": []
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidAddress",
      "msg": "Invalid address"
    },
    {
      "code": 6001,
      "name": "NotAllowed",
      "msg": "Not allowed"
    },
    {
      "code": 6002,
      "name": "NotArrived",
      "msg": "Not arrived yet"
    },
    {
      "code": 6003,
      "name": "ZeroAmount",
      "msg": "Can't be zero amount"
    },
    {
      "code": 6004,
      "name": "NotEnough",
      "msg": "not enough amount"
    },
    {
      "code": 6005,
      "name": "DepositTxStateTransitionInvalid",
      "msg": "Invalid deposit state transition."
    },
    {
      "code": 6006,
      "name": "WithdrawTxStateTransitionInvalid",
      "msg": "Invalid withdraw state transition."
    },
    {
      "code": 6007,
      "name": "SolEthOfferStateTransitionInvalid",
      "msg": "Invalid sol <-> other offer state transition."
    },
    {
      "code": 6008,
      "name": "EthBscOfferStateTransitionInvalid",
      "msg": "Invalid other <-> other offer state transition."
    },
    {
      "code": 6009,
      "name": "SolEthTradingStateTransitionInvalid",
      "msg": "Invalid sol <-> other trading state transition."
    },
    {
      "code": 6010,
      "name": "EthBscTradingStateTransitionInvalid",
      "msg": "Invalid other <-> other trading state transition."
    },
    {
      "code": 6011,
      "name": "CalcError",
      "msg": "Calculation Error."
    }
  ]
};

export const IDL: Molana = {
  "version": "0.1.0",
  "name": "molana",
  "constants": [
    {
      "name": "MOLANA_TRADE_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-trade\""
    },
    {
      "name": "MOLANA_TREASURY_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-treasury\""
    },
    {
      "name": "MOLANA_TRADE_MINT_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-trade-mint\""
    },
    {
      "name": "MOLANA_TRADE_TREASURY_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-trade-treasury\""
    },
    {
      "name": "MOLANA_TRADE_VAULT_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-trade-vault\""
    },
    {
      "name": "MOLANA_TRADER_ACCOUNT_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-trader-account\""
    },
    {
      "name": "MOLANA_OFFER_TREASURY_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-offer-treasury\""
    },
    {
      "name": "MOLANA_OFFER_VAULT_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-offer-vault\""
    },
    {
      "name": "MOLANA_OFFER_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-offer\""
    },
    {
      "name": "MOLANA_DEPOSIT_ROUTER_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-deposit-router\""
    },
    {
      "name": "MOLANA_WITHDRAW_ROUTER_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-withdraw-router\""
    },
    {
      "name": "MOLANA_USER_TRADE_VAULT_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-user-trade-vault\""
    },
    {
      "name": "MOLANA_SOL_ETH_OFFER_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-sol-eth-offer\""
    },
    {
      "name": "MOLANA_SOL_ETH_TRADING_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-sol-eth-trading\""
    },
    {
      "name": "MOLANA_ETH_BSC_TRADING_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-eth-bsc-trading\""
    },
    {
      "name": "MOLANA_USER_TREASURY_TAG",
      "type": {
        "defined": "&[u8]"
      },
      "value": "b\"molana-user-treasury\""
    },
    {
      "name": "CURRENCY_DECIMALS",
      "type": "u8",
      "value": "2"
    },
    {
      "name": "MIN_LAMPORTS",
      "type": "u64",
      "value": "10000000"
    },
    {
      "name": "EMAIL_LEN",
      "type": {
        "defined": "usize"
      },
      "value": "50"
    },
    {
      "name": "CONSTRAINT_LEN",
      "type": {
        "defined": "usize"
      },
      "value": "250"
    },
    {
      "name": "ETH_ADDRESS_LEN",
      "type": {
        "defined": "usize"
      },
      "value": "42"
    },
    {
      "name": "ETH_TX_LEN",
      "type": {
        "defined": "usize"
      },
      "value": "66"
    },
    {
      "name": "CURRENCY_LEN",
      "type": {
        "defined": "usize"
      },
      "value": "5"
    },
    {
      "name": "MIN_DEPOSIT_AMOUNT",
      "type": "u64",
      "value": "10000"
    },
    {
      "name": "MAX_DEPOSIT_AMOUNT",
      "type": "u64",
      "value": "50000000"
    },
    {
      "name": "MIN_WITHDRAW_AMOUNT",
      "type": "u64",
      "value": "10000"
    },
    {
      "name": "MAX_WITHDRAW_AMOUNT",
      "type": "u64",
      "value": "10000000"
    }
  ],
  "instructions": [
    {
      "name": "setMolanaTrade",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositWithdrawChecker",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "newSuperOwner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "superOwner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tradeFee",
          "type": "u64"
        },
        {
          "name": "depositFee",
          "type": "u64"
        },
        {
          "name": "withdrawFee",
          "type": "u64"
        },
        {
          "name": "accountFee",
          "type": "u64"
        },
        {
          "name": "denominator",
          "type": "u64"
        },
        {
          "name": "minWaitingTime",
          "type": "u64"
        },
        {
          "name": "payoneerEmailUser",
          "type": "string"
        }
      ]
    },
    {
      "name": "createTradeTreasuryForPayoneer",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "currency",
          "type": "string"
        }
      ]
    },
    {
      "name": "createTradeTreasury",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setTraderAccount",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "traderAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setDepositRouter",
      "accounts": [
        {
          "name": "tradeTreasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "depositRouter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "paymentId",
          "type": "u64"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "currency",
          "type": "string"
        }
      ]
    },
    {
      "name": "setDepositState",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "depositRouter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositWithdrawChecker",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "state",
          "type": {
            "defined": "DepositTxState"
          }
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "supplyDepositTx",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "depositRouter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setWithdrawRouter",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "withdrawRouter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "destination",
          "type": "string"
        },
        {
          "name": "currency",
          "type": "string"
        }
      ]
    },
    {
      "name": "setWithdrawState",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "withdrawRouter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositWithdrawChecker",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "paymentId",
          "type": "u64"
        },
        {
          "name": "state",
          "type": {
            "defined": "WithdrawTxState"
          }
        }
      ]
    },
    {
      "name": "createUserTreasury",
      "accounts": [
        {
          "name": "traderAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "depositTradeToken",
      "accounts": [
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "traderAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawTradeToken",
      "accounts": [
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "traderAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setSolOffer",
      "accounts": [
        {
          "name": "traderAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasuryA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeTreasuryB",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTreasuryA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasuryB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "buyRatio",
          "type": "u64"
        },
        {
          "name": "sellRatio",
          "type": "u64"
        },
        {
          "name": "direction",
          "type": {
            "defined": "Direction"
          }
        }
      ]
    },
    {
      "name": "sellSolOffer",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasuryA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasuryB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasuryA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasuryB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTradeVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTradeVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "buySolOffer",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasuryA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasuryB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasuryA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasuryB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTradeVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTradeVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claimProfit",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setSolEthOffer",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "solEthOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solEthOfferSeed",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "traderAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "buyRatio",
          "type": "u64"
        },
        {
          "name": "sellRatio",
          "type": "u64"
        },
        {
          "name": "offerTimeLimitation",
          "type": "u64"
        },
        {
          "name": "providerType",
          "type": {
            "defined": "ProviderType"
          }
        },
        {
          "name": "direction",
          "type": {
            "defined": "Direction"
          }
        },
        {
          "name": "aNetwork",
          "type": {
            "defined": "Network"
          }
        },
        {
          "name": "aToken",
          "type": "string"
        },
        {
          "name": "aVault",
          "type": "string"
        }
      ]
    },
    {
      "name": "acceptSolEthOffer",
      "accounts": [
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solEthOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solEthTrading",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "traderAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "acceptState",
          "type": {
            "defined": "SolEthTradingState"
          }
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "lockPeriod",
          "type": "u64"
        },
        {
          "name": "aVault",
          "type": "string"
        }
      ]
    },
    {
      "name": "cancelSolEthTrading",
      "accounts": [
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solEthOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solEthTrading",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "traderAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setSolEthReceivedAmount",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "solEthOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solEthTrading",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "aAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setSolEthTradingState",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "solEthOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solEthTrading",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "state",
          "type": {
            "defined": "SolEthTradingState"
          }
        }
      ]
    },
    {
      "name": "setSolEthTx",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "solEthOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solEthTrading",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "transactionId",
          "type": "string"
        }
      ]
    },
    {
      "name": "claimSolEthTrading",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solEthOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solEthTrading",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setEthBscOffer",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ethBscOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ethBscOfferSeed",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "traderAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "buyRatio",
          "type": "u64"
        },
        {
          "name": "sellRatio",
          "type": "u64"
        },
        {
          "name": "offerTimeLimitation",
          "type": "u64"
        },
        {
          "name": "providerType",
          "type": {
            "defined": "ProviderType"
          }
        },
        {
          "name": "direction",
          "type": {
            "defined": "Direction"
          }
        },
        {
          "name": "aNetwork",
          "type": {
            "defined": "Network"
          }
        },
        {
          "name": "aToken",
          "type": "string"
        },
        {
          "name": "aVault",
          "type": "string"
        },
        {
          "name": "bNetwork",
          "type": {
            "defined": "Network"
          }
        },
        {
          "name": "bToken",
          "type": "string"
        },
        {
          "name": "bVault",
          "type": "string"
        }
      ]
    },
    {
      "name": "acceptEthBscOffer",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ethBscOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ethBscTrading",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "sendNetwork",
          "type": {
            "defined": "Network"
          }
        },
        {
          "name": "sendToken",
          "type": "string"
        },
        {
          "name": "sendVault",
          "type": "string"
        },
        {
          "name": "receiveNetwork",
          "type": {
            "defined": "Network"
          }
        },
        {
          "name": "receiveToken",
          "type": "string"
        },
        {
          "name": "receiveVault",
          "type": "string"
        },
        {
          "name": "splAmount",
          "type": "u64"
        },
        {
          "name": "lockPeriod",
          "type": "u64"
        }
      ]
    },
    {
      "name": "cancelEthBscTrading",
      "accounts": [
        {
          "name": "ethBscOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ethBscTrading",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "claimCancelEthBscTrading",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "molanaTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ethBscOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ethBscTrading",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTradeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setEthBscTradedAmount",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ethBscOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ethBscTrading",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "state",
          "type": {
            "defined": "EthBscTradingState"
          }
        }
      ]
    },
    {
      "name": "setEthBscTradingState",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ethBscOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ethBscTrading",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "state",
          "type": {
            "defined": "EthBscTradingState"
          }
        }
      ]
    },
    {
      "name": "setEthBscUserTx",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ethBscOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ethBscTrading",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "transactionId",
          "type": "string"
        }
      ]
    },
    {
      "name": "setEthBscTraderTx",
      "accounts": [
        {
          "name": "molanaTrade",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ethBscOffer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ethBscTrading",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "transactionId",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "molanaTrade",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "superOwner",
            "type": "publicKey"
          },
          {
            "name": "depositWithdrawChecker",
            "type": "publicKey"
          },
          {
            "name": "tradeFee",
            "type": "u64"
          },
          {
            "name": "depositFee",
            "type": "u64"
          },
          {
            "name": "withdrawFee",
            "type": "u64"
          },
          {
            "name": "accountFee",
            "type": "u64"
          },
          {
            "name": "minOfferLimitationTime",
            "type": "u64"
          },
          {
            "name": "denominator",
            "type": "u64"
          },
          {
            "name": "withdrawId",
            "type": "u64"
          },
          {
            "name": "payoneerEmailUser",
            "type": "string"
          },
          {
            "name": "reserved",
            "type": {
              "array": [
                "u128",
                15
              ]
            }
          }
        ]
      }
    },
    {
      "name": "tradeTreasury",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tradeMint",
            "type": "publicKey"
          },
          {
            "name": "tradeVault",
            "type": "publicKey"
          },
          {
            "name": "balance",
            "type": "u64"
          },
          {
            "name": "claimedAmount",
            "type": "u128"
          },
          {
            "name": "decimals",
            "type": "u32"
          },
          {
            "name": "reserved",
            "type": {
              "array": [
                "u128",
                5
              ]
            }
          }
        ]
      }
    },
    {
      "name": "traderAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "offerCount",
            "type": "u64"
          },
          {
            "name": "reserved",
            "type": {
              "array": [
                "u128",
                7
              ]
            }
          }
        ]
      }
    },
    {
      "name": "userTreasury",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "tradeTreasury",
            "type": "publicKey"
          },
          {
            "name": "tradeMint",
            "type": "publicKey"
          },
          {
            "name": "balance",
            "type": "u64"
          },
          {
            "name": "lockedBalance",
            "type": "u64"
          },
          {
            "name": "unlockTime",
            "type": "u64"
          },
          {
            "name": "reserved",
            "type": {
              "array": [
                "u128",
                3
              ]
            }
          }
        ]
      }
    },
    {
      "name": "depositRouter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "tradeTreasury",
            "type": "publicKey"
          },
          {
            "name": "paymentId",
            "type": "u64"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "requestedTime",
            "type": "u64"
          },
          {
            "name": "state",
            "type": {
              "defined": "DepositTxState"
            }
          },
          {
            "name": "currency",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "withdrawRouter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "tradeTreasury",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "state",
            "type": {
              "defined": "WithdrawTxState"
            }
          },
          {
            "name": "withdrawId",
            "type": "u64"
          },
          {
            "name": "paymentId",
            "type": "u64"
          },
          {
            "name": "requestedTime",
            "type": "u64"
          },
          {
            "name": "currency",
            "type": "string"
          },
          {
            "name": "destination",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "solOffer",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "tokenMintA",
            "type": "publicKey"
          },
          {
            "name": "tokenMintB",
            "type": "publicKey"
          },
          {
            "name": "traderAccount",
            "type": "publicKey"
          },
          {
            "name": "userTreasuryA",
            "type": "publicKey"
          },
          {
            "name": "userTreasuryB",
            "type": "publicKey"
          },
          {
            "name": "buyRatio",
            "type": "u64"
          },
          {
            "name": "sellRatio",
            "type": "u64"
          },
          {
            "name": "direction",
            "type": {
              "defined": "Direction"
            }
          },
          {
            "name": "reserved",
            "type": {
              "array": [
                "u128",
                5
              ]
            }
          },
          {
            "name": "tradingVolume",
            "type": "u128"
          },
          {
            "name": "tradingTime",
            "type": "u64"
          },
          {
            "name": "tradeCount",
            "type": "u64"
          },
          {
            "name": "lastAcceptedTime",
            "type": "u64"
          },
          {
            "name": "lastTradingTime",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "solEthOffer",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "splTokenMint",
            "type": "publicKey"
          },
          {
            "name": "aNetwork",
            "type": {
              "defined": "Network"
            }
          },
          {
            "name": "aToken",
            "type": "string"
          },
          {
            "name": "state",
            "type": {
              "defined": "SolEthOfferState"
            }
          },
          {
            "name": "providerType",
            "type": {
              "defined": "ProviderType"
            }
          },
          {
            "name": "direction",
            "type": {
              "defined": "Direction"
            }
          },
          {
            "name": "aVault",
            "type": "string"
          },
          {
            "name": "traderAccount",
            "type": "publicKey"
          },
          {
            "name": "solEthOfferSeed",
            "type": "publicKey"
          },
          {
            "name": "userTreasury",
            "type": "publicKey"
          },
          {
            "name": "buyRatio",
            "type": "u64"
          },
          {
            "name": "sellRatio",
            "type": "u64"
          },
          {
            "name": "offerTimeLimitation",
            "type": "u64"
          },
          {
            "name": "tradingVolume",
            "type": "u128"
          },
          {
            "name": "tradingTime",
            "type": "u64"
          },
          {
            "name": "tradeCount",
            "type": "u64"
          },
          {
            "name": "lastAcceptedTime",
            "type": "u64"
          },
          {
            "name": "lastTradingTime",
            "type": "u64"
          },
          {
            "name": "reserved",
            "type": {
              "array": [
                "u128",
                5
              ]
            }
          }
        ]
      }
    },
    {
      "name": "solEthTrading",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "offer",
            "type": "publicKey"
          },
          {
            "name": "state",
            "type": {
              "defined": "SolEthTradingState"
            }
          },
          {
            "name": "aAmount",
            "type": "u64"
          },
          {
            "name": "splAmount",
            "type": "u64"
          },
          {
            "name": "acceptedTime",
            "type": "u64"
          },
          {
            "name": "aVault",
            "type": "string"
          },
          {
            "name": "transactionId",
            "type": "string"
          },
          {
            "name": "reserved",
            "type": {
              "array": [
                "u128",
                3
              ]
            }
          }
        ]
      }
    },
    {
      "name": "ethBscOffer",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "splTokenMint",
            "type": "publicKey"
          },
          {
            "name": "aNetwork",
            "type": {
              "defined": "Network"
            }
          },
          {
            "name": "aToken",
            "type": "string"
          },
          {
            "name": "bNetwork",
            "type": {
              "defined": "Network"
            }
          },
          {
            "name": "bToken",
            "type": "string"
          },
          {
            "name": "state",
            "type": {
              "defined": "EthBscOfferState"
            }
          },
          {
            "name": "providerType",
            "type": {
              "defined": "ProviderType"
            }
          },
          {
            "name": "direction",
            "type": {
              "defined": "Direction"
            }
          },
          {
            "name": "traderAccount",
            "type": "publicKey"
          },
          {
            "name": "ethBscOfferSeed",
            "type": "publicKey"
          },
          {
            "name": "userTreasury",
            "type": "publicKey"
          },
          {
            "name": "buyRatio",
            "type": "u64"
          },
          {
            "name": "buyColRatio",
            "type": "u64"
          },
          {
            "name": "sellRatio",
            "type": "u64"
          },
          {
            "name": "sellColRatio",
            "type": "u64"
          },
          {
            "name": "offerTimeLimitation",
            "type": "u64"
          },
          {
            "name": "tradingVolume",
            "type": "u128"
          },
          {
            "name": "tradingTime",
            "type": "u64"
          },
          {
            "name": "tradeCount",
            "type": "u64"
          },
          {
            "name": "lastAcceptedTime",
            "type": "u64"
          },
          {
            "name": "lastTradingTime",
            "type": "u64"
          },
          {
            "name": "aVault",
            "type": "string"
          },
          {
            "name": "bVault",
            "type": "string"
          },
          {
            "name": "reserved",
            "type": {
              "array": [
                "u128",
                5
              ]
            }
          }
        ]
      }
    },
    {
      "name": "ethBscTrading",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "offer",
            "type": "publicKey"
          },
          {
            "name": "state",
            "type": {
              "defined": "EthBscTradingState"
            }
          },
          {
            "name": "sendNetwork",
            "type": {
              "defined": "Network"
            }
          },
          {
            "name": "sendAmount",
            "type": "u64"
          },
          {
            "name": "receiveNetwork",
            "type": {
              "defined": "Network"
            }
          },
          {
            "name": "receiveAmount",
            "type": "u64"
          },
          {
            "name": "splAmount",
            "type": "u64"
          },
          {
            "name": "claimedAmount",
            "type": "u64"
          },
          {
            "name": "acceptedTime",
            "type": "u64"
          },
          {
            "name": "sentABTime",
            "type": "u64"
          },
          {
            "name": "sendVault",
            "type": "string"
          },
          {
            "name": "sendToken",
            "type": "string"
          },
          {
            "name": "sendTransactionId",
            "type": "string"
          },
          {
            "name": "receiveVault",
            "type": "string"
          },
          {
            "name": "receiveToken",
            "type": "string"
          },
          {
            "name": "receiveTransactionId",
            "type": "string"
          },
          {
            "name": "reserved",
            "type": {
              "array": [
                "u128",
                3
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Direction",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "AToB"
          },
          {
            "name": "BToA"
          },
          {
            "name": "All"
          },
          {
            "name": "NotAll"
          }
        ]
      }
    },
    {
      "name": "DepositTxState",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Initialized"
          },
          {
            "name": "Sent"
          },
          {
            "name": "Pending"
          },
          {
            "name": "Arrived"
          },
          {
            "name": "Supplied"
          },
          {
            "name": "NotArrived"
          }
        ]
      }
    },
    {
      "name": "WithdrawTxState",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Initialized"
          },
          {
            "name": "RequestedAndBurned"
          },
          {
            "name": "Pending"
          },
          {
            "name": "Completed"
          },
          {
            "name": "Wrong"
          }
        ]
      }
    },
    {
      "name": "SolEthOfferState",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Initialized"
          },
          {
            "name": "Active"
          },
          {
            "name": "Trading"
          },
          {
            "name": "Locked"
          }
        ]
      }
    },
    {
      "name": "EthBscOfferState",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Initialized"
          },
          {
            "name": "Active"
          },
          {
            "name": "Trading"
          },
          {
            "name": "Locked"
          }
        ]
      }
    },
    {
      "name": "SolEthTradingState",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Initialized"
          },
          {
            "name": "AcceptedOfSolToEth"
          },
          {
            "name": "SentOfSolToEth"
          },
          {
            "name": "FailedOfSolToEth"
          },
          {
            "name": "CompletedOfSolToEth"
          },
          {
            "name": "AcceptedOfEthToSol"
          },
          {
            "name": "SentOfEthToSol"
          },
          {
            "name": "FailedOfEthToSol"
          },
          {
            "name": "CompletedOfEthToSol"
          },
          {
            "name": "ClaimedOfEthToSol"
          }
        ]
      }
    },
    {
      "name": "EthBscTradingState",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Initialized"
          },
          {
            "name": "Accepted"
          },
          {
            "name": "SentAB"
          },
          {
            "name": "FailedAB"
          },
          {
            "name": "SentBA"
          },
          {
            "name": "FailedBA"
          },
          {
            "name": "FailedAll"
          },
          {
            "name": "Completed"
          }
        ]
      }
    },
    {
      "name": "Network",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Eth"
          },
          {
            "name": "Bsc"
          }
        ]
      }
    },
    {
      "name": "ProviderType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Human"
          },
          {
            "name": "Bot"
          },
          {
            "name": "Platform"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "MolanaTradeSet",
      "fields": []
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidAddress",
      "msg": "Invalid address"
    },
    {
      "code": 6001,
      "name": "NotAllowed",
      "msg": "Not allowed"
    },
    {
      "code": 6002,
      "name": "NotArrived",
      "msg": "Not arrived yet"
    },
    {
      "code": 6003,
      "name": "ZeroAmount",
      "msg": "Can't be zero amount"
    },
    {
      "code": 6004,
      "name": "NotEnough",
      "msg": "not enough amount"
    },
    {
      "code": 6005,
      "name": "DepositTxStateTransitionInvalid",
      "msg": "Invalid deposit state transition."
    },
    {
      "code": 6006,
      "name": "WithdrawTxStateTransitionInvalid",
      "msg": "Invalid withdraw state transition."
    },
    {
      "code": 6007,
      "name": "SolEthOfferStateTransitionInvalid",
      "msg": "Invalid sol <-> other offer state transition."
    },
    {
      "code": 6008,
      "name": "EthBscOfferStateTransitionInvalid",
      "msg": "Invalid other <-> other offer state transition."
    },
    {
      "code": 6009,
      "name": "SolEthTradingStateTransitionInvalid",
      "msg": "Invalid sol <-> other trading state transition."
    },
    {
      "code": 6010,
      "name": "EthBscTradingStateTransitionInvalid",
      "msg": "Invalid other <-> other trading state transition."
    },
    {
      "code": 6011,
      "name": "CalcError",
      "msg": "Calculation Error."
    }
  ]
};
