const parser = require("./lib/parser")
const puppeteer = require('puppeteer')

launch = async() => {
    const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox']})
    const page = await browser.newPage()
    return {browser, page}
}


module.exports = {
    getSaldo: async (username, password) => {
        const {browser, page} = await launch()
        try {
            await parser.loginMandiri(page, username, password)
            const saldo = await parser.saldoMandiri(page)
            await parser.logoutMandiri(page)
            browser.close()
            return saldo;
        } catch (err) {
            await parser.logout();
            browser.close()
            throw err;
        }
    },
    getMutasi: async(username, password) => {
        const {browser, page} = await launch()
        try {
            await parser.loginMandiri(page, username, password)
            const saldo = await parser.mutasiMandiri(page)
            await parser.logoutMandiri(page)
            browser.close()
            return saldo;
        } catch (err) {
            await parser.logout();
            browser.close()
            throw err;
        }
    }
}
