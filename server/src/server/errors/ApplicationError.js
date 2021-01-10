const fs = require('fs')

class ApplicationError extends Error{

  constructor (message, status) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message || 'Something went wrong. Please try again';
    this.code = status || 500;
    

    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; 
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const newdate = year + "_" + month + "_" + day;
    fs.readFile(`./ErrorLoger/${newdate}.json`, (e, data) => {
      const errors = [];
      if(data != undefined){
        errors.push(...JSON.parse(data))
      }
      errors.push({message: this.message,  time: Date.now(), code: this.code, stackTrace: {}})
      
      fs.writeFile(`./ErrorLoger/${newdate}.json`, JSON.stringify(errors), (e) => {
        console.log(e)
      })
    }) 
  }
}

module.exports = ApplicationError;