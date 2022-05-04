import * as anchor from '@project-serum/anchor';
import { Program, IdlAccounts, IdlTypes } from '@project-serum/anchor';
import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import { TOKEN_PROGRAM_ID, Token, AccountLayout } from "@solana/spl-token";
import {use as chaiUse, assert, expect} from 'chai'    

import { Molana } from './molana';
import {
  // closeTraderAccount,
  createTradeTreasury,
  createTradeTreasuryForPayoneer,
  DepositTxState,
  Direction,
  initMolanaProgram,
  MOLANA_DEPOSIT_ROUTER_TAG,
  MOLANA_WITHDRAW_ROUTER_TAG,
  MOLANA_TRADER_ACCOUNT_TAG,
  MOLANA_TRADE_MINT_TAG,
  MOLANA_TRADE_TAG,
  MOLANA_TRADE_TREASURY_TAG,
  MOLANA_TRADE_VAULT_TAG,
  pda,
  setDepositRouter,
  setDepositState,
  setGlobalState,
  setTraderAccount,
  supplyDepositTx,
  setWithdrawRouter,
  MOLANA_USER_TRADE_VAULT_TAG,
  WithdrawTxState,
  setWithdrawState,
  MOLANA_USER_TREASURY_TAG,
  depositTradeToken,
  withdrawTradeToken,
  setSolOffer,
  MOLANA_OFFER_TAG,
  sellSolOffer,
  buySolOffer,
  setSolEthOffer,
  SolEthTradingState,
  acceptSolEthOffer,
  MOLANA_SOL_ETH_TRADING_TAG,
  setSolEthTradingState,
  claimSolEthTrading,
  Network,
  setEthBscOffer,
  acceptEthBscOffer,
  MOLANA_ETH_BSC_TRADING_TAG,
  EthBscTradingState,
  setSolEthTx,
  setEthBscTradingState,
  setEthBscUserTx,
  setEthBscTraderTx,
  ProviderType,
  getAllSolOffers,
  compareState,
  getNumberOfState,
  getAllSolEthOffers,
  SolEthOfferState,
  getAllEthBscOffers,
  EthBscOfferState,
  getDepositRouterByTx,
  SOL_DECIMALS,
} from "./molana-integration";

interface TestWallets {
  tradeProvider1: anchor.web3.PublicKey,
  tradeProvider2: anchor.web3.PublicKey,
  trader1: anchor.web3.PublicKey,
  trader2: anchor.web3.PublicKey,
  trader3: anchor.web3.PublicKey,
  checker: anchor.web3.PublicKey,
}

describe('molana', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Molana as Program<Molana>;
  const programId = program.programId;
  initMolanaProgram(program.provider.connection, program.provider.wallet, programId)

  const superOwnerKeypair = anchor.web3.Keypair.generate();
  const superOwner = superOwnerKeypair.publicKey;

  const tradeProvider1Keypair = anchor.web3.Keypair.generate();
  const tradeProvider2Keypair = anchor.web3.Keypair.generate();
  const trader1Keypair = anchor.web3.Keypair.generate();
  const trader2Keypair = anchor.web3.Keypair.generate();
  const trader3Keypair = anchor.web3.Keypair.generate();
  const checkerKeypair = anchor.web3.Keypair.generate();

  const walletPublicKey : TestWallets = {
    tradeProvider1: tradeProvider1Keypair.publicKey,
    tradeProvider2: tradeProvider2Keypair.publicKey,
    trader1: trader1Keypair.publicKey,
    trader2: trader2Keypair.publicKey,
    trader3: trader3Keypair.publicKey,
    checker: checkerKeypair.publicKey,
  };

  let tokenPublicKey : {
    USDCPublicKey: anchor.web3.PublicKey,
    MONAPublicKey: anchor.web3.PublicKey,
    USDTPublicKey: anchor.web3.PublicKey,
    wUSTPublicKey: anchor.web3.PublicKey,
    CASHPublicKey: anchor.web3.PublicKey,
  } = {
    USDCPublicKey: null as any,
    MONAPublicKey: null as any,
    USDTPublicKey: null as any,
    wUSTPublicKey: null as any,
    CASHPublicKey: null as any,
  }

  let USDCTokenAccount: TestWallets, MONATokenAccount: TestWallets, USDTTokenAccount: TestWallets, wUSTTokenAccount: TestWallets, CASHTokenAccount: TestWallets;
  USDCTokenAccount = {
    tradeProvider1: null as any,
    tradeProvider2: null as any,
    trader1: null as any,
    trader2: null as any,
    trader3: null as any,
    checker: null as any,
  }

  MONATokenAccount = {
    tradeProvider1: null as any,
    tradeProvider2: null as any,
    trader1: null as any,
    trader2: null as any,
    trader3: null as any,
    checker: null as any,
  }

  USDTTokenAccount = {
    tradeProvider1: null as any,
    tradeProvider2: null as any,
    trader1: null as any,
    trader2: null as any,
    trader3: null as any,
    checker: null as any,
  }

  wUSTTokenAccount = {
    tradeProvider1: null as any,
    tradeProvider2: null as any,
    trader1: null as any,
    trader2: null as any,
    trader3: null as any,
    checker: null as any,
  }

  CASHTokenAccount = {
    tradeProvider1: null as any,
    tradeProvider2: null as any,
    trader1: null as any,
    trader2: null as any,
    trader3: null as any,
    checker: null as any,
  }

  // let USDCTokenMint: Token = null as any;

  it('Is Initialize!', async () => {
    
    await safeAirdrop(program.provider.connection, superOwner, 100 * 10 ** SOL_DECIMALS);
    await safeAirdrop(program.provider.connection, walletPublicKey.tradeProvider1, 100 * 10 ** SOL_DECIMALS);
    await safeAirdrop(program.provider.connection, walletPublicKey.tradeProvider2, 100 * 10 ** SOL_DECIMALS);
    await safeAirdrop(program.provider.connection, walletPublicKey.trader1, 100 * 10 ** SOL_DECIMALS);
    await safeAirdrop(program.provider.connection, walletPublicKey.trader2, 100 * 10 ** SOL_DECIMALS);
    await safeAirdrop(program.provider.connection, walletPublicKey.trader3, 100 * 10 ** SOL_DECIMALS);
    await safeAirdrop(program.provider.connection, walletPublicKey.checker, 100 * 10 ** SOL_DECIMALS);

    let key: keyof typeof USDCTokenAccount;

    let USDCTokenMint = await Token.createMint(
      program.provider.connection,
      superOwnerKeypair,
      superOwner,
      null,
      6,
      TOKEN_PROGRAM_ID,
    );
    tokenPublicKey.USDCPublicKey = USDCTokenMint.publicKey;
    for(key in USDCTokenAccount) {
      USDCTokenAccount[key] = await USDCTokenMint.createAccount(walletPublicKey[key]);
      await USDCTokenMint.mintTo(
        USDCTokenAccount[key],
        superOwner,
        [],
        1_000_000_000_000,
      );
    }

    let MONATokenMint = await Token.createMint(
      program.provider.connection,
      superOwnerKeypair,
      superOwner,
      null,
      8,
      TOKEN_PROGRAM_ID,
    );
    tokenPublicKey.MONAPublicKey = MONATokenMint.publicKey;
    for(key in MONATokenAccount) {
      MONATokenAccount[key] = await MONATokenMint.createAccount(walletPublicKey[key]);
      await MONATokenMint.mintTo(
        MONATokenAccount[key],
        superOwner,
        [],
        100_000_000_000_000,
      );
    }

    let USDTTokenMint = await Token.createMint(
      program.provider.connection,
      superOwnerKeypair,
      superOwner,
      null,
      6,
      TOKEN_PROGRAM_ID,
    );
    tokenPublicKey.USDTPublicKey = USDTTokenMint.publicKey;
    for(key in USDTTokenAccount) {
      USDTTokenAccount[key] = await USDTTokenMint.createAccount(walletPublicKey[key]);
      await USDTTokenMint.mintTo(
        USDTTokenAccount[key],
        superOwner,
        [],
        1_000_000_000_000,
      );
    }

    let wUSTTokenMint = await Token.createMint(
      program.provider.connection,
      superOwnerKeypair,
      superOwner,
      null,
      6,
      TOKEN_PROGRAM_ID,
    );
    tokenPublicKey.wUSTPublicKey = wUSTTokenMint.publicKey;
    for(key in wUSTTokenAccount) {
      wUSTTokenAccount[key] = await wUSTTokenMint.createAccount(walletPublicKey[key]);
      await wUSTTokenMint.mintTo(
        wUSTTokenAccount[key],
        superOwner,
        [],
        1_000_000_000_000,
      );
    }

    let CASHTokenMint = await Token.createMint(
      program.provider.connection,
      superOwnerKeypair,
      superOwner,
      null,
      9,
      TOKEN_PROGRAM_ID,
    );
    tokenPublicKey.CASHPublicKey = CASHTokenMint.publicKey;
    for(key in CASHTokenAccount) {
      CASHTokenAccount[key] = await CASHTokenMint.createAccount(walletPublicKey[key]);
      await CASHTokenMint.mintTo(
        CASHTokenAccount[key],
        superOwner,
        [],
        1_000_000_000_000_000,
      );
    }
  })

  it('SetMolanaTrade !', async () => {
    const molanaTrade = await pda([MOLANA_TRADE_TAG], programId)
    const denominator = 100000000;
    const tradeFee = 0.003 * denominator;
    const depositFee = 0.002 * denominator;
    const withdrawFee = 0.005 * denominator;
    const accountFee = 0.5 * 1_000_000_000;
    const minWaitingTime = 30;
    const payoneerEmailUser = "sales@molana.finance";
    
    const result = await setGlobalState(
      denominator,
      tradeFee,
      depositFee,
      withdrawFee,
      accountFee,
      minWaitingTime,
      payoneerEmailUser,
      walletPublicKey.checker,
      superOwner,
      [superOwnerKeypair]
    )
    console.log('success:(trade fee-0.3%) ', result.success, 'message: ',result.msg)

    const molanaTradeData = await program.account.molanaTrade.fetch(molanaTrade);
    assert(molanaTradeData.superOwner.equals(superOwner), "superOwner")
    assert(molanaTradeData.depositWithdrawChecker.equals(walletPublicKey.checker), "depositWithdrawChecker")
    assert(molanaTradeData.tradeFee.toNumber() == tradeFee, "tradeFee")
    assert(molanaTradeData.depositFee.toNumber() == depositFee, "depositFee")
    assert(molanaTradeData.withdrawFee.toNumber() == withdrawFee, "withdrawFee")
    assert(molanaTradeData.accountFee.toNumber() == accountFee, "accountFee")
    assert(molanaTradeData.minOfferLimitationTime.toNumber() == minWaitingTime, "minOfferLimitationTime")
    assert(molanaTradeData.denominator.toNumber() == denominator, "denominator")
    assert(molanaTradeData.payoneerEmailUser == payoneerEmailUser, "payoneerEmailUser")
    
    const tradeFee1 = 0.0039 * denominator;

    const result1 = await setGlobalState(
      denominator,
      tradeFee1,
      depositFee,
      withdrawFee,
      accountFee,
      minWaitingTime,
      payoneerEmailUser,
      walletPublicKey.checker,
      superOwner,
      [superOwnerKeypair]
    )
    console.log('success:(trade fee-0.39%) ', result1.success, 'message: ',result1.msg)
    
    const molanaTradeData1 = await program.account.molanaTrade.fetch(molanaTrade);
    assert(molanaTradeData1.superOwner.equals(superOwner), "superOwner")
    assert(molanaTradeData1.depositWithdrawChecker.equals(walletPublicKey.checker), "depositWithdrawChecker")
    assert(molanaTradeData1.tradeFee.toNumber() == tradeFee1, "tradeFee")
    assert(molanaTradeData1.depositFee.toNumber() == depositFee, "depositFee")
    assert(molanaTradeData1.withdrawFee.toNumber() == withdrawFee, "withdrawFee")
    assert(molanaTradeData1.accountFee.toNumber() == accountFee, "accountFee")
    assert(molanaTradeData1.minOfferLimitationTime.toNumber() == minWaitingTime, "minOfferLimitationTime")
    assert(molanaTradeData1.denominator.toNumber() == denominator, "denominator")
    assert(molanaTradeData1.payoneerEmailUser == payoneerEmailUser, "payoneerEmailUser")
  });
 
  it('createTradeTreasuryForPayoneer !', async () => {
    
    const currencyUSD = "USD";
    const tradeMintUSD = await pda([MOLANA_TRADE_MINT_TAG, Buffer.from(currencyUSD)], programId)
    const tradeTreasuryUSD =  await pda([MOLANA_TRADE_TREASURY_TAG, tradeMintUSD.toBuffer()], programId)
    const tradeVaultUSD = await pda([MOLANA_TRADE_VAULT_TAG, tradeMintUSD.toBuffer()], programId)
    let tradeTreasuryDataUSD = await program.account.tradeTreasury.fetchNullable(tradeTreasuryUSD);
    
    if(tradeTreasuryDataUSD != null) {
      console.log("already created for ", currencyUSD)
    }
    else {
      const result = await createTradeTreasuryForPayoneer(currencyUSD, superOwner, [superOwnerKeypair]);
      console.log('success: ', result.success, 'message: ',result.msg)
  
      tradeTreasuryDataUSD = await program.account.tradeTreasury.fetch(tradeTreasuryUSD);
      assert(tradeTreasuryDataUSD.tradeMint.equals(tradeMintUSD), "tradeMint")
      assert(tradeTreasuryDataUSD.tradeVault.equals(tradeVaultUSD), "tradeVault")
      assert(tradeTreasuryDataUSD.balance.toNumber() == 0, "balance")
    }

    const currencyGBP = "GBP";
    const tradeMintGBP = await pda([MOLANA_TRADE_MINT_TAG, Buffer.from(currencyGBP)], programId)
    const tradeTreasuryGBP =  await pda([MOLANA_TRADE_TREASURY_TAG, tradeMintGBP.toBuffer()], programId)
    const tradeVaultGBP = await pda([MOLANA_TRADE_VAULT_TAG, tradeMintGBP.toBuffer()], programId)
    let tradeTreasuryDataGBP = await program.account.tradeTreasury.fetchNullable(tradeTreasuryGBP);
    
    if(tradeTreasuryDataGBP != null) {
      console.log("already created for ", currencyGBP)
    }
    else {
      const result = await createTradeTreasuryForPayoneer(currencyGBP, superOwner, [superOwnerKeypair]);
      console.log('success: ', result.success, 'message: ',result.msg)
  
      tradeTreasuryDataGBP = await program.account.tradeTreasury.fetch(tradeTreasuryGBP);
      assert(tradeTreasuryDataGBP.tradeMint.equals(tradeMintGBP), "tradeMint")
      assert(tradeTreasuryDataGBP.tradeVault.equals(tradeVaultGBP), "tradeVault")
      assert(tradeTreasuryDataGBP.balance.toNumber() == 0, "balance")
    }

    const currencyEUR = "EUR";
    const tradeMintEUR = await pda([MOLANA_TRADE_MINT_TAG, Buffer.from(currencyEUR)], programId)
    const tradeTreasuryEUR =  await pda([MOLANA_TRADE_TREASURY_TAG, tradeMintEUR.toBuffer()], programId)
    const tradeVaultEUR = await pda([MOLANA_TRADE_VAULT_TAG, tradeMintEUR.toBuffer()], programId)
    let tradeTreasuryDataEUR = await program.account.tradeTreasury.fetchNullable(tradeTreasuryEUR);
    
    if(tradeTreasuryDataEUR != null) {
      console.log("already created for ", currencyEUR)
    }
    else {
      const result = await createTradeTreasuryForPayoneer(currencyEUR, superOwner, [superOwnerKeypair]);
      console.log('success: ', result.success, 'message: ',result.msg)
  
      tradeTreasuryDataEUR = await program.account.tradeTreasury.fetch(tradeTreasuryEUR);
      assert(tradeTreasuryDataEUR.tradeMint.equals(tradeMintEUR), "tradeMint")
      assert(tradeTreasuryDataEUR.tradeVault.equals(tradeVaultEUR), "tradeVault")
      assert(tradeTreasuryDataEUR.balance.toNumber() == 0, "balance")
    }
  });

  it('createTradeTreasury USDC!', async () => {
    const tradeMint = tokenPublicKey.USDCPublicKey
    const tradeTreasury =  await pda([MOLANA_TRADE_TREASURY_TAG, tradeMint.toBuffer()], programId)
    const tradeVault = await pda([MOLANA_TRADE_VAULT_TAG, tradeMint.toBuffer()], programId)
    let tradeTreasuryData = await program.account.tradeTreasury.fetchNullable(tradeTreasury);
    
    if(tradeTreasuryData != null) {
      console.log("already created for ", tradeMint.toBase58())
    }
    else {
      const result = await createTradeTreasury(tradeMint, superOwner, [superOwnerKeypair]);
      console.log('success: ', result.success, 'message: ',result.msg)
  
      tradeTreasuryData = await program.account.tradeTreasury.fetch(tradeTreasury);
      assert(tradeTreasuryData.tradeMint.equals(tradeMint), "tradeMint")
      assert(tradeTreasuryData.tradeVault.equals(tradeVault), "tradeVault")
      assert(tradeTreasuryData.balance.toNumber() == 0, "balance")
    }
  });

  it('createTradeTreasury wUST!', async () => {
    const tradeMint = tokenPublicKey.wUSTPublicKey
    const tradeTreasury =  await pda([MOLANA_TRADE_TREASURY_TAG, tradeMint.toBuffer()], programId)
    const tradeVault = await pda([MOLANA_TRADE_VAULT_TAG, tradeMint.toBuffer()], programId)
    let tradeTreasuryData = await program.account.tradeTreasury.fetchNullable(tradeTreasury);
    
    if(tradeTreasuryData != null) {
      console.log("already created for ", tradeMint.toBase58())
    }
    else {
      const result = await createTradeTreasury(tradeMint, superOwner, [superOwnerKeypair]);
      console.log('success: ', result.success, 'message: ',result.msg)
  
      tradeTreasuryData = await program.account.tradeTreasury.fetch(tradeTreasury);
      assert(tradeTreasuryData.tradeMint.equals(tradeMint), "tradeMint")
      assert(tradeTreasuryData.tradeVault.equals(tradeVault), "tradeVault")
      assert(tradeTreasuryData.balance.toNumber() == 0, "balance")
    }
  });

  // it('getSlicedTradeTreasuries !', async () => {
  //   const tradeMint = offerMint
  //   const tradeTreasury =  await pda([MOLANA_TRADE_TREASURY_TAG, tradeMint.toBuffer()], programId)
  //   const tradeVault = await pda([MOLANA_TRADE_VAULT_TAG, tradeMint.toBuffer()], programId)
  //   let tradeTreasuryData = await program.account.tradeTreasury.fetchNullable(tradeTreasury);
    
  //   if(tradeTreasuryData != null) {
  //     console.log("already created for ", tradeMint.toBase58())
  //   }
  //   else {
  //     const result = await createTradeTreasury(tradeMint, trader1Keypair.publicKey, [trader1Keypair]);
  //     console.log('success: ', result.success, 'message: ',result.msg)
  
  //     tradeTreasuryData = await program.account.tradeTreasury.fetch(tradeTreasury);
  //     assert(tradeTreasuryData.tradeMint.equals(tradeMint), "tradeMint")
  //     assert(tradeTreasuryData.tradeVault.equals(tradeVault), "tradeVault")
  //     assert(tradeTreasuryData.balance.toNumber() == 0, "balance")
  //   }
  // });
 
  it('SetTraderAccount for tradeProvider1 !', async () => {
    const traderAccount = await pda([MOLANA_TRADER_ACCOUNT_TAG, walletPublicKey.tradeProvider1.toBuffer()], programId);
    let traderData = await program.account.traderAccount.fetchNullable(traderAccount);
    if(traderData != null) {
      console.log("already created for this tradeProvider")
    }
    else {
      const result = await setTraderAccount(
        walletPublicKey.tradeProvider1,
        [tradeProvider1Keypair]
      )
      console.log('success: ', result.success, 'message: ',result.msg)
  
      traderData = await program.account.traderAccount.fetch(traderAccount);
      assert(traderData.owner.equals(walletPublicKey.tradeProvider1), "owner")
    }
  });

  it('SetTraderAccount for tradeProvider2 !', async () => {
    const traderAccount = await pda([MOLANA_TRADER_ACCOUNT_TAG, walletPublicKey.tradeProvider2.toBuffer()], programId);
    let traderData = await program.account.traderAccount.fetchNullable(traderAccount);
    if(traderData != null) {
      console.log("already created for this tradeProvider")
    }
    else {
      const result = await setTraderAccount(
        walletPublicKey.tradeProvider2,
        [tradeProvider2Keypair]
      )
      console.log('success: ', result.success, 'message: ',result.msg)
  
      traderData = await program.account.traderAccount.fetch(traderAccount);
      assert(traderData.owner.equals(walletPublicKey.tradeProvider2), "owner")
    }
  });
  // it('CloseTraderAccount for trader 2 !', async () => {
  //   const traderAccount = await pda([MOLANA_TRADER_ACCOUNT_TAG, trader2Keypair.publicKey.toBuffer()], programId);
  //   let traderData = await program.account.traderAccount.fetchNullable(traderAccount);
  //   if(traderData != null) {
  //     const result = await closeTraderAccount(
  //       trader2Keypair.publicKey,
  //       [trader2Keypair]
  //     )
  //     console.log('success: ', result.success, 'message: ',result.msg)
  //     traderData = await program.account.traderAccount.fetchNullable(traderAccount);

  //     assert(await program.provider.connection.getBalance(traderAccount) == 0, "balance is not zero")
  //     assert(traderData == null, "not closed")
  //   }
  //   else {
  //     console.log("not created for this trader")
  //   }
  // });

  let trader1PaymentId = new anchor.BN(123456); //random
  let trader1PaymentIdSeed = trader1PaymentId.toBuffer("be", 8);
  let trader1DepositAmount = new anchor.BN(25070);//250.70
  it('SetDepositRouter for trader 1 !', async () => {
    const currency = "USD";
    const tradeMint = await pda([MOLANA_TRADE_MINT_TAG, Buffer.from(currency)], programId)
    const tradeTreasury =  await pda([MOLANA_TRADE_TREASURY_TAG, tradeMint.toBuffer()], programId)

    const depositRouter = await pda([MOLANA_DEPOSIT_ROUTER_TAG, trader1PaymentIdSeed, walletPublicKey.trader1.toBuffer()], programId)
    const result = await setDepositRouter(
      trader1PaymentId,
      trader1DepositAmount,
      currency,
      walletPublicKey.trader1,
      [trader1Keypair]
    )
    console.log('success: ', result.success, 'message: ',result.msg)
    const depositData: any = await program.account.depositRouter.fetch(depositRouter);
    assert(depositData.owner.equals(walletPublicKey.trader1), "owner")
    assert(depositData.tradeTreasury.equals(tradeTreasury), "tradeTreasury")
    assert(depositData.paymentId.toNumber() == trader1PaymentId, "trader1PaymentId")
    assert(depositData.amount.toNumber() == trader1DepositAmount, "amount")
    assert(depositData.state.sent, "state")
    assert(depositData.currency == currency, "currency")
  });

  it('SetDepositState for trader 1 !', async () => {
    const depositRouter = await pda([MOLANA_DEPOSIT_ROUTER_TAG, trader1PaymentIdSeed, trader1Keypair.publicKey.toBuffer()], programId)
    const state = DepositTxState.Arrived
    const amount = new anchor.BN(2034400) // = 20344 (decimal = 2)
    const result =  await setDepositState(state, amount, depositRouter, walletPublicKey.checker, [checkerKeypair]);
    console.log('success: ', result.success, 'message: ',result.msg)
    const depositData: any = await program.account.depositRouter.fetch(depositRouter);
    assert(depositData.state.arrived, "state")
    assert(depositData.amount.toNumber() == amount.toNumber(), "amount")
  });

  it('SupplyDepositTx for trader 1 !', async () => {
    const depositRouter = await pda([MOLANA_DEPOSIT_ROUTER_TAG, trader1PaymentIdSeed, walletPublicKey.trader1.toBuffer()], programId)
    const result = await supplyDepositTx(depositRouter, walletPublicKey.trader1, [trader1Keypair])
    console.log('success: ', result.success, 'message: ',result.msg)
    const depositData: any = await program.account.depositRouter.fetch(depositRouter);
    assert(depositData.state.supplied, "state")
  });

  let trader2PaymentId = new anchor.BN(123457); //random
  let trader2PaymentIdSeed = trader2PaymentId.toBuffer("be", 8);
  let trader2DepositAmount = new anchor.BN(75045);//750.45
  it('SetDepositRouter for trader 2 !', async () => {
    const currency = "GBP";
    const tradeMint = await pda([MOLANA_TRADE_MINT_TAG, Buffer.from(currency)], programId)
    const tradeTreasury =  await pda([MOLANA_TRADE_TREASURY_TAG, tradeMint.toBuffer()], programId)

    const depositRouter = await pda([MOLANA_DEPOSIT_ROUTER_TAG, trader2PaymentIdSeed, walletPublicKey.trader2.toBuffer()], programId)
    const result = await setDepositRouter(
      trader2PaymentId,
      trader2DepositAmount,
      currency,
      walletPublicKey.trader2,
      [trader2Keypair]
    )
    console.log('success: ', result.success, 'message: ',result.msg)
    const depositData: any = await program.account.depositRouter.fetch(depositRouter);
    assert(depositData.owner.equals(walletPublicKey.trader2), "owner")
    assert(depositData.tradeTreasury.equals(tradeTreasury), "tradeTreasury")
    assert(depositData.paymentId.toNumber() == trader2PaymentId, "trader2PaymentId")
    assert(depositData.amount.toNumber() == trader2DepositAmount, "amount")
    assert(depositData.state.sent, "state")
    assert(depositData.currency == currency, "currency")
  });

  it('SetDepositState for trader 2 !', async () => {
    const depositRouter = await pda([MOLANA_DEPOSIT_ROUTER_TAG, trader2PaymentIdSeed, trader2Keypair.publicKey.toBuffer()], programId)
    const state = DepositTxState.NotArrived
    const amount = new anchor.BN(2034400) 
    const result =  await setDepositState(state, amount, depositRouter, walletPublicKey.checker, [checkerKeypair]);
    console.log('success: ', result.success, 'message: ',result.msg)
    const depositData: any = await program.account.depositRouter.fetch(depositRouter);
    assert(depositData.state.notArrived, "state")
    assert(depositData.amount.toNumber() == amount.toNumber(), "amount")
  });

  it('SupplyDepositTx for trader 2 !', async () => {
    const depositRouter = await pda([MOLANA_DEPOSIT_ROUTER_TAG, trader2PaymentIdSeed, walletPublicKey.trader2.toBuffer()], programId)
    const result = await supplyDepositTx(depositRouter, walletPublicKey.trader2, [trader2Keypair])
    console.log('success: ', result.success, 'message: ',result.msg)
    const depositData: any = await program.account.depositRouter.fetch(depositRouter);
    assert(depositData.state.notArrived, "state")
  });
  it('SetWithdrawRouter !', async () => {
    const destination = "user1@gmail.com";
    const currency = "USD";
    const amount = new anchor.BN(15064)//150.64

    const molanaTrade = await pda([MOLANA_TRADE_TAG], programId);
    const molanaTradeData = await program.account.molanaTrade.fetch(molanaTrade)
    const withdrawId = molanaTradeData.withdrawId
    const withdrawIdSeed = withdrawId.toBuffer("be", 8)
    const tradeMint = await pda([MOLANA_TRADE_MINT_TAG, Buffer.from(currency)], programId)
    const tradeTreasury =  await pda([MOLANA_TRADE_TREASURY_TAG, tradeMint.toBuffer()], programId)
    const withdrawRouter = await pda([MOLANA_WITHDRAW_ROUTER_TAG, withdrawIdSeed], programId)
    const userTradeVault = await pda([MOLANA_USER_TRADE_VAULT_TAG, tradeMint.toBuffer(), walletPublicKey.trader1.toBuffer()], programId)
    const result = await setWithdrawRouter(
      amount,
      destination,
      currency,
      userTradeVault,
      walletPublicKey.trader1,
      [trader1Keypair]
    )
    console.log('success: ', result.success, 'message: ',result.msg)

    const withdrawData: any = await program.account.withdrawRouter.fetch(withdrawRouter);
    assert(withdrawData.owner.equals(trader1Keypair.publicKey), "owner")
    assert(withdrawData.tradeTreasury.equals(tradeTreasury), "tradeTreasury")
    assert(withdrawData.withdrawId.toNumber() == withdrawId.toNumber(), "paymentId")
    assert(withdrawData.amount.toNumber() == amount.toNumber(), "amount")
    assert(withdrawData.state.requestedAndBurned, "state")
    assert(withdrawData.currency == currency, "currency")
    assert(withdrawData.destination == destination, "destination")
  });

  it('SetWithdrawState !', async () => {
    const molanaTrade = await pda([MOLANA_TRADE_TAG], programId);
    const molanaTradeData = await program.account.molanaTrade.fetch(molanaTrade)
    const withdrawId = molanaTradeData.withdrawId.sub(new anchor.BN(1))
    const withdrawIdSeed = withdrawId.toBuffer("be", 8)
    
    const withdrawRouter = await pda([MOLANA_WITHDRAW_ROUTER_TAG, withdrawIdSeed], programId)
    const sentPaymentId = new anchor.BN(Date.now() / 1000);
    const state = WithdrawTxState.Completed
    const result = await setWithdrawState(
      state,
      sentPaymentId,
      withdrawRouter,
      walletPublicKey.checker,
      [checkerKeypair]
    )
    console.log('success: ', result.success, 'message: ',result.msg)

    const withdrawData: any = await program.account.withdrawRouter.fetch(withdrawRouter);
    assert(withdrawData.state.completed, "state")
  });

  // const depositTradeTokenAmount = 1000_000; // 100 USD
  // it('DepositTradeToken for molUSD !', async () => {
  //   const currency = "USD";
  //   const tradeMint = await pda([MOLANA_TRADE_MINT_TAG, Buffer.from(currency)], programId)

  //   const tradeTreasury =  await pda([MOLANA_TRADE_TREASURY_TAG, tradeMint.toBuffer()], programId)
  //   const userTreasury =  await pda([MOLANA_USER_TREASURY_TAG, tradeTreasury.toBuffer(), trader1Keypair.publicKey.toBuffer()], programId)
  //   const userTradeVault = await pda([MOLANA_USER_TRADE_VAULT_TAG, tradeMint.toBuffer(), trader1Keypair.publicKey.toBuffer()], programId)
  //   const result = await depositTradeToken(
  //     new anchor.BN(depositTradeTokenAmount),
  //     tradeMint,
  //     userTradeVault,
  //     walletPublicKey.trader1,
  //     [trader1Keypair]
  //   )
  //   console.log('success: ', result.success, 'message: ',result.msg)

  //   const userTreasuryData = await program.account.userTreasury.fetch(userTreasury);
  //   assert(userTreasuryData.balance.toNumber() == depositTradeTokenAmount, "balance")
  // });
  
  const depositTradeUSDCTokenAmount = 1_100_400_000 //1100.4 USDT
  it('DepositTradeToken of USDC from tradeProvider1 !', async () => {
    const tradeMint = tokenPublicKey.USDCPublicKey
    const tradeTreasury =  await pda([MOLANA_TRADE_TREASURY_TAG, tradeMint.toBuffer()], programId)
    const userTreasury =  await pda([MOLANA_USER_TREASURY_TAG, tradeTreasury.toBuffer(), walletPublicKey.tradeProvider1.toBuffer()], programId)
    const userTradeVault = USDCTokenAccount.tradeProvider1
    const result = await depositTradeToken(
      new anchor.BN(depositTradeUSDCTokenAmount),
      tradeMint,
      userTradeVault,
      walletPublicKey.tradeProvider1,
      [tradeProvider1Keypair]
    )
    console.log('success: ', result.success, 'message: ',result.msg)
    const userTreasuryData = await program.account.userTreasury.fetch(userTreasury);
    assert(userTreasuryData.balance.toNumber() == depositTradeUSDCTokenAmount, "balance")
  });

  const depositTradewUSTTokenAmount1 = 2_300_400_000 //2300.4 wUST
  it('DepositTradeToken of wUST from tradeProvider1 !', async () => {
    const tradeMint = tokenPublicKey.wUSTPublicKey
    const tradeTreasury =  await pda([MOLANA_TRADE_TREASURY_TAG, tradeMint.toBuffer()], programId)
    const userTreasury =  await pda([MOLANA_USER_TREASURY_TAG, tradeTreasury.toBuffer(), walletPublicKey.tradeProvider1.toBuffer()], programId)
    const userTradeVault = wUSTTokenAccount.tradeProvider1
    const result = await depositTradeToken(
      new anchor.BN(depositTradewUSTTokenAmount1),
      tradeMint,
      userTradeVault,
      walletPublicKey.tradeProvider1,
      [tradeProvider1Keypair]
    )
    console.log('success: ', result.success, 'message: ',result.msg)
    const userTreasuryData = await program.account.userTreasury.fetch(userTreasury);
    assert(userTreasuryData.balance.toNumber() == depositTradewUSTTokenAmount1, "balance")
  });
  
  const withdrawTradeTokenAmount = 200_000_000; // 200 usdc
  it('WithdrawTradeToken of USDC to trader1 !', async () => {
    const tradeMint = tokenPublicKey.USDCPublicKey

    const tradeTreasury =  await pda([MOLANA_TRADE_TREASURY_TAG, tradeMint.toBuffer()], programId)
    const userTreasury =  await pda([MOLANA_USER_TREASURY_TAG, tradeTreasury.toBuffer(), walletPublicKey.tradeProvider1.toBuffer()], programId)
    const userTradeVault = USDCTokenAccount.tradeProvider1
    const result = await withdrawTradeToken(
      new anchor.BN(withdrawTradeTokenAmount),
      tradeMint,
      userTradeVault,
      walletPublicKey.tradeProvider1,
      [tradeProvider1Keypair]
    ) 
    console.log('success: ', result.success, 'message: ',result.msg)
    const userTreasuryData = await program.account.userTreasury.fetch(userTreasury);
    assert(userTreasuryData.balance.toNumber() == depositTradeUSDCTokenAmount - withdrawTradeTokenAmount, "balance")
  });

  const depositTradewUSTTokenAmount = 3_000_000_000 //3000 wUST
  it('DepositTradeToken of wUST from tradeProvider2 !', async () => {
    const tradeMint = tokenPublicKey.wUSTPublicKey
    const tradeTreasury =  await pda([MOLANA_TRADE_TREASURY_TAG, tradeMint.toBuffer()], programId)
    const userTreasury =  await pda([MOLANA_USER_TREASURY_TAG, tradeTreasury.toBuffer(), walletPublicKey.tradeProvider2.toBuffer()], programId)
    const userTradeVault = wUSTTokenAccount.tradeProvider2
    const result = await depositTradeToken(
      new anchor.BN(depositTradewUSTTokenAmount),
      tradeMint,
      userTradeVault,
      walletPublicKey.tradeProvider2,
      [tradeProvider2Keypair]
    )
    console.log('success: ', result.success, 'message: ',result.msg)
    const userTreasuryData = await program.account.userTreasury.fetch(userTreasury);
    assert(userTreasuryData.balance.toNumber() == depositTradewUSTTokenAmount, "balance")
  });

  let solOffer:anchor.web3.PublicKey;
  it('SetSolOffer for non-existing trade treasuries!', async () => {
    const buyRatio = new anchor.BN(10100) //1.01
    const sellRatio = new anchor.BN(9800) //0.98
    
    let tradeBTokenMint = await Token.createMint(
      program.provider.connection,
      superOwnerKeypair,
      superOwner,
      null,
      6,
      TOKEN_PROGRAM_ID,
    );

    const tradeMintA = tokenPublicKey.USDCPublicKey
    const tradeMintB = tradeBTokenMint.publicKey
    const traderAccount = await pda([MOLANA_TRADER_ACCOUNT_TAG, walletPublicKey.tradeProvider1.toBuffer()], programId);
    const tradeTreasuryA =  await pda([MOLANA_TRADE_TREASURY_TAG, tradeMintA.toBuffer()], programId)
    const tradeTreasuryB =  await pda([MOLANA_TRADE_TREASURY_TAG, tradeMintB.toBuffer()], programId)
    const tradeProviderTreasuryA =  await pda([MOLANA_USER_TREASURY_TAG, tradeTreasuryA.toBuffer(), tradeProvider1Keypair.publicKey.toBuffer()], programId)
    const tradeProviderTreasuryB =  await pda([MOLANA_USER_TREASURY_TAG, tradeTreasuryB.toBuffer(), tradeProvider1Keypair.publicKey.toBuffer()], programId)
    solOffer = await pda([MOLANA_OFFER_TAG, tradeProviderTreasuryA.toBuffer(), tradeProviderTreasuryB.toBuffer()], programId)
    const direction = Direction.All;

    const result = await setSolOffer(
      buyRatio,
      sellRatio,
      tradeMintA,
      tradeMintB,
      direction,
      walletPublicKey.tradeProvider1,
      [tradeProvider1Keypair]
    )
    console.log('success: ', result.success, 'message: ',result.msg)
    const offerData = await program.account.solOffer.fetch(solOffer);
    assert(offerData.owner.equals(walletPublicKey.tradeProvider1), "owner")
    assert(offerData.traderAccount.equals(traderAccount), "traderAccount")
    assert(offerData.userTreasuryA.equals(tradeProviderTreasuryA), "userTreasuryA")
    assert(offerData.userTreasuryB.equals(tradeProviderTreasuryB), "userTreasuryB")
    assert(offerData.buyRatio.toNumber() == buyRatio.toNumber(), "buyRatio")
    assert(offerData.sellRatio.toNumber() == sellRatio.toNumber(), "sellRatio")
  });

  it('SetSolOffer for existing trade treasuries!', async () => {
    const buyRatio = new anchor.BN(10100) //1.01
    const sellRatio = new anchor.BN(9800) //0.98

    const tradeMintA = tokenPublicKey.USDCPublicKey
    const tradeMintB = tokenPublicKey.wUSTPublicKey
    const traderAccount = await pda([MOLANA_TRADER_ACCOUNT_TAG, walletPublicKey.tradeProvider1.toBuffer()], programId);
    const tradeTreasuryA =  await pda([MOLANA_TRADE_TREASURY_TAG, tradeMintA.toBuffer()], programId)
    const tradeTreasuryB =  await pda([MOLANA_TRADE_TREASURY_TAG, tradeMintB.toBuffer()], programId)
    const userTreasuryA =  await pda([MOLANA_USER_TREASURY_TAG, tradeTreasuryA.toBuffer(), tradeProvider1Keypair.publicKey.toBuffer()], programId)
    const userTreasuryB =  await pda([MOLANA_USER_TREASURY_TAG, tradeTreasuryB.toBuffer(), tradeProvider1Keypair.publicKey.toBuffer()], programId)
    solOffer = await pda([MOLANA_OFFER_TAG, userTreasuryA.toBuffer(), userTreasuryB.toBuffer()], programId)
    const direction = Direction.All;

    const result = await setSolOffer(
      buyRatio,
      sellRatio,
      tradeMintA,
      tradeMintB,
      direction,
      walletPublicKey.tradeProvider1,
      [tradeProvider1Keypair]
    )
    console.log('success: ', result.success, 'message: ',result.msg)
    const offerData = await program.account.solOffer.fetch(solOffer);
    assert(offerData.owner.equals(walletPublicKey.tradeProvider1), "owner")
    assert(offerData.traderAccount.equals(traderAccount), "traderAccount")
    assert(offerData.userTreasuryA.equals(userTreasuryA), "userTreasuryA")
    assert(offerData.userTreasuryB.equals(userTreasuryB), "userTreasuryB")
    assert(offerData.buyRatio.toNumber() == buyRatio.toNumber(), "buyRatio")
    assert(offerData.sellRatio.toNumber() == sellRatio.toNumber(), "sellRatio")
  });

  it('Sell SolOffer !', async () => {
    const amount = new anchor.BN(200_000_000) 
    const tradeMintA = tokenPublicKey.USDCPublicKey
    if(USDCTokenAccount.tradeProvider1 == null) {
      USDCTokenAccount.tradeProvider1 = await (new Token(program.provider.connection, tradeMintA, TOKEN_PROGRAM_ID, superOwnerKeypair)).createAccount(walletPublicKey.tradeProvider1)
    }
    const tradeMintB = tokenPublicKey.wUSTPublicKey
    const userTradeVaultA = USDCTokenAccount.trader1
    const userTradeVaultB = wUSTTokenAccount.trader1

    const solOfferData = await program.account.solOffer.fetch(solOffer);
    const userTreasuryA = solOfferData.userTreasuryA;//providerA
    const userTreasuryB = solOfferData.userTreasuryB;//providerB
    const userTreasuryAData1 = await program.account.userTreasury.fetch(userTreasuryA);
    const userTreasuryBData1 = await program.account.userTreasury.fetch(userTreasuryB);

    const result = await sellSolOffer(
      amount,
      solOffer,
      userTradeVaultA,
      userTradeVaultB,
      walletPublicKey.trader1,
      [trader1Keypair]
    )
    console.log('success: ', result.success, 'message: ',result.msg)
    const userTreasuryAData2 = await program.account.userTreasury.fetch(userTreasuryA);
    const userTreasuryBData2 = await program.account.userTreasury.fetch(userTreasuryB);
    assert(userTreasuryAData1.balance.toNumber() > userTreasuryAData2.balance.toNumber(), "decreased")
    assert(userTreasuryBData2.balance.toNumber() > userTreasuryBData1.balance.toNumber(), "increased")
  });

  it('Buy SolOffer !', async () => {
    const amount = new anchor.BN(400_000_000) 

    const tradeMintA = tokenPublicKey.USDCPublicKey
    if(USDCTokenAccount.tradeProvider1 == null) {
      USDCTokenAccount.tradeProvider1 = await (new Token(program.provider.connection, tradeMintA, TOKEN_PROGRAM_ID, superOwnerKeypair)).createAccount(walletPublicKey.tradeProvider1)
    }
    const tradeMintB = tokenPublicKey.wUSTPublicKey
    const userTradeVaultA = USDCTokenAccount.trader1
    const userTradeVaultB = wUSTTokenAccount.trader1

    const solOfferData = await program.account.solOffer.fetch(solOffer);
    const userTreasuryA = solOfferData.userTreasuryA;//providerA
    const userTreasuryB = solOfferData.userTreasuryB;//providerB
    const userTreasuryAData1 = await program.account.userTreasury.fetch(userTreasuryA);
    const userTreasuryBData1 = await program.account.userTreasury.fetch(userTreasuryB);

    const result = await buySolOffer(
      amount,
      solOffer,
      userTradeVaultA,
      userTradeVaultB,
      walletPublicKey.trader1,
      [trader1Keypair]
    )
    console.log('success: ', result.success, 'message: ',result.msg)
    const userTreasuryAData2 = await program.account.userTreasury.fetch(userTreasuryA);
    const userTreasuryBData2 = await program.account.userTreasury.fetch(userTreasuryB);
    assert(userTreasuryAData1.balance.toNumber() < userTreasuryAData2.balance.toNumber(), "decreased")
    assert(userTreasuryBData2.balance.toNumber() < userTreasuryBData1.balance.toNumber(), "increased")
  });

//   // it('Claim Fees !', async () => {
//   //   const molanaTrade = await pda([MOLANA_TRADE_TAG], programId)
//   //   const currency = "USD";
//   //   const traderAccount = await pda([MOLANA_TRADER_ACCOUNT_TAG, Buffer.from(currency), trader1Keypair.publicKey.toBuffer()], programId)
//   //   const tradeTreasury =  await pda([MOLANA_TRADE_TREASURY_TAG,Buffer.from(currency)], programId)
//   //   const molanaTreasury = await pda([MOLANA_TREASURY_TAG], programId)
//   //   const tradeVault = await pda([MOLANA_TRADE_VAULT_TAG, Buffer.from(currency)], programId)
//   //   const tradeMint = await pda([MOLANA_TRADE_MINT_TAG, Buffer.from(currency)], programId)
//   //   const mUserTradeVault = await pda([MOLANA_USER_TRADE_VAULT_TAG, Buffer.from(currency), mWallet.toBuffer()], programId)
//   //   const hUserTradeVault = await pda([MOLANA_USER_TRADE_VAULT_TAG, Buffer.from(currency), hWallet.toBuffer()], programId)
    
//   //   const tx = await program.rpc.claimFees(
//   //     {
//   //       accounts: {
//   //         molanaTrade,
//   //         tradeTreasury,
//   //         tradeVault,
//   //         traderAccount,
//   //         molanaTreasury,
//   //         tradeMint,
//   //         mUserTradeVault,
//   //         hUserTradeVault,
//   //         mWallet,
//   //         hWallet,
//   //         signer: mWallet,
//   //         systemProgram: anchor.web3.SystemProgram.programId,
//   //         tokenProgram: TOKEN_PROGRAM_ID,
//   //         rent: anchor.web3.SYSVAR_RENT_PUBKEY
//   //       },
//   //       signers: [mWalletKeypair]
//   //     });
//   //   console.log("tx = ", tx);
//   // });
  let solEthOffer: anchor.web3.PublicKey = null as any;
  it('SetSolEthOffer !', async () => {
    const buyRatio = new anchor.BN(1010) //1.01
    const sellRatio = new anchor.BN(9800) //1.03
    const offerTimeLimitation = new anchor.BN(3600)
    const providerType = ProviderType.Human
    const aNetwork = Network.Eth;
    const aToken = "0xdac17f958d2ee523a2206206994597c13d831ec7"
    const aVault = "0xdcd9a9232e162FE0EbccFCAB05Dd6dA2cD0D8587"
    const tradeMint = tokenPublicKey.USDCPublicKey
    const traderAccount = await pda([MOLANA_TRADER_ACCOUNT_TAG, walletPublicKey.tradeProvider1.toBuffer()], programId);
    const tradeTreasury = await pda([MOLANA_TRADE_TREASURY_TAG, tradeMint.toBuffer()], programId);
    const userTreasury =  await pda([MOLANA_USER_TREASURY_TAG, tradeTreasury.toBuffer(), walletPublicKey.tradeProvider1.toBuffer()], programId)
    const direction = Direction.All;

    const result = await setSolEthOffer(
      buyRatio,
      sellRatio,
      offerTimeLimitation,
      providerType,
      direction,
      aNetwork,
      aToken,
      aVault,
      tradeMint,
      walletPublicKey.tradeProvider1,
      [tradeProvider1Keypair]
    )
    console.log('success: ', result.success, 'message: ',result.msg)
    solEthOffer = result.data

    const solEthOfferData: any = await program.account.solEthOffer.fetch(solEthOffer);
    assert(solEthOfferData.owner.equals(walletPublicKey.tradeProvider1), "owner")
    assert(solEthOfferData.traderAccount.equals(traderAccount), "traderAccount")
    assert(solEthOfferData.userTreasury.equals(userTreasury), "userTreasury")
    assert(solEthOfferData.splTokenMint.equals(tradeMint), "splTokenMint")
    assert(solEthOfferData.aVault == aVault, "aVault")
    assert(solEthOfferData.aToken == aToken, "aToken")
    assert(solEthOfferData.aNetwork.eth, "aNetwork")
    assert(solEthOfferData.buyRatio.toNumber() == buyRatio.toNumber(), "buyRatio")
    assert(solEthOfferData.sellRatio.toNumber() == sellRatio.toNumber(), "sellRatio")
    assert(solEthOfferData.offerTimeLimitation.toNumber() == offerTimeLimitation.toNumber(), "offerTimeLimitation")
    assert(solEthOfferData.providerType.human, "providerType")
  });

  it('AcceptSolEthOffer !', async () => {
    const amount = new anchor.BN(50_000) //500 USDC
    const lockPeriod = new anchor.BN(3600 * 3) //3 hours
    const acceptState = SolEthTradingState.AcceptedOfEthToSol;
    const aVault = "0x19F4794e5BEE8b2357FB36b4bc71C13E0dD29e99"
    const tradeMint = tokenPublicKey.USDCPublicKey
    const tradeTreasury = await pda([MOLANA_TRADE_TREASURY_TAG, tradeMint.toBuffer()], programId);
    const userTreasury =  await pda([MOLANA_USER_TREASURY_TAG, tradeTreasury.toBuffer(), walletPublicKey.tradeProvider1.toBuffer()], programId)
    const userTradeVault = USDCTokenAccount.trader1
    const solEthTrading =  await pda([MOLANA_SOL_ETH_TRADING_TAG, walletPublicKey.trader1.toBuffer(), solEthOffer.toBuffer()], programId)
    const result =await acceptSolEthOffer(
      acceptState,
      amount,
      lockPeriod,
      aVault,
      solEthOffer,
      userTradeVault,
      walletPublicKey.trader1,
      [trader1Keypair]
    )
    console.log('success: ', result.success, 'message: ',result.msg)
    const solEthTradingData: any = await program.account.solEthTrading.fetch(solEthTrading);
    assert(solEthTradingData.owner.equals(walletPublicKey.trader1), "owner")
    assert(solEthTradingData.offer.equals(solEthOffer), "solEthOffer")
    assert(solEthTradingData.state.acceptedOfEthToSol, "state")
    assert(solEthTradingData.aAmount.toNumber() == 0, "aAmount")
    assert(solEthTradingData.splAmount.toNumber() == amount.toNumber(), "amount")
    assert(solEthTradingData.aVault == aVault, "aVault")
    assert(solEthTradingData.transactionId == "", "transactionId")

    const userTreasuryData = await program.account.userTreasury.fetch(userTreasury)
    assert(userTreasuryData.owner.equals(walletPublicKey.tradeProvider1), "owner")
    assert(userTreasuryData.lockedBalance.toNumber() >= amount.toNumber(), "lockedBalance")
  });
  it('SetSolEthTx !', async () => {
    const transactionId = "0xde45602c57280c32869974a5bc860e8d621f92350b9cc3e9f8a5084e8dbaca19"
    const solEthTrading =  await pda([MOLANA_SOL_ETH_TRADING_TAG, walletPublicKey.trader1.toBuffer(), solEthOffer.toBuffer()], programId)
    const result =await setSolEthTx(
      transactionId,
      solEthTrading,
      walletPublicKey.trader1,
      [trader1Keypair]
    )
    console.log('success: ', result.success, 'message: ',result.msg)
    const solEthTradingData = await program.account.solEthTrading.fetch(solEthTrading);
    assert(solEthTradingData.offer.equals(solEthOffer), "solEthOffer")
    assert(solEthTradingData.transactionId == transactionId, "transactionId")
  });
  it('UpdateSolEthOffer !', async () => {
    // const amount = new anchor.BN(50_000) //500 USDC
    const state = SolEthTradingState.SentOfEthToSol;
    const solEthTrading =  await pda([MOLANA_SOL_ETH_TRADING_TAG, walletPublicKey.trader1.toBuffer(), solEthOffer.toBuffer()], programId)
    const result =await setSolEthTradingState(
      state,
      solEthTrading,
      walletPublicKey.checker,
      [checkerKeypair]
    )
    console.log('success: ', result.success, 'message: ',result.msg)
    
    const solEthTradingData: any = await program.account.solEthTrading.fetch(solEthTrading);
    
    assert(solEthTradingData.offer.equals(solEthOffer), "solEthOffer")
    assert(compareState(solEthTradingData.state, state), "state")
    // assert(solEthTradingData.aAmount.toNumber() == amount.toNumber(), "aAmount")
    console.log("getNumberOfState",getNumberOfState(SolEthTradingState, solEthTradingData.state))
  });
  
//   it('ClaimSolEthOffer !', async () => {
//     const userTradeVault = userTradeTokenAccount
//     const solEthTrading =  await pda([MOLANA_SOL_ETH_TRADING_TAG, userKeypair.publicKey.toBuffer(), solEthOffer.toBuffer()], programId)
//     const result =await claimSolEthOffer(
//       solEthTrading,
//       userTradeVault,
//       userKeypair.publicKey,
//       [userKeypair]
//     )
//     console.log('success: ', result.success, 'message: ',result.msg)
//     const solEthTradingData: any = await program.account.solEthTrading.fetch(solEthTrading);
//     assert(solEthTradingData.offer.equals(solEthOffer), "solEthOffer")
//     assert(solEthTradingData.state.completed, "state")
//   });

//   let ethBscOffer: anchor.web3.PublicKey = null as any;
//   it('SetEthBscOffer !', async () => {
//     const buyRatio = new anchor.BN(1010) //1.01
//     const sellRatio = new anchor.BN(9800) //1.03
//     const offerTimeLimitation = new anchor.BN(3600)
//     const providerType = ProviderType.Human; //None
//     const aNetwork = Network.Eth;
//     const aToken = "0xdac17f958d2ee523a2206206994597c13d831ec7"
//     const aVault = "0xdcd9a9232e162FE0EbccFCAB05Dd6dA2cD0D8587"
//     const bNetwork = Network.Bsc;
//     const bToken = "0x55d398326f99059fF775485246999027B3197955"
//     const bVault = "0x19F4794e5BEE8b2357FB36b4bc71C13E0dD29e99"
//     const currency = "USD";
//     const tradeMint = await pda([MOLANA_TRADE_MINT_TAG, Buffer.from(currency)], programId)
//     const traderAccount = await pda([MOLANA_TRADER_ACCOUNT_TAG, trader1Keypair.publicKey.toBuffer()], programId);
//     const tradeTreasury = await pda([MOLANA_TRADE_TREASURY_TAG, tradeMint.toBuffer()], programId);
//     const userTreasury =  await pda([MOLANA_USER_TREASURY_TAG, tradeTreasury.toBuffer(), trader1Keypair.publicKey.toBuffer()], programId)
    
//     const result = await setEthBscOffer(
//       buyRatio,
//       sellRatio,
//       offerTimeLimitation,
//       providerType,
//       aNetwork,
//       aToken,
//       aVault,
//       bNetwork,
//       bToken,
//       bVault,
//       tradeMint,
//       trader1Keypair.publicKey,
//       [trader1Keypair]
//     )
//     console.log('success: ', result.success, 'message: ',result.msg)
//     ethBscOffer = result.data
//     const ethBscOfferData: any = await program.account.ethBscOffer.fetch(ethBscOffer);
//     assert(ethBscOfferData.owner.equals(trader1Keypair.publicKey), "owner")
//     assert(ethBscOfferData.traderAccount.equals(traderAccount), "traderAccount")
//     assert(ethBscOfferData.userTreasury.equals(userTreasury), "userTreasury")
//     assert(ethBscOfferData.aVault == aVault, "aVault")
//     assert(ethBscOfferData.aToken == aToken, "aToken")
//     assert(ethBscOfferData.aNetwork.eth, "aNetwork")
//     assert(ethBscOfferData.bVault == bVault, "bVault")
//     assert(ethBscOfferData.bToken == bToken, "bToken")
//     assert(ethBscOfferData.bNetwork.bsc, "bNetwork")
//     assert(ethBscOfferData.buyRatio.toNumber() == buyRatio.toNumber(), "buyRatio")
//     assert(ethBscOfferData.sellRatio.toNumber() == sellRatio.toNumber(), "sellRatio")
//     assert(ethBscOfferData.offerTimeLimitation.toNumber() == offerTimeLimitation.toNumber(), "offerTimeLimitation")
//     assert(ethBscOfferData.providerType.human, "providerType")
//   });

//   it('AcceptEthBscOffer !', async () => {
//     const aNetwork = Network.Eth;
//     const aToken = "0xdac17f958d2ee523a2206206994597c13d831ec7"
//     const aVault = "0x1cd9a9232e162FE0EbccFCAB05Dd6dA2cD0D8587"
//     const bNetwork = Network.Bsc;
//     const bToken = "0x55d398326f99059fF775485246999027B3197955"
//     const bVault = "0x29F4794e5BEE8b2357FB36b4bc71C13E0dD29e99"

//     const amount = new anchor.BN(5000) //5 molUSD
//     const lockPeriod = new anchor.BN(3600 * 3) //3 hours

//     const result = await acceptEthBscOffer(
//       aNetwork,
//       aToken,
//       aVault,
//       bNetwork,
//       bToken,
//       bVault,
//       amount,
//       lockPeriod,
//       ethBscOffer,
//       userKeypair.publicKey,
//       [userKeypair]
//     )
//     console.log('success: ', result.success, 'message: ',result.msg)

//     const ethBscTrading =  await pda([MOLANA_ETH_BSC_TRADING_TAG, userKeypair.publicKey.toBuffer(), ethBscOffer.toBuffer()], programId)
    
//     const ethBscTradingData: any = await program.account.ethBscTrading.fetch(ethBscTrading);
//     assert(ethBscTradingData.owner.equals(userKeypair.publicKey), "owner")
//     assert(ethBscTradingData.offer.equals(ethBscOffer), "ethBscOffer")
//     assert(ethBscTradingData.state.accepted, "state")
//     assert(ethBscTradingData.sendNetwork.eth, "sendNetwork")
//     assert(ethBscTradingData.sendAmount.toNumber() == 0, "sendAmount")
//     assert(ethBscTradingData.receiveNetwork.bsc, "receiveNetwork")
//     assert(ethBscTradingData.receiveAmount.toNumber() == 0, "receiveAmount")

//     assert(ethBscTradingData.splAmount.toNumber() == amount.toNumber(), "amount")
//     assert(ethBscTradingData.sendVault == aVault, "sendVault")
//     assert(ethBscTradingData.receiveVault == bVault, "receiveVault")
//     assert(ethBscTradingData.sendTransactionId == "", "sendTransactionId")
//     assert(ethBscTradingData.receiveTransactionId == "", "receiveTransactionId")

//     const ethBscOfferData = await program.account.ethBscOffer.fetch(ethBscOffer)
//     const userTreasury = ethBscOfferData.userTreasury
//     const userTreasuryData = await program.account.userTreasury.fetch(userTreasury)
//     assert(userTreasuryData.owner.equals(trader1Keypair.publicKey), "owner")
//     assert(userTreasuryData.lockedBalance.toNumber() >= amount.toNumber(), "lockedBalance")
//   });
  
//   it('SetEthBscUserTx !', async () => {
//     const transactionId = "0xde45602c57280c32869974a5bc860e8d621f92350b9cc3e9f8a5084e8dbaca19"
//     const ethBscTrading =  await pda([MOLANA_ETH_BSC_TRADING_TAG, userKeypair.publicKey.toBuffer(), ethBscOffer.toBuffer()], programId)
//     const result = await setEthBscUserTx(
//       transactionId,
//       ethBscTrading,
//       userKeypair.publicKey,
//       [userKeypair]
//     )
//     console.log('success: ', result.success, 'message: ',result.msg)

//     const ethBscTradingData = await program.account.ethBscTrading.fetch(ethBscTrading);
//     assert(ethBscTradingData.offer.equals(ethBscOffer), "ethBscOffer")
//     assert(ethBscTradingData.sendTransactionId == transactionId, "sendTransactionId")
//   });
//   it('SetEthBscTraderTx !', async () => {
//     const transactionId = "0xde45602c57280c32869974a5bc860e8d621f92350b9cc3e9f8a5084e8dbaca19"
//     const ethBscTrading =  await pda([MOLANA_ETH_BSC_TRADING_TAG, userKeypair.publicKey.toBuffer(), ethBscOffer.toBuffer()], programId)
//     const result = await setEthBscTraderTx(
//       transactionId,
//       ethBscTrading,
//       trader1Keypair.publicKey,
//       [trader1Keypair]
//     )
//     console.log('success: ', result.success, 'message: ',result.msg)
//     const ethBscTradingData = await program.account.ethBscTrading.fetch(ethBscTrading);
//     assert(ethBscTradingData.offer.equals(ethBscOffer), "ethBscOffer")
//     assert(ethBscTradingData.receiveTransactionId == transactionId, "receiveTransactionId")
//   });
//   it('UpdateEthBscOffer SentOfEthToSol !', async () => {
//     const amount = new anchor.BN(20000)
//     const state = EthBscTradingState.SentAB
//     const ethBscTrading =  await pda([MOLANA_ETH_BSC_TRADING_TAG, userKeypair.publicKey.toBuffer(), ethBscOffer.toBuffer()], programId)
//     const result = await updateEthBscOffer(
//       amount,
//       state,
//       ethBscTrading,
//       depositWithdrawChecker,
//       [depositWithdrawCheckerKeypair]
//     )
//     console.log('success: ', result.success, 'message: ',result.msg)
//     const ethBscTradingData = await program.account.ethBscTrading.fetch(ethBscTrading);
//     assert(ethBscTradingData.offer.equals(ethBscOffer), "ethBscOffer")
//     assert(ethBscTradingData.sendAmount.toNumber() == amount.toNumber(), "sendAmount")
    
//   });
//   it('UpdateEthBscOffer SentBA !', async () => {
//     const amount = new anchor.BN(19000)
//     const state = EthBscTradingState.SentBA
//     const ethBscTrading =  await pda([MOLANA_ETH_BSC_TRADING_TAG, userKeypair.publicKey.toBuffer(), ethBscOffer.toBuffer()], programId)
//     const result = await updateEthBscOffer(
//       amount,
//       state,
//       ethBscTrading,
//       depositWithdrawChecker,
//       [depositWithdrawCheckerKeypair]
//     )
//     console.log('success: ', result.success, 'message: ',result.msg)
//     const ethBscTradingData = await program.account.ethBscTrading.fetch(ethBscTrading);
//     assert(ethBscTradingData.offer.equals(ethBscOffer), "ethBscOffer")
//     assert(ethBscTradingData.receiveAmount.toNumber() == amount.toNumber(), "receiveAmount")
//   });
//   it('getAllSolOffers by owner', async () => {
//     let solOffers = await getAllSolOffers(trader1Keypair.publicKey)
//     console.log("owner", solOffers.length)
//   });
//   it('getAllSolOffers by owner, mintA', async () => {
//     const currency = "USD";
//     const tradeMint = await pda([MOLANA_TRADE_MINT_TAG, Buffer.from(currency)], programId)
    
//     let solOffers = await getAllSolOffers(trader1Keypair.publicKey, tradeMint)
//     console.log(" owner, mintA", solOffers.length)
//   });
//   it('getAllSolOffers by owner, mintA, mintB', async () => {
//     const currency = "USD";
//     const tradeMint = await pda([MOLANA_TRADE_MINT_TAG, Buffer.from(currency)], programId)

//     let solOffers = await getAllSolOffers(trader1Keypair.publicKey, tradeMint, offerMint)
//     console.log("owner, mintA, mintB", solOffers.length)
//   });
//   it('getAllSolOffers by owner, mintB, mintA', async () => {
//     const currency = "USD";
//     const tradeMint = await pda([MOLANA_TRADE_MINT_TAG, Buffer.from(currency)], programId)
//     let solOffers = await getAllSolOffers(trader1Keypair.publicKey, offerMint, tradeMint)
//     console.log("owner, mintB, mintA", solOffers.length)
//   });
//   it('getAllSolOffers by owner, mintB', async () => {
//     let solOffers = await getAllSolOffers(trader1Keypair.publicKey, undefined, offerMint)
//     console.log("owner, mintB", solOffers.length)
//   });
});
async function safeAirdrop(connection: anchor.web3.Connection, destination: anchor.web3.PublicKey, amount = 100000000) {
  while (await connection.getBalance(destination) < amount){
    try{
      // Request Airdrop for user
      await connection.confirmTransaction(
        await connection.requestAirdrop(destination, amount),
        "confirmed"
      );
    }catch{
    }
  };
}