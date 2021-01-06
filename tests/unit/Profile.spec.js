import {
    shallowMount
} from '@vue/test-utils'
import Profile from '@/components/Profile.vue'
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");

const mock = new MockAdapter(axios);

var wrapper

describe('Feed.vue Test', () => {

    afterAll(() => {
        mock.restore();
    });
    beforeEach(() => {
        mock.reset();
    });
    it('Test fetch friends from person who is not a friend', async () => {
        mock.onGet("http://localhost:5004/getFriends", {
            params: {
                id: 3,
            }
        }).reply(200,
            [{
                id: 5,
            }]
        );
        const wrapper = shallowMount(Profile, {
            propsData: {
                title: 'Vue Project'
            },
            data: function () {
                return {
                    userId: 3,
                    myId: 1
                }
            }
        })
        await wrapper.vm.getFriends()
        expect(wrapper.vm.showFriendInvite).toBe(true)
    })
    it('Test show friend invite when person is in friends', async () => {
        mock.onGet("http://localhost:5004/getFriends", {
            params: {
                id: 3,
            }
        }).reply(200,
            [{
                id: 1,
            }]
        );
        const wrapper = shallowMount(Profile, {
            propsData: {
                title: 'Vue Project'
            },
            data: function () {
                return {
                    userId: 3,
                    myId: 1
                }
            }
        })
        await wrapper.vm.getFriends()
        expect(wrapper.vm.showFriendInvite).toBe(false)
    })


    it('Test if profile image is set to default if user has no image', async () => {
        mock.onGet("http://localhost:5004/userInfo", {
            params: {
                userId: 3,
            }
        }).reply(200,
            [{
                "name": "Borisas",
                "surname": "Mendelejavas",
                "lastSeen": "2020-05-16T09:55:01.000Z",
                "city": null,
                "country": null,
                "dateOfBirth": "2020-05-14T21:00:00.000Z",
                "image": null,
                "imageURL": undefined
            }]
        );
        const wrapper = shallowMount(Profile, {
            data: function () {
                return {
                    userId: 3,
                    myId: 1
                }
            }
        })
        await wrapper.vm.getUserInfo()

        expect(wrapper.vm.user.imageURL).toBe("https://www.literarytraveler.com/wp-content/uploads/2013/05/Vincent_van_Gogh_Self_Portrait_1887_ChicagoArtInstitute.jpg")
    })
})