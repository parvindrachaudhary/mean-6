      const crypto = require('crypto').randomBytes(256).toString('hex');
         
      module.exports = { 

              uri: 'mongodb://localhost:27017/mean-angular-2',
              // uri: 'mongodb://parvindra:p1arvindra@ds037185.mlab.com:37185/angular-6-app' , //production
               secret: crypto,
               db: 'mean-angular-2'

                    }