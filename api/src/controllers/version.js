const version = process.env.npm_package_version;
export default (req, res) => { res.json({version})}