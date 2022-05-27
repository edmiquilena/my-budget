const version = process.env.npm_package_version;
export const APIVersion = (req, res) => { res.json({version})}
export const Handle404 = (req, res)=>{
    res.status(404).send({error: true, message:"Not Found"});
  }