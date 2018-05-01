const terms = require('../db/terms')

exports.getTerms = () => {
    return terms.get()
}