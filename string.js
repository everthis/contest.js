function kmp(s, p) {
    const N = s.length, M = p.length, T = [0]
    for(let i = 1, len = 0; i < M;) {
        if (p[i] === p[len]) T[i++] = ++len
        else if (len) len = T[len - 1]
        else T[i++] = 0
    }
    for(let i = 0, len = 0; i < N;) {
        if (s[i] === p[len]) {
            len++, i++
            if (len === M) return i - M
        }
        else if (len) len = T[len - 1]
        else i++
    }
    return -1
}

function rabinkarp(s, p) {
    const N = s.length, M = p.length, q = 1e9 + 7
    const D = maxCharCode(s) + 1
    let h = 1
    for(let i = 0; i < M - 1; i++) h = (h * D) % q
    let hash = 0, target = 0
    for(let i = 0; i < M; i++) {
        hash = ((hash * D) + code(s, i)) % q
        target = ((target * D) + code(p, i)) % q
    }
    for(let i = M; i <= N; i++) {
        if (check(i - M)) return i - M
        if (i === N) continue
        hash = ((hash - h * code(s, i - M)) * D + code(s, i)) % q
        if (hash < 0) hash += q
    }
    return -1

    function check(begin) {
        if (hash !== target) return false
        for(let i = 0; i < M; i++) if (s[begin + i] !== p[i]) return false
        return true
    }
}

function maxCharCode(s) {
    let D = 0
    for (let i = 0; i < s.length; i++) {
        D = Math.max(D, s.charCodeAt(i))
    }
    return D
}

function code(s, i) {
    return s.charCodeAt(i)
}

module.exports = { kmp, rabinkarp }