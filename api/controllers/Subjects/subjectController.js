const Subject = require("../../models/Subjects/subjectModel");
const Module = require("../../models/Modules/moduleModel");

exports.listAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find({}).populate('module');
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur." });
        console.error(error); 
    }
};

exports.createSubject = async (req, res) => {
    try {
        const moduleId = req.params.moduleId;
        const module = await Module.findById(moduleId);

        if (!module) {
            return res.status(404).json({ message: "Module non trouvé" });
        }

        const newSubject = new Subject({
            ...req.body,
            module: moduleId
        });

        const subject = await newSubject.save();
        res.status(201).json(subject);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du sujet' });
        console.error(error);
    }
};

exports.deleteSubject = async (req, res) => {
    try {
        const result = await Subject.deleteOne({ _id: req.params.subjectId });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: "Sujet non trouvé" });
        } else {
            res.status(200).json({ message: "Sujet supprimé avec succès" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur." });
        console.error(error);
    }
};

exports.updateSubject = async (req, res) => {
    try {
        const updatedSubject = await Subject.findByIdAndUpdate(
            req.params.subjectId,
            req.body,
            { new: true }
        );

        if (!updatedSubject) {
            res.status(404).json({ message: "Sujet non trouvé" });
        } else {
            res.status(200).json(updatedSubject);
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur." });
        console.error(error);
    }
};

exports.getSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.subjectId).populate('module');
        if (!subject) {
            res.status(404).json({ message: "Sujet non trouvé" });
        } else {
            res.status(200).json(subject);
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur." });
        console.error(error);
    }
};
