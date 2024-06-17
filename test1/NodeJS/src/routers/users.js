const express = require("express");
const Course = require("../mongoose/models/courses");

//setting up the student router
const usersRouter = express.Router();

//write your code here
usersRouter.post('/courses/enroll/:id', (req, res) => {
    const id = req.params.id
    Course.findById(id).then((course) => {
        if (course.isApplied == true) {
            res.status(403).json({
                error: "You have already applied for this course"
            })
        }
        course.isApplied = true
        course.save()
            .then(() => {
                res.status(200).json({
                    message: "You have successfully enrolled for the course"
                })
            })
            .catch(err => res.status(400))
    })

})

usersRouter.delete('/courses/drop/:id', (req, res) => {
    const id = req.params.id
    Course.findById(id).then((course) => {
        if (!course.isApplied) {
            return res.status(403).json({
                error: "You have not enrolled for this course"
            })
        }
        course.isApplied = false
        course.save().then(() => {
            return res.status(200).json({
                message: "You have dropped the course"
            })
        })
    })
})

usersRouter.get('/courses/get',(req,res)=>{
    Course.find()
    .then((response)=>{
        res.status(200).json(response)
    })
    .catch((err)=>{
        res.sendStatus(400)
    })
})

usersRouter.patch('/courses/rating/:id',(req,res)=>{
    const id = req.params.id
    Course.findById(id)
    .then((course)=>{
        if(!course.isApplied){
            res.status(403).json({
                error:"You have not enrolled for this course"
            })
        }
        else if(course.isRated){
            res.status(403).json({
                error:"You have already rated this course"
            })
        }else{
        const newRating = req.body.rating;
        const resNoOfRatings = course.noOfRatings + 1;
        const resRating = (((course.rating || 0) * course.noOfRatings + newRating) / resNoOfRatings).toFixed(1);
        course.rating = resRating;
        course.noOfRatings = resNoOfRatings;
        course.isRated = true;
        course.save()
        .then(()=>{
            res.status(200).json({
                message: "You have rated this course"
            })
        })}
    })
})
module.exports = usersRouter;
