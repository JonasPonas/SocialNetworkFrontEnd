import {
    shallowMount
} from '@vue/test-utils'
import Feed from '@/components/Feed.vue'
var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

var mock = new MockAdapter(axios);

describe('Feed.vue Test', () => {
    const wrapper = shallowMount(Feed, {
        propsData: {
            title: 'Vue Project'
        }
    })
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
        axios
            .get("http://localhost:5004/getFriends", {
                params: {
                    id: 3,
                }
            })
            .then( () => {
                // console.log(response.data);
                expect(wrapper.vm.friends.length).toBe(1)
            }).catch(() => {
                // console.log(e);
            });
        
    })
    
})