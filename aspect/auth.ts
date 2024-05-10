import {
    allocate,
    entryPoint,
    execute,
    IPostTxExecuteJP,
    IPreTxExecuteJP,
    PreTxExecuteInput,
    sys
} from '@artela/aspect-libs';

class AuthAspect implements IPreTxExecuteJP {
    isOwner(sender: Uint8Array): bool {
        return true
    }

    preTxExecute(input: PreTxExecuteInput): void {
        //for smart contract call
        const verifyAccount = sys.aspect.property.get<Uint8Array>('verifyAccount');
        sys.log('verifyTx' + verifyAccount.toString() + ", " +  input.tx!.from.toString());
        sys.require(verifyAccount.toString() === input.tx!.from.toString(), 'verifyTx failed');
    }
}

// 2.register aspect Instance
const aspect = new AuthAspect();
entryPoint.setAspect(aspect);

// 3.must export it
export {execute, allocate};
