const connection = require('../database/connection');

module.exports = {

    async index(request, response){
        //criando paginação
        const { page = 1 } = request.query;

        //retornar para o front-end o total de registro para chamar as paginas
        const [count] = await connection('incidents').count();

        

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id' , '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5 )//pega de 5 em 5 registros por página
        .select(['incidents.*', 
                 'ongs.name', 
                 'ongs.email', 
                 'ongs.whatsapp',
                 'ongs.city',
                 'ongs.uf'
                ]);

        response.header('X-Total-Count', count['count(*)']);
        
        return response.json(incidents);
    },

    async create(request, response){

        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        // Ou [id]
        const result = await connection('incidents').insert({
            title, 
            description,
            value,
            ong_id,
        })

        const id = result[0];

        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;
        
        //virificar se o insidente a ser deletado é da Ong que requisitou
        const incidents = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if(incidents.ong_id != ong_id ){
            //401 sem autorização para deletar o registro
            return response.status(401).json({error: 'Operation not permitted. '});
        }

        await connection('incidents').where('id', id).delete();

        // status 204 -> Sucesso mas vazio
        return response.status(204).send();
    }

}