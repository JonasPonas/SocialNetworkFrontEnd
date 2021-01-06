import {
    mount
} from '@vue/test-utils'
import Feed from '@/components/Feed.vue'
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");

const mock = new MockAdapter(axios);

describe('Feed.vue Test', () => {

    afterAll(() => {
        mock.restore();
    });
    beforeEach(() => {
        mock.reset();
    });
    it('Test fetch friends', async () => {
        mock.onGet("http://localhost:5004/getFriends", {
            params: {
                id: 3,
            }
        }).reply(200,
            [{
                name: 'Boratas',
                surname: 'Liaupsas',
                userId: 5,
                postId: 600,
                profileImage: null,
            }]
        );
        const wrapper = mount(Feed, {
            propsData: {
                title: 'Vue Project'
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
        await wrapper.vm.fetchFriends()
        expect(wrapper.vm.friends.length).toBe(1)
    })

})