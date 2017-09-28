## Senior Solidity/EVM/Ethereum opening at Aragon

We are looking for an Ethereum wizard to work with us on [Aragon Core](https://github.com/aragon/aragon-core) and the upcoming [Aragon Network](https://github.com/aragon/whitepaper/raw/master/Aragon%20Whitepaper.pdf).

### Requirements

- **Expert understanding** of Ethereum and the inner workings of the EVM.
- Provable ability to ship **high quality, well crafted code** running on Ethereum.
- Strong **unit testing** culture.
- Being passionate about **decentralization** (having some concerns is totally fine, we all do).
- Being an autonomous individual with a proactive attitude and a love for **time self-management** (We are focus-driven work, not hours-driven).

### Good to have

- Interest and knowledge in **cryptoeconomics**.
- Experience contributing or managing **open source projects**.
- Very good **written communication** skills.

### Extra

- We will **reward referrals** for successful hires up to **10% of the first yearly salary**. This would be done with a vesting type smart contract that would be voided in case the hire leaves the organization.

### How to apply

- Write the code (deployable to the EVM), publish it on GitHub (public or private) and send link to repo plus any information you consider important to *jorge@aragon.one*, with the subject `Solidity opening application`.

- The code we are looking for could be comformant to the following interface. Feel free to remove/add any functions as you see fit:

```
// For the sake of simplicity lets assume USD is a ERC20 token
// Also lets assume we can 100% trust the exchange rate oracle
contract PayrollInterface {
  /* OWNER ONLY */
  function addEmployee(address accountAddress, address[] allowedTokens, uint256 initialYearlyUSDSalary);
  function setEmployeeSalary(uint256 employeeId, uint256 yearlyUSDSalary);
  function removeEmployee(uint256 employeeId);

  function addFunds() payable;
  function scapeHatch();
  // function addTokenFunds()? // Use approveAndCall or ERC223 tokenFallback

  function getEmployeeCount() constant returns (uint256);
  function getEmployee(uint256 employeeId) constant returns (address employee); // Return all important info too

  function calculatePayrollBurnrate() constant returns (uint256); // Monthly usd amount spent in salaries
  function calculatePayrollRunway() constant returns (uint256); // Days until the contract can run out of funds

  /* EMPLOYEE ONLY */
  function determineAllocation(address[] tokens, uint256[] distribution); // only callable once every 6 months
  function payday(); // only callable once a month

  /* ORACLE ONLY */
  function setExchangeRate(address token, uint256 usdExchangeRate); // uses decimals from token
}
```

### If you haven't, please [read more about our culture, work conditions, etc.](/README.md)
