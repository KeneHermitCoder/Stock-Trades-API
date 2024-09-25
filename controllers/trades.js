const Trade = require('../models/trades');

module.exports = {
    create: async function (req, res) {
        const newTrade = new Trade(req.body);
        await newTrade.save();
        return res.status(201).json(newTrade);
    },

    getAll: async function (req, res) {
        try {
            const { type, user_id } = req.query;
            const filter_query = {};
            
            if (type) filter_query.type = type;
            if (user_id) filter_query.user_id = user_id;
            
            const foundTrades = await Trade.findAll({
                where: filter_query,
                order: [['id', 'ASC']]
            });
            
            res.status(200).json(foundTrades);
        } catch (error) {
            res.status(500).json({ error: error.message });
        };
    },

    getById: async function (req, res) {
        try {
            const foundTrade = await Trade.findByPk(req.params.id);
            if (!foundTrade) {
                // return res.status(404).send();
                // return res.status(404).json({ message: 'ID not found' });
                return res.status(404).send('ID not found');
            }
            res.status(200).json(foundTrade);
        } catch (error) {
            // res.status(404).json({ message: 'ID not found' });
            return res.status(404).send('ID not found');
        };
    },

    partialUpdate: async function (req, res) {
        res.status(405).send();
    },

    update: async function (req, res) {
        try {
            const updatedTrade = await Trade.update(req.body, {
                where: { id: req.params.id }
            });
            return res.status(405).json({ message: 'Trade updates not allowed at this time' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        };
    },

    delete: async function (req, res) {
        res.status(405).send();
    },
};