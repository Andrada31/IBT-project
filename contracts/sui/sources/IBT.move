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

//Sender: 0xf03ea7d97841b474ebfc45d21883c64ec6ec30c2d10b2bbb74572fff2024a488
//Created ObjectID: 0xc8ffe512ece70821f8c37e13fae4f812bc6b8cbe55842a266ec1765b5cb5f6c9 
//Mutated ObjectID: 0x7c83025a2a282a1ea535c6bd6da8758683d935fc388d1c695329436c1e6e1681
//PackageID: 0xb79f15dd2e1824a9de6a781b89b31d2cdc0a8b5601c9dee6fa909806cc60b98e
