import {
    shallowMount
} from '@vue/test-utils'
import Header from '@/components/Header.vue'
var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

var mock = new MockAdapter(axios);

describe('Header.vue Test', () => {
    const wrapper = shallowMount(Header, {
        data: function () {
            return {
                id: 3
            }
        },
        mocks: {
            $store: {
                state: {
                    account: {
                        user: {
                            id: 3
                        }
                    }
                }
            }
        },
    })
    afterAll(() => {
        mock.restore();
    });
    beforeEach(() => {
        mock.reset();
    });
    it('Test get friend invites', async () => {
        mock.onGet("http://localhost:5004/getFriendInvites", {
            params: {
                id: 3,
            },
        }).reply(200,
            [{
                name: 'Boratas',
                surname: 'Liaupsas',
                userId: 5,
                postId: 600,
                profileImage: null,
            }]
        );

        await wrapper.vm.getFriendInvites()
        expect(wrapper.vm.friendInvites.length).toBe(1)
    })
    it('Get profile image', () => {
        expect(wrapper.vm.getProfileImage()).toBe("https://www.literarytraveler.com/wp-content/uploads/2013/05/Vincent_van_Gogh_Self_Portrait_1887_ChicagoArtInstitute.jpg")
    })
    it('Get invite image', () => {
        wrapper.setData({friendInvites: [{
            name: 'Boratas',
            surname: 'Liaupsas',
            userId: 5,
            postId: 600,
            profileImage: undefined,
        }]})
        const invite = wrapper.vm.friendInvites[0]
        expect(wrapper.vm.getInviteImage(invite)).toBe("https://www.literarytraveler.com/wp-content/uploads/2013/05/Vincent_van_Gogh_Self_Portrait_1887_ChicagoArtInstitute.jpg")
    })
})