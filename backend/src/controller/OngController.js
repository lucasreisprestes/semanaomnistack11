const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    // devo definir que a function é async
    async index(request, response){
                    //aguardar para retornar o resultado
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response){
        const { name, email, whatsapp, city, uf } = request.body; 
        const id = crypto.randomBytes(4).toString('HEX');
        
        //aguardar até concluir esta operação
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });
        return response.json({ id });
    }
}