import { isString } from '../../../utils/stringUtils'

class SessionizeAPI {
    constructor(config) {
        if (config.sessionizeUrl !== this.sessionizeUrl) {
            this.sessionizeUrl = config.sessionizeUrl
            this.data = null
        }
    }

    getJsonData() {
        if (this.data) {
            return Promise.resolve(this.data)
        }
        return fetch(this.sessionizeUrl).then(async (response) => {
            if (response.ok) {
                this.data = await response.json()
                if (this.data.sessions) {
                    let tempId = ''
                    // Convert numeric id to string
                    Object.values(this.data.sessions).forEach((talk) => {
                        tempId = '' + talk.id
                        this.data.sessions[tempId] = {
                            ...talk,
                            id: tempId,
                            startTime: talk.startsAt,
                            endTime: talk.endsAt,
                        }
                        this.adaptSpeakerData(tempId)
                    })
                }
                return this.data
            } else {
                throw new Error(
                    'Something went wrong when loading the data. ' +
                        JSON.stringify(response)
                )
            }
        })
    }

    adaptSpeakerData(sessionId) {
        if (
            this.data.sessions[sessionId].speakers &&
            Array.isArray(this.data.sessions[sessionId].speakers)
        ) {
            this.data.sessions[sessionId].speakers = this.data.sessions[
                sessionId
            ].speakers.filter((id) => isString(id))
            this.data.sessions[sessionId].speakers.photoUrl =
                this.data.speakers[sessionId].profilePicture
            this.data.sessions[sessionId].speakers.socials = [
                {
                    name: 'Twitter',
                    link: this.data.speakers[sessionId].links
                        .filter((link) => link.linkType === 'Twitter')
                        .at(0),
                },
                {
                    name: 'LinkedIn',
                    link: this.data.speakers[sessionId].links
                        .filter((link) => link.linkType === 'LinkedIn')
                        .at(0),
                },
            ]
        }
    }

    getTalks() {
        return this.getJsonData().then((data) => data.sessions)
    }

    getTalk(talkId) {
        return this.getJsonData().then((data) => ({
            [talkId]: data.sessions[talkId],
        }))
    }

    getSpeakers() {
        return this.getJsonData().then((data) => data.speakers)
    }

    isReadOnly() {
        return true
    }
}

export default SessionizeAPI
