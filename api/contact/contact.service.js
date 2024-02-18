const ObjectId = require('mongodb').ObjectId
const Contact = require("./contact.model");
const ContactRequest = require("../contactRequest/contactRequest.model")
const emailService = require("../../services/email.service")
const dotenv = require("dotenv");
const { getContactDetailsEmailHtml } = require("../../constants/email")
const userService = require("../user/user.service")
dotenv.config()

async function add(contactToAdd) {
    try {
        const contact = new Contact(contactToAdd)
        const newContact = await contact.save()
        return newContact
    } catch (err) {
        throw err
    }
}

async function addMany(contact) {
    try {
        let newContacts = []
        contact.jobTitles.forEach((jobTitle) => {
            const newContact = new Contact({
                jobTitle: jobTitle.title,
                company: contact.company.company,
                category: contact.category.title,
                country: contact.country.name,
                desc: contact.desc
            })
            newContacts.push(newContact)
        })

        if (newContacts.length) {
            const savedContacts = await Contact.insertMany(newContacts)
            return savedContacts
        } else {
            return []
        }
    } catch (err) {
        throw err
    }
}

async function remove(entityId) {
    try {
        await Contact.deleteOne({ '_id': ObjectId(entityId) })
        return entityId
    } catch (err) {
        throw err
    }
}

async function update(updatedContact) {
    try {
        // peek only updatable fields!
        const contactToSave = {
            _id: ObjectId(updatedContact._id),
            company: updatedContact.company,
            desc: updatedContact.desc,
            country: updatedContact.country,
            category: updatedContact.category,
            jobTitle: updatedContact.jobTitle,
            price: Number(updatedContact.price),
            inStock: updatedContact.inStock,
            name: updatedContact.name,
            familyName: updatedContact.familyName,
            emails: updatedContact.emails,
            mobile: updatedContact.mobile,
            phone: updatedContact.phone,
            linkedinLink: updatedContact.linkedinLink,
            img: updatedContact.img,
            createdAt: updatedContact.createdAt,
            agent: updatedContact.agent,
            transactionHistory: updatedContact.transactionHistory,
            averageRating: updatedContact.averageRating,
            numberOfRatings: updatedContact.numberOfRatings,
        }
        const savedContact = await Contact.findOneAndUpdate(
            { _id: ObjectId(contactToSave._id) },
            { $set: contactToSave },
            { new: true }
        )

        return savedContact;
    } catch (err) {
        throw err
    }
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const entities = await Contact.find(criteria)
        return entities
    } catch (err) {
        throw err
    }
}

async function getById(entityId) {
    try {
        const entity = await Contact.findOne({ '_id': ObjectId(entityId) })
        return entity
    } catch (err) {
        throw err
    }
}

async function updateContactTransaction(contactTransaction) {
    try {
        const { contact } = contactTransaction
        const savedContact = await getById(contact._id)

        const transToSave = {
            transactionId: contactTransaction._id,
            createdAt: contactTransaction.createdAt,
            priceInCredit: contactTransaction.priceInCredit,
            userId: contactTransaction.userId,
            type: contactTransaction.type,
        }

        savedContact.transactionHistory.push(transToSave);
        await update(savedContact)
    } catch (err) {
        throw err
    }
}

async function getContactsByUserId(userId) {
    try {
        const contacts = await query({ userId })
        return contacts
    } catch (err) {
        throw err
    }
}

async function getContactByCategories(category) {
    try {
        const contacts = await Contact.find({ category })
        return contacts
    } catch (error) {
        throw error
    }
}

async function updateContactFeedback(feedback, totalAverageRating) {
    try {
        const { contactId, rating } = feedback
        const contact = await getById(contactId)
        contact.numberOfRatings += 1
        contact.averageRating = +((totalAverageRating + rating) / contact.numberOfRatings).toFixed(1)
        await update(contact)
        return contact
    } catch (error) {
        throw error
    }
}

async function getNotRequestedContacts() {
    try {
        const contacts = await Contact.find({ inStock: false })
        const contactRequests = await ContactRequest.find({})

        const filteredContacts = contacts.filter(contact => {
            const res = contactRequests.find(request => request.contactInfo._id === contact._id.toString())
            if (res) return false
            return true
        })

        return filteredContacts
    } catch (error) {
        throw error
    }
}

async function sendContactDetailsEmail(contactId, userId) {
    try {
        const contact = await getById(contactId)
        const loggedInUser = await userService.getById(userId)

        if (!loggedInUser || !loggedInUser.email) throw new Error('Please update your email before downloading')

        const message = {
            to: loggedInUser.email,
            subject: 'Contact details',
            text: 'Downloaded',
            html: getContactDetailsEmailHtml(contact),
        };

        emailService.sendEmail(message)
    } catch (error) {
        throw error
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}

    if (filterBy.hasOwnProperty('inStock')) {
        if (filterBy.inStock) criteria.inStock = true
        else criteria.inStock = false
    }

    if (filterBy.userId) {
        criteria['agent._id'] = filterBy.userId;
    }

    if (filterBy.countryPreference) {
        criteria.country = filterBy.countryPreference
    }

    return criteria
}


module.exports = {
    query,
    getById,
    remove,
    add,
    addMany,
    update,
    updateContactTransaction,
    getContactsByUserId,
    getContactByCategories,
    updateContactFeedback,
    getNotRequestedContacts,
    sendContactDetailsEmail,
}