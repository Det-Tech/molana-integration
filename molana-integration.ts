/* eslint-disable prettier/prettier */
import { IDL as idl, Molana } from "./molana";
import * as anchor from "@project-serum/anchor";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { getTokenAccount } from "./utils";
import {
  DataSlice,
  GetProgramAccountsFilter,
  MemcmpFilter,
  SYSVAR_CLOCK_PUBKEY,
} from "@solana/web3.js";
import { AccountClient, ProgramAccount } from "@project-serum/anchor";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";

let program: anchor.Program<Molana> = null as any;
let programId: anchor.web3.PublicKey = null as any;

const systemProgram = anchor.web3.SystemProgram.programId;
const tokenProgram = TOKEN_PROGRAM_ID;
const rent = anchor.web3.SYSVAR_RENT_PUBKEY;
const clock = anchor.web3.SYSVAR_CLOCK_PUBKEY;
const defaults = {
  systemProgram,
  tokenProgram,
  rent,
  clock,
};
export const MOLANA_TRADE_TAG = Buffer.from("molana-trade");
export const MOLANA_TREASURY_TAG = Buffer.from("molana-treasury");
export const MOLANA_TRADE_MINT_TAG = Buffer.from("molana-trade-mint");
export const MOLANA_TRADE_TREASURY_TAG = Buffer.from("molana-trade-treasury");
export const MOLANA_TRADE_VAULT_TAG = Buffer.from("molana-trade-vault");
export const MOLANA_TRADER_ACCOUNT_TAG = Buffer.from("molana-trader-account");
export const MOLANA_OFFER_TREASURY_TAG = Buffer.from("molana-offer-treasury");
export const MOLANA_OFFER_VAULT_TAG = Buffer.from("molana-offer-vault");
export const MOLANA_OFFER_TAG = Buffer.from("molana-offer");
export const MOLANA_DEPOSIT_ROUTER_TAG = Buffer.from("molana-deposit-router");
export const MOLANA_WITHDRAW_ROUTER_TAG = Buffer.from("molana-withdraw-router");
export const MOLANA_USER_TRADE_VAULT_TAG = Buffer.from(
  "molana-user-trade-vault"
);
export const MOLANA_SOL_ETH_OFFER_TAG = Buffer.from("molana-sol-eth-offer");
export const MOLANA_SOL_ETH_TRADING_TAG = Buffer.from("molana-sol-eth-trading");
export const MOLANA_ETH_BSC_OFFER_TAG = Buffer.from("molana-eth-bsc-offer");
export const MOLANA_ETH_BSC_TRADING_TAG = Buffer.from("molana-eth-bsc-trading");
export const MOLANA_USER_TREASURY_TAG = Buffer.from("molana-user-treasury");

export const SOL_DECIMALS = 9;
export const CURRENCY_DECIMALS = 2;
export const MIN_LAMPORTS = 10000000;

export const EMAIL_LEN = 50; // twitter, telegram, discord, phone
export const CONSTRAINT_LEN = 250;
export const ETH_ADDRESS_LEN = 42;
export const ETH_TX_LEN = 66;
export const CURRENCY_LEN = 5;

export const MIN_DEPOSIT_AMOUNT = 10000; // 100 USD/GBP/EUR
export const MAX_DEPOSIT_AMOUNT = 50000000; // 500000 USD/GBP/EUR

export const MIN_WITHDRAW_AMOUNT = 10000; // 100 USD/GBP/EUR
export const MAX_WITHDRAW_AMOUNT = 10000000; // 100000 USD/GBP/EUR

export interface IResult {
  success: boolean;
  data: any;
  msg: string;
}

export const initMolanaProgram = (
  connection: anchor.web3.Connection,
  wallet: any,
  pid: anchor.web3.PublicKey
): IResult => {
  let result: IResult = { success: true, data: null, msg: "" };
  try {
    programId = pid;
    const provider = new anchor.Provider(
      connection,
      wallet,
      anchor.Provider.defaultOptions()
    );

    // Generate the program client from IDL.
    program = new (anchor as any).Program(
      idl,
      programId,
      provider
    ) as anchor.Program<Molana>;
  } catch (e: any) {
    result.success = false;
    result.msg = e.message;
  } finally {
    return result;
  }
};

export const setGlobalState = async (
  denominator: number,
  tradeFee: number,
  depositFee: number,
  withdrawFee: number,
  accountFee: number,
  minWaitingTime: number,
  payoneerEmailUser: string,
  depositWithdrawChecker: anchor.web3.PublicKey,
  signer: anchor.web3.PublicKey = program.provider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  let result: IResult = { success: true, data: null, msg: "" };
  try {
    if (payoneerEmailUser.length > EMAIL_LEN) {
      result.success = false;
      result.msg = "payoneer email length can't be bigger than " + EMAIL_LEN;
      return result;
    }
    const superOwner = signer;
    const molanaTrade = await pda([MOLANA_TRADE_TAG], programId);
    const molanaTreasury = await pda([MOLANA_TREASURY_TAG], programId);

    const tx = await program.rpc.setMolanaTrade(
      new anchor.BN(tradeFee),
      new anchor.BN(depositFee),
      new anchor.BN(withdrawFee),
      new anchor.BN(accountFee),
      new anchor.BN(denominator),
      new anchor.BN(minWaitingTime),
      payoneerEmailUser,
      {
        accounts: {
          molanaTrade,
          molanaTreasury,
          depositWithdrawChecker,
          newSuperOwner: superOwner,
          superOwner,
          ...defaults,
        },
        signers,
      }
    );
    console.log("tx = ", tx);
    result.msg = "successfully set global settings";
  } catch (e: any) {
    result.success = false;
    result.msg = e.message;
  } finally {
    return result;
  }
};

export const createTradeTreasuryForPayoneer = async (
  currency: string,
  signer: anchor.web3.PublicKey = program.provider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  let result: IResult = { success: true, data: null, msg: "" };
  if (currency.length > CURRENCY_LEN) {
    result.success = false;
    result.msg = "wrong currency length";
    return result;
  }
  try {
    const molanaTrade = await pda([MOLANA_TRADE_TAG], programId);
    const molanaTreasury = await pda([MOLANA_TREASURY_TAG], programId);
    const tradeMint = await pda(
      [MOLANA_TRADE_MINT_TAG, Buffer.from(currency)],
      programId
    );
    const tradeTreasury = await pda(
      [MOLANA_TRADE_TREASURY_TAG, tradeMint.toBuffer()],
      programId
    );

    const tradeVault = await pda(
      [MOLANA_TRADE_VAULT_TAG, tradeMint.toBuffer()],
      programId
    );
    let tradeTreasuryData = await program.account.tradeTreasury.fetchNullable(
      tradeTreasury
    );

    if (tradeTreasuryData != null) {
      result.success = false;
      result.msg = "already created for " + currency;
      return result;
    } else {
      const tx = await program.rpc.createTradeTreasuryForPayoneer(currency, {
        accounts: {
          molanaTrade,
          tradeTreasury,
          tradeMint,
          tradeVault,
          molanaTreasury,
          authority: signer,
          ...defaults,
        },
        signers,
      });
      console.log("tx = ", tx);
      result.msg = "successfully created for " + currency;
    }
  } catch (e: any) {
    result.success = false;
    result.msg = e.message;
  } finally {
    return result;
  }
};

export const createTradeTreasury = async (
  tradeMint: anchor.web3.PublicKey,
  signer: anchor.web3.PublicKey = program.provider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  let result: IResult = { success: true, data: null, msg: "" };
  try {
    const molanaTrade = await pda([MOLANA_TRADE_TAG], programId);
    const molanaTreasury = await pda([MOLANA_TREASURY_TAG], programId);
    const tradeTreasury = await pda(
      [MOLANA_TRADE_TREASURY_TAG, tradeMint.toBuffer()],
      programId
    );
    const tradeVault = await pda(
      [MOLANA_TRADE_VAULT_TAG, tradeMint.toBuffer()],
      programId
    );
    let tradeTreasuryData = await program.account.tradeTreasury.fetchNullable(
      tradeTreasury
    );

    if (tradeTreasuryData != null) {
      result.success = false;
      result.msg = "already created for " + tradeMint.toBase58();
      return result;
    } else {
      const tx = await program.rpc.createTradeTreasury({
        accounts: {
          molanaTrade,
          tradeTreasury,
          tradeMint,
          tradeVault,
          molanaTreasury,
          authority: signer,
          ...defaults,
        },
        signers,
      });
      console.log("tx = ", tx);
      result.msg = "successfully created for " + tradeMint.toBase58();
    }
  } catch (e: any) {
    result.success = false;
    result.msg = e.message;
  } finally {
    return result;
  }
};

export const setTraderAccount = async (
  
  signer: anchor.web3.PublicKey = program.provider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  let result: IResult = { success: true, data: null, msg: "" };
  
  try {
    const molanaTrade = await pda([MOLANA_TRADE_TAG], programId);
    const molanaTreasury = await pda([MOLANA_TREASURY_TAG], programId);
    const traderAccount = await pda(
      [MOLANA_TRADER_ACCOUNT_TAG, signer.toBuffer()],
      programId
    );
    const tx = await program.rpc.setTraderAccount(
      {
        accounts: {
          molanaTrade,
          molanaTreasury,
          traderAccount,
          authority: signer,
          ...defaults,
        },
        signers,
      }
    );
    console.log("tx = ", tx);
    result.msg = "successfully saved your account information";
  } catch (e: any) {
    result.success = false;
    result.msg = e.message;
  } finally {
    return result;
  }
};

// export const closeTraderAccount = async (
//   signer: anchor.web3.PublicKey = program.provider.wallet.publicKey,
//   signers: anchor.web3.Keypair[] = []
// ) => {
//   let result: IResult = { success: true, data: null, msg: "" };
//   try {
//     const molanaTreasury = await pda([MOLANA_TREASURY_TAG], programId);
//     const traderAccount = await pda(
//       [MOLANA_TRADER_ACCOUNT_TAG, signer.toBuffer()],
//       programId
//     );

//     const tx = await program.rpc.closeTraderAccount({
//       accounts: {
//         molanaTreasury,
//         traderAccount,
//         authority: signer,
//         ...defaults,
//       },
//       signers,
//     });
//     console.log("tx = ", tx);
//     result.msg = "successfully closed your trader account";
//   } catch (e: any) {
//     result.success = false;
//     result.msg = e.message;
//   } finally {
//     return result;
//   }
// };

export const setDepositRouter = async (
  paymentId: anchor.BN,
  amount: anchor.BN,
  currency: string,
  signer: anchor.web3.PublicKey = program.provider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  let result: IResult = { success: true, data: null, msg: "" };
  if (currency.length > CURRENCY_LEN) {
    result.success = false;
    result.msg = "wrong currency length";
    return result;
  }
  if (
    amount.toNumber() < MIN_DEPOSIT_AMOUNT ||
    amount.toNumber() >= MAX_DEPOSIT_AMOUNT
  ) {
    result.success = false;
    result.msg = "invalid amount. check min & max amount!";
    return result;
  }
  try {
    const paymentIdSeed = paymentId.toBuffer("be", 8);
    const depositRouter = await pda(
      [MOLANA_DEPOSIT_ROUTER_TAG, paymentIdSeed, signer.toBuffer()],
      programId
    );
    const tradeMint = await pda(
      [MOLANA_TRADE_MINT_TAG, Buffer.from(currency)],
      programId
    );
    const tradeTreasury = await pda(
      [MOLANA_TRADE_TREASURY_TAG, tradeMint.toBuffer()],
      programId
    );

    const tx = await program.rpc.setDepositRouter(paymentId, amount, currency, {
      accounts: {
        tradeTreasury,
        depositRouter,
        authority: signer,
        ...defaults,
      },
      signers,
    });
    console.log("tx = ", tx);
    result.msg =
      "successfully set transaction id = " + paymentId + " of deposit-router";
  } catch (e: any) {
    result.success = false;
    result.msg = e.message;
  }
  return result;
};

export const setDepositState = async (
  state: any,
  amount: anchor.BN,
  depositRouter: anchor.web3.PublicKey,
  signer: anchor.web3.PublicKey = program.provider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  let result: IResult = { success: true, data: null, msg: "" };
  if (
    amount.toNumber() < MIN_DEPOSIT_AMOUNT ||
    amount.toNumber() >= MAX_DEPOSIT_AMOUNT
  ) {
    result.success = false;
    result.msg = "invalid amount. check min & max amount!";
    return result;
  }
  try {
    const molanaTrade = await pda([MOLANA_TRADE_TAG], programId);
    const tx = await program.rpc.setDepositState(state as number, amount, {
      accounts: {
        molanaTrade,
        depositRouter,
        depositWithdrawChecker: signer,
      },
      signers,
    });
    console.log("tx = ", tx);
    let key:keyof typeof state;
    for(key in state){
    result.msg =
      "successfully set deposit-router's state as " + key;
      break;
    }
  } catch (e: any) {
    result.success = false;
    result.msg = e.message;
  }
  return result;
};

export const supplyDepositTx = async (
  depositRouter: anchor.web3.PublicKey,
  signer: anchor.web3.PublicKey = program.provider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  let result: IResult = { success: true, data: null, msg: "" };
  try {
    const molanaTrade = await pda([MOLANA_TRADE_TAG], programId);
    const molanaTreasury = await pda([MOLANA_TREASURY_TAG], programId);
    const depositRouterData = await program.account.depositRouter.fetch(
      depositRouter
    );
    const currency = depositRouterData.currency as string;
    const tradeMint = await pda(
      [MOLANA_TRADE_MINT_TAG, Buffer.from(currency)],
      programId
    );
    const tradeTreasury = await pda(
      [MOLANA_TRADE_TREASURY_TAG, tradeMint.toBuffer()],
      programId
    );
    const tradeVault = await pda(
      [MOLANA_TRADE_VAULT_TAG, tradeMint.toBuffer()],
      programId
    );
    const userTradeVault = await pda(
      [MOLANA_USER_TRADE_VAULT_TAG, tradeMint.toBuffer(), signer.toBuffer()],
      programId
    );

    const tx = await program.rpc.supplyDepositTx({
      accounts: {
        molanaTrade,
        depositRouter,
        molanaTreasury,
        tradeTreasury,
        tradeMint,
        tradeVault,
        userTradeVault,
        authority: signer,
        ...defaults,
      },
      signers,
    });
    console.log("tx = ", tx);
    result.msg =
      "successfully supplied " +
      depositRouterData.amount.toNumber() +
      " " +
      currency;
  } catch (e: any) {
    result.success = false;
    result.msg = e.message;
  }
  return result;
};

export const setWithdrawRouter = async (
  amount: anchor.BN,
  destination: string,
  currency: string,
  userTradeVault: anchor.web3.PublicKey,
  signer: anchor.web3.PublicKey = program.provider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  let result: IResult = { success: true, data: null, msg: "" };
  if (currency.length > CURRENCY_LEN) {
    result.success = false;
    result.msg = "wrong currency length";
    return result;
  }
  if (
    amount.toNumber() > MAX_WITHDRAW_AMOUNT ||
    amount.toNumber() < MIN_WITHDRAW_AMOUNT
  ) {
    result.success = false;
    result.msg = "invalid amount. check min & max amount!";
    return result;
  }
  try {
    const molanaTrade = await pda([MOLANA_TRADE_TAG], programId);
    const molanaTradeData = await program.account.molanaTrade.fetch(
      molanaTrade
    );
    const withdrawId = molanaTradeData.withdrawId;
    const withdrawIdSeed = withdrawId.toBuffer("be", 8);
    const molanaTreasury = await pda([MOLANA_TREASURY_TAG], programId);
    const tradeMint = await pda(
      [MOLANA_TRADE_MINT_TAG, Buffer.from(currency)],
      programId
    );
    const tradeTreasury = await pda(
      [MOLANA_TRADE_TREASURY_TAG, tradeMint.toBuffer()],
      programId
    );
    const tradeVault = await pda(
      [MOLANA_TRADE_VAULT_TAG, tradeMint.toBuffer()],
      programId
    );
    const withdrawRouter = await pda(
      [MOLANA_WITHDRAW_ROUTER_TAG, withdrawIdSeed],
      programId
    );

    const tx = await program.rpc.setWithdrawRouter(
      amount,
      destination,
      currency,
      {
        accounts: {
          molanaTrade,
          tradeTreasury,
          withdrawRouter,
          molanaTreasury,
          tradeMint,
          tradeVault,
          userTradeVault,
          authority: signer,
          ...defaults,
        },
        signers,
      }
    );
    console.log("tx = ", tx);
    result.msg = "successfully set withdraw-router";
  } catch (e: any) {
    result.success = false;
    result.msg = e.message;
  }
  return result;
};

export const setWithdrawState = async (
  state: any,
  paymentId: anchor.BN,
  withdrawRouter: anchor.web3.PublicKey,
  signer: anchor.web3.PublicKey = program.provider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  let result: IResult = { success: true, data: null, msg: "" };
  try {
    const molanaTrade = await pda([MOLANA_TRADE_TAG], programId);

    const tx = await program.rpc.setWithdrawState(paymentId, state as number, {
      accounts: {
        molanaTrade,
        withdrawRouter,
        depositWithdrawChecker: signer,
      },
      signers,
    });
    console.log("tx = ", tx);
    let key:keyof typeof state;
    for(key in state){
    result.msg =
      "successfully set deposit-router's state as " + key;
      break;
    }
  } catch (e: any) {
    result.success = false;
    result.msg = e.message;
  }
  return result;
};

export const createUserTreasury = async (
  tradeMint: anchor.web3.PublicKey,

  signer: anchor.web3.PublicKey = program.provider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  let result: IResult = { success: true, data: null, msg: "" };
  try {
    const traderAccount = await pda(
      [MOLANA_TRADER_ACCOUNT_TAG, signer.toBuffer()],
      programId
    );
    const tradeTreasury = await pda(
      [MOLANA_TRADE_TREASURY_TAG, tradeMint.toBuffer()],
      programId
    );
    const userTreasury = await pda(
      [MOLANA_USER_TREASURY_TAG, tradeTreasury.toBuffer(), signer.toBuffer()],
      programId
    );
    const tx = await program.rpc.createUserTreasury({
      accounts: {
        traderAccount,
        tradeTreasury,
        userTreasury,
        authority: signer,
        ...defaults,
      },
      signers,
    });
    console.log("tx = ", tx);
    result.msg = "userTreasury successfully created!";
  } catch (e: any) {
    result.success = false;
    result.msg = e.message;
  }
  return result;
};
export const depositTradeToken = async (
  amount: anchor.BN,
  tradeMint: anchor.web3.PublicKey,
  userTradeVault: anchor.web3.PublicKey,
  signer: anchor.web3.PublicKey = program.provider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  let result: IResult = { success: true, data: null, msg: "" };
  try {
    const molanaTreasury = await pda([MOLANA_TREASURY_TAG], programId);
    const traderAccount = await pda(
      [MOLANA_TRADER_ACCOUNT_TAG, signer.toBuffer()],
      programId
    );
    const tradeTreasury = await pda(
      [MOLANA_TRADE_TREASURY_TAG, tradeMint.toBuffer()],
      programId
    );
    const tradeVault = await pda(
      [MOLANA_TRADE_VAULT_TAG, tradeMint.toBuffer()],
      programId
    );
    const userTreasury = await pda(
      [MOLANA_USER_TREASURY_TAG, tradeTreasury.toBuffer(), signer.toBuffer()],
      programId
    );
    const tx = await program.rpc.depositTradeToken(amount, {
      accounts: {
        molanaTreasury,
        traderAccount,
        tradeTreasury,
        tradeVault,
        userTreasury,
        userTradeVault,
        authority: signer,
        ...defaults,
      },
      signers,
    });
    console.log("tx = ", tx);
    const showAmount = await getShowingTokenAmount(amount, tradeMint);
    result.msg = "successfully deposited with " + showAmount;
  } catch (e: any) {
    result.success = false;
    result.msg = e.message;
  }
  return result;
};

export const withdrawTradeToken = async (
  amount: anchor.BN,
  tradeMint: anchor.web3.PublicKey,
  userTradeVault: anchor.web3.PublicKey,
  signer: anchor.web3.PublicKey = program.provider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  let result: IResult = { success: true, data: null, msg: "" };
  try {
    const molanaTreasury = await pda([MOLANA_TREASURY_TAG], programId);
    const traderAccount = await pda(
      [MOLANA_TRADER_ACCOUNT_TAG, signer.toBuffer()],
      programId
    );
    const tradeTreasury = await pda(
      [MOLANA_TRADE_TREASURY_TAG, tradeMint.toBuffer()],
      programId
    );
    const tradeVault = await pda(
      [MOLANA_TRADE_VAULT_TAG, tradeMint.toBuffer()],
      programId
    );
    const userTreasury = await pda(
      [MOLANA_USER_TREASURY_TAG, tradeTreasury.toBuffer(), signer.toBuffer()],
      programId
    );
    const tx = await program.rpc.withdrawTradeToken(amount, {
      accounts: {
        molanaTreasury,
        traderAccount,
        tradeTreasury,
        tradeVault,
        userTreasury,
        userTradeVault,
        authority: signer,
        ...defaults,
      },
      signers,
    });
    console.log("tx = ", tx);
    const showAmount = await getShowingTokenAmount(amount, tradeMint);
    result.msg = "successfully requested to withdraw " + showAmount;
  } catch (e: any) {
    result.success = false;
    result.msg = e.message;
  }
  return result;
};

export const createTradeTreasuryInstruction = async (
  tradeMint: anchor.web3.PublicKey,
  signer: anchor.web3.PublicKey = program.provider.wallet.publicKey
) => {
  const molanaTrade = await pda([MOLANA_TRADE_TAG], programId);
  const molanaTreasury = await pda([MOLANA_TREASURY_TAG], programId);
  const tradeTreasury = await pda(
    [MOLANA_TRADE_TREASURY_TAG, tradeMint.toBuffer()],
    programId
  );
  const tradeVault = await pda(
    [MOLANA_TRADE_VAULT_TAG, tradeMint.toBuffer()],
    programId
  );
  const tx = program.instruction.createTradeTreasury({
    accounts: {
      molanaTrade,
      tradeTreasury,
      tradeMint,
      tradeVault,
      molanaTreasury,
      authority: signer,
      ...defaults,
    },
  });
  return tx;
};

export const setSolOffer = async (
  buyRatio: anchor.BN,
  sellRatio: anchor.BN,
  tradeMintA: anchor.web3.PublicKey,
  tradeMintB: anchor.web3.PublicKey,
  direction: any,
  signer: anchor.web3.PublicKey = program.provider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  let result: IResult = { success: true, data: null, msg: "" };
  try {
    const traderAccount = await pda(
      [MOLANA_TRADER_ACCOUNT_TAG, signer.toBuffer()],
      programId
    );
    const tradeTreasuryA = await pda(
      [MOLANA_TRADE_TREASURY_TAG, tradeMintA.toBuffer()],
      programId
    );
    const tradeTreasuryAData = await program.account.tradeTreasury.fetchNullable(tradeTreasuryA)
    let preInstructions: any[] = [];
    if(!tradeTreasuryAData){
      const ix = await createTradeTreasuryInstruction(tradeMintA, signer)
      preInstructions.push(ix);
    }
    const tradeTreasuryB = await pda(
      [MOLANA_TRADE_TREASURY_TAG, tradeMintB.toBuffer()],
      programId
    );
    const tradeTreasuryBData = await program.account.tradeTreasury.fetchNullable(tradeTreasuryB);
    if(!tradeTreasuryBData) {
      const ix = await createTradeTreasuryInstruction(tradeMintB, signer)
      preInstructions.push(ix);
    }
    const userTreasuryA = await pda(
      [MOLANA_USER_TREASURY_TAG, tradeTreasuryA.toBuffer(), signer.toBuffer()],
      programId
    );
    const userTreasuryB = await pda(
      [MOLANA_USER_TREASURY_TAG, tradeTreasuryB.toBuffer(), signer.toBuffer()],
      programId
    );
    const solOffer = await pda(
      [MOLANA_OFFER_TAG, userTreasuryA.toBuffer(), userTreasuryB.toBuffer()],
      programId
    );
    const tx = await program.rpc.setSolOffer(buyRatio, sellRatio, direction, {
      accounts: {
        traderAccount,
        tradeTreasuryA,
        tradeTreasuryB,
        userTreasuryA,
        userTreasuryB,
        solOffer,
        authority: signer,
        ...defaults,
      },
      signers,
      preInstructions
    });
    console.log("tx = ", tx);
    result.msg = "successfully set your offer!";
  } catch (e: any) {
    result.success = false;
    result.msg = e.message;
  }
  return result;
};

export const sellSolOffer = async (
  amount: anchor.BN,
  solOffer: anchor.web3.PublicKey,
  userTradeVaultA: anchor.web3.PublicKey,
  userTradeVaultB: anchor.web3.PublicKey,
  signer: anchor.web3.PublicKey = program.provider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  let result: IResult = { success: true, data: null, msg: "" };
  try {
    const solOfferData = await program.account.solOffer.fetch(solOffer);
    const userTreasuryA = solOfferData.userTreasuryA;//providerA
    const userTreasuryB = solOfferData.userTreasuryB;//providerB
    const userTreasuryAData = await program.account.userTreasury.fetch(
      userTreasuryA
    );
    const userTreasuryBData = await program.account.userTreasury.fetch(
      userTreasuryB
    );
    const tradeTreasuryA = userTreasuryAData.tradeTreasury;
    const tradeTreasuryB = userTreasuryBData.tradeTreasury;
    const tradeTreasuryAData = await program.account.tradeTreasury.fetch(
      tradeTreasuryA
    );
    const tradeTreasuryBData = await program.account.tradeTreasury.fetch(
      tradeTreasuryB
    );
    const tradeVaultA = tradeTreasuryAData.tradeVault;
    const tradeVaultB = tradeTreasuryBData.tradeVault;

    const molanaTrade = await pda([MOLANA_TRADE_TAG], programId);
    const molanaTreasury = await pda([MOLANA_TREASURY_TAG], programId);
    const tx = await program.rpc.sellSolOffer(amount, {
      accounts: {
        molanaTrade,
        molanaTreasury,
        tradeTreasuryA,
        tradeTreasuryB,
        userTreasuryA,
        userTreasuryB,
        tradeVaultA,
        tradeVaultB,
        userTradeVaultA,
        userTradeVaultB,
        solOffer,
        authority: signer,
        tokenProgram: TOKEN_PROGRAM_ID,
        clock: SYSVAR_CLOCK_PUBKEY,
      },
      signers,
    });
    console.log("tx = ", tx);
    const showAmount = await getShowingTokenAmount(
      amount,
      tradeTreasuryBData.tradeMint
    );
    result.msg = "successfully traded for " + showAmount;
  } catch (e: any) {
    result.success = false;
    result.msg = e.message;
  }
  return result;
};
export const buySolOffer = async (
  amount: anchor.BN,
  solOffer: anchor.web3.PublicKey,
  userTradeVaultA: anchor.web3.PublicKey,
  userTradeVaultB: anchor.web3.PublicKey,
  signer: anchor.web3.PublicKey = program.provider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  let result: IResult = { success: true, data: null, msg: "" };
  try {
    const solOfferData = await program.account.solOffer.fetch(solOffer);
    const userTreasuryA = solOfferData.userTreasuryA;
    const userTreasuryB = solOfferData.userTreasuryB;
    const userTreasuryAData = await program.account.userTreasury.fetch(
      userTreasuryA
    );
    const userTreasuryBData = await program.account.userTreasury.fetch(
      userTreasuryB
    );
    const tradeTreasuryA = userTreasuryAData.tradeTreasury;
    const tradeTreasuryB = userTreasuryBData.tradeTreasury;
    const tradeTreasuryAData = await program.account.tradeTreasury.fetch(
      tradeTreasuryA
    );
    const tradeTreasuryBData = await program.account.tradeTreasury.fetch(
      tradeTreasuryB
    );
    const tradeVaultA = tradeTreasuryAData.tradeVault;
    const tradeVaultB = tradeTreasuryBData.tradeVault;

    const molanaTrade = await pda([MOLANA_TRADE_TAG], programId);
    const molanaTreasury = await pda([MOLANA_TREASURY_TAG], programId);
    
    const tx = await program.rpc.buySolOffer(amount, {
      accounts: {
        molanaTrade,
        molanaTreasury,
        tradeTreasuryA,
        tradeTreasuryB,
        userTreasuryA,
        userTreasuryB,
        tradeVaultA,
        tradeVaultB,
        userTradeVaultA,
        userTradeVaultB,
        solOffer,
        authority: signer,
        tokenProgram: TOKEN_PROGRAM_ID,
        clock: SYSVAR_CLOCK_PUBKEY,
      },
      signers,
    });
    console.log("tx = ", tx);
    const showAmount = await getShowingTokenAmount(
      amount,
      tradeTreasuryAData.tradeMint
    );
    result.msg = "successfully traded for " + showAmount;
  } catch (e: any) {
    result.success = false;
    result.msg = e.message;
  }
  return result;
};

export const setSolEthOffer = async (
  buyRatio: anchor.BN,
  sellRatio: anchor.BN,
  offerTimeLimitation: anchor.BN,
  providerType: any,
  direction: any,
  aNetwork: any,
  aToken: string,
  aVault: string,
  tradeMint: anchor.web3.PublicKey,
  signer: anchor.web3.PublicKey = program.provider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  let result: IResult = { success: true, data: null, msg: "" };
  if (aToken.length != ETH_ADDRESS_LEN) {
    result.success = false;
    result.msg = "wrong token address";
    return result;
  } else if (aVault.length != ETH_ADDRESS_LEN) {
    result.success = false;
    result.msg = "wrong vault address";
    return result;
  }
  try {
    const traderAccount = await pda(
      [MOLANA_TRADER_ACCOUNT_TAG, signer.toBuffer()],
      programId
    );
    const tradeTreasury = await pda(
      [MOLANA_TRADE_TREASURY_TAG, tradeMint.toBuffer()],
      programId
    );
    const userTreasury = await pda(
      [MOLANA_USER_TREASURY_TAG, tradeTreasury.toBuffer(), signer.toBuffer()],
      programId
    );
    const solEthOfferSeed = anchor.web3.Keypair.generate().publicKey;
    const solEthOffer = await pda(
      [MOLANA_SOL_ETH_OFFER_TAG, solEthOfferSeed.toBuffer(), signer.toBuffer()],
      programId
    );
    const molanaTrade = await pda([MOLANA_TRADE_TAG], programId);
    const tx = await program.rpc.setSolEthOffer(
      buyRatio,
      sellRatio,
      offerTimeLimitation,
      providerType,
      direction,
      aNetwork,
      aToken,
      aVault,
      {
        accounts: {
          molanaTrade,
          solEthOffer,
          solEthOfferSeed,
          tradeTreasury,
          userTreasury,
          traderAccount,
          authority: signer,
          ...defaults,
        },
        signers,
      }
    );
    console.log("tx = ", tx);
    result.data = solEthOffer;
    result.msg = "successfully set your offer!";
  } catch (e: any) {
    result.success = false;
    result.msg = e.message;
  }
  return result;
};

export const acceptSolEthOffer = async (
  acceptState: any,
  amount: anchor.BN,
  lockPeriod: anchor.BN,
  aVault: string,
  solEthOffer: anchor.web3.PublicKey,
  userTradeVault: anchor.web3.PublicKey,
  signer: anchor.web3.PublicKey = program.provider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  let result: IResult = { success: true, data: null, msg: "" };
  if (aVault.length != ETH_ADDRESS_LEN) {
    result.success = false;
    result.msg = "wrong address";
    return result;
  }
  try {
    const molanaTreasury = await pda([MOLANA_TREASURY_TAG], programId);
    const solEthOfferData = await program.account.solEthOffer.fetch(
      solEthOffer
    );
    const userTreasury = solEthOfferData.userTreasury;
    const userTreasuryData = await program.account.userTreasury.fetch(
      userTreasury
    );
    const tradeTreasury = userTreasuryData.tradeTreasury;
    const tradeTreasuryData = await program.account.tradeTreasury.fetch(
      tradeTreasury
    );
    const tradeVault = tradeTreasuryData.tradeVault;
    const traderAccount = await pda(
      [MOLANA_TRADER_ACCOUNT_TAG, userTreasuryData.owner.toBuffer()],
      programId
    );
    const solEthTrading = await pda(
      [MOLANA_SOL_ETH_TRADING_TAG, signer.toBuffer(), solEthOffer.toBuffer()],
      programId
    );
    const tx = await program.rpc.acceptSolEthOffer(
      acceptState,
      amount,
      lockPeriod,
      aVault,
      {
        accounts: {
          molanaTreasury,
          solEthOffer,
          solEthTrading,
          tradeTreasury,
          userTreasury,
          traderAccount,
          tradeVault,
          userTradeVault,
          authority: signer,
          ...defaults,
        },
        signers,
      }
    );
    console.log("tx = ", tx);
    result.msg =
      "you accepted offer - " + solEthOffer.toBase58() + " successfully";
  } catch (e: any) {
    result.success = false;
    result.msg = e.message;
  }
  return result;
};

export const setSolEthTradingState = async (
  state: any,
  solEthTrading: anchor.web3.PublicKey,
  signer: anchor.web3.PublicKey = program.provider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  let result: IResult = { success: true, data: null, msg: "" };
  try {
    const molanaTrade = await pda([MOLANA_TRADE_TAG], programId);
    const solEthTradingData = await program.account.solEthTrading.fetch(
      solEthTrading
    );
    const solEthOffer = solEthTradingData.offer;
    const solEthOfferData = await program.account.solEthOffer.fetch(
      solEthOffer
    );
    const userTreasury = solEthOfferData.userTreasury;
    const userTreasuryData = await program.account.userTreasury.fetch(
      userTreasury
    );
    const tradeTreasury = userTreasuryData.tradeTreasury;
    const tradeTreasuryData = await program.account.tradeTreasury.fetch(
      tradeTreasury
    );
    const tradeVault = tradeTreasuryData.tradeVault;

    const tx = await program.rpc.setSolEthTradingState(state, {
      accounts: {
        molanaTrade,
        solEthOffer,
        solEthTrading,
        tradeTreasury,
        userTreasury,
        authority: signer,
        clock: SYSVAR_CLOCK_PUBKEY,
      },
      signers,
    });
    console.log("tx = ", tx);
    result.msg =
      "successfully updaed for offer - " +
      solEthOffer.toBase58() +
      " with " +
      state.toString();
  } catch (e: any) {
    result.success = false;
    result.msg = e.message;
  }
  return result;
};

export const setSolEthTx = async (
  transactionId: string,
  solEthTrading: anchor.web3.PublicKey,
  signer: anchor.web3.PublicKey = program.provider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  let result: IResult = { success: true, data: null, msg: "" };
  try {
    const molanaTrade = await pda([MOLANA_TRADE_TAG], programId);
    const solEthTradingData = await program.account.solEthTrading.fetch(
      solEthTrading
    );
    
    const solEthOffer = solEthTradingData.offer;
    const solEthOfferData = await program.account.solEthOffer.fetch(solEthOffer)

    const userTreasury = solEthOfferData.userTreasury;
    const userTreasuryData = await program.account.userTreasury.fetch(
      userTreasury
    );
    const tradeTreasury = userTreasuryData.tradeTreasury;
    

    const tx = await program.rpc.setSolEthTx(transactionId, {
      accounts: {
        molanaTrade,
        solEthOffer,
        solEthTrading,
        tradeTreasury,
        userTreasury,
        authority: signer,
        clock: SYSVAR_CLOCK_PUBKEY,
      },
      signers,
    });
    console.log("tx = ", tx);
    result.msg =
      "successfully set transaction hash for offer - " + solEthOffer.toBase58();
  } catch (e: any) {
    result.success = false;
    result.msg = e.message;
  }
  return result;
};

export const claimSolEthTrading = async (
  solEthTrading: anchor.web3.PublicKey,
  userTradeVault: anchor.web3.PublicKey,
  signer: anchor.web3.PublicKey = program.provider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  let result: IResult = { success: true, data: null, msg: "" };
  try {
    const molanaTrade = await pda([MOLANA_TRADE_TAG], programId);
    const molanaTreasury = await pda([MOLANA_TREASURY_TAG], programId);
    const solEthTradingData = await program.account.solEthTrading.fetch(
      solEthTrading
    );
    const solEthOffer = solEthTradingData.offer;
    const solEthOfferData = await program.account.solEthOffer.fetch(
      solEthOffer
    );
    const userTreasury = solEthOfferData.userTreasury;
    const userTreasuryData = await program.account.userTreasury.fetch(
      userTreasury
    );
    const tradeTreasury = userTreasuryData.tradeTreasury;
    const tradeTreasuryData = await program.account.tradeTreasury.fetch(
      tradeTreasury
    );
    const tradeVault = tradeTreasuryData.tradeVault;

    const tx = await program.rpc.claimSolEthTrading({
      accounts: {
        molanaTrade,
        molanaTreasury,
        solEthOffer,
        solEthTrading,
        tradeTreasury,
        userTreasury,
        tradeVault,
        userTradeVault,
        authority: signer,
        ...defaults,
      },
      signers,
    });
    console.log("tx = ", tx);
    result.msg = "successfully claimed";
  } catch (e: any) {
    result.success = false;
    result.msg = e.message;
  }
  return result;
};

export const claimProfit = async (
  tradeTreasury: anchor.web3.PublicKey,
  signer: anchor.web3.PublicKey = program.provider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  let result: IResult = { success: true, data: null, msg: "" };
  try {
    const molanaTrade = await pda([MOLANA_TRADE_TAG], programId);
    const molanaTreasury = await pda([MOLANA_TREASURY_TAG], programId);
    const tradeTreasuryData = await program.account.tradeTreasury.fetch(
      tradeTreasury
    );
    const tradeMint = tradeTreasuryData.tradeMint;
    const tradeVault = tradeTreasuryData.tradeVault;
    const userTradeVault =  await pda([MOLANA_USER_TRADE_VAULT_TAG, tradeMint.toBuffer(), signer.toBuffer()], programId);
    const tx = await program.rpc.claimProfit({
      accounts: {
        molanaTrade,
        molanaTreasury,
        tradeTreasury,
        tradeVault,
        tradeMint,
        userTradeVault,
        authority: signer,
        ...defaults,
      },
      signers,
    });
    console.log("tx = ", tx);
    result.msg = "successfully claimed";
  } catch (e: any) {
    result.success = false;
    result.msg = e.message;
  }
  return result;
};

export const setEthBscOffer = async (
  buyRatio: anchor.BN,
  sellRatio: anchor.BN,
  offerTimeLimitation: anchor.BN,
  providerType: any,
  aNetwork: any,
  aToken: string,
  aVault: string,
  bNetwork: any,
  bToken: string,
  bVault: string,
  tradeMint: anchor.web3.PublicKey,
  signer: anchor.web3.PublicKey = program.provider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  let result: IResult = { success: true, data: null, msg: "" };
  if (
    aToken.length != ETH_ADDRESS_LEN ||
    aVault.length != ETH_ADDRESS_LEN ||
    bToken.length != ETH_ADDRESS_LEN ||
    bVault.length != ETH_ADDRESS_LEN
  ) {
    result.success = false;
    result.msg = "wrong address";
    return result;
  }
  try {
    const traderAccount = await pda(
      [MOLANA_TRADER_ACCOUNT_TAG, signer.toBuffer()],
      programId
    );
    const tradeTreasury = await pda(
      [MOLANA_TRADE_TREASURY_TAG, tradeMint.toBuffer()],
      programId
    );
    const userTreasury = await pda(
      [MOLANA_USER_TREASURY_TAG, tradeTreasury.toBuffer(), signer.toBuffer()],
      programId
    );
    const ethBscOfferSeed = anchor.web3.Keypair.generate().publicKey;
    const ethBscOffer = await pda(
      [MOLANA_ETH_BSC_OFFER_TAG, ethBscOfferSeed.toBuffer(), signer.toBuffer()],
      programId
    );
    const molanaTrade = await pda([MOLANA_TRADE_TAG], programId);

    const tx = await program.rpc.setEthBscOffer(
      buyRatio,
      sellRatio,
      offerTimeLimitation,
      providerType,
      aNetwork,
      aToken,
      aVault,
      bNetwork,
      bToken,
      bVault,
      {
        accounts: {
          molanaTrade,
          ethBscOffer,
          ethBscOfferSeed,
          tradeTreasury,
          userTreasury,
          traderAccount,
          authority: signer,
          ...defaults,
        },
        signers,
      }
    );
    console.log("tx = ", tx);
    result.data = ethBscOffer;
    result.msg = "successfully set your offer - " + ethBscOffer.toBase58();
  } catch (e: any) {
    result.success = false;
    result.msg = e.message;
  }
  return result;
};

export const acceptEthBscOffer = async (
  sendNetwork: any,
  sendToken: string,
  sendVault: string,

  receiveNetwork: any,
  receiveToken: string,
  receiveVault: string,

  splAmount: anchor.BN,
  lockPeriod: anchor.BN,
  ethBscOffer: anchor.web3.PublicKey,

  signer: anchor.web3.PublicKey = program.provider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  let result: IResult = { success: true, data: null, msg: "" };
  if (
    sendToken.length != ETH_ADDRESS_LEN ||
    sendVault.length != ETH_ADDRESS_LEN ||
    receiveToken.length != ETH_ADDRESS_LEN ||
    receiveVault.length != ETH_ADDRESS_LEN
  ) {
    result.success = false;
    result.msg = "wrong address";
    return result;
  }
  try {
    const ethBscOfferData = await program.account.ethBscOffer.fetch(
      ethBscOffer
    );
    const userTreasury = ethBscOfferData.userTreasury;
    const ethBscTrading = await pda(
      [MOLANA_ETH_BSC_TRADING_TAG, signer.toBuffer(), ethBscOffer.toBuffer()],
      programId
    );
    const molanaTrade = await pda([MOLANA_TRADE_TAG], programId);
    const molanaTreasury = await pda([MOLANA_TREASURY_TAG], programId);
    
    const tx = await program.rpc.acceptEthBscOffer(
      sendNetwork,
      sendToken,
      sendVault,
      receiveNetwork,
      receiveToken,
      receiveVault,
      splAmount,
      lockPeriod,
      {
        accounts: {
          molanaTrade,
          molanaTreasury,
          ethBscOffer,
          ethBscTrading,
          userTreasury,
          authority: signer,
          ...defaults,
        },
        signers,
      }
    );
    console.log("tx = ", tx);
    result.msg = "successfully accepted!";
  } catch (e: any) {
    result.success = false;
    result.msg = e.message;
  }
  return result;
};

export const setEthBscTradingState = async (
  amount: anchor.BN,
  state: any,
  ethBscTrading: anchor.web3.PublicKey,
  signer: anchor.web3.PublicKey = program.provider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  let result: IResult = { success: true, data: null, msg: "" };
  try {
    const molanaTrade = await pda([MOLANA_TRADE_TAG], programId);
    const ehtBscTradingData = await program.account.ethBscTrading.fetch(
      ethBscTrading
    );
    const userTreasury = ehtBscTradingData.userTreasury;
    const userTreasuryData = await program.account.userTreasury.fetch(
      userTreasury
    );
    const tradeTreasury = userTreasuryData.tradeTreasury;
    const tradeTreasuryData = await program.account.tradeTreasury.fetch(
      tradeTreasury
    );
    const tradeVault = tradeTreasuryData.tradeVault;
    const ethBscOffer = ehtBscTradingData.offer;
    const tx = await program.rpc.setEthBscTradingState(amount, state, {
      accounts: {
        molanaTrade,
        ethBscOffer,
        ethBscTrading,
        tradeTreasury,
        userTreasury,
        authority: signer,
        clock: SYSVAR_CLOCK_PUBKEY,
      },
      signers,
    });
    console.log("tx = ", tx);
    result.msg = "successfully updated offer state with " + state.toString();
  } catch (e: any) {
    result.success = false;
    result.msg = e.message;
  }
  return result;
};

export const setEthBscTraderTx = async (
  transactionId: string,
  ethBscTrading: anchor.web3.PublicKey,
  signer: anchor.web3.PublicKey = program.provider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  let result: IResult = { success: true, data: null, msg: "" };
  if (transactionId.length != ETH_TX_LEN) {
    result.success = false;
    result.msg = "wrong transaction hash";
    return result;
  }
  try {
    const molanaTrade = await pda([MOLANA_TRADE_TAG], programId);
    const ehtBscTradingData = await program.account.ethBscTrading.fetch(
      ethBscTrading
    );
    const ethBscOffer = ehtBscTradingData.offer;
    const userTreasury = ehtBscTradingData.userTreasury;
    const tradeTreasury = await pda(
      [MOLANA_USER_TREASURY_TAG, userTreasury.toBuffer(), signer.toBuffer()],
      programId
    );
    const tx = await program.rpc.setEthBscTraderTx(transactionId, {
      accounts: {
        molanaTrade,
        ethBscOffer,
        ethBscTrading,
        tradeTreasury,
        userTreasury,
        authority: signer,
        clock: SYSVAR_CLOCK_PUBKEY,
      },
      signers,
    });
    console.log("tx = ", tx);
    result.msg = "successfully set transaction hash!";
  } catch (e: any) {
    result.success = false;
    result.msg = e.message;
  }
  return result;
};

export const setEthBscUserTx = async (
  transactionId: string,
  ethBscTrading: anchor.web3.PublicKey,
  signer: anchor.web3.PublicKey = program.provider.wallet.publicKey,
  signers: anchor.web3.Keypair[] = []
) => {
  let result: IResult = { success: true, data: null, msg: "" };
  if (transactionId.length != ETH_TX_LEN) {
    result.success = false;
    result.msg = "wrong transaction hash";
    return result;
  }
  try {
    const molanaTrade = await pda([MOLANA_TRADE_TAG], programId);
    const ehtBscTradingData = await program.account.ethBscTrading.fetch(
      ethBscTrading
    );
    const userTreasury = ehtBscTradingData.userTreasury;
    const tradeTreasury = await pda(
      [MOLANA_USER_TREASURY_TAG, userTreasury.toBuffer(), signer.toBuffer()],
      programId
    );
    const ethBscOffer = ehtBscTradingData.offer;
    const tx = await program.rpc.setEthBscUserTx(transactionId, {
      accounts: {
        molanaTrade,
        ethBscOffer,
        ethBscTrading,
        tradeTreasury,
        userTreasury,
        authority: signer,
        clock: SYSVAR_CLOCK_PUBKEY,
      },
      signers,
    });
    console.log("tx = ", tx);
    result.msg = "successfully set transaction hash!";
  } catch (e: any) {
    result.success = false;
    result.msg = e.message;
  }
  return result;
};
export const Direction = {
  AToB: { atob: {} },
  BToA: { btoa: {} },
  All: { all: {} },
  NotAll: { notall: {} },
};

export const DepositTxState = {
  Initialized: { initialized: {} },
  Sent: { sent: {} },
  Pending: { pending: {} },
  Arrived: { arrived: {} },
  Supplied: { supplied: {} },
  NotArrived: { notArrived: {} },
};

export const WithdrawTxState = {
  Initialized: { initialized: {} },
  RequestedAndBurned: { requestedAndBurned: {} },
  Pending: { pending: {} },
  Completed: { completed: {} },
  Wrong: { wrong: {} },
};

export const SolEthOfferState = {
  Initialized: { initialized: {} },
  Active: { active: {} },
  Trading: { trading: {} },
  Locked: { locked: {} },
};

export const EthBscOfferState = {
  Initialized: { initialized: {} },
  Active: { active: {} },
  Trading: { trading: {} },
  Locked: { locked: {} },
};
export const SolEthTradingState = {
  Initialized: { initialized: {} },
  AcceptedOfSolToEth: { acceptedOfSolToEth: {} },
  SentOfSolToEth: { sentOfSolToEth: {} },
  FailedOfSolToEth: { failedOfSolToEth: {} },
  CompletedOfSolToEth: { completedOfSolToEth: {} },

  AcceptedOfEthToSol: { acceptedOfEthToSol: {} },
  SentOfEthToSol: { sentOfEthToSol: {} },
  FailedOfEthToSol: { failedOfEthToSol: {} },
  CompletedOfEthToSol: { completedOfEthToSol: {} },
  Wrong: { wrong: {} },
};
export const EthBscTradingState = {
  Initialized: { initialized: {} },
  Accepted: { accepted: {} },
  SentAB: { sentAB: {} },
  FailedAB: { failedAB: {} },
  SentBA: { sentBA: {} },
  FailedBA: { failedBA: {} },
  FailedAll: { failedAll: {} },
  Completed: { completed: {} },
};

export const Network = {
  Eth: { eth: {} },
  Bsc: { bsc: {} },
};

export const ProviderType = {
  Human: { human: {} },
  Bot: { bot: {} },
  Platform: { platform: {} },
};
export function getNumberOfState(type: any, state: any) {
  let i = 0;
  for (const [key, value] of Object.entries(type)) {
    for (const [key1, _value1] of Object.entries(value as any)) {
      for (const [key2, _value2] of Object.entries(state as any)) {
        if (key1 === key2) {
          return i;
        }
      }
    }

    i++;
  }
  return -1;
}
export function compareState(state1: any, state2: any) {
  for (const [key1, _value1] of Object.entries(state1)) {
    for (const [key2, _value2] of Object.entries(state2)) {
      return key1 === key2;
    }
  }
  return false;
}
// ------------------------------untility functions------------------------
export async function getShowingTokenAmount(
  amount: anchor.BN,
  mintKey: anchor.web3.PublicKey
) {
  const token = new Token(
    program.provider.connection,
    mintKey,
    TOKEN_PROGRAM_ID,
    program.provider.wallet as any
  );
  const mintInfo = await token.getMintInfo();
  const decimals = mintInfo.decimals;
  const showAmount = amount.toNumber() / Math.pow(10, decimals);
  return showAmount;
}
export async function pda(
  seeds: (Buffer | Uint8Array)[],
  programId: anchor.web3.PublicKey
) {
  const [pdaKey] = await anchor.web3.PublicKey.findProgramAddress(
    seeds,
    programId
  );
  return pdaKey;
}

export const getTokenMintByPayoneerCurrency = async (currency: string) => {
  const tradeMint = await pda(
    [MOLANA_TRADE_MINT_TAG, Buffer.from(currency)],
    programId
  );
  return tradeMint;
};
export const getGlobalState = async () => {
  const molanaTrade = await pda([MOLANA_TRADE_TAG], programId);
  return await program.account.molanaTrade.fetchNullable(molanaTrade);
};
export const getTraderAccount = async (
  owner: anchor.web3.PublicKey = program.provider.wallet.publicKey
) => {
  const traderAccount = await pda(
    [MOLANA_TRADER_ACCOUNT_TAG, owner.toBuffer()],
    programId
  );
  return await program.account.traderAccount.fetchNullable(traderAccount);
};
export const getMultipleTraderAccounts = async (
  owners: [anchor.web3.PublicKey]
) => {
  const traderAccounts = [];
  for (let i = 0; i < owners.length; i++) {
    const traderAccount = await pda(
      [MOLANA_TRADER_ACCOUNT_TAG, owners[i].toBuffer()],
      programId
    );
    traderAccounts.push(traderAccount);
  }
  return await program.account.traderAccount.fetchMultiple(traderAccounts);
};

export const getSolOffer = async (solOffer: anchor.web3.PublicKey) => {
  return await program.account.solOffer.fetchNullable(solOffer);
};
export const getMultipleSolOffers = async (offers: [anchor.web3.PublicKey]) => {
  return await program.account.solOffer.fetchMultiple(offers);
};
export const getSolOffersByOwner = async (owner: anchor.web3.PublicKey) => {
  const accountName = "solOffer";
  const discriminator = anchor.AccountsCoder.accountDiscriminator(accountName);
  const filter: MemcmpFilter = {
    memcmp: {
      offset: discriminator.length,
      bytes: owner.toBase58(),
    },
  };
  return await program.account.solOffer.all([filter]);
};
export const getAllSolOffers = async (
  owner?: anchor.web3.PublicKey,
  tokenMintA?: anchor.web3.PublicKey,
  tokenMintB?: anchor.web3.PublicKey
) => {
  const accountName = "solOffer";
  const discriminator = anchor.AccountsCoder.accountDiscriminator(accountName);
  const filters1: any[] = [];
  const filters2: any[] = [];
  if (owner) {
    const filter: MemcmpFilter = {
      memcmp: {
        offset: discriminator.length,
        bytes: owner.toBase58(),
      },
    };
    filters1.push(filter);
    filters2.push(filter);
  }
  if (tokenMintA) {
    let filter: MemcmpFilter = {
      memcmp: {
        offset: discriminator.length + 32,
        bytes: tokenMintA.toBase58(),
      },
    };
    filters1.push(filter);
    filter = {
      memcmp: {
        offset: discriminator.length + 64,
        bytes: tokenMintA.toBase58(),
      },
    };
    filters2.push(filter);
  }
  if (tokenMintB) {
    let filter: MemcmpFilter = {
      memcmp: {
        offset: discriminator.length + 64,
        bytes: tokenMintB.toBase58(),
      },
    };
    filters1.push(filter);
    filter = {
      memcmp: {
        offset: discriminator.length + 32,
        bytes: tokenMintB.toBase58(),
      },
    };
    filters2.push(filter);
  }
  const solOffers1 = await program.account.solOffer.all(filters1);
  if (tokenMintA || tokenMintB) {
    const solOffers2 = await program.account.solOffer.all(filters2);
    return [...solOffers1, ...solOffers2];
  }
  return [...solOffers1];
};

export const getSolEthOffer = async (solEthOffer: anchor.web3.PublicKey) => {
  return await program.account.solEthOffer.fetchNullable(solEthOffer);
};
export const getMultipleSolEthOffers = async (
  offers: [anchor.web3.PublicKey]
) => {
  return await program.account.solEthOffer.fetchMultiple(offers);
};
export const getSolEthOffersByOwner = async (owner: anchor.web3.PublicKey) => {
  const accountName = "solEthOffer";
  const discriminator = anchor.AccountsCoder.accountDiscriminator(accountName);
  const filter: MemcmpFilter = {
    memcmp: {
      offset: discriminator.length,
      bytes: owner.toBase58(),
    },
  };
  return await program.account.solEthOffer.all([filter]);
};

export const getAllSolEthOffers = async (
  owner?: anchor.web3.PublicKey,
  splToken?: anchor.web3.PublicKey
) => {
  const accountName = "solEthOffer";
  const discriminator = anchor.AccountsCoder.accountDiscriminator(accountName);
  const filters: any[] = [];
  if (owner) {
    const filter: MemcmpFilter = {
      memcmp: {
        offset: discriminator.length,
        bytes: owner.toBase58(),
      },
    };
    filters.push(filter);
  }
  if (splToken) {
    const filter: MemcmpFilter = {
      memcmp: {
        offset: discriminator.length + 32,
        bytes: splToken.toBase58(),
      },
    };
    filters.push(filter);
  }
  return await program.account.solEthOffer.all(filters);
};

export const getEthBscOffer = async (ethBscOffer: anchor.web3.PublicKey) => {
  return await program.account.ethBscOffer.fetchNullable(ethBscOffer);
};
export const getMultipleEthBscOffers = async (
  offers: [anchor.web3.PublicKey]
) => {
  return await program.account.ethBscOffer.fetchMultiple(offers);
};
export const getEthBscOffersByOwner = async (owner: anchor.web3.PublicKey) => {
  const accountName = "ethBscOffer";
  const discriminator = anchor.AccountsCoder.accountDiscriminator(accountName);
  const filter: MemcmpFilter = {
    memcmp: {
      offset: discriminator.length,
      bytes: owner.toBase58(),
    },
  };
  return await program.account.ethBscOffer.all([filter]);
};

export const getAllEthBscOffers = async () => {
  const all = await program.account.ethBscOffer.all();

  return all;
};
export const getSolEthTrading = async (trading: anchor.web3.PublicKey) => {
  return await program.account.solEthTrading.fetchNullable(trading);
};
export const getMultipleSolEthTradings = async (
  tradings: [anchor.web3.PublicKey]
) => {
  return await program.account.solEthTrading.fetchMultiple(tradings);
};
export const getSolEthTradingsByOwner = async (
  owner: anchor.web3.PublicKey
) => {
  const accountName = "solEthTrading";
  const discriminator = anchor.AccountsCoder.accountDiscriminator(accountName);
  const filter: MemcmpFilter = {
    memcmp: {
      offset: discriminator.length,
      bytes: owner.toBase58(),
    },
  };
  return await program.account.solEthTrading.all([filter]);
};
export const getAllSolEthTradings = async () => {
  return await program.account.solEthTrading.all();
};

export const getEthBscTrading = async (trading: anchor.web3.PublicKey) => {
  return await program.account.ethBscTrading.fetchNullable(trading);
};
export const getMultipleEthBscTradings = async (
  tradings: [anchor.web3.PublicKey]
) => {
  return await program.account.ethBscTrading.fetchMultiple(tradings);
};
export const getEthBscTradingsByOwner = async (
  owner: anchor.web3.PublicKey,
) => {
  const accountName = "ethBscTrading";
  const discriminator = anchor.AccountsCoder.accountDiscriminator(accountName);
  const filter: MemcmpFilter = {
    memcmp: {
      offset: discriminator.length,
      bytes: owner.toBase58(),
    },
  };
  return await program.account.ethBscTrading.all([filter]);
};
export const getAllEthBscTradings = async () => {
  return await program.account.ethBscTrading.all();
};

export const getDepositRouter = async (router: anchor.web3.PublicKey) => {
  return await program.account.depositRouter.fetchNullable(router);
};

export const getDepositRouterByTx = async (
  txid: number,
  owner: anchor.web3.PublicKey = program.provider.wallet.publicKey
) => {
  const paymentId = new anchor.BN(txid);
  const paymentIdSeed = paymentId.toBuffer("be", 8);
  const depositRouter = await pda(
    [MOLANA_DEPOSIT_ROUTER_TAG, paymentIdSeed, owner.toBuffer()],
    programId
  );
  return await program.account.depositRouter.fetchNullable(depositRouter);
};
export const getMultipleDepositRouters = async (
  routers: [anchor.web3.PublicKey]
) => {
  return await program.account.depositRouter.fetchMultiple(routers);
};
export const getDepositRoutersByOwner = async (
  owner: anchor.web3.PublicKey,
) => {
  const accountName = "depositRouter";
  const discriminator = anchor.AccountsCoder.accountDiscriminator(accountName);
  const filter: MemcmpFilter = {
    memcmp: {
      offset: discriminator.length,
      bytes: owner.toBase58(),
    },
  };
  return await program.account.depositRouter.all([filter]);
};
export const getAllDepositRouters = async () => {
  return await program.account.depositRouter.all();
};
export const getWithdrawRouter = async (router: anchor.web3.PublicKey) => {
  return await program.account.withdrawRouter.fetchNullable(router);
};

export const getWithdrawRouterByWithdrawId = async (
  wId: number,
  owner: anchor.web3.PublicKey = program.provider.wallet.publicKey
) => {
  const withdrawId = new anchor.BN(wId);
  const paymentIdSeed = withdrawId.toBuffer("be", 8);
  const withdrawRouter = await pda(
    [MOLANA_DEPOSIT_ROUTER_TAG, paymentIdSeed, owner.toBuffer()],
    programId
  );
  return await program.account.withdrawRouter.fetchNullable(withdrawRouter);
};
export const getMultipleWithdrawRouters = async (
  routers: [anchor.web3.PublicKey]
) => {
  return await program.account.withdrawRouter.fetchMultiple(routers);
};
export const getWithdrawRoutersByOwner = async (
  owner: anchor.web3.PublicKey,
  offset?: number,
  length?: number
) => {
  const accountName = "withdrawRouter";
  const discriminator = anchor.AccountsCoder.accountDiscriminator(accountName);
  const filter: MemcmpFilter = {
    memcmp: {
      offset: discriminator.length,
      bytes: owner.toBase58(),
    },
  };
  return await program.account.withdrawRouter.all([filter]);
};
export const getAllWithdrawRouters = async () => {
  return await program.account.withdrawRouter.all();
};
export const getTradeVault = async (tradeTreasury: anchor.web3.PublicKey) => {
  return await program.account.tradeTreasury.fetchNullable(tradeTreasury);
};
export const getAllTradeVaults = async () => {
  return await program.account.tradeTreasury.all();
};

export const getMultipleTradeVaults = async (
  vaults: [anchor.web3.PublicKey]
) => {
  return await program.account.tradeTreasury.fetchMultiple(vaults);
};
export const getUserTreasury = async (userTreasury: anchor.web3.PublicKey) => {
  return await program.account.userTreasury.fetchNullable(userTreasury);
};
export const getMultipleUserTreasuries = async (
  routers: [anchor.web3.PublicKey]
) => {
  return await program.account.userTreasury.fetchMultiple(routers);
};
export const getUserTreasuryByOwner = async (
  owner: anchor.web3.PublicKey,
) => {
  const accountName = "userTreasury";
  const discriminator = anchor.AccountsCoder.accountDiscriminator(accountName);
  const filter: MemcmpFilter = {
    memcmp: {
      offset: discriminator.length,
      bytes: owner.toBase58(),
    },
  };
  return await program.account.userTreasury.all([filter]);
};
export const getAllUserTreasuries = async () => {
  return await program.account.userTreasury.all();
};

export const getVaultAmount = async (address: anchor.web3.PublicKey) => {
  const tokenAccount = await getTokenAccount(
    program.provider.connection,
    address
  );
  return tokenAccount.amount;
};
