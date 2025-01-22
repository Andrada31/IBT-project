// IBT.move
module 0xYourAddress::IBT {
    use sui::coin;
    use sui::account;
    
    // Structure for IBT Coin
    struct IBT has store {
        value: u64,
    }

    // Event to log minting and burning actions
    struct MintEvent has store {
        amount: u64,
    }

    struct BurnEvent has store {
        amount: u64,
    }

    // Mint function to mint IBT tokens
    public fun mint(ctx: &mut account::Context, recipient: address, amount: u64) {
        let coin = Coin::mint(ctx, amount);
        Coin::transfer(ctx, recipient, coin);
        // Emit mint event
        emit MintEvent { amount };
    }

    // Burn function to burn IBT tokens
    public fun burn(ctx: &mut account::Context, amount: u64) {
        let coin = Coin::burn(ctx, amount);
        // Emit burn event
        emit BurnEvent { amount };
    }

    // Fetch the balance of the IBT tokens
    public fun balance(ctx: &account::Context): u64 {
        return Coin::balance(ctx);
    }

    // Transfer tokens from one account to another
    public fun transfer(ctx: &mut account::Context, to: address, amount: u64) {
        let coin = Coin::mint(ctx, amount);
        Coin::transfer(ctx, to, coin);
    }
}

