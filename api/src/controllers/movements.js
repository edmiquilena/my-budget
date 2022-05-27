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
const movement = await Movement.findByPk(req.params.id, 
    {attributes: ['id', 'type', 'concept', 'timestamp', 'amount', 'tags', 'createdAt', 'creator']})
if(!movement || movement.creator !== req.user.id) return res.json({error: true, message: "No valid record."})
res.json({error: false, data: movement})
}


export const updateMovement = async(req, res, next) => {

let {concept, amount, tags} = req.body;
let update = await Movement.update({concept, amount, tags}, {where: {id: req.params.id, creator: req.user.id}});
if(!update) return res.json({error: true, message: "something went wrong."})
const movement = await Movement.findByPk(req.params.id, 
    {attributes: ['id', 'type', 'concept', 'timestamp', 'amount', 'tags', 'createdAt', 'creator']})
if(!movement || movement.creator !== req.user.id) return res.json({error: true, message: "No valid record."})
res.json({error: false, data: movement})
}

export const removeMovement = async(req, res, next) => {
let destroy =    await Movement.destroy({where: {id: req.params.id, creator: req.user.id}});
if(!destroy) return res.json({error:true, removed: false})
return res.json({error:false, removed: true})
}
export const newMovement = async(req, res, next) => {
    let {concept, amount, tags, type} = req.body;


    let create =  Movement.build({concept, amount, tags, type, creator: req.user.id })
    await create.save();
    return res.json({error:false, created: true, data: create})
}