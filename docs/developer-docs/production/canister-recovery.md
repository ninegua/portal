# Recovery

## Overview

A canister is managed and maintained by **controllers**. A controller can be a single developer identity, a list of developer identities, or another canister. If a canister does not have a controller, it cannot be upgraded, deleted, or otherwise maintained. Canisters can have several controllers. If access to a canister's controller(s) is lost, the canister cannot be upgraded or further maintained. If a canister's code traps with an unrecoverable error and cannot be upgraded, the canister can potentially be recovered using an NNS proposal. 

## Recovering a canister

If a canister is unable to be upgraded via any of the canister's existing controllers, either due to code failure or loss of access to the canister's controllers, there is no supported method to recover that canister.

One possible last resort recovery method can be used, however it requires that the canister have the NNS root canister `r7inp-6aaaa-aaaaa-aaabq-cai` configured as a controller of the canister.

To add the NNS root canister as a controller of your canister, use the command:

```sh
dfx canister update-settings CANISTER_NAME --network ic --add-controller r7inp-6aaaa-aaaaa-aaabq-cai
```

:::info
This step cannot be taken after access to a canister's controllers is already lost, since only a current controller of the canister can add additional controllers. If a canister's code has failed and cannot be upgraded, but access to the canister's controllers is possible, then this step can be performed. 
:::

Then, when the canister needs to be recovered, it may be recovered by using the System Canister Management NNS proposal used for upgrading all system canisters. When submitting this proposal, include the canister ID of the broken canister and a new Wasm module for the canister. Once this proposal is submitted, the NNS DAO will vote on whether to upgrade the canister using the proposed new Wasm file or not. If the proposal is passed, the canister will be upgraded and potentially recovered.

