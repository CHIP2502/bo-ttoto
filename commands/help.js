function main(ctx, args){
	let lstr = "";
	for(let i in global.data.CML){
		lstr += global.data.config.prefix+i+" - "+global.data.CML[i].desc+"\n";
	}
	ctx.reply("Command list:\n"+lstr, {"reply_to_message_id": ctx.message.message_id});
}

module.exports = main;