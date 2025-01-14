const dbConnect = require('./utils/dbConnect')
const superAdminUtil = require('./utils/superAdmin')

const init = () => {
    superAdminUtil.CreateSuperAdmin()
}

module.exports = {
    init
}