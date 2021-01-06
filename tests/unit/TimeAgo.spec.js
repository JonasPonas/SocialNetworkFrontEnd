import { TimeAgo } from "../../src/modules/TimeAgo.js"

describe('Feed.vue Test', () => {

    it('Test 1 hour ago', () => {
        let dateNow = "2021-01-05T16:29:00Z"
        let postDate = "2021-01-05T15:29:00Z"
        let answer = TimeAgo.dateToTimeAgo(postDate, new Date(dateNow))
        expect(answer).toBe('1 hour ago')
    })

    it('Test 2 hours ago', () => {
        let dateNow = "2021-01-05T17:29:00Z"
        let postDate = "2021-01-05T15:29:00Z"
        let answer = TimeAgo.dateToTimeAgo(postDate, new Date(dateNow))
        expect(answer).toBe('2 hours ago')
    })

    it('Test 1 year ago', () => {
        let dateNow = "2021-01-05T16:29:00Z"
        let postDate = "2020-01-01T15:29:00Z"
        let answer = TimeAgo.dateToTimeAgo(postDate, new Date(dateNow))
        expect(answer).toBe('1 year ago')
    })

    it('Test two years ago', () => {
        let dateNow = "2021-01-05T16:29:00Z"
        let postDate = "2019-01-01T15:29:00Z"
        let answer = TimeAgo.dateToTimeAgo(postDate, new Date(dateNow))
        expect(answer).toBe('2 years ago')
    })

    it('Test one month ago', () => {
        let dateNow = "2021-02-05T16:29:00Z"
        let postDate = "2021-01-05T15:29:00Z"
        let answer = TimeAgo.dateToTimeAgo(postDate, new Date(dateNow))
        expect(answer).toBe('1 month ago')
    })

    it('Test tree weeks ago', () => {
        let dateNow = "2021-01-22T16:29:00Z"
        let postDate = "2021-01-01T15:29:00Z"
        let answer = TimeAgo.dateToTimeAgo(postDate, new Date(dateNow))
        expect(answer).toBe('3 weeks ago')
    })

    it('Test one week ago', () => {
        let dateNow = "2021-01-08T16:29:00Z"
        let postDate = "2021-01-01T15:29:00Z"
        let answer = TimeAgo.dateToTimeAgo(postDate, new Date(dateNow))
        expect(answer).toBe('1 week ago')
    })

    it('Test two months ago', () => {
        let dateNow = "2021-03-08T16:29:00Z"
        let postDate = "2021-01-05T15:29:00Z"
        let answer = TimeAgo.dateToTimeAgo(postDate, new Date(dateNow))
        expect(answer).toBe('2 months ago')
    })

    it('Test one day ago', () => {
        let dateNow = "2021-01-08T20:29:00Z"
        let postDate = "2021-01-07T18:29:00Z"
        let answer = TimeAgo.dateToTimeAgo(postDate, new Date(dateNow))
        expect(answer).toBe('1 day ago')
    })

    it('Test two days ago', () => {
        let dateNow = "2021-01-08T20:29:00Z"
        let postDate = "2021-01-06T18:29:00Z"
        let answer = TimeAgo.dateToTimeAgo(postDate, new Date(dateNow))
        expect(answer).toBe('2 days ago')
    })

    it('Test one second ago', () => {
        let dateNow = "2021-01-08T20:29:01Z"
        let postDate = "2021-01-08T20:29:00Z"
        let answer = TimeAgo.dateToTimeAgo(postDate, new Date(dateNow))
        expect(answer).toBe('1 second ago')
    })

    it('Test two seconds ago', () => {
        let dateNow = "2021-01-08T20:29:02Z"
        let postDate = "2021-01-08T20:29:00Z"
        let answer = TimeAgo.dateToTimeAgo(postDate, new Date(dateNow))
        expect(answer).toBe('2 seconds ago')
    })

    it('Test one minute ago', () => {
        let dateNow = "2021-01-08T20:30:00Z"
        let postDate = "2021-01-08T20:29:00Z"
        let answer = TimeAgo.dateToTimeAgo(postDate, new Date(dateNow))
        expect(answer).toBe('1 minute ago')
    })

    it('Test two minutes ago', () => {
        let dateNow = "2021-01-08T20:31:00Z"
        let postDate = "2021-01-08T20:29:00Z"
        let answer = TimeAgo.dateToTimeAgo(postDate, new Date(dateNow))
        expect(answer).toBe('2 minutes ago')
    })
    // 
})