![](images/anj.jpg)

# Aragon Network Juror

Aragon Network Juror (ticker symbol: ANJ) is the native token of Aragon Court, the first service protocol developed by the [Aragon Network](overview.md). ANJ is a continuous token that is minted by depositing a reserve token, [ANT](https://wiki.aragon.org/network/aragon_network_token/), into a bonding curve contract.

You can find a technical explanation of bonding curves [here](https://yos.io/2018/11/10/bonding-curves) and find the source code for the specific smart contract used for the ANJ bonding curve [here](https://github.com/AragonBlack/fundraising/blob/next/apps/batched-bancor-market-maker/contracts/BatchedBancorMarketMaker.sol).

## ANJ Uses

Jurors in Aragon Court must lock a specified minimum balance of ANJ in a staking contract and then activate their ANJ to be eligible to be drafted in Aragon Court cases. In exchange for their successful work, jurors can earn financial rewards including subscription fees, dispute fees, and ruling fees. The use of ANJ in Aragon Court helps align the incentives of jurors with the long-term health of the Court, ensuring the Court's integrity.

It is possible to see how much ANJ has been activated in Aragon Court by checking the active ANJ balance of the juror registry contract on the Ethereum blockchain. You can use the `read contract` feature on Etherscan to query Function #14 `totalActiveBalance` on the [juror registry contract](https://etherscan.io/address/0x0f7471c1df2021ff45f112878f755aabe7aa16bf#readContract) and get the current active ANJ balance.

You can learn more about ANJ and how it is used in Aragon Court [here](https://help.aragon.org/article/41-aragon-court).

## Initial token distribution

ANJ was initially made available for pre-activation prior to the launch of Aragon Court. Anyone could stake ANT to participate in the pre-activation period, at a rate of 100 ANJ per 1 ANT, with a minimum pre-activation requirement of 10,000 ANJ.

The total amount of ANT participating in the ANJ pre-activation period was `1,014,908.261129677609748657 ANT`, for a total of `101,490,826.1129677609748657 ANJ` pre-activated by 247 unique Ethereum addresses.

In the [pre-activation announcement blog post](https://aragon.org/blog/aragon-court-pre-activation), the Aragon Association mentioned that the Aragon Network (then controlled by a five member Governor Council) would be entitled to generate up to 10% of the pre-activation supply of ANJ for itself:

> After the pre-activation period ends, the Aragon Network DAO can mint up to a 10% of the initial supply of ANJ and transfer it to the DAO. The Aragon Network DAO would then allocate those tokens to incentivize usage or onboarding jurors.

The Aragon Network Governor Council used its ability to mint an additional `101,490,826.1129677609748657 * 0.1 / (1 - 0.1) =  11,276,758.456996417886096188 ANJ` for itself, bringing the total initial supply of ANJ to `112,767,584.569964179 ANJ`.

The ANJ pre-activation smart contract was audited by ConsenSys Diligence, who published their [audit report](https://diligence.consensys.net/audits/2019/11/aragonone-aragon-network-presale/) in November 2019.

**Sources:**  
- [Juror pre-activation guide](https://blog.aragon.org/juror-pre-activation-guide/)  
- [ANJ pre-activation contract](https://etherscan.io/address/0xf89c8752d82972f94a4d1331e010ed6593e8ec49#readProxyContract)  
- [Launching Aragon Court blog post](https://blog.aragon.org/launching-aragon-court/)  
- [Aragon Network deployment template](https://github.com/aragon/aragon-network-deploy/blob/master/data/input/template.js#L23)

## Variable supply

The ANJ bonding curve went live with the official launch of Aragon Court on Fight For Freedom Day February 10, 2020. After the bonding curve went live, ANJ became available for conversion against the curve at a variable rate as determined by the [bonding curve formula](#automated-market-making).

From the [ANJ article](https://help.aragon.org/article/44-how-to-get-anj-and-become-an-aragon-court-juror) at the Aragon Help Desk:

> ANT is the reserve token used to back the ANJ supply. As more ANT is deposited in the ANJ bonding curve, the total supply of ANJ increases; as ANT is withdrawn from the bonding curve, the total supply of ANJ decreases.
> 
> The bonding curve is used to convert ANT into ANJ and back at pre-defined rates. The way the ANJ bonding curve is set up, the more ANT is sent to the bonding curve, the fewer new ANJ will be released back to the sender; the more ANJ is sent to the bonding curve, the fewer ANT will be released back to the sender.

The reason for using ANT as the reserve token backing ANJ is to create an economic relationship between Aragon Court and the Aragon Network. The more entities there are subscribed to Aragon Court, the more demand there should be to become a juror to service the increase in subscribers, which will in turn stoke demand for ANJ and, by proxy, ANT.

The reason then for using a _bonding curve_ to establish the economic relationship between Aragon Court and the Aragon Network, rather than create a 1:1 link or simply use ANT as the native token of the Court, is to isolate incentives between the Network and the Court. As Aragon One Researcher Luke Duncan wrote in his "[ANT Demand Modeling Framework](https://forum.aragon.org/t/ant-demand-modeling-framework/1389)" post:

> [T]he basic framework of linking a.. token to ANT via a bonding curve... enables the services to be designed with independent protocol incentives, such as participation rate targetting. Maintaining this separation allows for more effective protocol design and reduces the complexity and risk for the average ANT holder.

## Total supply

The current total supply of ANJ can be found by checking the ANJ contract page on a block explorer that shows this information, such as [Etherscan](https://etherscan.io/token/0xcD62b1C403fa761BAadFC74C525ce2B51780b184#tokenInfo).

## Maximum supply

There is no maximum ANJ supply *per se*, other than the limit imposed by the total amount of ANT available to deposit in the ANJ bonding curve. To calculate the theoretical maximum supply, we can follow this method:

ANJ comes from a bonding curve that mints ANJ in exchange for ANT. This is the only way to mint ANJ. The ANJ bonding curve is of the type:

![y = m \cdot x^n](images/ANJ--1.png)

In our case the value of `n` is 3, taking into account that the reserve ratio equals `25%`.

To get `m`, we use the price set by the bonding curve when the bonding curve went live, which was the same as the pre-activation price i.e., 100 ANJ per 1 ANT, and the total amount of ANJ minted during pre-activation, `101,490,826.112967760974865700 ANJ`. So:

![$$\frac{1}{100} = m \cdot 101,490,826.112967760974865700^{3} \Rightarrow m = \frac{10^{-2}}{101,490,826.112967760974865700^{3}} = 0.956576345 \cdot 10^{-26}$$](images/ANJ--2.png)

If we take the integral of that curve between two ANJ supply points, `x_0` and `x_1`, we get the total amount of ANT contributed to mint `x_1 - x_0` ANJ tokens.

So if all the existing ANT, let's call it `T`, were to be contributed to the curve, that amount would be the integral between 0 and the maximum possible amount of ANJ, let's call it `J`:

![$$T = \int_{0}^{J}m \cdot x^n dx = \left(m \frac{x^{n+1}}{n+1} \right) {0}^{J} = m \frac{J^4}{4}$$; $$J^4 = 4 \frac{T}{m} = 4 \cdot 1.045394866 \cdot 10^{26} \cdot T = 3.82630538 \cdot 10^{26} \cdot T$$](images/ANJ--3.png)

Now we substitute `T` with the current total supply of ANT, `39,609,523.80952380954`:

![$$J = \sqrt(4){3.82630538 \cdot 10^{26} \cdot 39,609,523.80952380954} = \sqrt(4){151,558,134.051612262 \cdot 10^{26}} = 2 \cdot 10^{26/4} = 350,868,849.187414177$$](images/ANJ--4.png)

Therefore, given a total supply of `39,609,523.80952380954 ANT`, the theoretical maximum supply of ANJ is `350,868,849.187414177 ANJ`.

To try calculating the ANJ supply with other amounts of ANT deposited in the bonding curve, replace `T` in this formula with the desired ANT amount:

![$$J = \sqrt(4){3.82630538 \cdot 10^{26} \cdot T}$$](images/ANJ--5.png)

## Automated market making

The ANJ bonding curve formula not only determines the supply of ANJ, but also its conversion rate against ANT.

On January 17, 2020, Aragon One Solidity Engineer Bingen Eguzkitza published an [Observable document](https://observablehq.com/@anjbondingcurve/anj-bonding-curve) showing what the conversion rate of ANT:ANJ would be given a specified set of inputs, namely the pre-activation supply of ANJ plus or minus the amount of ANT deposited in or withdrawn from the ANJ bonding curve after the bonding curve went live.

The [bonding curve formula contract](https://etherscan.io/address/0x274aac49b63f07bf6998964ad20020b18383a09d#readContract) can be polled directly to find the current conversion rate, using the `calculatePurchaseReturn` option to find the ANT-to-ANJ rate and the `calculateSaleReturn` option to find the ANJ-to-ANT rate. There is also a [conversion tool](https://convert.aragon.org) available on the Aragon website that values can be entered into to easily find the current ANT:ANJ conversion rate.

## Technical details

ANJ is an [ERC-20](https://eips.ethereum.org/EIPS/eip-20) token, supporting division up to 18 decimal places (i.e. 0.000000000000000001 ANJ is the smallest possible unit of ANJ).

The ANJ token contract address is `0xcD62b1C403fa761BAadFC74C525ce2B51780b184`.

## Trade ANJ

In addition to buying and selling ANJ peer-to-peer, ANJ can be bought or sold using the services in the list below.

_Disclaimer: Nothing on this page should be taken as investment advice. Inclusion of a service does not constitute an endorsement of the service by the Aragon Association or any other member of the Aragon project. Please do your own research before trading ANJ or using any of the listed services to trade ANJ. Keep your funds safe and only do business with people for whom you have a good reason to trust._

**ANJ bonding curve:**  
These services enable you to convert between ANT and ANJ by directly interfacing with the ANJ bonding curve.

- Aragon Convert - https://convert.aragon.org  
- Etherscan - https://etherscan.io/address/0x0b4d742d52ee0c4391439f80822b26fdf1ad6ee7#writeProxyContract


**Exchanges:**
  
- IDEX - https://idex.market/eth/anj
- Uniswap - https://uniswap.exchange/swap  

**OTC brokers:**

N/A

--

Page owner: John Light ([@john-light](https://github.com/john-light). Last updated 2020-05-22.
