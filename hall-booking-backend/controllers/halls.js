import halls from "../models/HallsModel.js"

//CREATE BOOKING
export const createHall = async (req, res) => {
    const newHall = new halls(req.body)
    try {
        const savedHall = await newHall.save()
        res.status(200).json(savedHall)
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}

//Get Hall by ID

export const getHall = async (req, res) => {
    try {
        const { Hall_ID } = req.body;
        if (!Hall_ID) throw error("No Hall Id found");
        const hall = await halls.find(Hall_ID)
        res.status(200).json(hall)
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}

//GET ALL HALLS
export const getAllHalls = async (req, res) => {
    try {
        let params = {};
        if (req.params) {
            params = req.params
        }
        const hallsList = await halls.find(params)
        res.status(200).json(hallsList)
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}



