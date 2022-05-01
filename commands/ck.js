let path = require('path');

async function main(ctx, args){
	if(!args[1] || args[1].split("|").length < 4 || args[1].split("|")[0].length != 16) return ctx.reply("Please enter the correct format:\n****************|**|**|***", {"reply_to_message_id": ctx.message.message_id});
	let send = await ctx.reply("Checking in progress. Please wait for a few minutes :3", {"reply_to_message_id": ctx.message.message_id});
	let info = await require(path.join(__dirname, "..", "function", "checked.js"))(args[1], 1);
	//console.log(info);
	ctx.deleteMessage(send.message_id);
	if(info.err) return ctx.reply(info.err, {"reply_to_message_id": ctx.message.message_id});
	ctx.reply("Gate: "+info.gate+" 🔥\nResponse: "+info.response+"\nCC: "+`<code class="text-entity-code" role="textbox" tabindex="0">`+info.cc+"</code>\nBank: "+info.bank+"\nCountry: "+info.country+"\nBrand: "+info.brand+"\nType: "+info.type+"\nChecked By: "+`<strong class="">`+ctx.message.from.first_name+" "+ctx.message.from.last_name+`</strong>`, {"parse_mode": "HTML", "reply_to_message_id": ctx.message.message_id});
	console.log("Check CC "+args[1]+" complete!");
}
//<code class="text-entity-code" role="textbox" tabindex="0">4116000122940631|06|24|263</code>
module.exports = main;