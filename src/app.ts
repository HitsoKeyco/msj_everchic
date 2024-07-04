import { createBot, createFlow, createProvider, MemoryDB } from '@bot-whatsapp/bot'
import { BaileysProvider, handleCtx } from '@bot-whatsapp/provider-baileys'

const main = async () => {

    const provider = createProvider(BaileysProvider)
    provider.initHttpServer(3010)

    await createBot({
        flow: createFlow([]),
        database: new MemoryDB(),
        provider
    })

    provider.http?.server.post('/send-message', handleCtx(async(bot, req, res) => {
        const { phone , msg } = req.body
               
        await bot.sendMessage(phone, msg, {})
        res.end('Mensaje enviado');
    }))


}


main();
