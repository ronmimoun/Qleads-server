const Feedback = require('./feedback.model')

async function get(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)
        const feedbacks = await Feedback.find(criteria)
        return feedbacks
    } catch (err) {
        throw err
    }
}

async function getByContactId(contactId) {
    try {
        const feedbacks = await Feedback.find({ contactId })
        return feedbacks
    } catch (err) {
        throw err
    }
}

async function add(feedback) {
    try {
        const newFeedback = new Feedback(feedback)
        const savedFeedback = await newFeedback.save()
        return savedFeedback
    } catch (err) {
        throw err
    }
}

async function getUserFeedbacks() {
    try {
        const users = await Feedback.aggregate([
            {
                $addFields: {
                    userId: { $toObjectId: '$userId' }, // Convert userId to ObjectId
                },
            },
            {
                $group: {
                    _id: '$userId', // Group by user ID
                    feedbacks: {
                        $push: '$$ROOT', // Collect feedback documents into an array
                    },
                },
            },
            {
                $lookup: {
                    from: 'user',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $unwind: '$user', // Unwind the 'user' array to get a single user object
            },
            {
                $project: {
                    _id: 0, // Exclude the _id field
                    username: '$user.username', // Include the 'username' field from the user document
                    feedbacks: 1, // Include the 'feedbacks' array
                },
            },
        ]).exec()
        return users
    } catch (error) {
        throw error
    }
}

async function sumAverageRatingsForContacts(contactIds) {
    try {
        const pipeline = [
            {
                $match: { contactId: { $in: contactIds } }, // Filter feedbacks for specific contacts
            },
            {
                $group: {
                    _id: '$contactId', // Group by contactId
                    totalAverageRating: { $sum: '$rating' }, // Sum the ratings
                },
            },
            {
                $lookup: {
                    from: 'feedback', // Name of the feedback collection
                    localField: '_id', // Field from the feedback collection
                    foreignField: 'contactId', // Field from the feedback collection
                    as: 'feedback', // Alias for the joined feedback documents
                },
            },
        ];

        const result = await Feedback.aggregate(pipeline)
        if (!result.length) return 0
        else return result[0].totalAverageRating
    } catch (error) {
        throw error
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}

    if (filterBy.userId) {
        criteria.userId = filterBy.userId
    }

    if (filterBy.contactId) {
        criteria['contact._id'] = filterBy.contactId
    }

    return criteria
}

module.exports = {
    get,
    add,
    getByContactId,
    getUserFeedbacks,
    sumAverageRatingsForContacts,
}