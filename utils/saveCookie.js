const saveCookie = (token, res) => {
    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
}

export default saveCookie