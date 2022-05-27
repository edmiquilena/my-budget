import {Movement, db} from '../lib/db'

export const listMovements = async (req, res, next) => {
    const limit = 2;
let {by = 'desc', sort = 'timestamp', page = 1, filter = {}} = req.query;
page = (page < 1) ? 1 : page;
by = (['asc','desc'].includes(by)) ? by : 'desc'
sort = (['id','timestamp', 'createdAt'].includes(sort)) ? sort : 'id'
try {
filter = JSON.parse(filter)
} catch(e) {
    filter = {}
}
let totalRecords = await Movement.count({where: {creator: req.user.id, ...filter}})
let result = await Movement.findAll({
    offset:((page-1)*limit),
limit : limit,
    
    where: {creator: req.user.id, ...filter},
    attributes: ['id', 'type', 'concept', 'timestamp', 'amount', 'tags', 'createdAt'],
    order: db.literal(`${sort} ${by}`)
})
if(!result) return res.status(500).json({error: true, message: 'something went wrong'})

return res.json({error: false, result, totalRecords, page, filter})
}


export const getMovement = async(req, res, next) => {

}


export const editMovement = async(req, res, next) => {

}

export const removeMovement = async(req, res, next) => {

}