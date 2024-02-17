function computeClosesToZero(ts: number[]) {
    let result = ts[0];

    for (let i = 1; i < ts.length; i++) {
        let value = Math.abs(ts[i]);
        if (result < value) {
            result = value;
        }
    }

    return ts.length == 0 ? 0 : result;

    // if ts.length == 0 
}