 function AsyncHandler(fn) {
   return async (req , res )=>{
     try {
        await fn(req ,res )
    } catch (error) {
        throw new Error(error)
    }
   }
}

module.exports = AsyncHandler
 