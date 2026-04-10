let createJob = AsyncHandler(async(req,res)=>{
   let job = await Job.create(req.body);

   res.status(201).json({
      success:true,
      data:job
   })
})