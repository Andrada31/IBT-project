module 0x0::IBT {
    use sui::coin::{Self, TreasuryCap, Coin};
    use sui::transfer;
    use sui::tx_context::TxContext;
    use sui::event::emit;

    struct IBT has store {
        value: u64,
    }

    struct MintEvent has store, copy, drop {
        amount: u64,
    }

    struct BurnEvent has store, copy, drop {
        amount: u64,
    }

    public entry fun mint(cap: &mut TreasuryCap<IBT>, recipient: address, amount: u64, ctx: &mut TxContext) {
        let coin = coin::mint<IBT>(cap, amount, ctx);
        transfer::public_transfer(coin, recipient);
        emit<MintEvent>(MintEvent { amount });
    }

    public entry fun burn(cap: &mut TreasuryCap<IBT>, coin: Coin<IBT>, ctx: &mut TxContext) {
        let amount = coin::burn<IBT>(cap, coin);
        emit<BurnEvent>(BurnEvent { amount });
    }
}