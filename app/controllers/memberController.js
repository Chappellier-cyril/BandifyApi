const { Member } = require('../models');

const memberController = {
    // Get all members
    getAll: async (req, res, next) => {
        try {
            const members = await Member.findAll();
            res.json(members);
        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

    // Get one member
    getOne: async (req, res, next) => {
        try {
            const targetId = req.params.id;

            const member = await Member.findByPk(targetId);

            // Soit le membre existe : Soit il n'existe pas
            if (member) {
                res.json(member);
            } else {
                next(); // => 404
            }
        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

    // Create a member
    create: async (req, res, next) => {
        try {
            // req.body contient les informations nécessaires pour créer 
            // un nouveau membre

            const newMember = await Member.create(req.body);

            res.json(newMember);

        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

    updateOne: async (req, res, next) => {
        try {
            // On utilise l'id de la cible, dans les params d'url
            const targetId = req.params.id;
            
            // on passe par une instance
            const memberToUpdate = await Member.findByPk(targetId);
            if (!memberToUpdate) {
                return next(); // <= pas de liste, 404
            }

            // Et les nouvelles valeurs des props, dans le body
            await memberToUpdate.update(req.body);
            // l'objet est à jour, on le renvoie
            res.json(memberToUpdate);
            
        } catch (error) {
            console.trace(error);
            res.status(500).json(error); 
        }
    },

    deleteOne: async (req, res, next) => {
        try {
            const targetId = req.params.id;

            const nbDeletedMember = await Member.destroy({
                where: {
                    id: targetId
                }
            });

            // Si y'a au moins 1 membre de supprimer alors :
            if (nbDeletedMember > 0) {
                res.json({message: "ok, membre supprimé"});
            } else {
                next(); // On envoie une 404
            }

        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    }

};

module.exports = memberController;