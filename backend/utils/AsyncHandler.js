 function AsyncHandler(fn) {
   return async (req , res )=>{
     try {
        await fn(req ,res )
    } catch (error) {
        res.status(500).json({ success:false, message:error.message })
    }
   }
}

module.exports = AsyncHandler
 