const { stringBetween, tdValue, removeHtml, toNumber } = require('./helper');

const logoutMandiri = async(page) => {
  try{
    await page.evaluate( function(){
      callModalLogout();
    } );
    await page.waitForSelector('#modalLogout', { visible: true });
    const logout = await page.waitForSelector('#btnCancelReg', { visible: true });
    await logout.click('#btnCancelReg')
    await page.waitForSelector('#userid_sebenarnya')
    return true
  }catch (e){
    return false
  }
  
}

const loginMandiri = async(page, user, password) => {
  try{
      await page.setViewport({width: 1280, height: 720})
      await page.setRequestInterception(true);
      
      page.on('request', (req) => {
          if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image'){
              req.abort();
          }
          else {
              req.continue();
          }
      });
      
      await page.goto('https://ibank.bankmandiri.co.id/retail3/loginfo/loginRequest', { waitUntil: 'networkidle0' });
      await page.type('#userid_sebenarnya', user);
      await page.type('#pwd_sebenarnya', password);
      const waitForNaf = page.waitForNavigation()
      await page.click('#btnSubmit')
      await waitForNaf
      return true
  } catch (e) {
      return false
  } 
}

const saldoMandiri = async(page) => {
  let data = {}

  try{
      await page.waitForSelector('.nominal')
      const options = await page.$$('.acc-right');
      
      for (const option of options) {
          const htmlValue = await page.evaluate(el => el.innerHTML, option);
          let rekening = stringBetween(htmlValue, '<div id="', '" class=')
          let saldo = stringBetween(htmlValue, 'IDR</span>', '<sup class')
          let subsaldo = stringBetween(htmlValue, 'class="decimal">', '</sup>')
          saldo = saldo.split('.').join("") + '.' + subsaldo
          data = {
              rekening : rekening,
              saldo : parseFloat(saldo)
          }
      }
      return data
  }catch(e){
      return false
  }
}

const mutasiMandiri = async(page) => {

  try {
    await page.waitForSelector('.nominal')
    await page.click('.nominal')
    await page.waitForSelector('.history-list-name')
    const innerHtml = await page.evaluate(() => document.querySelector('#globalTable_wrapper').innerHTML);
    let stmt = stringBetween(innerHtml, 'aria-relevant="all">', '</tbody>');
    stmt = tdValue(stmt);
    let cleanStmt = [];
    for (let i = 0; i < stmt.length; i += 4) {
      let tanggal = removeHtml(stmt[i])
      let keterangan = removeHtml(stmt[i + 1])
      let mutasi = removeHtml(stmt[i + 2]) == "-" ? "CR" : "DB"
      let nominal = mutasi == "DB" ? toNumber(removeHtml(stmt[i + 2])) : toNumber(removeHtml(stmt[i + 3]))
      cleanStmt.push({
        tanggal,
        keterangan,
        nominal,
        mutasi
      });
    }

    return cleanStmt
  } catch (e) {
    return false
  }
}

module.exports = {
  logoutMandiri,
  loginMandiri,
  saldoMandiri,
  mutasiMandiri
}
