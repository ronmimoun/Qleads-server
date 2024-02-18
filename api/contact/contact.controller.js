// Services
const dbService = require('../../services/db.service');
const contactService = require('./contact.service')
const { getFirstLetterUppercase } = require('../../services/util.service');

const ObjectId = require('mongodb').ObjectId

// GET USER CONTACTS 
async function getUserContacts(req, res) {
    try {
        const { userId } = req.body
        const contacts = await contactService.getContactsByUserId(userId)
        res.status(200).json({ status: 'ok', content: contacts })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
}

// ADD
async function add(req, res) {
    try {
        const contact = req.body
        const savedContact = await contactService.add(contact)
        res.status(200).json({ status: 'ok', content: savedContact });
    } catch (err) {
        res.status(500).json(err);
    }
}

// ADD MANY
async function addMany(req, res) {
    try {
        const contact = req.body
        if (!contact.jobTitles.length) return res.status(406).json({ status: 'error', message: "Job Titles are required" })

        const savedContacts = await contactService.addMany(contact)
        res.status(200).json({ status: 'ok', content: savedContacts })
    } catch (err) {
        res.status(500).json(err);
    }
}

// UPDATE
async function update(req, res) {
    const contact = req.body
    try {
        const updatedContact = await contactService.update(contact)
        res.status(200).json({ status: 'ok', content: updatedContact });
    } catch (err) {
        res.status(500).json(err);
    }
}

// //DELETE
async function remove(req, res) {
    try {
        const { id } = req.params
        if (!id) return res.status(500).json({ status: 'error', message: 'Cannot find contact ID' })
        const contactId = await contactService.remove(id)
        res.status(200).json({ status: 'ok', content: contactId });
    } catch (err) {
        res.status(500).json(err);
    }
}

// GET CONTACT
async function getById(req, res) {
    const { id } = req.params
    try {
        const contact = await contactService.getById(id)
        if (!contact) return res.status(400).json({ status: 'error', message: 'Contact not found' })
        res.status(200).json({ status: 'ok', content: contact });
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET ALL CONTACTS
async function getContacts(req, res) {
    try {
        const filterBy = req.body
        const contacts = await contactService.query(filterBy)
        res.status(200).json({ status: 'ok', content: contacts })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
}

async function getContactByCategories(req, res) {
    const cat = req.params.category
    try {
        const contacts = await contactService.getContactByCategories(getFirstLetterUppercase(cat))
        res.status(200).json({ status: 'ok', content: contacts })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
}
async function getNotRequestedContacts(req, res) {
    try {
        const contacts = await contactService.getNotRequestedContacts()
        res.status(200).json({ status: 'ok', content: contacts })
    } catch (err) {
        res.status(500).json(err);
    }
}

async function sendContactDetailsEmail(req, res) {
    try {
        const { contactId } = req.body
        const userId = req.user._id

        if (!contactId) return res.status(403).json({ status: 'error', message: 'Could not received contact information' });
        await contactService.sendContactDetailsEmail(contactId, userId)
        res.status(200).json({ status: 'ok' })
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    add,
    addMany,
    update,
    remove,
    getById,
    getContacts,
    getUserContacts,
    getContactByCategories,
    getNotRequestedContacts,
    sendContactDetailsEmail,
}