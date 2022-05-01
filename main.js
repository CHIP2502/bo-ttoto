const {Telegraf} = require('telegraf');
const fs = require("fs");
const path = require("path");

global.data = {};
global.data.config = JSON.parse(fs.readFileSync(path.join(__dirname, "setting.json")));
const prefix = global.data.config.prefix;
global.data.CML = JSON.parse(fs.readFileSync(path.join(__dirname, "help.json")));

const pathCM = path.join(__dirname, "commands");

console.log("started");

const bot = new Telegraf(global.data.config.token);
bot.on('message', function(ctx) {
	//console.log(ctx.message);

	if (global.data.config.listen_mod == "whitelist") {
		if(ctx.message.chat.type.indexOf("group") == -1 && global.data.config.list_id.indexOf(ctx.message.chat.id+"") == -1) return ctx.reply(`Looks like you have not been granted permission to use from admin, you can try contacting <a href="https://t.me/${global.data.config.admin}" title="Admin" target="_blank" rel="noopener noreferrer" class="text-entity-link" dir="auto">my admin</a> to get permission to use it!`, {"parse_mode": "HTML", "reply_to_message_id": ctx.message.message_id})
	} else if (global.data.config.listen_mod == "blacklist"){
		if(ctx.message.chat.type.indexOf("group") == -1 && global.data.config.list_id.indexOf(ctx.message.chat.id+"") != -1) return ctx.reply(`Looks like you have not been granted permission to use from admin, you can try contacting <a href="https://t.me/${global.data.config.admin}" title="Admin" target="_blank" rel="noopener noreferrer" class="text-entity-link" dir="auto">my admin</a> to get permission to use it!`, {"parse_mode": "HTML", "reply_to_message_id": ctx.message.message_id})
	}
	if(ctx.message.text && ctx.message.text.toLowerCase() == "prefix") ctx.reply("Prefix: "+prefix+"\n"+"Type \""+prefix+"help\" to view available commands");
	if (ctx.message.text != undefined && ctx.message.text.slice(0, prefix.length) == prefix) {
		args = ctx.message.text.slice(prefix.length).trim().split(/ +/);
		args[0] = args[0].split("@")[0];
		listen(ctx, args)
	}
	if (ctx.message.photo) {
		console.log(JSON.stringify(ctx.message, null, 4));
	} else if (ctx.message.sticker) {
		console.log(`[${ctx.message.from.id} đến ${ctx.message.chat.id}] : ${ctx.message.sticker.emoji}`);
	} else {
		console.log(`[${ctx.message.from.id} đến ${ctx.message.chat.id}] : ${ctx.message.text}`); 
	}
})
//bot.command("help", (ctx)=> require(path.join(pathCM, "help.js"))(ctx, args));
async function listen(ctx, args) {
	//console.log(args[0])
	if(args[0] == "help"){
		return require(path.join(pathCM, "help.js"))(ctx, args);
	}
	//console.log(ctx.message);
	if(!global.data.CML[args[0]]) return ctx.reply("The command is silent. Please type \""+prefix+"help\" to view available commands");
	try{
		await require(path.join(pathCM, global.data.CML[args[0]].main))(ctx, args);
	}catch(e) {console.log("Err: ", e)};
}
bot.launch()
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))